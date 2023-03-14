import { deployWeth } from '../../scripts/functions';
import { deployRouter } from '../../scripts/functions';
//available in integration test only
import factoryOut from '../../../../v2-core/deployment/integration-test/out/ammAddresses.json';

export class AmmManager {
	public address: string;
	private key: string;
	public automatedMarketMakerAddress: string;
	public wrappedEthAddress: string;
	public testExternalRouter: string;

	constructor(_address: string, _key: string) {
		this.address = _address;
		this.key = _key;
		this.automatedMarketMakerAddress = '';
		this.wrappedEthAddress = '';
		this.testExternalRouter = "";
	}

	public deployWrappedGasToken = async () => {
		this.wrappedEthAddress = await deployWeth();
	}

	public deployAutomatedMarketMaker = async () => {
		this.automatedMarketMakerAddress = await deployRouter(factoryOut.factory, this.wrappedEthAddress);
	}

	public deployExternalAutomatedMarketMaker = async () => {
		this.testExternalRouter = await deployRouter(factoryOut.factory, this.wrappedEthAddress);
	}
}