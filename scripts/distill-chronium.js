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

    const time = await chronium.checkTimeBalance(account.address);

    const tx = await distillery.distill(time);
    await tx.wait();
    console.log(`You have distilled ${time} time.`);

    const balance = await chronium.balanceOf(account.address);
    console.log(`Your Chronium balance is ${balance}.`);
})();
