// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Maneesha_Token", function () {
//   let Maneesha_Token, maneeshaToken, owner, addr1, addr2;

//   beforeEach(async function () {
//     // Deploy the Maneesha_Token contract
//     Maneesha_Token = await ethers.getContractFactory("Maneesha_Token");
//     [owner, addr1, addr2] = await ethers.getSigners();
//     maneeshaToken = await Maneesha_Token.deploy(owner.address);
//     await maneeshaToken.deployed();
//   });

//   it("Should have the correct name and symbol", async function () {
//     expect(await maneeshaToken.name()).to.equal("Maneesha_Token");
//     expect(await maneeshaToken.symbol()).to.equal("MSTK");
//   });

//   it("Should allow the owner to mint tokens", async function () {
//     const amount = ethers.utils.parseEther("1000"); // 1000 tokens
//     await maneeshaToken.connect(owner).mint(addr1.address, amount);

//     expect(await maneeshaToken.totalSupply()).to.equal(amount);
//     expect(await maneeshaToken.balanceOf(addr1.address)).to.equal(amount);
//   });

//   it("Should revert if a non-owner tries to mint tokens", async function () {
//     const amount = ethers.utils.parseEther("1000"); // 1000 tokens
//     await expect(
//       maneeshaToken.connect(addr1).mint(addr2.address, amount)
//     ).to.be.revertedWith("Ownable: caller is not the owner");
//   });

//   it("Should allow token transfers", async function () {
//     const mintAmount = ethers.utils.parseEther("1000");
//     const transferAmount = ethers.utils.parseEther("100");

//     // Mint tokens to addr1
//     await maneeshaToken.connect(owner).mint(addr1.address, mintAmount);

//     // Transfer tokens from addr1 to addr2
//     await maneeshaToken.connect(addr1).transfer(addr2.address, transferAmount);

//     expect(await maneeshaToken.balanceOf(addr1.address)).to.equal(
//       mintAmount.sub(transferAmount)
//     );
//     expect(await maneeshaToken.balanceOf(addr2.address)).to.equal(transferAmount);
//   });

//   it("Should revert transfers exceeding balance", async function () {
//     const transferAmount = ethers.utils.parseEther("100");

//     // addr1 has no tokens initially
//     await expect(
//       maneeshaToken.connect(addr1).transfer(addr2.address, transferAmount)
//     ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
//   });

//   it("Should allow token approvals and transfers via transferFrom", async function () {
//     const mintAmount = ethers.utils.parseEther("500");
//     const approveAmount = ethers.utils.parseEther("200");
//     const transferAmount = ethers.utils.parseEther("150");

//     // Mint tokens to addr1
//     await maneeshaToken.connect(owner).mint(addr1.address, mintAmount);

//     // Approve addr2 to spend tokens on behalf of addr1
//     await maneeshaToken.connect(addr1).approve(addr2.address, approveAmount);

//     expect(await maneeshaToken.allowance(addr1.address, addr2.address)).to.equal(
//       approveAmount
//     );

//     // addr2 transfers tokens from addr1 to itself
//     await maneeshaToken.connect(addr2).transferFrom(
//       addr1.address,
//       addr2.address,
//       transferAmount
//     );

//     expect(await maneeshaToken.balanceOf(addr1.address)).to.equal(
//       mintAmount.sub(transferAmount)
//     );
//     expect(await maneeshaToken.balanceOf(addr2.address)).to.equal(transferAmount);
//   });

//   it("Should revert transferFrom if allowance is insufficient", async function () {
//     const mintAmount = ethers.utils.parseEther("500");
//     const transferAmount = ethers.utils.parseEther("300");

//     // Mint tokens to addr1
//     await maneeshaToken.connect(owner).mint(addr1.address, mintAmount);

//     // Approve addr2 to spend a smaller amount
//     await maneeshaToken.connect(addr1).approve(addr2.address, ethers.utils.parseEther("100"));

//     await expect(
//       maneeshaToken.connect(addr2).transferFrom(
//         addr1.address,
//         addr2.address,
//         transferAmount
//       )
//     ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
//   });

//   it("Should allow the owner to mint tokens and update total supply", async function () {
//     const initialSupply = ethers.utils.parseEther("1000");
//     const newMint = ethers.utils.parseEther("500");

//     await maneeshaToken.connect(owner).mint(owner.address, initialSupply);
//     expect(await maneeshaToken.totalSupply()).to.equal(initialSupply);

