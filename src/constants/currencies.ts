export const currencies: {
    [rateName: string]: {
        image: any;
        type: string;
        symbol: string;
        lng?: string;
    };
} = {
    CAD: {
        image: require("../assets/images/currencies/CAD.svg").default,
        type: "normal",
        symbol: "CA$",
        lng: "fr",
    },
    GBP: {
        image: require("../assets/images/currencies/GBP.svg").default,
        type: "normal",
        symbol: "£",
        lng: "en",
    },
    RUB: {
        image: require("../assets/images/currencies/RUB.svg").default,
        type: "normal",
        symbol: "RUB",
        lng: "ru",
    },
    JPY: {
        image: require("../assets/images/currencies/JPY.svg").default,
        type: "normal",
        symbol: "¥",
        lng: "ja",
    },
    CHF: {
        image: require("../assets/images/currencies/CHF.svg").default,
        type: "normal",
        symbol: "CHF",
        lng: "de",
    },
    EUR: {
        image: require("../assets/images/currencies/EUR.svg").default,
        type: "normal",
        symbol: "€",
        lng: "en",
    },
    INR: {
        image: require("../assets/images/currencies/INR.svg").default,
        type: "normal",
        symbol: "₹",
        lng: "hi",
    },
    CNY: {
        image: require("../assets/images/currencies/CNY.svg").default,
        type: "normal",
        symbol: "CN¥",
        lng: "zh",
    },
    NZD: {
        image: require("../assets/images/currencies/NZD.svg").default,
        type: "normal",
        symbol: "NZ$",
        lng: "en",
    },
    USD: {
        image: require("../assets/images/currencies/USD.svg").default,
        type: "normal",
        symbol: "$",
        lng: "en",
    },
    SGD: {
        image: require("../assets/images/currencies/SGD.svg").default,
        type: "normal",
        symbol: "SGD",
        lng: "en",
    },
    AUD: {
        image: require("../assets/images/currencies/AUD.svg").default,
        type: "normal",
        symbol: "A$",
        lng: "en",
    },
    KRW: {
        image: require("../assets/images/currencies/KRW.svg").default,
        type: "normal",
        symbol: "₩",
        lng: "ko",
    },
    BTC: {
        image: require("../assets/images/currencies/BTC.svg").default,
        type: "crypto",
        symbol: "₿",
        lng: "en",
    },
    ETH: {
        image: require("../assets/images/currencies/ETH.svg").default,
        type: "crypto",
        symbol: "Ξ",
        lng: "en",
    },
    LINK: {
        image: require("../assets/images/currencies/LINK.svg").default,
        type: "crypto",
        symbol: "⬡",
        lng: "en",
    },
};
