const ethUtil = require("ethereumjs-util");

/**
 * Generate a valid signature that can be verified on-chain.
 * Source may be found used in ganache-core: 
 *  - https://github.com/trufflesuite/ganache-core/blob/0c3979d088e4de63798fef157532fd43aec18280/lib/statemanager.js#L472
 * @param {String} dataToSign The hex string of the hash of the message to be signed.
 * @param {String} privKey The private key to use to sign WITHOUT the 0x prefix.
 * @returns {String}
 */
module.exports = (dataToSign, privateKey) => {
  const msg = Buffer.from(dataToSign.replace("0x", ""), "hex");
  const msgHash = ethUtil.hashPersonalMessage(msg);
  const sig = ethUtil.ecsign(msgHash, new Buffer(privateKey, 'hex'));
  return ethUtil.toRpcSig(sig.v, sig.r, sig.s);
}