/* var cmd = require('node-cmd');
var QRCode = require('qrcode')


        let walletInfo = {
            pubKey: null,
            priKey: null
        }

        cmd.get(
            'bitaddress singlewallet',
            function (err, data, stderr) {
                let arr = data.split('\n')
                walletInfo.pubKey = arr[0].split(' ')[2]
                walletInfo.priKey = arr[1].split(' ')[6]
                console.log('Wallet Details', walletInfo)
                QRCode.toDataURL(walletInfo.pubKey, function (err, url) {
                    console.log(url);
                })
            }
        ) */

 
    //cmd.run('touch example.created.file');
 
    /* cmd.get(
        'ls',
        function(err, data, stderr){
            console.log('the current dir contains these files :\n\n',data)
        }
    ); */
 
    /* cmd.get(
        `
            git clone https://github.com/RIAEvangelist/node-cmd.git
            cd node-cmd
            ls
        `,
        function(err, data, stderr){
            if (!err) {
               console.log('the node-cmd cloned dir contains these files :\n\n',data)
            } else {
               console.log('error', err)
            }

    ); */
