// require('dotenv').config();
// require ("@nomicfoundation/hardhat-toolbox");


// module.exports = {
//   solidity: "0.8.20",
//   networks: {
//     defaultNetwork: "hardhat",
//     sepolia: {
//       url: `https://sepolia.infura.io/v3/${process.env.INFURA_URL}`,
//       accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
//     },
//   },
// };


//----------------------------------------*********************************************************************************_________________________________

// require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   defaultNetwork: "localhost",
//   networks: {
//     localhost: {
//       url: `https://sepolia.infura.io/v3/${process.env.INFURA_URL}`,
//       accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
//     },
//     hardhat: {
//       // See its defaults
//     }
//   },
//   solidity: "0.8.20",
// };


//----________________________________________*********************************************_______________*****************************__________________

require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Hardhat node URL
    },
    hardhat: {
      accounts:
       {
        count: 10,
        initialBalance: "1000000000000000000000", // 1000 ETH
      },
    },
  },
  solidity: "0.8.20",
};
