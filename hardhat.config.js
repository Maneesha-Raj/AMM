require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: "0.8.20",
  networks: {
    // defaultNetwork:"sepolia",
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_URL}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};