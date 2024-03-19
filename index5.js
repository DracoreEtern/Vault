const { Web3 } = require('web3');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contractABI = require('./ABI.json');
// Configura Web3
const web3 = new Web3('https://bsc-dataseed1.binance.org');

// Sostituisci questi valori con quelli del tuo contratto
const contractAddress = '0x5B2bC17dd9E1f6528B5cbE9d8891929940667960';


const contract = new web3.eth.Contract(contractABI, contractAddress);

const app = express();
const port = 3001;

app.use(cors());
// Middleware per analizzare il body delle richieste
app.use(bodyParser.json());

// Funzione replacer per JSON.stringify che gestisce BigInt
function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString();
  } else {
    return value;
  }
}

// Endpoint per leggere i token posseduti da un indirizzo
app.post('/vault', async (req, res) => {
    const { idtoken } = req.body;

    if (!web3.utils.toNumber(idtoken)) {
        return res.status(400).send('Token non trovato');
    }

    try {
        const tokens = await contract.methods.vault(idtoken).call();
        // Utilizza JSON.stringify con il replacer per gestire i valori BigInt
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ tokens }, replacer));
    } catch (error) {
        console.error(error);
        res.status(500).send('Errore nel recupero dei token');
    }
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
