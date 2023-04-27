pragma solidity =0.6.6;

import './libraries/SafeMath.sol';
import './openzeppelin/Ownable.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

contract AurorRouterFee is Ownable {
    using SafeMath for uint256;

    address public treasury;
	uint constant FEE_AMOUNT = 3;
	uint constant MAX_FEE_AMOUNT = 1000;

    constructor(address _treasury) public {
		require(_treasury != address(0), "Auror Router Fee: INVALID");
        treasury = _treasury;
    }

    function setTreasury(address _treasury) external onlyOwner {
		require(_treasury != address(0), "Auror Router Fee: INVALID");
		if (_treasury != treasury) {
        	treasury = _treasury;
		}
    }

	function getFeeAmount(uint256 _amount, uint pathMultiplier) internal pure returns (uint fee) {
        uint256 numerator = _amount.mul(FEE_AMOUNT).mul(pathMultiplier);
        uint256 denominator = MAX_FEE_AMOUNT;
        fee = numerator / denominator;
    }

    function collectFee(address token, address from, uint256 _amount) internal {
        TransferHelper.safeTransferFrom(token, from, treasury, _amount);
    }

    function collectFeeETH(uint256 _amount) internal {
        TransferHelper.safeTransferETH(treasury, _amount);
    }
}