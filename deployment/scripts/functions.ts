import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config({path: process.cwd() + '/scripts/process.env'});

//const adminAddresses = {
//  feeToSetter: process.env.AUROR_MANAGER_ADDRESS!,
//	feeTo: process.env.AUROR_TREASURY_ADDRESS!,
//}

const GAS_LIMIT = 6000000;

export async function deployRouter(factory:string, weth: string) : Promise<string> {
	if (!factory || !weth) {
		throw new Error('‼️  Missing input function arguments, there are not defined');
	}

	const [deployer] = await ethers.getSigners();
	console.log('ℹ️  Deploying contract with address:', deployer.address);

	const ContractSource = await ethers.getContractFactory('AurorV2Router02');
	const deployedContract = await ContractSource.deploy(factory, weth, process.env.AUROR_TREASURY_ADDRESS!, {
		gasLimit: GAS_LIMIT,
	});

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
