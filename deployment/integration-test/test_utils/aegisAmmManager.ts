import {deployWeth} from '../../scripts/functions';
import {deployRouter} from '../../scripts/functions';
import factoryOut  from '../../../../v2-core/deployment/integration-test/out/ammAddresses.json';

export class AmmManager {
	public address: string;
	private key: string;
	public automatedMarketMakerAddress: string;
	public wrappedEthAddress: string;

	constructor(_address: string, _key: string) {
		this.address = _address;
		this.key = _key;
		this.automatedMarketMakerAddress = '';
		this.wrappedEthAddress = '';
	}

	public deployWrappedGasToken = async() => {
		this.wrappedEthAddress = await deployWeth(); 
	}

	public deployAutomatedMarketMaker = async() => {
		this.automatedMarketMakerAddress = await deployRouter(factoryOut.factory, this.wrappedEthAddress);
	} 
}