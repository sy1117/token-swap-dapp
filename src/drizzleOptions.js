import AppleToken from "./contracts/AppleToken.json";
import BananaToken from "./contracts/BananaToken.json";
import HashedTimelockERC20 from './contracts/HashedTimelockERC20.json';

const options = {
  web3: {
    block: false,
    // fallback: {
    //   type: "ws",
    //   url: "ws://127.0.0.1:9545",
    // },
  },
  contracts: [AppleToken, BananaToken, HashedTimelockERC20],
  events: {
    // SimpleStorage: ["StorageSet"],
    AppleToken: [ "Transfer"],
    HashedTimelockERC20 : ["LogHTLCERC20New","LogHTLCERC20Withdraw","LogHTLCERC20Refund"]
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
