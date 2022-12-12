import { SigningCosmWasmClient, Secp256k1HdWallet, GasPrice } from "cosmwasm";

import * as fs from 'fs';
import axios from 'axios';

const dao_core_wasm = fs.readFileSync("../artifacts/dao_core.wasm");
const cw20_stake_wasm = fs.readFileSync("../artifacts/dao_voting_cw20_staked.wasm");
const dao_proposal_single_wasm = fs.readFileSync("../artifacts/dao_proposal_single.wasm");

const cw_20_code_id = 3349;
const dao_core_id = 0;
const cw20_stake_id = 0;
const dao_proposal_single_id = 0;

const rpcEndpoint = "https://juno-testnet-rpc.polkachu.com/";

const mnemonic =
    "test peanut elevator motor proud globe obtain gasp sad balance nature ladder";

    //const mnemonic = "carbon buyer nurse swarm grief biology flock fence decrease prison plunge saddle";

const prefix = "juno";


const dao_core_address = "";
const cw20_contract_address = "";
const dao_proposal_address = ""

async function setupClient(mnemonic: string): Promise<SigningCosmWasmClient> {
    let gas = GasPrice.fromString("0.025ujunox");
    let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: prefix });
    let client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice: gas });
    return client;
}

async function getAddress(mnemonic: string) {
    let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: prefix });
    let accounts = await wallet.getAccounts();
    return accounts[0].address;
}

describe("DAODAO Cw20 Staking Tests", () => {

    xit("Generate Wallet", async () => {
        let wallet = await Secp256k1HdWallet.generate(12);
        console.log(wallet.mnemonic);
    });

    it("Get Testnet Tokens", async () => {
        //let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'juno' });
        //console.log(await wallet.getAccounts());
        try {
            let res = await axios.post("https://faucet.uni.juno.deuslabs.fi/credit", { "denom": "ujunox", "address": "juno10c3slrqx3369mfsr9670au22zvq082jaej8ve4" });
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }).timeout(10000);

    xit("Upload contract and get code_id", async() => {
        let client = await setupClient(mnemonic);
        //let res = await client.upload(await getAddress(mnemonic), cw20_stake_wasm, "auto", undefined);
        //console.log(res);
    }).timeout(10000000000);

    xit("Instantiate Cw20 Contract", async () => {
        let client = await setupClient(mnemonic);
  
    }).timeout(100000);

    xit("Mint Cw20", async () => {
        let client = await setupClient(mnemonic);;
    }).timeout(100000);

    xit("Instantiate Core Contract", async () => {
        let client = await setupClient(mnemonic);

    }).timeout(100000000);

    xit("Get Staking contract address", async () => {
        let client = await setupClient(mnemonic);
        let res = await client.queryContractSmart(dao_core_address, {dump_state:{}});
        console.log(res);
    }).timeout(1000000);

    xit("Stake Cw20", async () => {
        let client = await setupClient(mnemonic);
    
    }).timeout(100000);

    xit("Create Proposal", async () => {
        let client = await setupClient(mnemonic);
        
    }).timeout(100000);

    xit("List proposals", async() => {
        let client = await setupClient(mnemonic);
        
    }).timeout(100000);

    xit("Get Proposal id1", async() => {
        let client = await setupClient(mnemonic);
        
    }).timeout(100000);

    xit("Vote on Proposal", async () => {
        let client = await setupClient(mnemonic);
        
    }).timeout(100000);
    
});