pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "base64-sol/base64.sol";

contract SVGNFT is ERC721URIStorage {
    uint256 public tokenCounter;
    event CreatedSVGNFT(uint256 indexed tokenID, string tokenURI);

    constructor() ERC721 ("SVG NFT", "svgNFT") {
        tokenCounter = 0;
    }

    function create(string memory svg) public {
        _safeMint(msg.sender, tokenCounter);
        string memory imageURI = svgToImageURI(svg);
        string memory tokenURI = formatTokenURI(imageURI);
        _setTokenURI(tokenCounter, tokenURI);
        emit CreatedSVGNFT(tokenCounter, tokenURI);
        tokenCounter = tokenCounter + 1;
    }

    function svgToImageURI(string memory svg) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        string memory imageURI = string(abi.encodePacked(baseURL, svgBase64Encoded));
        imageURI = "https://bafybeicqmra5ctwmd6vsr2fxsyohiqilatyfk3rikagztzfhkluslrmfcm.ipfs.dweb.link/";
        return imageURI;
    }

    function formatTokenURI(string memory imageURI) public pure returns (string memory) {
        string memory baseURL = "data:application/json;base64,";
        return string(abi.encodePacked(
            baseURL,
            Base64.encode(
                bytes(abi.encodePacked(
                    '{"name": "SVG NFT", ', 
                    '"description": "An NFT based on SVG!", ',
                    '"attributes": "", ',
                    '"image": "', imageURI, '"}'
                )
        ))));
    }

}