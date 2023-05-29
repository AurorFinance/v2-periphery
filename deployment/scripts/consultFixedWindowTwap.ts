import {consultFixedWindowTwap, ConsultFixedWindowTwapProps} from './functions';

const props: ConsultFixedWindowTwapProps = {
  contractAddress: "0x7F35aF99d2FdD8bf06C03e42355d514484F41C41",
  token: "0x394DE1904917CB7eeBec13BB15A5A85d861Dd984",
  amountInEth: "1"
}

consultFixedWindowTwap(props)
  .catch(error => {
  console.log(error);
  console.log("Deployment failed 🛑");
  process.exit(1);
});
