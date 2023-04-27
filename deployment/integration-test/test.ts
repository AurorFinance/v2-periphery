import { AmmManager } from './test_utils/aurorAmmManager';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

//This integration test module should be used inside the contracts repository's integration test!

dotenv.config({ path: process.cwd() + '/scripts/process.env' });

const manager: AmmManager = new AmmManager(process.env.AUROR_MANAGER_ADDRESS!, process.env.AUROR_MANAGER_KEY!)
export async function test() {
  await manager.deployWrappedGasToken();
  await manager.deployAutomatedMarketMaker();
  await manager.deployExternalAutomatedMarketMaker();

  //save the addresses in tmp file for next steps
  fs.writeFile('integration-test/out/ammAddresses.json',
    JSON.stringify({ "weth": manager.wrappedEthAddress, "router": manager.automatedMarketMakerAddress, "externalRouter": manager.testExternalRouter }),
    error => {
      if (error) throw error;
    });

  console.log('✅ Router integration test passed');
}

test()
  .catch(error => {
    console.log(error);
    console.log("🛑 Router integration test failed");
    process.exit(1);
  });
