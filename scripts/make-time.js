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
    const time = await chronium.checkTimeBalance(account.address);
    if (time == 0) {
        console.log(`Your Time Balance is ${time}`);
        console.log("Call startTime() to start making time.");
        await chronium.startTime();
        console.log(
            "You have started making time. Please check your time balance again later."
        );
    } else {
        console.log(`Your Time Balance is ${time}`);
        console.log("Use ChroniumDistillery to distill time into Chronium");
    }
})();
