const { ethers, upgrades, network } = require("hardhat");
const fs = require("fs");
const networkName = network.name;

(async () => {
    const accounts = await ethers.getSigners();

    // DEPLOY AND INIT CHRONIUM
const Chronium = await ethers.getContractFactory("Chronium");
    const chronium = await Chronium.deploy(
        "Chronium",
        "CHRON",
        accounts[0].address
    );

    // DEPLOY AND INIT DISTILLERY PROXY
    const Distillery = await ethers.getContractFactory("ChroniumDistilleryV1");
    const distillery = await upgrades.deployProxy(
        Distillery,
        [chronium.address, 1, accounts[0].address],
        { initializer: "__ChroniumDistilleryV1_Init" }
    );

    // TRANSFER CHRONIUM OWNERSHIP TO DISTILLERY
    await chronium.transferOwnership(distillery.address);

    const contracts = {
        Chronium: chronium.address,
        ChroniumDistillery: distillery.address,
    };
    console.log(contracts);
    fs.writeFileSync(
        `./deploy/${networkName}.json`,
        JSON.stringify(contracts, null, 4)
    );
})()
    .catch((e) => {
        console.log(e);
    })
    .finally(() => {
        process.exit(0);
    });
