const TestVerification = artifacts.require('./TestVerification.sol');
const generateSignature = require('../utils/generateSignature.js');
const createAccount = require('../utils/createAccount.js');

contract('TestVerification.recover()', () => {
  it('should successfully generate a new account, signature and verify the signature on-chain', async () => {
    const testVerification = await TestVerification.new();

    const wallet = await createAccount();
    const address = `0x${wallet.getAddress().toString('hex')}`;
    console.log(`Wallet Address:     ${address}`);

    const messageToSign = 'adamjlemmon';
    const hash = web3.sha3(messageToSign);
    
    const privateKey = wallet.getPrivateKey().toString('hex');
    console.log(`Wallet Private Key: ${privateKey}`);

    const sig = await generateSignature(hash, privateKey);
    console.log(`Signature:          ${sig}`);

    const recoveredAddress = await testVerification.recover(hash, sig);
    console.log(`\nRecovered Address: ${recoveredAddress}\nOriginal Address:  ${recoveredAddress}`);

    assert.strictEqual(recoveredAddress, address, 'Recovered address is incorect!');
  });
});