//     await maneeshaToken.connect(owner).mint(addr1.address, newMint);
//     expect(await maneeshaToken.totalSupply()).to.equal(initialSupply.add(newMint));
//   });
// });


// --------------------------------------------------------------------------------------------------------------------------

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Maneesha_Token", function () {
//   let Maneesha_Token, maneeshaToken, owner, addr1, addr2;

//   beforeEach(async function () {
//     // Deploy Maneesha_Token
//     Maneesha_Token = await ethers.getContractFactory("Maneesha_Token");
//     [owner, addr1, addr2] = await ethers.getSigners();
//     maneeshaToken = await Maneesha_Token.deploy(owner.address);
//     await maneeshaToken.deployed();
//   });

//   it("Should deploy with correct name and symbol", async function () {
//     expect(await maneeshaToken.name()).to.equal("Maneesha_Token");
//     expect(await maneeshaToken.symbol()).to.equal("MSTK");
//   });

//   it("Should allow the owner to mint tokens", async function () {
//     const amount = ethers.utils.parseEther("500");
//     await maneeshaToken.connect(owner).mint(addr1.address, amount);

//     expect(await maneeshaToken.balanceOf(addr1.address)).to.equal(amount);
//     expect(await maneeshaToken.totalSupply()).to.equal(amount);
//   });

//   it("Should revert minting from non-owner", async function () {
//     const amount = ethers.utils.parseEther("500");
//     await expect(
//       maneeshaToken.connect(addr1).mint(addr2.address, amount)
//     ).to.be.revertedWith("Ownable: caller is not the owner");
//   });

//   it("Should allow token transfers", async function () {
//     const mintAmount = ethers.utils.parseEther("1000");
//     const transferAmount = ethers.utils.parseEther("300");

//     await maneeshaToken.connect(owner).mint(addr1.address, mintAmount);
//     await maneeshaToken.connect(addr1).transfer(addr2.address, transferAmount);

//     expect(await maneeshaToken.balanceOf(addr1.address)).to.equal(
//       mintAmount.sub(transferAmount)
//     );
//     expect(await maneeshaToken.balanceOf(addr2.address)).to.equal(transferAmount);
//   });

//   it("Should revert transfers exceeding balance", async function () {
//     const transferAmount = ethers.utils.parseEther("200");
//     await expect(
//       maneeshaToken.connect(addr1).transfer(addr2.address, transferAmount)
//     ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
//   });
// });


// --------------------------------------------------/\/\/\/\/\/\/\/\//\/\/\/\/\\/-----------------------------------------

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Maneesha_Token", function () {
//     let Maneesha_Token;
//     let maneeshaToken;
//     let owner;
//     let addr1;
//     let addr2;

//     beforeEach(async function () {
//       [owner, addr1, addr2] = await ethers.getSigners(); // Get signers
//       const Maneesha_Token = await ethers.getContractFactory("Maneesha_Token"); // Contract factory
//       maneeshaToken = await Maneesha_Token.deploy(owner.address); // Deploy with initial owner
//       await maneeshaToken.deployed(); // Ensure deployment completes
//   });
  

//     // beforeEach(async function () {
//     //     // Get the signers
//     //     [owner, addr1, addr2] = await ethers.getSigners();

//     //     // Deploy the Maneesha_Token contract with the required constructor argument
//     //     Maneesha_Token = await ethers.getContractFactory("Maneesha_Token");
//     //     maneeshaToken = await Maneesha_Token.deploy(owner.address); // Pass the initialOwner
//     //     await maneeshaToken.deployed();
//     // });
//     describe("Deployment", function () {
//       it("Should set the correct name and symbol", async function () {
//           expect(await maneeshaToken.name()).to.equal("Maneesha_Token");
//           expect(await maneeshaToken.symbol()).to.equal("MSTK");
//       });
  
//       it("Should set the deployer as the initial owner", async function () {
//           expect(await maneeshaToken.owner()).to.equal(owner.address);
//       });
//   });
  
//     describe("Minting", function () {
//         it("Should allow the owner to mint tokens", async function () {
//             const amount = ethers.utils.parseEther("1000"); // 1000 tokens
//             await maneeshaToken.connect(owner).mint(addr1.address, amount);

//             const balance = await maneeshaToken.balanceOf(addr1.address);
//             expect(balance).to.equal(amount);
//         });

