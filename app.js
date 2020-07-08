import { derivateKeyPair, newTransactionBuilder, sendTransaction, derivateAddress, getTransactionIndex } from 'uniris';
let content = ""
let tx

const fileSelector = document.querySelector('#file');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;

    let fr = new FileReader()
    fr.onload = function (e) {
        content = e.target.result
    }
    fr.readAsArrayBuffer(fileList[0])
  });

window.generateHostingTransaction = function() {

    const originSeed = document.querySelector("#originSeed").value
    const { privateKey: originPrivateKey } = derivateKeyPair(originSeed, 0)

    const seed = document.querySelector("#seed").value
    const index = parseInt(document.querySelector("#index").value)

    tx = newTransactionBuilder("hosting")
    .setContent(content)
    .build(seed, index, originPrivateKey)

    document.querySelector("#tx_json").innerText = tx.address.toString('hex')
    document.querySelector("#output").style.display = "block"
}

window.sendTransaction = function() {
    const endpoint = document.querySelector("#endpoint").value
    document.querySelector("#process").style.display = "block"
    sendTransaction(tx, endpoint)
        .then(data => {
            document.querySelector("#process").style.display = "none"
            if (data.errors) {
                alert("Something went wrong: " + JSON.stringify(data.errors))
                return
            }

            alert("Transaction submited to the network")
        })
        .catch(() => {
            document.querySelector("#process").style.display = "block"
        })
}

window.getTransactionIndex = function() {
    const endpoint = document.querySelector("#endpoint").value
    const seed = document.querySelector("#seed").value
    const address = derivateAddress(seed, 0)
    getTransactionIndex(address, endpoint).then((nb) => {
        document.querySelector("#index").value = nb
    })
}