const {ethers}=require('hardhat');
const contracts = require('../deploy/contracts.json');

(async()=>{

    const Distillery = await ethers.getContractAt('ChroniumDistillery',contracts.ChroniumDistillery);
    distillery = await Distillery.deploy();

})();