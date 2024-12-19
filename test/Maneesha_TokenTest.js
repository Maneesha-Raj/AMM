const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Maneesha_Token Contract", function () {
    let maneeshaToken, owner, addr1, addr2;

    // Deploy the contract before each test
    beforeEach(async function () {
        // Get signers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the contract
        const ManeeshaToken = await ethers.getContractFactory("Maneesha_Token");
        maneeshaToken = await ManeeshaToken.deploy(owner.address); // Pass initial owner
        await maneeshaToken.waitForDeployment(); // Ensure the contract is deployed
    });

    describe("Deployment", function () {
        it("Should deploy with a valid contract address", async function () {
            expect(maneeshaToken.target).to.properAddress; // Verify a valid Ethereum address
        });

        it("Should set the correct token name and symbol", async function () {
            expect(await maneeshaToken.name()).to.equals("Maneesha_Token");
            expect(await maneeshaToken.symbol()).to.equals("MSTK");
        });

        it("Should set the deployer as the initial owner", async function () {
            expect(await maneeshaToken.owner()).to.equals(owner.address);
        });
    });

    describe("Minting", function () {
        it("Should allow the owner to mint tokens", async function () {
            const mintAmount = ethers.parseUnits("100", 18); // 100 tokens with 18 decimals

            // Owner mints tokens to addr1
            await maneeshaToken.mint(addr1.address, mintAmount);

            // Check the balance of addr1
            expect(await maneeshaToken.balanceOf(addr1.address)).to.equal(mintAmount);
        });

        it("Should fail if a non-owner tries to mint tokens", async function () {
            const mintAmount = ethers.parseUnits("100", 18);

            // Attempt to mint tokens from a non-owner account
            await expect(
                maneeshaToken.connect(addr1).mint(addr1.address, mintAmount)
        ).to.be.revertedWithCustomError(maneeshaToken, "OwnableUnauthorizedAccount");
        });
    });

    describe("ERC20 Functionality", function () {
        it("Should allow token transfers between accounts", async function () {
            const mintAmount = ethers.parseUnits("100", 18);
            const transferAmount = ethers.parseUnits("50", 18);

            // Mint tokens to the owner
            await maneeshaToken.mint(owner.address, mintAmount);

            // Transfer tokens from owner to addr1
            await maneeshaToken.transfer(addr1.address, transferAmount);

            // Check balances
            expect(await maneeshaToken.balanceOf(owner.address)).to.equals(mintAmount - transferAmount);
            expect(await maneeshaToken.balanceOf(addr1.address)).to.equals(transferAmount);
        });

        it("Should emit a Transfer event when tokens are transferred", async function () {
            const mintAmount = ethers.parseUnits("100", 18);
            const transferAmount = ethers.parseUnits("50", 18);

            // Mint tokens to the owner
            await maneeshaToken.mint(owner.address, mintAmount);

            // Transfer tokens and check for the event
            await expect(maneeshaToken.transfer(addr1.address, transferAmount))
                .to.emit(maneeshaToken, "Transfer")
                .withArgs(owner.address, addr1.address, transferAmount);
        });

        it("Should fail if sender does not have enough tokens", async function () {
            const transferAmount = ethers.parseUnits("50", 18);

            // addr1 tries to transfer without any tokens
            await expect(
                maneeshaToken.connect(addr1).transfer(addr2.address, transferAmount)
        ).to.be.revertedWithCustomError(maneeshaToken, "ERC20InsufficientBalance");
        });
    });

    describe("Ownership", function () {
        it("Should allow the owner to transfer ownership", async function () {
            // Transfer ownership from owner to addr1
            await maneeshaToken.transferOwnership(addr1.address);

            // Verify the new owner
            expect(await maneeshaToken.owner()).to.equals(addr1.address);
        });

        it("Should restrict ownership transfer to the current owner", async function () {
            // addr1 attempts to transfer ownership
            await expect(
                maneeshaToken.connect(addr1).transferOwnership(addr2.address)
        ).to.be.revertedWithCustomError(maneeshaToken, "OwnableUnauthorizedAccount");
        });
    });

    describe("ERC20 Allowance Functionality", function () {
        it("Should allow an owner to approve a spender", async function () {
            const approveAmount = ethers.parseUnits("50", 18);
    
            // Owner approves addr1 to spend 50 tokens
            await maneeshaToken.approve(addr1.address, approveAmount);
    
            // Check the allowance
            const allowanceAmount = await maneeshaToken.allowance(owner.address, addr1.address);
            expect(allowanceAmount).to.equals(approveAmount);
        });
    
        it("Should allow a spender to transfer approved tokens", async function () {
            const approveAmount = ethers.parseUnits("50", 18);
            const transferAmount = ethers.parseUnits("30", 18);

            await maneeshaToken.mint(owner.address, ethers.parseUnits("100", 18));
    
            // Owner approves addr1 to spend 50 tokens
            await maneeshaToken.approve(addr1.address, approveAmount);
    
            // addr1 transfers 30 tokens from owner to addr2
            await maneeshaToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);
    
            // Check balances after transfer
            expect(await maneeshaToken.balanceOf(owner.address)).to.equals(ethers.parseUnits("70", 18));
            expect(await maneeshaToken.balanceOf(addr2.address)).to.equals(transferAmount);
    
            // Check remaining allowance
            const remainingAllowance = await maneeshaToken.allowance(owner.address, addr1.address);
            expect(remainingAllowance).to.equals(ethers.parseUnits("20", 18)); // 50 - 30 = 20
        });
    
        it("Should fail if spender tries to transfer more than the approved amount", async function () {
            const approveAmount = ethers.parseUnits("50", 18);
            const transferAmount = ethers.parseUnits("60", 18);
    
            // Owner approves addr1 to spend 50 tokens
            await maneeshaToken.approve(addr1.address, approveAmount);
    
            // addr1 tries to transfer more than the approved amount
            await expect(
                maneeshaToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount)
        ).to.be.revertedWithCustomError(maneeshaToken, "AllowanceExceedsError");
        });
    });
    
});
