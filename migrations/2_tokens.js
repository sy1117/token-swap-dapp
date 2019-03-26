const AppleToken = artifacts.require("AppleToken");
const BananaToken = artifacts.require("BananaToken");

module.exports = function(deployer) {
  deployer.deploy(AppleToken);
  deployer.deploy(BananaToken);
};
