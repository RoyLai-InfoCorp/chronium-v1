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
    console.log(account.address);
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
        console.log("Use ChroniumDistillery to convert time into Chronium");
    }
})();
