import ConcealProtocol from "../abis/ConcealProtocol.json";

import { networkChainIds, networkRPCUrls, SMART_CONTRACT_ADDRESS_MAP } from "../constants";

export async function useTokenBalance(
  userNetwork: any,
  owner?: string | null
) {
    const Web3 = require("web3");
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        networkRPCUrls[
          networkChainIds.indexOf(userNetwork.chainId)
        ]
      )
    );

    let contract = new web3.eth.Contract(ConcealProtocol.abi, SMART_CONTRACT_ADDRESS_MAP[userNetwork.chainId]);
    let balance:any;
    
    await contract.methods.getUserBalance()
      .call({
        from: owner, 
      }).then((res:any) => {
        if(res == undefined){ 
          balance = 0;
          return 0;
        } else {
          let formatETH = web3.utils.fromWei(res, "ether");
          balance = parseFloat(parseFloat(formatETH).toFixed(4))
        }
      })
    .catch((err:any) =>  {
      console.error(err);
    });
    return balance;
}
