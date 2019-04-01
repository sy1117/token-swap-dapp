pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';

// import './token/ERC20.sol';
// import './token/ERC20Detailed.sol';

/**  
* @title BearToken is a basic ERC20 Token  
*/  
contract AppleToken is ERC20, ERC20Detailed {  
  uint8 public constant DECIMALS = 2;
  uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS));

  constructor() public ERC20Detailed("AppleToken", "AP", DECIMALS){
    _mint(msg.sender, INITIAL_SUPPLY);
  }
}

