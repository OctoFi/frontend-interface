import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { BigNumber, NULL_BYTES } from "@0x/utils";

import { OrderSide, ZERO } from "../../constants";
import { toUnitAmount } from "../../lib/helper";
import { fetchTakerAndMakerFee } from "../../state/relayer/actions";
import { getOpenBuyOrders, getOpenSellOrders, getQuoteInUsd } from "../../state/selectors";
import { getKnownTokens } from "../../utils/known_tokens";
import { formatTokenSymbol, tokenAmountInUnits, unitsInTokenAmount } from "../../utils/spot/tokens";
import { buildMarketOrders, sumTakerAssetFillableOrders } from "../../utils/spot/orders";
import withWeb3Account from "../hoc/withWeb3Account";
import { PureOrderDetails } from "./OrderDetails";

const OrderType = {
	Limit: "Limit",
	Market: "Market",
};

class OrderDetails extends React.Component {
	state = {
		makerFeeAmount: ZERO,
		takerFeeAmount: ZERO,
		makerFeeAssetData: NULL_BYTES,
		takerFeeAssetData: NULL_BYTES,
		quoteTokenAmount: ZERO,
		canOrderBeFilled: true,
	};

	componentDidUpdate = async (prevProps) => {
		const newProps = this.props;
		if (
			newProps.tokenPrice !== prevProps.tokenPrice ||
			newProps.orderType !== prevProps.orderType ||
			newProps.tokenAmount !== prevProps.tokenAmount ||
			newProps.currencyPair !== prevProps.currencyPair ||
			newProps.orderSide !== prevProps.orderSide
		) {
			await this._updateOrderDetailsState();
		}
	};

	_updateOrderDetailsState = async () => {
		const { currencyPair, orderType, orderSide } = this.props;
		if (!currencyPair) {
			return;
		}

		if (orderType === OrderType.Limit) {
			const { tokenAmount, tokenPrice, onFetchTakerAndMakerFee, web3 } = this.props;
			const { quote, base } = currencyPair;
			const quoteToken = getKnownTokens().getTokenBySymbol(quote);
			const baseToken = getKnownTokens().getTokenBySymbol(base);
			// TODO: Check if this precision is enough, price was giving error on precision
			const priceInQuoteBaseUnits = unitsInTokenAmount(tokenPrice.toString(), quoteToken.decimals);
			const baseTokenAmountInUnits = toUnitAmount(tokenAmount, baseToken.decimals);
			const quoteTokenAmount = baseTokenAmountInUnits.multipliedBy(priceInQuoteBaseUnits);
			const { makerFee, makerFeeAssetData, takerFee, takerFeeAssetData } = await onFetchTakerAndMakerFee(
				tokenAmount,
				tokenPrice,
				orderSide,
				web3.account,
				window.ethereum || web3.library
			);
			this.setState({
				makerFeeAmount: makerFee,
				makerFeeAssetData,
				takerFeeAmount: takerFee,
				takerFeeAssetData,
				quoteTokenAmount,
			});
		} else {
			const { tokenAmount, openSellOrders, openBuyOrders } = this.props;
			const isSell = orderSide === OrderSide.Sell;
			const [ordersToFill, amountToPayForEachOrder, canOrderBeFilled] = buildMarketOrders(
				{
					amount: tokenAmount,
					orders: isSell ? openBuyOrders : openSellOrders,
				},
				orderSide
			);
			// HACK(dekz): we assume takerFeeAssetData is either empty or is consistent through all orders
			const firstOrderWithFees = ordersToFill.find((o) => o.takerFeeAssetData !== NULL_BYTES);
			const takerFeeAssetData = firstOrderWithFees ? firstOrderWithFees.takerFeeAssetData : NULL_BYTES;
			const takerFeeAmount = ordersToFill.reduce((sum, order) => sum.plus(order.takerFee), ZERO);
			const quoteTokenAmount = sumTakerAssetFillableOrders(orderSide, ordersToFill, amountToPayForEachOrder);

			this.setState({
				takerFeeAmount,
				takerFeeAssetData,
				quoteTokenAmount,
				canOrderBeFilled,
			});
		}
	};

	_getCostStringForRender = () => {
		const { canOrderBeFilled } = this.state;
		const { orderType } = this.props;
		if (orderType === OrderType.Market && !canOrderBeFilled) {
			return `---`;
		}

		const { quote } = this.props.currencyPair;
		const quoteToken = getKnownTokens().getTokenBySymbol(quote);
		const { quoteTokenAmount } = this.state;
		//  const quoteTokenAmountUnits = tokenAmountInUnits(quoteTokenAmount, quoteToken.decimals);
		const costAmount = tokenAmountInUnits(quoteTokenAmount, quoteToken.decimals, quoteToken.displayDecimals);
		return `${costAmount} ${formatTokenSymbol(quote)}`;
	};

	_getMedianPriceStringForRender = () => {
		const { canOrderBeFilled } = this.state;
		const { orderType } = this.props;
		const { tokenAmount } = this.props;
		if (orderType === OrderType.Market && !canOrderBeFilled) {
			return `---`;
		}
		if (tokenAmount.eq(0)) {
			return `---`;
		}
		const { quote, base, config } = this.props.currencyPair;
		const { quoteTokenAmount } = this.state;
		const quoteToken = getKnownTokens().getTokenBySymbol(quote);
		const baseToken = getKnownTokens().getTokenBySymbol(base);
		const quoteTokenAmountUnits = new BigNumber(tokenAmountInUnits(quoteTokenAmount, quoteToken.decimals, 18));
		const baseTokenAmountUnits = new BigNumber(tokenAmountInUnits(tokenAmount, baseToken.decimals, 18));
		const priceDisplay = quoteTokenAmountUnits.div(baseTokenAmountUnits).toFormat(config.pricePrecision + 1);
		return `${priceDisplay} ${formatTokenSymbol(quote)}`;
	};

	_getCostLabelStringForRender = () => {
		const { quoteInUSD, orderSide, t } = this.props;
		if (quoteInUSD) {
			return orderSide === OrderSide.Sell ? t("total") : t("cost");
		} else {
			return orderSide === OrderSide.Sell ? t("total") : t("cost");
		}
	};

	componentDidMount = async () => {
		await this._updateOrderDetailsState();
	};

	render = () => {
		// const fee = this._getFeeStringForRender();
		const cost = this._getCostStringForRender();
		const costText = this._getCostLabelStringForRender();
		const priceMedianText = this._getMedianPriceStringForRender();
		const { orderType, t } = this.props;

		return (
			<PureOrderDetails cost={cost} label={costText} orderType={orderType} medianPrice={priceMedianText} />
		);
	};
}

const mapStateToProps = (state) => {
	return {
		openSellOrders: getOpenSellOrders(state),
		openBuyOrders: getOpenBuyOrders(state),
		quoteInUSD: getQuoteInUsd(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchTakerAndMakerFee: (amount, price, side, account, library) =>
			dispatch(fetchTakerAndMakerFee(amount, price, side, account, library)),
	};
};

export default withWeb3Account(connect(mapStateToProps, mapDispatchToProps)(withTranslation(OrderDetails)));
