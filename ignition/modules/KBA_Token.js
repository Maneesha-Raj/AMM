// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("KBAModule", (m) => {

  const addrPublic = '0xeA75e2808e3AD5ccebC3Ec2dfaF7De785b7F6c54'
  const kbt = m.contract("KBA_Token", [addrPublic]);

  return { kbt };
});