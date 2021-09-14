const fs = require("fs")
const { ethers } = require("hardhat")
const { hrtime } = require("process")

module.exports = async({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log } = deployments
    const { deployer } =  await getNamedAccounts()
    const ChainId = await getChainId()

    console.log("------------------------------------")
    const SVGNFT = await deploy("SVGNFT", {
        from: deployer,
        log: true
    })
    console.log(`You have deployed an NFT contract to ${SVGNFT.address}`);
    let filepath = "./img/triangle.svg";
    let svg = fs.readFileSync(filepath, { encoding: "utf8" })
    //svg = 'https://cdn.vox-cdn.com/thumbor/c7BEcpYhdwLkDeoUU90ZGUFV0zY=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19390964/corsola_anime.jpg';

    const svgNFTContract = await ethers.getContractFactory("SVGNFT")
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];
    const svgNFT = new ethers.Contract(SVGNFT.address, svgNFTContract.interface, signer)
    // const networkName = networkConfig[chainId]['name']
    // console.log(`Verify with: \n npx veriffy --netowrk ${networkName} ${svgNFT.address}`)
    let transactionResponse = await svgNFT.create(svg)
    let receipt = await transactionResponse.wait(1)
    console.log(`You've made an NFT`)
    console.log(`you can view the tokenuri here ${await svgNFT.tokenURI(0)}`)

}