import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import fixedWindowTwapAbi from "../artifacts//contracts/oracles/FixedWindowTwap.sol/FixedWindowTwap.json";

dotenv.config({path: process.cwd() + '/scripts/process.env'});

export type FixedWindowTwapProps = {
	factory: string;
	tokenA: string;
	tokenB: string;
}

export type ConsultFixedWindowTwapProps = {
  contractAddress: string;
	token: string;
	amountInEth: string;
}

export async function deployRouter(factory:string, weth: string) : Promise<string> {
	if (!factory || !weth) {
		throw new Error('‼️  Missing input function arguments, there are not defined');
	}

	const [deployer] = await ethers.getSigners();
	console.log('ℹ️  Deploying contract with address:', deployer.address);

	const ContractSource = await ethers.getContractFactory('AurorV2Router02');
	const deployedContract = await ContractSource.deploy(factory, weth, process.env.AUROR_TREASURY_ADDRESS!);

	await deployedContract.deployed();

	console.log('😎 Contract deployed at:', deployedContract.address);

  console.log("✅ Deployment ROUTER passed");
  return deployedContract.address;
}

export async function deployWeth() : Promise<string> {
	const [deployer] = await ethers.getSigners();
	console.log('ℹ️  Deploying contract with address:', deployer.address);

	const ContractSource = await ethers.getContractFactory('WETH9');
	const deployedContract = await ContractSource.deploy();

	await deployedContract.deployed();

	console.log('😎 Contract deployed at:', deployedContract.address);

  console.log("✅ Deployment WETH passed");

	return deployedContract.address;
}

export async function deployFixedWindowTwap(props: FixedWindowTwapProps) : Promise<string> {
	const [deployer] = await ethers.getSigners();
	console.log('ℹ️  Deploying contract with address:', deployer.address);

	const ContractSource = await ethers.getContractFactory('FixedWindowTwap');
	const deployedContract = await ContractSource.deploy(props.factory, props.tokenA, props.tokenB);

	await deployedContract.deployed();

	console.log('😎 Contract deployed at:', deployedContract.address);

  console.log("✅ Deployment FixedWindowTwap passed");

	return deployedContract.address;
}

export async function consultFixedWindowTwap(props: ConsultFixedWindowTwapProps) : Promise<void> {
	const [deployer] = await ethers.getSigners();

  const contract = new ethers.Contract(props.contractAddress, fixedWindowTwapAbi.abi, deployer);
  console.log(ethers.utils.formatEther(
    await contract.consult(props.token, ethers.utils.parseEther(props.amountInEth))));
}
