$(document).ready(function () {
    const ethereumProvider = new ethers.providers.JsonRpcProvider(
		'https://goerli.infura.io/v3/88a0f67ff73e46fea3a578a43190a150',
		'goerli'
	);
    const votingContractAddress = "0xF4b12fb5eEFAd53e74D2aBA998793Afb3af8Ca5e";
    const votingContractABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "index",
                    "type": "uint32"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "candidatesCount",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "index",
                    "type": "uint32"
                }
            ],
            "name": "getCandidate",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "index",
                    "type": "uint32"
                }
            ],
            "name": "getVotes",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const votingContract = new ethers.Contract(votingContractAddress, votingContractABI, ethereumProvider);


    showView("viewHome");

    $('#linkHome').click(function () {
        showView("viewHome");
    });

    $('#linkLogin').click(function () {
        showView("viewLogin");
    });

    $('#linkRegister').click(function () {
        showView("viewRegister");
    });

    $('#linkLogout').click(logout);

    $('#buttonLogin').click(login);
    $('#buttonRegister').click(register);

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
        const loggedIn = sessionStorage.jsonWallet;
        if (loggedIn) {
            $('.show-after-login').show();
            $('.hide-after-login').hide();
        } else {
            $('.show-after-login').hide();
            $('.hide-after-login').show();
        }
        if (viewName === 'viewHome')
            loadVotingResults();
    }

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function() { $("#ajaxLoadingBox").fadeIn(200) },
        ajaxStop: function() { $("#ajaxLoadingBox").fadeOut(200) }
    });

    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        });
    }

    function showError(errorMsg, err) {
        let msgDetails = "";
        if (err && err.responseJSON)
            msgDetails = err.responseJSON.errorMsg;
        $('#errorBox>p').html('Error: ' + errorMsg + msgDetails);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        });
    }

    function showProgressBox(percent) {
        let msg = "Wallet encryption / decryption ... " +
            Math.round(percent * 100) + "% complete";
        $('#progressBox').html(msg).show(100);
    }

    function hideProgressBox() {
        $('#progressBox').hide(100);
    }

    async function login() {
        let username = $("#usernameLogin").val();
        let walletPassword = $("#passwordLogin").val();
        let backendPassword = CryptoJS.HmacSHA256(username, walletPassword).toString();

        
        try { 
            let result = await $.ajax({
                type: "POST",
                url: "/login",
                data: JSON.stringify({username, password: backendPassword}),
                conttentType: "application/json",
            });

            sessionStorage["username"] = username;
            sessionStorage["jsonWallet"] = result.jsonWallet;
            showView('viewHome');
            showInfo(`User "${username}" logged in successfully.`);

        } catch(error){
            showError("Cannot login user", error);
        } 
    }

    async function register() {
        sessionStorage.clear();
        let username = $("#usernameRegister").val();
        console.log(username);
        let walletPassword = $("#passwordRegister").val();
        console.log(walletPassword);
        
        try {
            let wallet = ethers.Wallet.createRandom();
            let jsonWallet = await wallet.encrypt(walletPassword, {}, showProgressBox);

            let backendPassword = CryptoJS.HmacSHA256(username, walletPassword).toString();

            let result = await $.ajax({
                type: "POST",
                url: "/register",
                data: JSON.stringify({username, password: backendPassword, jsonWallet}),
                conttentType: "application/json",
            });

            sessionStorage.username = username;
            sessionStorage.jsonWallet = jsonWallet;
            showView('viewHome');
            showInfo(`User "${username}" registered successfully. Please save your mnenomics: <b>${wallet.mnemonic.phrase}</b>`);

        } catch(error){
            showError("Cannot register user. ", error);
        } finally {
            hideProgressBox();
        }
    }

    async function loadVotingResults() {
        try{
            // load candidates from Ethereum smart contract

            let candidates = [];
            let candidateCount = await votingContract.candidatesCount();
            for(let i = 0; i < candidateCount; i++){
                let candidate = await votingContract.getCandidate(i);
                let votes = await votingContract.getVotes(i);
                candidates.push({candidate, votes});
            }

            // display the candidates
            let votingResultUl = $("#votingResults").empty();
            for(let i = 0; i < candidateCount; i++){
                let candidate = candidates[i];
                let li = $("<li>").html(`${candidate.candidate} -> ${candidate.votes}  `);

                if(sessionStorage.username){
                    let button = $(`<input type ="button" value="Vote">`);
                    button.click(function(){
                        vote(i, candidate.candidate);
                    });
                    li.append(button);
                }
                li.appendTo(votingResultUl);
            } 
        }
        catch(error){
            showError(error);
        }
    }

    async function vote(candidateIndex, candidateName) {
        try{
            let jsonWallet = sessionStorage['jsonWallet'];
            let walletPassword = prompt('Enter your wallet password');
            let wallet = await ethers.Wallet.fromEncryptedJson(jsonWallet, walletPassword, showProgressBox);

            let privateKey = wallet.privateKey;
            const votingContract = new ethers.Contract(votingContractAddress, votingContractABI, new ethers.Wallet(privateKey, ethereumProvider));

            let votingResult = await votingContract.vote(candidateIndex);
            let transHash = votingResult.hash;
            showInfo(`Voted successfully for ${candidateName}. ` + `See the transaction: <a href="https://goerli.etherscan.io/tx/${transHash}" target="_blank">${transHash}</a>`);
        } catch(error){
            showError(error);
        } finally{
            hideProgressBox();
        }
    }

    function logout() {
        sessionStorage.clear();
        showView('viewHome');
    }

});


