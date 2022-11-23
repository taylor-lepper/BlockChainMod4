const utils = require("./utils");
const Funding = artifacts.require("Funding");

const SECONDS_IN_1_HOUR = 3600;
const HOURS_IN_1_DAY = 24;
const DAY = SECONDS_IN_1_HOUR * HOURS_IN_1_DAY;

const GWEI = 10 ** 9;

contract("Funding", async (accounts) => {
  const firstAccount = accounts[0];
  const secondAccount = accounts[1];
  const thirdAccount = accounts[2];
  let funding;

  beforeEach(async () => {
    const goal = web3.utils.toHex(100000000 * GWEI);
    funding = await Funding.new(DAY, goal);
  });

  it("does not allow withdrawal if contract is not funded", async () => {
    try {
        await funding.withdraw();
        assert.fail();
    } catch(err){
        assert.ok(/revert/.test(err.message));
    }
  });

  it("disallow refund if account has no balance", async () => {
    await funding.donate({ from: secondAccount, value: 50000000 * GWEI });
    await utils.timeTravel(web3, DAY);

    try {
       const x = await funding.refund({from: thirdAccount});
        assert.fail();
    } catch(err){
        assert.ok(/revert/.test(err.message));
    }
  });

  it("allows to withdraw funds after time is up and goal is not reached", async () => {
    await funding.donate({ from: secondAccount, value: 50000000 * GWEI });

    const initBalance = await web3.eth.getBalance(secondAccount);
    assert.equal(await funding.balances.call(secondAccount), 50000000 * GWEI);

    await utils.timeTravel(web3, DAY);
    await funding.refund({ from: secondAccount });
    const finalBalance = await web3.eth.getBalance(secondAccount);
    assert.isTrue(parseInt(finalBalance, 10) > parseInt(initBalance, 10));
  });

  it("does not allow to withdraw funds after time is up and goal is reached", async () => {
    await funding.donate({ from: secondAccount, value: 100000000 * GWEI });
    assert.equal(await funding.balances.call(secondAccount), 100000000 * GWEI);

    await utils.timeTravel(web3, DAY);
    try {
      await funding.refund({from: secondAccount});
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("does not allow owner to withdraw funds before time is up and goal is not reached", async () => {
    await funding.donate({ from: secondAccount, value: 50000000 * GWEI });
    assert.equal(await funding.balances.call(secondAccount), 50000000 * GWEI);

    try {
      await funding.refund({from: secondAccount});
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("allows an owner to withdraw funds when goal is reached", async () => {
    await funding.donate({ from: secondAccount, value: 30000000 * GWEI });
    await funding.donate({ from: thirdAccount, value: 70000000 * GWEI });
    const initBalance = await web3.eth.getBalance(firstAccount);
    await funding.withdraw();
    const finalBalance = await web3.eth.getBalance(firstAccount);
    assert.isTrue(parseInt(finalBalance, 10) > parseInt(initBalance, 10));
  });

  it("does not allow non-owners to withdraw funds", async () => {
    const goal = web3.utils.toHex(100000000 * GWEI);
    funding = await Funding.new(DAY, goal, {
      from: secondAccount,
    });
    await funding.donate({ from: firstAccount, value: 100000000 * GWEI });
    try {
      await funding.withdraw();
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("does not allow for donations when time is up", async () => {
    await funding.donate({ from: firstAccount, value: 100000000 * GWEI });
    await utils.timeTravel(web3, DAY);
    try {
      await funding.donate({ from: firstAccount, value: 100000000 * GWEI });
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("finishes fundraising when time is up", async () => {
    assert.equal(await funding.isFinished.call(), false);
    await utils.timeTravel(web3, DAY);
    assert.equal(await funding.isFinished.call(), true);
  });

  it("keeps track of donator balance", async () => {
    await funding.donate({ from: firstAccount, value: 5000000 * GWEI });
    await funding.donate({ from: secondAccount, value: 15000000 * GWEI });
    await funding.donate({ from: secondAccount, value: 3000000 * GWEI });
    assert.equal(await funding.balances.call(firstAccount), 5000000 * GWEI);
    assert.equal(await funding.balances.call(secondAccount), 18000000 * GWEI);
  });

  it("accepts donations", async () => {
    await funding.donate({ from: firstAccount, value: 10000000 * GWEI });
    await funding.donate({ from: firstAccount, value: 20000000 * GWEI });
    assert.equal(await funding.raised.call(), 30000000 * GWEI);
  });

  it("sets an owner", async () => {
    assert.equal(await funding.owner.call(), firstAccount);
  });
});
