import {deployRouter} from './functions';
import {WETH} from './addresses-util';

console.log('🚨 INIT_HASH_CODE changed?');

deployRouter('0x085DC3D7d980A0968260bF83ebF9F581247f8e6c', WETH)
    .catch(error => {
    console.log(error);
    console.log("Deployment failed 🛑");
    process.exit(1);
});

