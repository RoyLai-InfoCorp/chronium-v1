//https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#complex-arguments
// Run this script to verify chronium programmatically

const hre = require("hardhat");
const { network } = hre;
const networkName = (network.name)
const contracts = require(`../deploy/${networkName}.json`); // contract addresses

(async () => {


  const accounts = await ethers.getSigners();

  // VERIFY CHRONIUM
  await hre.run("verify:verify", {
    contract: "contracts/chronium-contracts-sol/Chronium.sol:Chronium",
    address: contracts.Chronium,
    constructorArguments: ["Chronium", "CHRON", accounts[0].address],
  });

  // VERIFY DISTILLERY IMPLEMENTATION
  const impl = await hre.upgrades.erc1967.getImplementationAddress(
    contracts.ChroniumDistillery
  );
  await hre.run("verify:verify", {
    contract:
      "contracts/chronium-contracts-sol/ChroniumDistilleryV1.sol:ChroniumDistilleryV1",
    address: impl,
  });

  // VERIFY DISTILLERY PROXY
  await hre.run("verify:verify", {
    contract:
      "contracts/chronium-contracts-sol/ChroniumDistilleryV1.sol:ChroniumDistilleryV1",
    address: contracts.ChroniumDistillery,
  });
})();
