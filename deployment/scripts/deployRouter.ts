import {deployRouter} from './functions';
import {WCRO} from './addresses-util';

console.log('🚨 INIT_HASH_CODE changed?');

deployRouter('0x8AB5185c0290D337d8622B91246dBC232CBbDb9B', WCRO)
    .catch(error => {
    console.log(error);
    console.log("Deployment failed 🛑");
    process.exit(1);
});

