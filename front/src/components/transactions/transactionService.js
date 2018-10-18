const bitcoin = require('bitcoinjs-lib')
const axios = require('axios')



export default function transactionService(from, to, amount, pk, balance, fees) {


    let txid = '';
    let txhex = '';
    let outn = 0;
    fees = +fees;

    let obj = { "inputs": [{ "addresses": [`${from}`] }], "outputs": [{ "addresses": [`${to}`], "value": +amount }] }
    let str = JSON.stringify(obj)
    let json = JSON.parse(str);

    return axios.post('https://api.blockcypher.com/v1/btc/test3/txs/new', json)
        .then((response) => {
            
            txid = response.data.tx.inputs[0].prev_hash
            outn = response.data.tx.inputs[0].output_index
        })
        .then(() => {

            let txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)

            txb.addInput(txid, outn)
            txb.addOutput(to, +amount)
            txb.addOutput(from, ((balance-amount)-fees))

            //signing
            let WIF = pk
            let keypairSpend = bitcoin.ECPair.fromWIF(WIF, bitcoin.networks.testnet)
            
            txb.sign(0, keypairSpend)
            
            let tx = txb.build()
            txhex = tx.toHex()
        }).then(() => {
            let hex = {tx: txhex}
            let str = JSON.stringify(hex);
            
            return axios.post('https://api.blockcypher.com/v1/btc/test3/txs/push', str)
            .then((response) => response.data)
        })    
}