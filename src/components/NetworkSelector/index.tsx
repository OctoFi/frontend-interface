import { useEffect, useState } from "react";
import getNetConfig from "../../config";
import { chainList } from "../../config/coinbase/nodeConfig";
import { PureNetworkOptionProps } from "../NetworkOption/NetworkOption";
import { PureNetworkSelector } from "./NetworkSelector";

const NetworkSelector = () => {
  const [networks, setNetworks] = useState<Array<PureNetworkOptionProps>>([]);
  let config = getNetConfig();

  // @ts-ignore
  const [selectedNetwork, setSelectedNetwork] = useState<string>(config.symbol);

  // TODO: don't update network if user selects cancel in wallet popup
  const onUpdateNetwork = (item: any) => {
    // @ts-ignore
    if (item.symbol === config?.symbol || !item.isSwitch) {
      return;
    }
    setSelectedNetwork(item.symbol);
    localStorage.setItem(config.ENV_NODE_CONFIG, item.label);
    config = getNetConfig();

    if (item?.chainID !== 1 && window.ethereum) {
      const networkDetails = {
        chainId: `0x${item?.chainID?.toString(16)}`,
        chainName: `${item.name} Mainnet`,
        nativeCurrency: {
          name: item.name,
          symbol: item.symbol,
          decimals: 18,
        },
        rpcUrls: [item.rpc],
      };

      // @ts-ignore
      window?.ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [networkDetails],
      });
    }
  };

  useEffect(() => {
    // @ts-ignore
    setNetworks(chainList[config.env]);
  }, [config]);

  return <PureNetworkSelector networks={networks} selected={selectedNetwork} onUpdateNetwork={onUpdateNetwork} />;
};

export default NetworkSelector;
