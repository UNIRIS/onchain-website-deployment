import { deriveAddress, deriveKeyPair, newTransactionBuilder, sendTransaction, getTransactionIndex } from 'uniris';

let content = "";
let tx;

document.querySelector('#file').addEventListener('change', (event) => {
    const fileList = event.target.files;

    let fr = new FileReader()
    fr.onload = function (e) {
        content = e.target.result
    }
    fr.readAsArrayBuffer(fileList[0])
});

document.querySelector("#form").onsubmit = (e) => {
    e.preventDefault()

    $("#success-alert").addClass('d-none')
    $("#error-alert").addClass('d-none')
    $("#tx_address").text('')

    const originSeed = document.querySelector("#originSeed").value
    const seed = document.querySelector("#seed").value
    const index = parseInt(document.querySelector("#index").value)

    tx = _generateTransaction(originSeed, seed, index, content)
    document.querySelector("#tx_address").innerText = tx.address.toString('hex')
    document.querySelector("#output").style.display = "block"
    $("#btn_send_tx").show()
    
}

document.querySelector("#seed").onchange = () => {
    const endpoint = document.querySelector("#endpoint").value;
    const seed = document.querySelector("#seed").value;
    _getTransactionIndex(seed, endpoint).then(nb => {
        document.querySelector("#index").value = nb;
    })
}

document.querySelector("#btn_send_tx").onclick = () => {
    const endpoint = document.querySelector("#endpoint").value
    document.querySelector("#process").style.display = "block"

    _sendTransaction(tx, endpoint).then(() => {
        document.querySelector("#process").style.display = "none"
        $("#success-alert").removeClass('d-none')
        $("#btn_send_tx").hide()
        

    }).catch((e) => {
        document.querySelector("#process").style.display = "none"
        $("#errors").innerText(e)
        $("#error-alert").removeClass('d-none')
        $("#btn_send_tx").hide()
    })
}

function _generateTransaction(originSeed, seed, index, content) {
    const { privateKey: originPrivateKey } = deriveKeyPair(originSeed, 0)
    return newTransactionBuilder("hosting")
        .setContent(content)
        .build(seed, index)
        .originSign(originPrivateKey)
}

async function _sendTransaction(tx, endpoint) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await sendTransaction(tx, endpoint)
            if (data.errors) {
                return reject(JSON.stringify(data.errors))
            }
            return resolve()
        }
        catch (e) {
            return reject(e)
        }
    })
}

async function _getTransactionIndex(seed, endpoint) {
    const address = deriveAddress(seed, 0);
    const nb = await getTransactionIndex(address, endpoint)
    return nb
}