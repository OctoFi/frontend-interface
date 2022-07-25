import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useTheme from "../../hooks/useTheme";
import Modal from "../Modal";
import Column from "../Column";
import AutoSizer from "react-virtualized-auto-sizer";
import CurrencyList from "./CurrencyList";
import { PaddedColumn, Separator } from "../SearchModal/styleds";
import { FormControl } from "../Form";
import { useTranslation } from "react-i18next";

export interface PureCurrencySelectModalProps {
  isOpen: boolean;
  onDismiss(): void;
  onCurrencySelect(T: any): void;
  selectedCurrency?: any;
  currencies?: any;
}

export const PureCurrencySelectModal = ({
  isOpen,
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  currencies
}: PureCurrencySelectModalProps) => {
  const theme = useTheme();
  const fixedList = useRef();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef();

  const filteredTokens = useMemo(() => {
    return currencies.filter(
      (token: any) => JSON.stringify([token.symbol, token.name]).toLowerCase().includes(searchQuery) || !searchQuery
    );
  }, [currencies, searchQuery]);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const handleInput = useCallback((event: any) => {
    const input = event.target.value;
    setSearchQuery(input.toLowerCase());
    // @ts-ignore
    fixedList?.current.scrollTo(0);
  }, []);

  const handleCurrencySelect = useCallback(
    (currency: any) => {
      onCurrencySelect(currency);
      onDismiss();
    },
    [onDismiss, onCurrencySelect]
  );

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={80} minHeight={80}>
      <Column style={{ width: "100%", flex: "1 1", minHeight: "100px" }}>
        <PaddedColumn gap="14px">
          <FormControl
            size={"lg"}
            style={{
              backgroundColor: theme.bg1,
              color: theme.text1,
            }}
            type="text"
            id="token-search-input"
            placeholder={t("tokenSearchPlaceholder")}
            value={searchQuery}
            ref={inputRef}
            onChange={handleInput}
          />
        </PaddedColumn>
        <Separator />

        <div style={{ flex: "1" }}>
          <AutoSizer disableWidth>
            {({ height }: { height: any; }) => (
              <CurrencyList
                height={height}
                currencies={filteredTokens}
                onCurrencySelect={handleCurrencySelect}
                selectedCurrency={selectedCurrency}
                fixedListRef={fixedList}
              />
            )}
          </AutoSizer>
        </div>
      </Column>
    </Modal>
  );
};
