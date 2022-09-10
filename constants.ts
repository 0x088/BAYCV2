export const isDev = process.env.NODE_ENV === "development";
export const contractAddress = isDev
  ? "0x11c08883a2fd7f32f63fa20cc36801ce05adcc08"
  : "0x0d17515acd38172503f7d789fee5c731c1ad5e08";

export const info = {
  title: "BAYCV2",
  description:
    "Bored Ape Yacht Club V2 (BAYCV2) is a collection of 10,000 Bored Ape NFTs—unique digital collectibles living on the Ethereum blockchain",
  link: "https://boredapeyachtclubv2.com",
  openSeaPrefix: `https://opensea.io/assets/ethereum/${contractAddress}`,
  openSeaCollection: "https://opensea.io/collection/bored-ape-yacht-club-v2-v2",
  contract: isDev
    ? `https://goerli.etherscan.io/address/${contractAddress}#contracts`
    : `https://etherscan.io/address/${contractAddress}#contracts`,
  twitter: "https://twitter.com/0x088",
  github: "https://github.com/0x088/baycv2",
};

export const positiveNum = /^[1-9](\d+)?$/;
