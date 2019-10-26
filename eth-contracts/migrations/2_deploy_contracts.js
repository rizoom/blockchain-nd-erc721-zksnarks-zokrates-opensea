// migrating the appropriate contracts
//const SquareVerifier = artifacts.require("./SquareVerifier.sol");
//const SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const ZoomToken = artifacts.require("./ZoomToken.sol");

module.exports = function(deployer) {
  //deployer.deploy(SquareVerifier);
  //deployer.deploy(SolnSquareVerifier);
  deployer.deploy(ZoomToken);
};
