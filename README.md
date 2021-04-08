# Onchain Website Deployment

Tool to make the deployment of the transaction chains related to the onchain version of the Uniris website.

The HTML interface provide a form to select the file to host, create the transaction and deploy it to the network.

## Site building

To build the website index page with the right addresses and endpoint to reach, run the script
```
npm run build_index
```

## Form description

- Node endpoint: Alpha Network: https://blockchain.uniris.io
- Origin private key seed: Authorized origin private key (for the alpha network it is the node seed):            
  - 05A2525C9C4FDDC02BA97554980A0CFFADA2AEB0650E3EAD05796275F05DDA85

- File: Pick the file on your file explorer (currenty used files are located inside the repository, in the folder assets)

- Transaction Chain Seed: derivation key seed for each file
- Transaction Index: Number of transaction on the chain - should be filled automatically once the seed is provided

- Generate: will generate the transaction and display the transaction address

- Deploy: will send the transaction to the node endpoint specified

## Installation


```bash
npm install
```

## Run

```bash
npm start
```

It will be open a browser page with the deployment form
