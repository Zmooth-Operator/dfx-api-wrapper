import axios from "axios";

const BASE_URL = "https://api.dfx.swiss/v1";

const getAssets = async () => {
  const response = await axios.get(`${BASE_URL}/asset`);
  const assets = response.data;

  const grouped: { [key: string]: string[] } = {};

  assets.forEach((asset: any) => {
    const blockchain = asset.blockchain;
    if (!grouped[blockchain]) {
      grouped[blockchain] = [];
    }
    grouped[blockchain].push(asset.uniqueName);
  });

  console.log("=== DFX Assets by Blockchain ===\n");
  Object.entries(grouped).forEach(([blockchain, coins]) => {
    console.log(`${blockchain}: ${coins.join(", ")}`);
  });
};

getAssets();