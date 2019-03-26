import AppleToken from "./contracts/AppleToken.json";
import BananaToken from "./contracts/BananaToken.json";
import HashedTimelock from './contracts/HashedTimelock.json';

const options = {
  web3: {
    block: false,
    // fallback: {
    //   type: "ws",
    //   url: "ws://127.0.0.1:9545",
    // },
  },
  contracts: [AppleToken, BananaToken, HashedTimelock],
  events: {
    // SimpleStorage: ["StorageSet"],
    AppleToken: [
      {
        eventName: "Transfer"
      }
    ],
    HashedTimelock : ["LogHTLCNew","LogHTLCWithdraw","LogHTLCRefund"]
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
