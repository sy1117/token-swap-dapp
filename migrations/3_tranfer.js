const HTLC = artifacts.require("HashedTimelock");

module.exports = function(deployer) {
  deployer.deploy(HTLC);
};
