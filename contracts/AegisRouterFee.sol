pragma solidity =0.6.6;

import './openzeppelin/Ownable.sol';

contract AegisRouterFee is Ownable {
    address public treasury;
	uint constant FEE_AMOUNT = 3;
	uint constant MAX_FEE_AMOUNT = 1000;

    constructor(address _treasury) public {
		require(_treasury != address(0), "Aegis Router Fee: INVALID");
        treasury = _treasury;
    }

    function setTreasury(address _treasury) external onlyOwner {
		require(_treasury != address(0), "Aegis Router Fee: INVALID");
		if (_treasury != treasury) {
        	treasury = _treasury;
		}
    }
}