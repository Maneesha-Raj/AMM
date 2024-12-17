// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Maneesha_Token is ERC20, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("Maneesha_Token", "MSTK")
        Ownable(initialOwner)
        ERC20Permit("Maneesha_Token")
    {}

    // Define the custom error
    error AllowanceExceedsError(address spender, uint256 amount);

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

     // Override transferFrom to check the allowance
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        uint256 allowanceAmount = allowance(sender, msg.sender); // Get the allowance

        // If the amount exceeds the allowance, revert with the custom error
        if (amount > allowanceAmount) {
            revert AllowanceExceedsError(msg.sender, amount); // Custom error when allowance is exceeded
        }

        // Perform the transfer and update allowance
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, allowanceAmount - amount); // Update allowance
        return true;
    }
}
