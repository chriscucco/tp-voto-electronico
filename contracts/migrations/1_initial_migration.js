const Test = artifacts.require("TestContract");
const VotingPlatform = artifacts.require("VotingPlatform");

module.exports = function (deployer) {
  // deployer.deploy(Test);
  deployer.deploy(VotingPlatform);
};
