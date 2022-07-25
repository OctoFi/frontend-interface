import { Button, Form } from "react-bootstrap";
import UIButton from "../UI/Button";

export interface PureLedgerPathsProps {
  items: Array<any>;
  selected?: any;
  onSetSelected?: any;
  onConnectLedger?: any;
  customPath?: any;
  setCustomPath?: any;
}

export const PureLedgerPaths = ({ items, selected, onSetSelected, onConnectLedger, customPath, setCustomPath }: PureLedgerPathsProps) => {
  const onCancel = () => {
    // setPendingError(false);
    // onSetWalletView(WALLET_VIEWS.OPTIONS);
    onSetSelected(undefined);
  };

  return (
    <div>
      {items.map((item, index) => {
        return (
          <div key={`hd-path-${index}`} className="mb-1">
            <Form.Check
              type={"radio"}
              id={`hd-path-${index}`}
              className="d-flex gap-2 align-items-center"
            >
              <Form.Check.Input
                type={"radio"}
                name={"hd-path"}
                checked={item.path === selected}
                onChange={() => onSetSelected(item.path)}
                className="mt-0"
              />
              <Form.Check.Label className="d-flex gap-2 flex-fill justify-content-between">
                <div className="">{item.label}</div>
                <div className="fw-bold text-gray-600">{item.path}</div>
              </Form.Check.Label>
            </Form.Check>
          </div>
        );
      })}

      <div key="hd-path-custom">
        <Form.Check
          type={"radio"}
          id="hd-path-custom"
          className="d-flex gap-2 align-items-center mb-2"
        >
          <Form.Check.Input
            type={"radio"}
            name={"hd-path"}
            checked={selected === "custom"}
            onChange={() => onSetSelected("custom")}
          />
          <Form.Check.Label>Custom path</Form.Check.Label>
        </Form.Check>

        {selected === "custom" && (
          <Form.Control
            placeholder={"m/44'/60'/0'/0"}
            onChange={(e) => setCustomPath(e.target.value)}
            value={customPath}
            className="mb-3"
          />
        )}
      </div>

      <div className="d-flex flex-column flex-lg-row-reverse mt-4">
        <UIButton className="ms-2" onClick={onConnectLedger}>
          Connect to Wallet
        </UIButton>
        <Button variant="link" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

