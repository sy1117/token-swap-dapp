pragma solidity ^0.5.0;

import './token/ERC20.sol';
import './token/ERC20Detailed.sol';

/**  
* @title BearToken is a basic ERC20 Token  
*/  
contract BananaToken is ERC20, ERC20Detailed{  
  
    uint8 public constant DECIMALS = 2;
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS));

  /**
  * @dev Constructor that gives msg.sender all of existing tokens.
  */
  constructor () public ERC20Detailed("BananaToken", "BNN", DECIMALS) {
      _mint(msg.sender, INITIAL_SUPPLY);
  }

}
