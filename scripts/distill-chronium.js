const { ethers } = require("hardhat");

const deployed = {
    addresses: require("../deployed/localhost.json"),
};

(async () => {
    const account = await ethers.getSigner();

    const chronium = await ethers.getContractAt(
        "Chronium",
        deployed.addresses.Chronium
    );

    const distillery = await ethers.getContractAt(
        "ChroniumDistilleryV1",
        deployed.addresses.ChroniumDistillery
    );

    chron = await chronium.balanceOf(account.address);
    console.log(`Your Chronium Balance is ${chron}.`);

    tx = await distillery.distill(3);
    await tx.wait();
    console.log("You have distilled 3 time.");

    chron = await chronium.balanceOf(account.address);
    console.log(`Your new Chronium Balance is ${chron}.`);
})();
