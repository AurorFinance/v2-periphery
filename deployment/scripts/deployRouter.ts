import {deployRouter} from './functions';
import {WCRO} from './addresses-util';

console.log('🚨 INIT_HASH_CODE changed?');

deployRouter('0xaBB0509E666f30C7bcd7e0120BB97bbc5565F9F8', WCRO)
    .catch(error => {
    console.log(error);
    console.log("Deployment failed 🛑");
    process.exit(1);
});

