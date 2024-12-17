// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("KBA_Token", function () {
//   let KBA_Token, kbaToken, owner, addr1, addr2;

//   beforeEach(async function () {
//     // Deploy the KBA_Token contract
//     KBA_Token = await ethers.getContractFactory("KBA_Token");
//     [owner, addr1, addr2] = await ethers.getSigners();
//     kbaToken = await KBA_Token.deploy(owner.address);
//     await kbaToken.deployed();
//   });

//   it("Should have the correct name and symbol", async function () {
//     expect(await kbaToken.name()).to.equal("KBA_Token");
//     expect(await kbaToken.symbol()).to.equal("KBAT");
//   });

//   it("Should allow the owner to mint tokens", async function () {
//     const amount = ethers.utils.parseEther("1000"); // 1000 tokens
//     await kbaToken.connect(owner).mint(addr1.address, amount);

//     expect(await kbaToken.totalSupply()).to.equal(amount);
//     expect(await kbaToken.balanceOf(addr1.address)).to.equal(amount);
//   });

//   it("Should revert if a non-owner tries to mint tokens", async function () {
//     const amount = ethers.utils.parseEther("1000"); // 1000 tokens
//     await expect(
//       kbaToken.connect(addr1).mint(addr2.address, amount)
//     ).to.be.revertedWith("Ownable: caller is not the owner");
//   });

//   it("Should allow token transfers", async function () {
//     const mintAmount = ethers.utils.parseEther("1000");
//     const transferAmount = ethers.utils.parseEther("100");

//     // Mint tokens to addr1
//     await kbaToken.connect(owner).mint(addr1.address, mintAmount);

//     // Transfer tokens from addr1 to addr2
//     await kbaToken.connect(addr1).transfer(addr2.address, transferAmount);

//     expect(await kbaToken.balanceOf(addr1.address)).to.equal(
//       mintAmount.sub(transferAmount)
//     );
//     expect(await kbaToken.balanceOf(addr2.address)).to.equal(transferAmount);
//   });

//   it("Should revert transfers exceeding balance", async function () {
//     const transferAmount = ethers.utils.parseEther("100");

//     // addr1 has no tokens initially
//     await expect(
//       kbaToken.connect(addr1).transfer(addr2.address, transferAmount)
//     ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
//   });

//   it("Should allow token approvals and transfers via transferFrom", async function () {
//     const mintAmount = ethers.utils.parseEther("500");
//     const approveAmount = ethers.utils.parseEther("200");
//     const transferAmount = ethers.utils.parseEther("150");

//     // Mint tokens to addr1
//     await kbaToken.connect(owner).mint(addr1.address, mintAmount);

//     // Approve addr2 to spend tokens on behalf of addr1
//     await kbaToken.connect(addr1).approve(addr2.address, approveAmount);

//     expect(await kbaToken.allowance(addr1.address, addr2.address)).to.equal(
//       approveAmount
//     );

//     // addr2 transfers tokens from addr1 to itself
//     await kbaToken.connect(addr2).transferFrom(
//       addr1.address,
//       addr2.address,
//       transferAmount
//     );

//     expect(await kbaToken.balanceOf(addr1.address)).to.equal(
//       mintAmount.sub(transferAmount)
//     );
//     expect(await kbaToken.balanceOf(addr2.address)).to.equal(transferAmount);
//   });

//   it("Should revert transferFrom if allowance is insufficient", async function () {
//     const mintAmount = ethers.utils.parseEther("500");
//     const transferAmount = ethers.utils.parseEther("300");

//     // Mint tokens to addr1
//     await kbaToken.connect(owner).mint(addr1.address, mintAmount);

//     // Approve addr2 to spend a smaller amount
//     await kbaToken.connect(addr1).approve(addr2.address, ethers.utils.parseEther("100"));

//     await expect(
//       kbaToken.connect(addr2).transferFrom(
//         addr1.address,
//         addr2.address,
//         transferAmount
//       )
//     ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
//   });

//   it("Should allow the owner to mint tokens and update total supply", async function () {
//     const initialSupply = ethers.utils.parseEther("1000");
//     const newMint = ethers.utils.parseEther("500");

