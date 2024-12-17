// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract KBA_Token is ERC20, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("KBA_Token", "KBAT")
        Ownable(initialOwner)
        ERC20Permit("KBA_Token")
    {}


    // Define the custom error for allowance exceedance
    error AllowanceExceedsError(address spender, uint256 amount);

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Override transferFrom to include custom error for allowance
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        uint256 allowanceAmount = allowance(sender, msg.sender); // Get the allowance

        // Check if the transfer amount exceeds the allowance
        if (amount > allowanceAmount) {
            revert AllowanceExceedsError(msg.sender, amount); // Revert with custom error
        }

        // Continue with the standard transfer process
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, allowanceAmount - amount); // Update allowance
        return true;
    }
}
