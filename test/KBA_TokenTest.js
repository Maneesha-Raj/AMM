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
// });


const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KBA_Token", function () {
  let KBA_Token, kbaToken, owner, addr1, addr2;

  beforeEach(async function () {
    // Deploy KBA_Token
    KBA_Token = await ethers.getContractFactory("KBA_Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    kbaToken = await KBA_Token.deploy(owner.address);
    await kbaToken.deployed();
  });

  it("Should deploy with correct name and symbol", async function () {
    expect(await kbaToken.name()).to.equal("KBA_Token");
    expect(await kbaToken.symbol()).to.equal("KBAT");
  });

  it("Should allow the owner to mint tokens", async function () {
    const amount = ethers.utils.parseEther("1000");
    await kbaToken.connect(owner).mint(addr1.address, amount);

    expect(await kbaToken.balanceOf(addr1.address)).to.equal(amount);
    expect(await kbaToken.totalSupply()).to.equal(amount);
  });

  it("Should revert minting from non-owner", async function () {
    const amount = ethers.utils.parseEther("1000");
    await expect(
      kbaToken.connect(addr1).mint(addr2.address, amount)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should allow token transfers", async function () {
    const mintAmount = ethers.utils.parseEther("1000");
    const transferAmount = ethers.utils.parseEther("200");

    await kbaToken.connect(owner).mint(addr1.address, mintAmount);
    await kbaToken.connect(addr1).transfer(addr2.address, transferAmount);

    expect(await kbaToken.balanceOf(addr1.address)).to.equal(
      mintAmount.sub(transferAmount)
    );
    expect(await kbaToken.balanceOf(addr2.address)).to.equal(transferAmount);
  });

  it("Should revert transfers exceeding balance", async function () {
    const transferAmount = ethers.utils.parseEther("200");
    await expect(
      kbaToken.connect(addr1).transfer(addr2.address, transferAmount)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });
});
