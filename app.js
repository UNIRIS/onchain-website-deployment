import { deriveAddress, deriveKeyPair, newTransactionBuilder, sendTransaction, getTransactionIndex } from 'uniris';

window.generateTransaction = (seed, index, content) => {
    const { privateKey: originPrivateKey } = deriveKeyPair(originSeed, 0)
    return newTransactionBuilder("hosting")
        .setContent(content)
        .build(seed, index)
        .originSign(originPrivateKey)
}

window.sendTransaction = async (tx, endpoint) => {
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

window.getTransactionIndex = async (seed, endpoint) => {
    const address = deriveAddress(seed, 0);
    const nb = await getTransactionIndex(address, endpoint)
    return nb
}