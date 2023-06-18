require('.');
const hre = require('hardhat');
const {ChroniumContract, ChroniumDistilleryContract} = require('@chron-lab/chronium-contracts');


describe('Test chronium', () => {
    let accounts;
    let chroniumContract;
    let distilleryContract;

    beforeEach(async () => {
        accounts = await ethers.getSigners();

        // DEPLOY AND INIT CHRONIUM
        const Chronium = await ethers.getContractFactory('Chronium');
        let deployed = await Chronium.deploy('Chronium','CHRON',accounts[0].address);
        chroniumContract = new ChroniumContract(deployed.address, accounts[0]);

        // DEPLOY AND INIT DISTILLERY
        const Distillery = await ethers.getContractFactory('ChroniumDistilleryV1');
        deployed = await upgrades.deployProxy(Distillery,
            [chroniumContract.address,1,accounts[0].address],
            {initializer:'__ChroniumDistilleryV1_Init'});
        distilleryContract = new ChroniumDistilleryContract(deployed.address, accounts[0]);

        await chroniumContract.contract.transferOwnership(distilleryContract.address);
    });

    it ('Should not distill when sender has not started time', async()=>{
        await distilleryContract.contract.connect(accounts[1]).distill(1)
            .should.be.rejectedWith('NO_TIME_ACCOUNT');
    })

    it ('Should not distill to zero time balance', async()=>{
        await chroniumContract.contract.connect(accounts[1]).startTime();
        await distilleryContract.contract.connect(accounts[1]).distill(1)
            .should.be.rejectedWith('NOT_ENOUGH_TIME');
    })

    it ('Should distill after starting time', async()=>{
        await chroniumContract.contract.connect(accounts[1]).startTime();
        await hre.network.provider.send('hardhat_mine');    // Add time

        console.log("distill() gas:"+await distilleryContract.contract.estimateGas.distill(1));
        await distilleryContract.contract.connect(accounts[1]).distill(1);

        let result;
        result = await chroniumContract.contract.balanceOf(accounts[1].address);
        result.toNumber().should.be.equal(1);
    })

    it ('Should not distill without enough time', async()=>{
        await chroniumContract.contract.connect(accounts[1]).startTime();
        await distilleryContract.contract.connect(accounts[1]).distill(10)
            .should.be.rejectedWith('NOT_ENOUGH_TIME');
    })


})