// migrating the appropriate contracts
// const ZoomToken = artifacts.require("./ZoomToken.sol");
const SquareVerifier = artifacts.require("./SquareVerifier.sol");
const SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");


module.exports = function(deployer) {
  // deployer.deploy(ZoomToken);
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
};
