using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;

namespace Nethereum_example
{
    class Program
    {
        private static readonly HexBigInteger Gas = new HexBigInteger(4600000);

        static void Main(string[] args)
        {
            var provider = "https://goerli.infura.io/v3/88a0f67ff73e46fea3a578a43190a150";
            var contractAddress = "0xAb4211bc1282aE781c66fd081B2C87e662d9E7e0";
            var abi = "[\r\n\t{\r\n\t\t\"inputs\": [\r\n\t\t\t{\r\n\t\t\t\t\"internalType\": \"uint256\",\r\n\t\t\t\t\"name\": \"num\",\r\n\t\t\t\t\"type\": \"uint256\"\r\n\t\t\t}\r\n\t\t],\r\n\t\t\"name\": \"set\",\r\n\t\t\"outputs\": [],\r\n\t\t\"stateMutability\": \"nonpayable\",\r\n\t\t\"type\": \"function\"\r\n\t},\r\n\t{\r\n\t\t\"inputs\": [],\r\n\t\t\"name\": \"get\",\r\n\t\t\"outputs\": [\r\n\t\t\t{\r\n\t\t\t\t\"internalType\": \"uint256\",\r\n\t\t\t\t\"name\": \"\",\r\n\t\t\t\t\"type\": \"uint256\"\r\n\t\t\t}\r\n\t\t],\r\n\t\t\"stateMutability\": \"view\",\r\n\t\t\"type\": \"function\"\r\n\t}\r\n]";
            var privateKey = "0xfd45ad3d26b563232da01788b117ff526b63702543a28d267309790c4cf4335d";

            ContractService contractService = new ContractService(provider, contractAddress, abi, privateKey);
            //var txHash = contractService.SetValue(1234);
            //Console.WriteLine(txHash);
            int result = contractService.GetValue();
            Console.WriteLine(result);
        }

        
    }

    class ContractService {
        private readonly Web3 web3;
        private readonly Contract contract;
        private readonly Account account;

        private static readonly HexBigInteger Gas = new HexBigInteger(4600000);

        public ContractService(string provider, string contractAddress, string abi, string privateKey)
        {
            this.account = new Account(privateKey);
            this.web3 = new Web3(account, provider);
            this.contract = web3.Eth.GetContract(abi, contractAddress);
        }

        public string SetValue(int value)
        {
            var setFunction = contract.GetFunction("set");
            var txHash = setFunction.SendTransactionAsync(account.Address, Gas, new HexBigInteger(0), value)
                .ConfigureAwait(false)
                .GetAwaiter()
                .GetResult();
            return txHash;
        }

        public int GetValue() {
            var getFunction = contract.GetFunction("get");
            var task = getFunction.CallAsync<int>().Result;
            return task;
        }
    }
}
