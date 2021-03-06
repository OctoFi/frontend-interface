import getFSNConfig from './coinbase/fusion'
import getBNBConfig from './coinbase/binance'
import getFTMConfig from './coinbase/fantom'
import getETHConfig from './coinbase/ethereum'
import getHTConfig from './coinbase/huobi'
import getOKTConfig from './coinbase/okex'
import getArbitrumConfig from './coinbase/arbitrum'
import getMATICConfig from './coinbase/polygon'
import getxDAIConfig from './coinbase/xDAI'
import getAVAXConfig from './coinbase/avalanche'
import getDEVConfig from './coinbase/moonbase'

import {getNetwork, getIdCode} from './getUrlParams'
import {chainInfo} from './coinbase/nodeConfig'

// console.log(location.href)
const ENV_NODE_CONFIG = 'ENV_NODE_CONFIG'
// const INIT_NODE = 'FSN_MAIN'
// const INIT_NODE = 'BNB_MAIN'
// const INIT_NODE = 'FTM_MAIN'
const INIT_NODE = 'ETH_MAIN'
// const INIT_NODE = 'BNB_TEST'
// const INIT_NODE = 'FSN_TEST'

getIdCode()
export default function getNetConfig() {
  let netConfig = {}
  let netArr = [];

  let ENV_CONFIG = getNetwork(ENV_NODE_CONFIG, INIT_NODE)
  netArr = ENV_CONFIG.split('_')

  if (netArr[0] === 'FSN') {
    netConfig = getFSNConfig(netArr[1])
  } else if (netArr[0] === 'BNB') {
    netConfig = getBNBConfig(netArr[1])
  } else if (netArr[0] === 'FTM') {
    netConfig = getFTMConfig(netArr[1])
  } else if (netArr[0] === 'ETH') {
    netConfig = getETHConfig(netArr[1])
  } else if (netArr[0] === 'HT') {
    netConfig = getHTConfig(netArr[1])
  } else if (netArr[0] === 'OKT') {
    netConfig = getOKTConfig(netArr[1])
  } else if (netArr[0] === 'ARBITRUM') {
    netConfig = getArbitrumConfig(netArr[1])
  } else if (netArr[0] === 'MATIC') {
    netConfig = getMATICConfig(netArr[1])
  } else if (netArr[0] === 'xDAI') {
    netConfig = getxDAIConfig(netArr[1])
  } else if (netArr[0] === 'AVAX') {
    netConfig = getAVAXConfig(netArr[1])
  } else if (netArr[0] === 'DEV') {
    netConfig = getDEVConfig(netArr[1])
  }

  let serverInfoUrl = 'https://bridgeapi.anyswap.exchange'

  return {
    ...netConfig,
    localDataDeadline: 1616408615294,
    ENV_NODE_CONFIG,
    bridgeAll: chainInfo,
    env: netArr[1].toLowerCase(),
    supportWallet: ['Ledger'],
    FSNtestUrl: 'https://test.anyswap.exchange', // ?????????????????????
    FSNmainUrl: 'https://anyswap.exchange', // ?????????????????????
    BSCtestUrl: 'https://bsctest.anyswap.exchange',
    BSCmainUrl: 'https://bsc.anyswap.exchange',
    serverInfoUrl: {
      V1: serverInfoUrl,
      // V2: 'http://localhost:8107/v2'
      V2: serverInfoUrl + '/v2'
    },
    api: 'https://api.anyswap.exchange/',
    recordsTxnsUrl: 'https://agentapi.anyswap.exchange/recordTxns',
    farmUrl: '/farms/',
    // farmUrl: '/',
    // recordsTxnsUrl: 'http://localhost:8108/recordTxns',
    dirSwitchFn (type) {
      if (netConfig.reverseSwitch) {
        if (type) return 1
        else return 0
      } else {
        if (type) return 0
        else return 1
      }
    }
  }
}