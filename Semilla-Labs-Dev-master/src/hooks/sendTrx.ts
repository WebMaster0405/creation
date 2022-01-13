import ConcealProtocol from "../abis/ConcealProtocol.json";
import { GAS_DIVIDE_NUM, HEX_CHAIN_ID, networkChainIds, networkRPCUrls, SMART_CONTRACT_ADDRESS_MAP } from "../constants";

const Web3 = require("web3");
const axios = require("axios");

declare const window: any;

export async function sendTrx(
  privateKey: string,
  userNetwork: any,
  amount: string,
  owner: string,
  receiverAddress: string,
  enqueueSnackbar: any | null,
  setIsLoading: any
) {
  try {
    setIsLoading(true);

    await window.ethereum.enable();
    window.web3 = new Web3(window.ethereum);

    await window.web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: HEX_CHAIN_ID[userNetwork.chainId] }]
    });

    const accounts = await window.web3.eth.getAccounts();

    const estimateGasFees = async () => {
      const ethresult = await axios.get(
        `https://ethgasstation.info/api/ethgasAPI.json?api-key=0c07e8f02048b2d2802b50c726edf63f96bc58b2f10b07a8c8ce25c73d7e`
      );
      return { ethgasFees: ethresult.data };
    };

    const { ethgasFees } = await estimateGasFees();
    await window.web3.eth.accounts.wallet.add(privateKey);

    let contract = new window.web3.eth.Contract(ConcealProtocol.abi,  SMART_CONTRACT_ADDRESS_MAP[userNetwork.chainId]);

    await contract.methods.transfer(owner, receiverAddress, window.web3.utils.toWei(`${amount}`, "ether"),)
    .send({
      from: accounts[0], 
      gasPrice: window.web3.utils.toHex(
        window.web3.utils.toWei(`${ethgasFees.fast / GAS_DIVIDE_NUM[userNetwork.chainId] }`, "Gwei")
      ),
      gas: window.web3.utils.toHex("1000000"),
    })
      .then((res:any) => {
        enqueueSnackbar("Funds transferred sucessfully", {
          variant: "success",
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
          console.log('Success', res)
      })
      .catch((err:any) =>  {
        enqueueSnackbar(err.message, {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
        console.log(err)
      }) 
    setIsLoading(false);
    
  } catch (e: any) {
    setIsLoading(false);
    enqueueSnackbar(e.message, {
      variant: "error",
      anchorOrigin: { horizontal: "center", vertical: "top" },
    });
    throw e;
  }
}
