import {deployWeth} from './functions';

deployWeth()
  .catch(error => {
  console.log(error);
  console.log("Deployment failed 🛑");
  process.exit(1);
});
