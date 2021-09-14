require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan")
require('hardhat-deploy')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const MNEMONIC;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: { },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/640a3e8dae4d4665aee40ea56962647c",
      accounts: {
        mnemonic: MNEMONIC
      },
      gas: 2100000,
      gasPrice: 8000000000,
      saveDeployments: true
    },
  },
  etherscan: {
    apiKey: "V7SZJFXG25Q9KGYVGHWC1PFJ7FYMYDCYUW"
  },
  solidity: "0.8.0",
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};
