const bitcoin = require('bitcoinjs-lib')


function btcBuild(from, to, txid) {

    //cPGKB6yRAP5V9Rm7DopwyZTFFcTpMfTjmTZM42MxMXyi2krQ2QYw 
    //mn7tLer2QtAJ5gkfreq8XpU61wbmSgpFza

  let txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)

  let transactionid = 'c7e8eb74cebe030113c000c85708c3216a3b9c158e9b268bc4ccdcb1a6574fa2'
  let outn = 0;

  //input
  txb.addInput(transactionid, outn)

  //output
  //1st argument, is receiver
  txb.addOutput('mkbb96pB6onaFX4Adgoup5e8AUFT4M8cmB', 5544)
  //back to owner
  txb.addOutput('mn7tLer2QtAJ5gkfreq8XpU61wbmSgpFza', 62456)

  //signing
  let WIF = 'cPGKB6yRAP5V9Rm7DopwyZTFFcTpMfTjmTZM42MxMXyi2krQ2QYw'
  let keypairSpend = bitcoin.ECPair.fromWIF(WIF, bitcoin.networks.testnet)
  console.log(keypairSpend);
  
  txb.sign(0, keypairSpend)
  
  let tx = txb.build()
  let txhex = tx.toHex()
  
  return txhex;
}