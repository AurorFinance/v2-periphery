# Aegis V2

[![Actions Status](https://github.com/Uniswap/uniswap-v2-periphery/workflows/CI/badge.svg)](https://github.com/Uniswap/uniswap-v2-periphery/actions)

In-depth documentation on Uniswap V2 is available at [uniswap.org](https://uniswap.org/docs).

# Local Development

The following assumes the use of `node@10.24.1`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`

## Deployment

`cd deployment && npx hardhat run scripts/deployRouter.ts`
