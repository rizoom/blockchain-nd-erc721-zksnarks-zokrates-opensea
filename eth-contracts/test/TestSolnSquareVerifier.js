const truffleAssert = require("truffle-assertions");

const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const proof = require("../../zokrates/code/square/proof.json");

const SOLUTION_ADDED_EVENT_NAME = "SolutionAdded";

contract("SolnSquareVerifier", accounts => {
  const account_one = accounts[0];

  describe("Verify SolnSquareVerifier features", () => {
    before(async () => {
      this.contract = await SolnSquareVerifier.new({ from: account_one });
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it("solution can be added", async () => {
      const result = await this.contract.addSolution(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);

      truffleAssert.eventEmitted(result, SOLUTION_ADDED_EVENT_NAME, event => {
        return event.index.toNumber() === 0 && event.owner === account_one;
      });
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it("token can be minted", async () => {
      let canMint = true;
      try {
        await this.contract.mintWithSolution(0);
      } catch (e) {
        canMint = false;
      }

      assert.equal(canMint, true, "Expected token to be mintable");
    });

    it("token cannot be minted twice", async () => {
      let canMint = true;
      try {
        await this.contract.mintWithSolution(0);
      } catch (e) {
        canMint = false;
      }

      assert.equal(canMint, false, "Expected token not to be mintable twice");
    });

    it("token cannot be minted if proof wasn't verified", async () => {
      let canMint = true;
      try {
        await this.contract.mintWithSolution(1);
      } catch (e) {
        canMint = false;
      }

      assert.equal(canMint, false, "Expected token not to be mintable when proof not verified");
    });
  });
});
