const chai =require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

// chron-lab-js
const EthersUtils = require("@chron-lab/chron-lab-js/nodejs/EthersUtils");
const Utils = require("@chron-lab/chron-lab-js/nodejs/Utils");

module.exports = {
    EthersUtils: EthersUtils,
    Utils: Utils,
};