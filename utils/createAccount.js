const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');

/**
 * Generate a random mnemonic and derivce the new account from this.
 * @returns {Object} A brand new account including privateKey, address etc.
 */
module.exports = () => {
    const mnemonic = bip39.generateMnemonic();
    const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const path = "m/44'/60'/0'/0/0";
    const wallet = hdwallet.derivePath(path).getWallet();
    return wallet;
}