//     await kbaToken.connect(owner).mint(owner.address, initialSupply);
//     expect(await kbaToken.totalSupply()).to.equal(initialSupply);

//     await kbaToken.connect(owner).mint(addr1.address, newMint);
//     expect(await kbaToken.totalSupply()).to.equal(initialSupply.add(newMint));
//   });
// 


// -----------------------------------------------------------------------------------------------


// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("KBA_Token", function () {
//   let KBA_Token, kbaToken, owner, addr1, addr2;

//   beforeEach(async function () {
//     // Deploy KBA_Token
//     KBA_Token = await ethers.getContractFactory("KBA_Token");
//     [owner, addr1, addr2] = await ethers.getSigners();
//     kbaToken = await KBA_Token.deploy(owner.address);
//     await kbaToken.deployed();
//   });

//   it("Should deploy with correct name and symbol", async function () {
//     expect(await kbaToken.name()).to.equal("KBA_Token");
//     expect(await kbaToken.symbol()).to.equal("KBAT");
//   });

//   it("Should allow the owner to mint tokens", async function () {
//     const amount = ethers.utils.parseEther("1000");
//     await kbaToken.connect(owner).mint(addr1.address, amount);

//     expect(await kbaToken.balanceOf(addr1.address)).to.equal(amount);
//     expect(await kbaToken.totalSupply()).to.equal(amount);
//   });

//   it("Should revert minting from non-owner", async function () {
//     const amount = ethers.utils.parseEther("1000");
//     await expect(
//       kbaToken.connect(addr1).mint(addr2.address, amount)
//     ).to.be.revertedWith("Ownable: caller is not the owner");
//   });

//   it("Should allow token transfers", async function () {
//     const mintAmount = ethers.utils.parseEther("1000");
//     const transferAmount = ethers.utils.parseEther("200");

//     await kbaToken.connect(owner).mint(addr1.address, mintAmount);
//     await kbaToken.connect(addr1).transfer(addr2.address, transferAmount);

//     expect(await kbaToken.balanceOf(addr1.address)).to.equal(
//       mintAmount.sub(transferAmount)
//     );
//     expect(await kbaToken.balanceOf(addr2.address)).to.equal(transferAmount);
//   });

//   it("Should revert transfers exceeding balance", async function () {
//     const transferAmount = ethers.utils.parseEther("200");
//     await expect(
//       kbaToken.connect(addr1).transfer(addr2.address, transferAmount)
//     ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
//   });
// });


