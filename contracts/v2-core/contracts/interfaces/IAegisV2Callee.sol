pragma solidity >=0.5.0;

interface IAegisV2Callee {
    function aegisV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}
