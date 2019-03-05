// import SimpleStorage from "./contracts/SimpleStorage.json";
// import ComplexStorage from "./contracts/ComplexStorage.json";
// import TutorialToken from "./contracts/TutorialToken.json";
import Reference from "./contracts/Reference.json";

const options = {
  web3: {
    block: false,
    // fallback: {
    //   type: "http",
    //   url: "http://127.0.0.1:7545",
    // },
  },
  contracts: [
    // SimpleStorage, ComplexStorage, TutorialToken
  ],
  events: {
    SimpleStorage: ["StorageSet"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
