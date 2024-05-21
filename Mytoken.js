const { expect } = require("chai");

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1, addr2;

  beforeEach(async function () {
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    myToken = await MyToken.deploy();
    await myToken.deployed();
  });

  it("Should have correct name and symbol", async function () {
    expect(await myToken.name()).to.equal("MyToken");
    expect(await myToken.symbol()).to.equal("MTK");
  });

  it("Should allow owner to mint tokens", async function () {
    await myToken.mint(addr1.address, 1000);
    expect(await myToken.balanceOf(addr1.address)).to.equal(1000);
  });

  it("Should allow users to transfer tokens", async function () {
    await myToken.mint(owner.address, 1000);
    await myToken.transfer(addr1.address, 500);
    expect(await myToken.balanceOf(addr1.address)).to.equal(500);
  });

  it("Should allow users to burn tokens", async function () {
    await myToken.mint(owner.address, 1000);
    await myToken.burn(500);
    expect(await myToken.totalSupply()).to.equal(500);
  });

  it("Should not allow non-owners to mint tokens", async function () {
    await expect(myToken.connect(addr1).mint(addr1.address, 1000)).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
