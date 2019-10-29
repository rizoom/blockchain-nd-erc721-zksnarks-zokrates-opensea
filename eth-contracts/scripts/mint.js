const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const CONTRACT_ADDRESS = "0x7eD7aDfab562abd7fb954b4c25AF76F40f595211";
const TOKEN_TO_MINT = 10;
const INDEX_START = 0;

module.exports = function() {
  web3.eth.getAccounts(async (error, accounts) => {
    const ownerAddress = accounts[0];
    const contract = await SolnSquareVerifier.at(CONTRACT_ADDRESS);
    for (let i = INDEX_START; i < INDEX_START + TOKEN_TO_MINT; i++) {
      const result = await contract.mint(ownerAddress, i);
      console.log(`Token minted, index: ${i}\n\ttx: ${result.tx}`);
    }
    console.log(`Tokens successfully minted`);
  });
};
