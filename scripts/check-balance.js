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

    time = await chronium.checkTimeBalance(account.address);
    console.log(`Your Time Balance is ${time}.`);

    chron = await chronium.balanceOf(account.address);
    console.log(`Your Chronium Balance is ${chron}.`);
})();
