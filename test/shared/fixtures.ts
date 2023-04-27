import { Wallet, Contract } from 'ethers'
import { Web3Provider } from 'ethers/providers'
import { deployContract } from 'ethereum-waffle'

import { expandTo18Decimals } from './utilities'

import {AurorV2Factory} from './abi' // Please update this if swap-core is modified
import {IAurorV2Pair} from './abi' // Please update this if swap-core is modified

import ERC20 from '../../build/ERC20.json'
import WETH9 from '../../build/WETH9.json'
import AurorV1Exchange from '../../build/UniswapV1Exchange.json'
import AurorV1Factory from '../../build/UniswapV1Factory.json'
import AurorV2Router01 from '../../build/AurorV2Router01.json'
import AurorV2Migrator from '../../build/AurorV2Migrator.json'
import AurorV2Router02 from '../../build/AurorV2Router02.json'
import RouterEventEmitter from '../../build/RouterEventEmitter.json'
import AurorRouterFee from '../../build/AurorRouterFee.json';

const overrides = {
  gasLimit: 9999999
}

interface V2Fixture {
  WETH: Contract
  WETHExchangeV1: Contract
  WETHPair: Contract
  WETHPartner: Contract
  factoryV1: Contract
  factoryV2: Contract
  migrator: Contract
  pair: Contract
  router01: Contract
  router02: Contract
  router: Contract
  routerEventEmitter: Contract
  routerFee: Contract
  token0: Contract
  token1: Contract
}

export async function v2Fixture(provider: Web3Provider, [wallet]: Wallet[]): Promise<V2Fixture> {

  //deploy router fee manager
  const routerFee = await deployContract(wallet, AurorRouterFee, [wallet.address]);

  // deploy tokens
  const tokenA = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)])
  const tokenB = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)])
  const WETH = await deployContract(wallet, WETH9)
  const WETHPartner = await deployContract(wallet, ERC20, [expandTo18Decimals(10000)])

  // deploy V1
  const factoryV1 = await deployContract(wallet, AurorV1Factory, [])
  await factoryV1.initializeFactory((await deployContract(wallet, AurorV1Exchange, [])).address)

  // deploy V2
  const factoryV2 = await deployContract(wallet, AurorV2Factory, [wallet.address])

  // deploy routers
  const router01 = await deployContract(wallet, AurorV2Router01, [factoryV2.address, WETH.address], overrides)
  const router02 = await deployContract(wallet, AurorV2Router02, [factoryV2.address, WETH.address, wallet.address], overrides)

  // set the allowed caller for the v2-core
  await factoryV2.connect(wallet).setAllowedCaller(wallet.address);

  // event emitter for testing
  const routerEventEmitter = await deployContract(wallet, RouterEventEmitter, [])

  // deploy migrator
  const migrator = await deployContract(wallet, AurorV2Migrator, [factoryV1.address, router01.address], overrides)

  // initialize V1
  await factoryV1.createExchange(WETHPartner.address, overrides)
  const WETHExchangeV1Address = await factoryV1.getExchange(WETHPartner.address)
  const WETHExchangeV1 = new Contract(WETHExchangeV1Address, JSON.stringify(AurorV1Exchange.abi), provider).connect(
    wallet
  )

  // initialize V2
  await factoryV2.createPair(tokenA.address, tokenB.address)
  const pairAddress = await factoryV2.getPair(tokenA.address, tokenB.address)
  const pair = new Contract(pairAddress, JSON.stringify(IAurorV2Pair.abi), provider).connect(wallet)

  const token0Address = await pair.token0()
  const token0 = tokenA.address === token0Address ? tokenA : tokenB
  const token1 = tokenA.address === token0Address ? tokenB : tokenA

  await factoryV2.createPair(WETH.address, WETHPartner.address)
  const WETHPairAddress = await factoryV2.getPair(WETH.address, WETHPartner.address)
  const WETHPair = new Contract(WETHPairAddress, JSON.stringify(IAurorV2Pair.abi), provider).connect(wallet)

  return {
    WETH,
    WETHExchangeV1,
    WETHPair,
    WETHPartner,
    factoryV1,
    factoryV2,
    migrator,
    pair,
    router01,
    router02,
    router: router02, // the default router, 01 had a minor bug
    routerEventEmitter,
    routerFee: routerFee,
    token0,
    token1,
  }
}
