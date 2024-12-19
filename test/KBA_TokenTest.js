const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KBA_Token Contract", function () {
    let kbaToken, owner, addr1, addr2;

    // Deploy the contract before each test
    beforeEach(async function () {
        // Get signers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the contract
        const KbaToken = await ethers.getContractFactory("KBA_Token");
        kbaToken = await KbaToken.deploy(owner.address); // Pass initial owner to constructor
    });

    describe("Deployment", function () {
        it("Should deploy with a valid contract address", async function () {
          console.log(kbaToken.target);
          
            expect(kbaToken.target).to.properAddress; // Check for a valid Ethereum address
        });

        it("Should set the correct name and symbol", async function () {
          console.log(await kbaToken.name());
          
            expect(await kbaToken.name()).to.equals("KBA_Token");
            expect(await kbaToken.symbol()).to.equals("KBAT"); // Update symbol if it's different
        });

        it("Should set the deployer as the initial owner", async function () {
            expect(await kbaToken.owner()).to.equals(owner.address);
        });
    });

    describe("Minting", function () {
        it("Should allow the owner to mint tokens", async function () {
            const mintAmount = ethers.parseUnits("100",18); // 100 tokens
            await kbaToken.mint(addr1.address, mintAmount);

            // Check the balance of addr1
            expect(await kbaToken.balanceOf(addr1.address)).to.equals(mintAmount);
        });

        it("Should fail if a non-owner tries to mint tokens", async function () {
            const mintAmount = ethers.parseUnits("100",18);

            // Attempt to mint from a non-owner account
            await expect(
                kbaToken.connect(addr1).mint(addr1.address, mintAmount)
        ).to.be.revertedWithCustomError(kbaToken, "OwnableUnauthorizedAccount");
        });
    });

    describe("ERC20 Functionality", function () {
        
        it("Should allow token transfers between accounts", async function () {
            const mintAmount = ethers.parseUnits("100", 18); // BigInt
            const transferAmount = ethers.parseUnits("50", 18); // BigInt
        
            // Mint tokens to owner
            await kbaToken.mint(owner.address, mintAmount);
        
            // Transfer tokens from owner to addr1
            await kbaToken.transfer(addr1.address, transferAmount);
        
            // Check balances
            expect(await kbaToken.balanceOf(owner.address)).to.equals(
                mintAmount - transferAmount // Use BigInt arithmetic
            );
            expect(await kbaToken.balanceOf(addr1.address)).to.equals(
                transferAmount
            );
        });

        it("Should emit a Transfer event when tokens are transferred", async function () {
            const mintAmount = ethers.parseUnits("100",18);
            const transferAmount = ethers.parseUnits("50",18);

            // Mint tokens to owner
            await kbaToken.mint(owner.address, mintAmount);

            // Transfer tokens and check the event
            await expect(kbaToken.transfer(addr1.address, transferAmount))
                .to.emit(kbaToken, "Transfer")
                .withArgs(owner.address, addr1.address, transferAmount);
        });

        it("Should fail if sender does not have enough tokens", async function () {
            const transferAmount = ethers.parseUnits("50",18);

            // addr1 tries to transfer tokens without any balance
            await expect(
                kbaToken.connect(addr1).transfer(addr2.address, transferAmount)
        ).to.be.revertedWithCustomError(kbaToken, "ERC20InsufficientBalance");
        });
    });

    describe("Allowance Functionality", function () {
        it("Should allow the owner to approve a spender", async function () {
            const approveAmount = ethers.parseUnits("50", 18);
            
            // Owner approves addr1 to spend 50 tokens
            await kbaToken.approve(addr1.address, approveAmount);
            
            // Check the allowance
            const allowance = await kbaToken.allowance(owner.address, addr1.address);
            expect(allowance).to.equals(approveAmount);
        });

        it("Should allow the spender to transfer approved tokens", async function () {
            const approveAmount = ethers.parseUnits("50", 18);
            const transferAmount = ethers.parseUnits("30", 18);
            
            // Mint tokens to the owner so they have enough balance to approve
            await kbaToken.mint(owner.address, ethers.parseUnits("100", 18));
        
            // Owner approves addr1 to spend 50 tokens
            await kbaToken.approve(addr1.address, approveAmount);
            
            // addr1 transfers 30 tokens from the owner to addr2
            await kbaToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);
            
            // Check balances after the transfer
            expect(await kbaToken.balanceOf(owner.address)).to.equals(ethers.parseUnits("70", 18)); // 100 - 30
            expect(await kbaToken.balanceOf(addr2.address)).to.equals(transferAmount);
        });
        
        it("Should fail if spender tries to transfer more than the approved amount", async function () {
            const approveAmount = ethers.parseUnits("50", 18);
            const transferAmount = ethers.parseUnits("60", 18);
            
            // Owner approves addr1 to spend 50 tokens
            await kbaToken.approve(addr1.address, approveAmount);
            
            // addr1 tries to transfer more than the approved amount
            await expect(
                kbaToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount)
            ).to.be.revertedWithCustomError(kbaToken, "AllowanceExceedsError");
        });
        
    
        it("Should allow allowance to be updated", async function () {
            const approveAmount = ethers.parseUnits("50", 18);
            const updatedApproveAmount = ethers.parseUnits("100", 18);
            
            // Owner approves addr1 to spend 50 tokens
            await kbaToken.approve(addr1.address, approveAmount);
            
            // Owner updates the allowance to 100 tokens
            await kbaToken.approve(addr1.address, updatedApproveAmount);
            
            // Check the updated allowance
            const allowance = await kbaToken.allowance(owner.address, addr1.address);
            expect(allowance).to.equals(updatedApproveAmount);
        });
    });
});

