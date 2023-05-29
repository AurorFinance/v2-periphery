import {FixedWindowTwapProps, deployFixedWindowTwap} from './functions';

const props: FixedWindowTwapProps = {
  factory: "0x085DC3D7d980A0968260bF83ebF9F581247f8e6c",
  tokenA: "0xCc7e71eefFce95DC454546dC54F17908CFbAfd5D",
  tokenB: "0x394DE1904917CB7eeBec13BB15A5A85d861Dd984"
}

deployFixedWindowTwap(props)
  .catch(error => {
  console.log(error);
  console.log("Deployment failed 🛑");
  process.exit(1);
});
