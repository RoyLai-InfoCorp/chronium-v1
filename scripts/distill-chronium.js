const { ethers } = require("hardhat");

const deployed = {
    adddresses: require("../deployed/mainnet.json"),
    artifacts: {
        Chronium: require("../deployed/Chronium.json"),
        ChroniumDistillery: require("../deployed/ChroniumDistilleryV1.json"),
    },
};

(async () => {
    const account = await ethers.getSigner();

    const chronium = new ethers.Contract(
        deployed.adddresses.Chronium,
        deployed.artifacts.Chronium.abi,
        account
    );

    const distillery = new ethers.Contract(
        deployed.adddresses.ChroniumDistillery,
        deployed.artifacts.ChroniumDistillery.abi,
        account
    );

    chron = await chronium.balanceOf(account.address);
    console.log(`Your Chronium Balance is ${chron}.`);

    tx = await distillery.distill(10000);
    await tx.wait();
    console.log("You have distilled 10000 time.");

    chron = await chronium.balanceOf(account.address);
    console.log(`Your new Chronium Balance is ${chron}.`);
})();
