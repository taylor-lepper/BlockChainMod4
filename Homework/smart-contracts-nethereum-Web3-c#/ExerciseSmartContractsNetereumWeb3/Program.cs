using System;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;




//  https://goerli.etherscan.io/address/0x01347047192Bd9d4A23f7DF15e7F5a429f5e9503


class Program 
{
    class ContractService 
    {
        private readonly Web3 web3;
        private readonly Contract contract;
        private readonly Account account;

        private static readonly HexBigInteger GAS = new HexBigInteger(4600000);

        public ContractService(string provider, string contractAddress, string abi, string privateKey) 
        {
            this.account = new Account(privateKey, 5);
            this.web3 = new Web3(account, provider);
            this.contract = web3.Eth.GetContract(abi, contractAddress);
        }

        public string AddFact(string fact)
        {
            var addFactFunction = contract.GetFunction("add");
            var txHash = addFactFunction.SendTransactionAsync(account.Address, GAS, new HexBigInteger(0), fact).ConfigureAwait(false).GetAwaiter().GetResult();
            return txHash;
        }

        public string GetFact(int index)
        {
            var getFactFunction = contract.GetFunction("getFact");
            var task = getFactFunction.CallAsync<string>(index);
            var fact = task.Result;
            return fact;
        }

        public int GetTotalFacts()
        {
            var getTotalFacts = contract.GetFunction("count");
            var task = getTotalFacts.CallAsync<int>();

            return task.Result;
        }

    }

    static void Main(string[] args) 
    {

        var provider = "https://goerli.infura.io/v3/88a0f67ff73e46fea3a578a43190a150";
        var contractAddress = "0x01347047192Bd9d4A23f7DF15e7F5a429f5e9503";
        var abi = "[\r\n\t{\r\n\t\t\"inputs\": [\r\n\t\t\t{\r\n\t\t\t\t\"internalType\": \"string\",\r\n\t\t\t\t\"name\": \"fact\",\r\n\t\t\t\t\"type\": \"string\"\r\n\t\t\t}\r\n\t\t],\r\n\t\t\"name\": \"add\",\r\n\t\t\"outputs\": [],\r\n\t\t\"stateMutability\": \"nonpayable\",\r\n\t\t\"type\": \"function\"\r\n\t},\r\n\t{\r\n\t\t\"inputs\": [],\r\n\t\t\"stateMutability\": \"nonpayable\",\r\n\t\t\"type\": \"constructor\"\r\n\t},\r\n\t{\r\n\t\t\"inputs\": [],\r\n\t\t\"name\": \"count\",\r\n\t\t\"outputs\": [\r\n\t\t\t{\r\n\t\t\t\t\"internalType\": \"uint256\",\r\n\t\t\t\t\"name\": \"factCount\",\r\n\t\t\t\t\"type\": \"uint256\"\r\n\t\t\t}\r\n\t\t],\r\n\t\t\"stateMutability\": \"view\",\r\n\t\t\"type\": \"function\"\r\n\t},\r\n\t{\r\n\t\t\"inputs\": [\r\n\t\t\t{\r\n\t\t\t\t\"internalType\": \"uint256\",\r\n\t\t\t\t\"name\": \"index\",\r\n\t\t\t\t\"type\": \"uint256\"\r\n\t\t\t}\r\n\t\t],\r\n\t\t\"name\": \"getFact\",\r\n\t\t\"outputs\": [\r\n\t\t\t{\r\n\t\t\t\t\"internalType\": \"string\",\r\n\t\t\t\t\"name\": \"fact\",\r\n\t\t\t\t\"type\": \"string\"\r\n\t\t\t}\r\n\t\t],\r\n\t\t\"stateMutability\": \"view\",\r\n\t\t\"type\": \"function\"\r\n\t}\r\n]";
        var privateKey = "";
        //for testing purposes of onlyOwner() modidier use pK2
        var privateKey2 = "";

        ContractService contractService = new ContractService(provider, contractAddress, abi, privateKey);

        //var fact = "This is the most factuous fact there be matey";
        var fact2 = "Even Another fact for you";
        System.Console.WriteLine($"Transaction Hash: {contractService.AddFact(fact2)}");
        System.Console.WriteLine($"Press Any Key To Exit.....");
        System.Console.ReadLine();

        //var index = 0;
        //System.Console.WriteLine($"Fact {index}: {contractService.GetFact(index)}");
        //System.Console.WriteLine("Press Any Key to Exit.....");
        //System.Console.ReadLine();

        //System.Console.WriteLine($"Stored facts in the contract: {contractService.GetTotalFacts()}");
        //System.Console.WriteLine("Press Any Key To Exit.....");
        //System.Console.ReadLine();

    }
}