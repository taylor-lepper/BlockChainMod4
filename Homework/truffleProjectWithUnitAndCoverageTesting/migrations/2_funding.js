const Funding = artifacts.require("Funding");
const SECONDS_IN_1_HOUR = 3600;
const HOURS_IN_1_DAY = 24;

const DAY = SECONDS_IN_1_HOUR * HOURS_IN_1_DAY;

const GOAL = 10 ** 15;

module.exports = function(deployer){
    deployer.deploy(Funding, DAY, GOAL);
};