// -----------------------------------------------------------/\/\/\/\/\/\/\/\\/\/\/\/\/\/\/\---------------------------------------

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("KBA_Token", function () {
//     let KBA_Token;
//     let kbaToken;
//     let owner;
//     let addr1;
//     let addr2;

//     beforeEach(async function () {
//       [owner, addr1, addr2] = await ethers.getSigners(); // Get signers
//       const KBA_Token = await ethers.getContractFactory("KBA_Token"); // Contract factory
//       kbaToken = await KBA_Token.deploy(owner.address); // Deploy with initial owner
//       await kbaToken.deployed(); // Ensure deployment completes
//   });
  

//     // beforeEach(async function () {
//     //     // Get the signers
//     //     [owner, addr1, addr2] = await ethers.getSigners();

//     //     // Deploy the KBA_Token contract with the required constructor argument
//     //     KBA_Token = await ethers.getContractFactory("KBA_Token");
//     //     kbaToken = await KBA_Token.deploy(owner.address); // Pass the initialOwner
//     //     await kbaToken.deployed();
//     // });

//     describe("Deployment", function () {
//         it("Should set the correct name and symbol", async function () {
//             expect(await kbaToken.name()).to.equals("KBA_Token");
//             expect(await kbaToken.symbol()).to.equals("KBAT");
//         });

//         it("Should set the deployer as the initial owner", async function () {
//             expect(await kbaToken.owner()).to.equals(owner.address);
//         });
//     });

//     describe("Minting", function () {
//         it("Should allow the owner to mint tokens", async function () {
//             const amount = ethers.parseUnits("1000",18); // 1000 tokens
//             await kbaToken.connect(owner).mint(addr1.address, amount);

//             const balance = await kbaToken.balanceOf(addr1.address);
//             expect(balance).to.equals(amount);
//         });

//         it("Should not allow non-owners to mint tokens", async function () {
//             const amount = ethers.parseUnits("1000",18);
//             await expect(
//                 kbaToken.connect(addr1).mint(addr1.address, amount)
//             ).to.be.revertedWith("Ownable: caller is not the owner");
//         });
//     });

//     describe("Ownership", function () {
//         it("Should allow the owner to transfer ownership", async function () {
//             await kbaToken.connect(owner).transferOwnership(addr1.address);
//             expect(await kbaToken.owner()).to.equals(addr1.address);
//         });

//         it("Should prevent non-owners from transferring ownership", async function () {
//             await expect(
//                 kbaToken.connect(addr1).transferOwnership(addr2.address)
//             ).to.be.revertedWith("Ownable: caller is not the owner");
//         });
//     });

//     describe("ERC20 Standard Tests", function () {
//         it("Should return the correct decimals", async function () {
//             expect(await kbaToken.decimals()).to.equals(18);
//         });

//         it("Should allow token transfers", async function () {
//             const amount = ethers.parseUnits("1000",18);
//             await kbaToken.connect(owner).mint(owner.address, amount);

//             // Transfer tokens from owner to addr1
//             await kbaToken.connect(owner).transfer(addr1.address, amount);

//             const ownerBalance = await kbaToken.balanceOf(owner.address);
//             const addr1Balance = await kbaToken.balanceOf(addr1.address);

//             expect(ownerBalance).to.equals(0);
//             expect(addr1Balance).to.equals(amount);
//         });

//         it("Should not allow transferring more tokens than balance", async function () {
//             const amount = ethers.parseUnits("1000",18);
//             await expect(
//                 kbaToken.connect(addr1).transfer(addr2.address, amount)
//             ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
//         });
//     });
// });


// --------------------------------------------------------------------




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
            // ).to.be.revertedWith("Ownable: caller is not the owner");
        ).to.be.revertedWithCustomError(kbaToken, "OwnableUnauthorizedAccount");
        });
    });

    describe("ERC20 Functionality", function () {
        // it("Should allow token transfers between accounts", async function () {
        //     const mintAmount = ethers.parseUnits("100",18);
        //     const transferAmount = ethers.parseUnits("50",18);

        //     // Mint tokens to owner
        //     await kbaToken.mint(owner.address, mintAmount);

        //     // Transfer tokens from owner to addr1
        //     await kbaToken.transfer(addr1.address, transferAmount);
            
        //     // Check balances
        //     expect(await kbaToken.balanceOf(owner.address)).to.equals(
        //         mintAmount.sub(transferAmount)
        //     );
        //     expect(await kbaToken.balanceOf(addr1.address)).to.equals(
        //         transferAmount
        //     );
        // });

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
            // ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
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
    
        // it("Should allow the spender to transfer approved tokens", async function () {
        //     const approveAmount = ethers.parseUnits("50", 18);
        //     const transferAmount = ethers.parseUnits("30", 18);
            
        //     // Owner approves addr1 to spend 50 tokens
        //     await kbaToken.approve(addr1.address, approveAmount);
            
        //     // addr1 transfers 30 tokens from the owner to addr2
        //     await kbaToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);
            
        //     // Check balances after the transfer
        //     expect(await kbaToken.balanceOf(owner.address)).to.equals(ethers.parseUnits("70", 18));
        //     expect(await kbaToken.balanceOf(addr2.address)).to.equals(transferAmount);
        // });

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
        
    
        // it("Should fail if spender tries to transfer more than the approved amount", async function () {
        //     const approveAmount = ethers.parseUnits("50", 18);
        //     const transferAmount = ethers.parseUnits("60", 18);
            
        //     // Owner approves addr1 to spend 50 tokens
        //     await kbaToken.approve(addr1.address, approveAmount);
            
        //     // addr1 tries to transfer more than the approved amount
        //     await expect(
        //         kbaToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount)
        //     // ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
        // ).to.be.revertedWithCustomError(kbaToken, "AllowanceExceedsError"); // Update with your custom error
        // });

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

