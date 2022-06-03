const TestContract = artifacts.require('./TestContract.sol');

contract('TestContract', (accounts) => {
    let test

    before(async () => {
        test = await TestContract.deployed();
    });

    describe('deployment', async () => {
        it('Deploys succesfully', async () => {
            const address = await test.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })

        it('Read message', async () => {
            const message = await test.message();
            assert.equal(message, "Test Contract");
        })
    })
})