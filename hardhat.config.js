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
        goerli: {
            chainId: 5,
            url: process.env.CHRONIUM_TESTNET__URL,
            accounts: {
                mnemonic: process.env.CHRONIUM_TESTNET__MNEMONIC,
            },
        },
        mainnet: {
            chainId: 1,
            url: process.env.CHRONIUM_MAINNET__URL,
            accounts: {
                mnemonic: process.env.CHRONIUM_MAINNET__MNEMONIC,
                passphrase: process.env.CHRONIUM_MAINNET__PASSPHRASE,
            },
        },
    },
    etherscan: {
        apiKey: {
            goerli: process.env.CHRONIUM_ETHERSCAN,
            mainnet: process.env.CHRONIUM_ETHERSCAN,
        },
    },
};
