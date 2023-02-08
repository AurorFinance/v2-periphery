import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "hardhat-contract-sizer";
import * as dotenv from 'dotenv';

dotenv.config({path: process.cwd() + '/scripts/process.env'});

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 46500
          }
        }
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999
          }
        }
      },
    ]
  },
  defaultNetwork: 'hardhat',
  networks: {
    // Configure each network to the respective Cronos instances
    hardhat: {
      accounts: [
        {
          privateKey: process.env.AEGIS_MANAGER_KEY!,
          balance: '1000000000000000000000000000000000000000000'
        },
        {
          privateKey: process.env.AEGIS_TREASURY_KEY!,
          balance: '1000000000000000000000000000000000000000000'
        },
        {
          privateKey: process.env.USER_A_KEY!,
          balance: '1000000000000000000000000000000000000000000'
        },
        {
          privateKey: process.env.USER_B_KEY!,
          balance: '1000000000000000000000000000000000000000000'
        },
        {
          privateKey: process.env.USER_C_KEY!,
          balance: '1000000000000000000000000000000000000000000'
        }
      ],
      allowUnlimitedContractSize: true
    },
    cronosMainnet: {
      url: 'https://evm.cronos.org',
      chainId: 25,
      accounts: [process.env.AEGIS_MANAGER_KEY!],
      gas: 'auto',
      gasPrice: 'auto',
      allowUnlimitedContractSize: true
    },
    cronosTestnet: {
      url: 'https://evm-t3.cronos.org',
      chainId: 338,
      accounts: [process.env.AEGIS_MANAGER_KEY!],
      gas: 'auto',
      gasPrice: 'auto',
      allowUnlimitedContractSize: true
    },
    avaxTestnet: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [process.env.AEGIS_MANAGER_KEY!],
      gas: 'auto',
      gasPrice: 'auto',
      allowUnlimitedContractSize: true
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;
