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


const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Maneesha_Token", function () {
  let Maneesha_Token, maneeshaToken, owner, addr1, addr2;

  beforeEach(async function () {
    // Deploy Maneesha_Token
    Maneesha_Token = await ethers.getContractFactory("Maneesha_Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    maneeshaToken = await Maneesha_Token.deploy(owner.address);
    await maneeshaToken.deployed();
  });

  it("Should deploy with correct name and symbol", async function () {
    expect(await maneeshaToken.name()).to.equal("Maneesha_Token");
    expect(await maneeshaToken.symbol()).to.equal("MSTK");
  });

  it("Should allow the owner to mint tokens", async function () {
    const amount = ethers.utils.parseEther("500");
    await maneeshaToken.connect(owner).mint(addr1.address, amount);

    expect(await maneeshaToken.balanceOf(addr1.address)).to.equal(amount);
    expect(await maneeshaToken.totalSupply()).to.equal(amount);
  });

  it("Should revert minting from non-owner", async function () {
    const amount = ethers.utils.parseEther("500");
    await expect(
      maneeshaToken.connect(addr1).mint(addr2.address, amount)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should allow token transfers", async function () {
    const mintAmount = ethers.utils.parseEther("1000");
    const transferAmount = ethers.utils.parseEther("300");

    await maneeshaToken.connect(owner).mint(addr1.address, mintAmount);
    await maneeshaToken.connect(addr1).transfer(addr2.address, transferAmount);

    expect(await maneeshaToken.balanceOf(addr1.address)).to.equal(
      mintAmount.sub(transferAmount)
    );
    expect(await maneeshaToken.balanceOf(addr2.address)).to.equal(transferAmount);
  });

  it("Should revert transfers exceeding balance", async function () {
    const transferAmount = ethers.utils.parseEther("200");
    await expect(
      maneeshaToken.connect(addr1).transfer(addr2.address, transferAmount)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });
});
