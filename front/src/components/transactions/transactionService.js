const bitcoin = require('bitcoinjs-lib')
const axios = require('axios')



export default function transactionService(from, to, amount, pk, balance, fees) {


    let txid = '';
    let txhex = '';
    let outn = 0;

    let obj = { "inputs": [{ "addresses": [`${from}`] }], "outputs": [{ "addresses": [`${to}`], "value": +amount }] }
    let str = JSON.stringify(obj)
    let json = JSON.parse(str);

    axios.post('https://api.blockcypher.com/v1/btc/test3/txs/new', json)
        .then((response) => {
            
            txid = response.data.tx.inputs[0].prev_hash
            outn = response.data.tx.inputs[0].output_index
            console.log(response, txid, outn);
        })
        .then(() => {

            let txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)

            txb.addInput(txid, outn)
            
            console.log(+amount, 'watch here');
            
            txb.addOutput(to, +amount)
        
            console.log((balance-amount)-10000);
            
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
            console.log(hex);
            
            axios.post('https://api.blockcypher.com/v1/btc/test3/txs/push', str)
            .then((r) => console.log(r))
        })


    //sender    
    //cPCP3zKazKxMwYmaRRLJz239tjk4S2CD8XnLPvHC8nAFC1kcFCd1 
    //mnykLfNVZjzYrGa7upmiG2QrsuxhRGLpi9

    //receiver
    //mkbb96pB6onaFX4Adgoup5e8AUFT4M8cmB


    
}