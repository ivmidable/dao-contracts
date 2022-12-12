import { SigningCosmWasmClient, Secp256k1HdWallet, GasPrice } from "cosmwasm";

import * as fs from 'fs';
import axios from 'axios';

const dao_core_wasm = fs.readFileSync("../artifacts/dao_core.wasm");
const cw20_stake_wasm = fs.readFileSync("../artifacts/dao_voting_cw20_staked.wasm");
const cw20_staking_wasm = fs.readFileSync("../artifacts/cw20_stake.wasm");
const dao_proposal_single_wasm = fs.readFileSync("../artifacts/dao_proposal_single.wasm");

const cw_20_code_id = 3349;
const dao_core_id = 3351;
const cw20_voting_stake_id = 3352;
const dao_proposal_single_id = 3353;
const cw20_stake_id = 3354;

const rpcEndpoint = "https://juno-testnet-rpc.polkachu.com/";

const mnemonic =
    "test peanut elevator motor proud globe obtain gasp sad balance nature ladder";

    //const mnemonic = "carbon buyer nurse swarm grief biology flock fence decrease prison plunge saddle";

const prefix = "juno";

const cw20_address = "juno15z8ztwdjr29xgrvmtf5978u9mw9uf5rd7ehxvqsqj7ayed78ltcqc84ufa";
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

    xit("Get Testnet Tokens", async () => {
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
        let res = await client.upload(await getAddress(mnemonic), cw20_staking_wasm, "auto", undefined);
        console.log(res);
    }).timeout(10000000000);

    xit("Instantiate Cw20 Contract", async () => {
        let client = await setupClient(mnemonic);
        let instantiate_msg = {
            name: "Test Cw20",
            symbol: "TEST",
            decimals: 6,
            initial_balances: [
                {
                    address: await getAddress(mnemonic),
                    amount: "1000000000",
                }
            ]
        };
        let res = await client.instantiate(await getAddress(mnemonic), cw_20_code_id, instantiate_msg, "Test Cw20", "auto");
        console.log(res);
    }).timeout(100000);

    xit("Mint Cw20", async () => {
        let client = await setupClient(mnemonic);;
    }).timeout(100000);

    xit("Instantiate Core Contract", async () => {
        let client = await setupClient(mnemonic);

        let proposal_instantiate_msg = {
            threshold: {absolute_percentage:{percentage: {majority:{}}}},
            max_voting_period:{height:1000},
            only_members_execute:false,
            allow_revoting:false,
            pre_propose_info:{anyone_may_propose:{}},
            close_proposal_on_execution_failure:true
        };

        let cw20_stake_instance_msg = {
            token_info: {
                existing: {
                    address: "juno15z8ztwdjr29xgrvmtf5978u9mw9uf5rd7ehxvqsqj7ayed78ltcqc84ufa",
                    staking_contract: {
                        new: {
                            staking_code_id: cw20_stake_id
                        }
                    }
                }
            }
        };

        let dao_core_instantiate_msg = {
            name: "Test DAO",
            description: "Test DAO",
            automatically_add_cw20s: false,
            automatically_add_cw721s: false,
            voting_module_instantiate_info:{
                code_id: cw20_voting_stake_id,
                msg: Buffer.from(JSON.stringify(cw20_stake_instance_msg)).toString("base64"),
                label:"Voting Module",
                admin:{core_module:{}}
            },
            proposal_modules_instantiate_info: [{
                code_id:dao_proposal_single_id,
                msg: Buffer.from(JSON.stringify(proposal_instantiate_msg)).toString("base64"),
                label:"Proposal Module",
                admin:{core_module:{}}
            }]
        };

        let res = await client.instantiate(await getAddress(mnemonic), dao_core_id, dao_core_instantiate_msg, "Test DAO", "auto");
        console.log(res);

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