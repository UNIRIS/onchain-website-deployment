import { derivateKeyPair, newTransactionBuilder, sendTransaction } from 'uniris';
let content = ""

const fileSelector = document.querySelector('#file');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;

    let fr = new FileReader()
    fr.onload = function (e) {
        content = e.target.result
    }
    fr.readAsText(fileList[0])
  });

window.generateHostingTransaction = function() {

    const originSeed = document.querySelector("#originSeed").value
    const { privateKey: originPrivateKey } = derivateKeyPair(originSeed, 0)

    const seed = document.querySelector("#seed").value
    const index = parseInt(document.querySelector("#index").value)

    const tx = newTransactionBuilder("hosting")
    .setContent(content)
    .build(seed, index, originPrivateKey)

    document.querySelector("#tx_json").innerText = JSON.stringify(tx, undefined, 2)
    document.querySelector("#output").style.display = "block"
}

window.sendTransaction = function() {
    const txJSON = document.querySelector("#tx_json").innerText
    const endpoint = document.querySelector("#endpoint").value
    sendTransaction(JSON.parse(txJSON), endpoint)
        .then(data => {
            if (data.errors) {
                alert("Something went wrong: " + JSON.stringify(data.errors))
                return
            }

            alert("Transaction submited to the network")
        })
}