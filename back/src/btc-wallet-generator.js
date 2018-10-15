const bitcoin = require('bitcoinjs-lib')

function rng () {
  let s = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'.split('')
  s.map((e,i) => s[i] = Math.floor(Math.random() * 9))
  return Buffer.from(s.join('')) 
}

function getKeys() {
    const testnet = bitcoin.networks.testnet
    const keyPair = bitcoin.ECPair.makeRandom({ network: testnet, rng: rng })
    const wif = keyPair.toWIF()
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: testnet })
    return {public: address, private: wif}
}

module.exports = getKeys;