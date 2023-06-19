(async () => {
    const hre = require("hardhat");
    block = await hre.ethers.provider.getBlock();
    console.log(`current block:`, block.number);
    await hre.network.provider.send("hardhat_mine", ["0x1000"]);
    block = await hre.ethers.provider.getBlock();
    console.log(`current block:`, block.number);
})();
