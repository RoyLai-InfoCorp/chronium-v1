require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
    defaultNetwork: "hardhat",
    solidity: {
        version: "0.8.8",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
    paths: {
        sources: "./contracts",
        artifacts: "./build",
    },
    mocha: {
        recursive: true,
        timeout: "40000",
    },
    networks: {
        hardhat: {
            chainId: 1337,
            accounts: {
                mnemonic: process.env.CHRONIUM_LOCAL__MNEMONIC,
            },
        },
    },
};