//         it("Should not allow non-owners to mint tokens", async function () {
//             const amount = ethers.utils.parseEther("1000");
//             await expect(
//                 maneeshaToken.connect(addr1).mint(addr1.address, amount)
//             ).to.be.revertedWith("Ownable: caller is not the owner");
//         });
//     });

//     describe("Ownership", function () {
//         it("Should allow the owner to transfer ownership", async function () {
//             await maneeshaToken.connect(owner).transferOwnership(addr1.address);
//             expect(await maneeshaToken.owner()).to.equal(addr1.address);
//         });

//         it("Should prevent non-owners from transferring ownership", async function () {
//             await expect(
//                 maneeshaToken.connect(addr1).transferOwnership(addr2.address)
//             ).to.be.revertedWith("Ownable: caller is not the owner");
//         });
//     });

//     describe("ERC20 Standard Tests", function () {
//         it("Should return the correct decimals", async function () {
//             expect(await maneeshaToken.decimals()).to.equal(18);
//         });

//         it("Should allow token transfers", async function () {
//             const amount = ethers.utils.parseEther("1000");
//             await maneeshaToken.connect(owner).mint(owner.address, amount);

//             // Transfer tokens from owner to addr1
//             await maneeshaToken.connect(owner).transfer(addr1.address, amount);

//             const ownerBalance = await maneeshaToken.balanceOf(owner.address);
//             const addr1Balance = await maneeshaToken.balanceOf(addr1.address);

//             expect(ownerBalance).to.equal(0);
//             expect(addr1Balance).to.equal(amount);
//         });

//         it("Should not allow transferring more tokens than balance", async function () {
//             const amount = ethers.utils.parseEther("1000");
//             await expect(
//                 maneeshaToken.connect(addr1).transfer(addr2.address, amount)
//             ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
//         });
//     });
// });









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
            expect(kbaToken.address).to.properAddress; // Check for a valid Ethereum address
        });

        it("Should set the correct name and symbol", async function () {
            expect(await kbaToken.name()).to.equal("KBA_Token");
            expect(await kbaToken.symbol()).to.equal("KBT"); // Update symbol if it's different
        });

        it("Should set the deployer as the initial owner", async function () {
            expect(await kbaToken.owner()).to.equal(owner.address);
        });
    });

    describe("Minting", function () {
        it("Should allow the owner to mint tokens", async function () {
            const mintAmount = ethers.utils.parseEther("100"); // 100 tokens
            await kbaToken.mint(addr1.address, mintAmount);

            // Check the balance of addr1
            expect(await kbaToken.balanceOf(addr1.address)).to.equal(mintAmount);
        });

        it("Should fail if a non-owner tries to mint tokens", async function () {
            const mintAmount = ethers.utils.parseEther("100");

            // Attempt to mint from a non-owner account
            await expect(
                kbaToken.connect(addr1).mint(addr1.address, mintAmount)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("ERC20 Functionality", function () {
        it("Should allow token transfers between accounts", async function () {
            const mintAmount = ethers.utils.parseEther("100");
            const transferAmount = ethers.utils.parseEther("50");

            // Mint tokens to owner
            await kbaToken.mint(owner.address, mintAmount);

            // Transfer tokens from owner to addr1
            await kbaToken.transfer(addr1.address, transferAmount);

            // Check balances
            expect(await kbaToken.balanceOf(owner.address)).to.equal(
                mintAmount.sub(transferAmount)
            );
            expect(await kbaToken.balanceOf(addr1.address)).to.equal(
                transferAmount
            );
        });

        it("Should emit a Transfer event when tokens are transferred", async function () {
            const mintAmount = ethers.utils.parseEther("100");
            const transferAmount = ethers.utils.parseEther("50");

            // Mint tokens to owner
            await kbaToken.mint(owner.address, mintAmount);

            // Transfer tokens and check the event
            await expect(kbaToken.transfer(addr1.address, transferAmount))
                .to.emit(kbaToken, "Transfer")
                .withArgs(owner.address, addr1.address, transferAmount);
        });

        it("Should fail if sender does not have enough tokens", async function () {
            const transferAmount = ethers.utils.parseEther("50");

            // addr1 tries to transfer tokens without any balance
            await expect(
                kbaToken.connect(addr1).transfer(addr2.address, transferAmount)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
        });
    });
});
