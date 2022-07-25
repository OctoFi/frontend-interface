import { useState } from 'react';
import { PureLedgerPaths } from "./LedgerPaths";
import { SUPPORTED_WALLETS } from "../../connectors";
import ledgerPaths from "../../constants/ledgerPaths";

export interface LedgerPathsProps {
  tryActivation?: any;
}

const LedgerPaths = ({ tryActivation }: LedgerPathsProps) => {
  const [selectedPath, setSelectedPath] = useState<string>(ledgerPaths[0].path);
  const [customPath, setCustomPath] = useState<string>("");

  const onConnectLedger = () => {
    let path = selectedPath;
    if (path === "custom") {
      path = customPath;
    }

    const ledger = SUPPORTED_WALLETS.ledger;
    tryActivation(ledger.connector(path), true);
  };

  return <PureLedgerPaths items={ledgerPaths} selected={selectedPath} onSetSelected={setSelectedPath} onConnectLedger={onConnectLedger} customPath={customPath} setCustomPath={setCustomPath} />;
};

export default LedgerPaths;