Signature generation from just a private key and on-chain verification
=====================================================================

This repo provides an example of how to generate a signature from just a private key as well as the accompanying contract to verify this signature.

The test case will:

1. Generate a new Ethereum account from a randomly generate mnemonic
2. Sign a message with the assoicated private key
3. Recover the associate address **on-chain** and verify the signature

Usage
=====

.. code-block:: console

    https://github.com/AdamJLemmon/ethereum-signing.git
    cd ethereum-signing
    truffle develop
    > test

Step-by-Step
============

Note: ``truffle version 4.1.14`` and ``web3 version 0.20.6``

Starting from the beginning a brand new account may be generated. The address and private key may be accessed directly from the new wallet:

.. code-clock:: JavaScript

    const bip39 = require('bip39');
    const hdkey = require('ethereumjs-wallet/hdkey');

    const mnemonic = bip39.generateMnemonic();
    const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const path = "m/44'/60'/0'/0/0";
    const wallet = hdwallet.derivePath(path).getWallet();
    const address = `0x${wallet.getAddress().toString('hex')}`;
    const privateKey = wallet.getPrivateKey().toString('hex');

Then the data to be signed can be specified and the hash taken:

.. code-clock:: JavaScript

    const messageToSign = 'adamjlemmon';
    const hash = web3.sha3(messageToSign);

Finally, this data may be signed:

.. code-clock:: JavaScript

    const sig = await generateSignature(hash, privateKey);

Where ``generateSignature`` is the following:
    
.. code-clock:: JavaScript

    const ethUtil = require("ethereumjs-util");

    module.exports = (dataToSign, privateKey) => {
      const msg = Buffer.from(dataToSign.replace("0x", ""), "hex");
      const msgHash = ethUtil.hashPersonalMessage(msg);
      const sig = ethUtil.ecsign(msgHash, new Buffer(privateKey, 'hex'));
      return ethUtil.toRpcSig(sig.v, sig.r, sig.s);
    }