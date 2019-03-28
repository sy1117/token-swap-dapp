// const HTLC = artifacts.require("HashedTimelock");
const HashedTimelockERC20 = artifacts.require("HashedTimelockERC20");

module.exports = function(deployer) {
  // deployer.deploy(HTLC);
  deployer.deploy(HashedTimelockERC20);
};
