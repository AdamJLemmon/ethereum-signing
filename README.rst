Signature generation from just a private key and on-chain verification
=====================================================================

This repo provides an example of how to generate a signature from just a private key as well as the accompanying contract to verify this signature.

The test case will:

1. Generate a new Ethereum account from a randomly generate mnemonic
2. Sign a message with the assoicated private key
3. Recover the associate address **on-chain** and verify the signature

Usage
=====

.. code-block: console

    https://github.com/AdamJLemmon/ethereum-signing.git
    cd ethereum-signing
    truffle develop
    > test

