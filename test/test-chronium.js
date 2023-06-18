const hre = require("hardhat");
const { ChroniumContract } = require("@chron-lab/chronium-contracts");

require(".");

describe("Test chronium", () => {
  let accounts;
  let chroniumContract;

  beforeEach(async () => {
    accounts = await ethers.getSigners();

    // DEPLOY AND INIT CHRONIUM
    const Chronium = await ethers.getContractFactory("Chronium");
    const deployed = await Chronium.deploy(
      "Chronium",
      "CHRON",
      accounts[0].address
    );
    chroniumContract = new ChroniumContract(deployed.address, accounts[0]);
  });

  it("Should not transfer when sender has not distilled", async () => {
    await chroniumContract.contract.connect(accounts[1]).startTime();
    await chroniumContract.contract
      .connect(accounts[1])
      .transfer(accounts[4].address, 1)
      .should.be.rejectedWith("transfer amount exceeds balance");
  });

  it("Should increase time", async () => {
    await hre.network.provider.send("hardhat_mine"); // Add time
    const before = await chroniumContract.contract.checkTimeBalance(
      accounts[0].address
    );
    await chroniumContract.contract.increaseTime(accounts[0].address, "1");

    const after = await chroniumContract.contract.checkTimeBalance(
      accounts[0].address
    );
    before.add(2).toString().should.equals(after.toString()); // time +1 timeforward +1 mined block
  });

  it("Should not increase time beyond chronium's age", async () => {
    await hre.network.provider.send("hardhat_mine"); // Add time
    await chroniumContract.contract
      .increaseTime(accounts[0].address, 10)
      .should.be.rejectedWith("NOT_ENOUGH_BLOCKS");
  });

  it("Should decrease time", async () => {
    await hre.network.provider.send("hardhat_mine"); // Add time

    await chroniumContract.contract.connect(accounts[0]).startTime();
    const before = await chroniumContract.contract.checkTimeBalance(
      accounts[0].address
    );
    await chroniumContract.contract.decreaseTime(accounts[0].address, 1);

    const after = await chroniumContract.contract.checkTimeBalance(
      accounts[0].address
    );
    before.toString().should.equals(after.toString()); // time -1 +1 mined block
  });

  it("Should not decrease time beyond owner's balance", async () => {
    await hre.network.provider.send("hardhat_mine"); // Add time
    await chroniumContract.contract
      .decreaseTime(accounts[0].address, 10)
      .should.be.rejectedWith("NOT_ENOUGH_TIME");
  });

  it("Should mint with time", async () => {
    await hre.network.provider.send("hardhat_mine"); // Add time

    const timeBefore = await chroniumContract.contract.checkTimeBalance(
      accounts[0].address
    );
    const balanceBefore = await chroniumContract.contract.balanceOf(
      accounts[0].address
    );

    await chroniumContract.contract.mint(accounts[0].address, 1, 1);
    const timeAfter = await chroniumContract.contract.checkTimeBalance(
      accounts[0].address
    );
    const balanceAfter = await chroniumContract.contract.balanceOf(
      accounts[0].address
    );

    timeBefore.toString().should.equals(timeAfter.toString()); // time -1 +1 mined block
    balanceBefore.add(1).toString().should.equals(balanceAfter.toString()); // balance +1
  });

  it("domain separator should return Chronium", async () => {
    const chainId = (await ethers.provider.getNetwork()).chainId.toString();
    const name = "Chronium";
    const version = "1";
    const verifyingContract = chroniumContract.contract.address;
    (await chroniumContract.contract.DOMAIN_SEPARATOR()).should.equal(
      await ethers.utils._TypedDataEncoder.hashDomain({
        name: name,
        version,
        chainId,
        verifyingContract,
      })
    );
  });

  it("should permit", async () => {
    // Mint 1 chronium into accounts 0
    await hre.network.provider.send("hardhat_mine"); // Add time
    const owner = accounts[0].address;
    await chroniumContract.contract.mint(owner, 1, 1);

    // Permit
    await chroniumContract.permit(accounts[0].address, accounts[1].address, 1);
    await chroniumContract.contract
      .connect(accounts[1])
      .transferFrom(accounts[0].address, accounts[1].address, 1);
  });
});
