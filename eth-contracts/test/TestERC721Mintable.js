const ZoomToken = artifacts.require("ZoomToken");

contract("TestERC721Mintable", accounts => {
  const account_one = accounts[0];
  const account_two = accounts[1];
  const account_three = accounts[2];

  describe("match erc721 spec", function() {
    beforeEach(async function() {
      this.contract = await ZoomToken.new({ from: account_one });

      await this.contract.mint(account_one, 1, { from: account_one });
      await this.contract.mint(account_one, 2, { from: account_one });
      await this.contract.mint(account_two, 3, { from: account_one });
    });

    it("should return total supply", async function() {
      const totalSupply = await this.contract.totalSupply.call();
      assert.equal(totalSupply, 3, "Total supply should be 3");
    });

    it("should get token balance", async function() {
      const balance1 = await this.contract.balanceOf.call(account_one);
      const balance2 = await this.contract.balanceOf.call(account_two);
      assert.equal(balance1, 2, "Balance of account one should be 1");
      assert.equal(balance2, 1, "Balance of account two should be 1");
    });

    const BASE_TOKEN_URI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it("should return token uri", async function() {
      const tokenURI = await this.contract.tokenURI.call(1)
      const expected = `${BASE_TOKEN_URI}1`;
      assert.equal(tokenURI, expected, "Wrong token URI");
    });

    it("should transfer token from one owner to another", async function() {
      await this.contract.transferFrom(account_one, account_two, 1);

      const owner = await this.contract.ownerOf.call(1);
      assert.equal(owner, account_two, "Account two should be the owner");
    });

    it("should transfer token when approved for all", async function() {
      await this.contract.setApprovalForAll(account_three, true, { from : account_two });
      await this.contract.transferFrom(account_two, account_one, 3, { from : account_three });

      const owner = await this.contract.ownerOf.call(3);
      assert.equal(owner, account_one, "Account one should be the owner");
    });
  });

  describe("have ownership properties", function() {
    beforeEach(async function() {
      this.contract = await ZoomToken.new({ from: account_one });
    });

    it("should fail when minting when address is not contract owner", async function() {
      let fail = false;

      try {
        await this.contract.mint(account_one, 1, { from: account_two });
      } catch (e) {
        fail = true;
      }

      assert.equal(fail, true, "Minting shouldn't be allowed");
    });

    it("should return contract owner", async function() {
      const owner = await this.contract.owner.call();
      assert.equal(owner, account_one, "Account one should be the contract owner");
    });
  });
});
