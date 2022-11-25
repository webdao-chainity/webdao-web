import {ChainId, Config, ConnectorNames} from './types';
import {AbstractConnector} from '@web3-react/abstract-connector';
import {WalletConnectConnector} from '@web3-react/walletconnect-connector';
import {BscConnector} from '@binance-chain/bsc-connector';
// import getNodeUrl from '@/utils/getRpcUrl'
import {InjectedConnector} from '@web3-react/injected-connector';
import {ExternalProvider, JsonRpcFetchFunc, Web3Provider} from '@ethersproject/providers';

import BinanceChain from '@/components/Svg/Icons/BinanceChain';
// import Blocto from '@/components/Svg/Icons/Blocto'
// import CoinbaseWallet from '@/components/Svg/Icons/CoinbaseWallet'
// import Coin98 from '@/components/Svg/Icons/Coin98'
// import MathWallet from '@/components/Svg/Icons/MathWallet'
import Metamask from '@/components/Svg/Icons/Metamask';
// import SafePal from '@/components/Svg/Icons/SafePal'
// import TokenPocket from '@/components/Svg/Icons/TokenPocket'
// import TrustWallet from '@/components/Svg/Icons/TrustWallet'
// import WalletConnect from '@/components/Svg/Icons/WalletConnect'
import {hexlify} from '@ethersproject/bytes';
import {toUtf8Bytes} from '@ethersproject/strings';
import {bscRPCEndpoint, ethRPCEndpoint} from '@/engine/providers';
import _ from 'lodash';

export const CHAIN_ID = `${process.env.NEXT_PUBLIC_CHAIN_ID || '56'}`;

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 1,
    href: 'https://metamask.app.link/dapp/presale.lux.world/',
  },
  // {
  //   title: 'WalletConnect BSC',
  //   icon: WalletConnect,
  //   connectorId: ConnectorNames.WalletConnect,
  //   priority: 2
  // },
  // {
  //   title: 'WalletConnect ETH',
  //   icon: WalletConnect,
  //   connectorId: ConnectorNames.WalletConnectETH,
  //   priority: 3
  // },
  // {
  //   title: 'Binance Wallet',
  //   icon: BinanceChain,
  //   connectorId: ConnectorNames.BSC,
  //   priority: 3
  // },
  // {
  //   title: 'Coinbase Wallet',
  //   icon: CoinbaseWallet,
  //   connectorId: ConnectorNames.WalletLink,
  //   priority: 4
  // },
  // {
  //   title: 'Trust Wallet',
  //   icon: TrustWallet,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 5,
  //   mobileOnly: true
  // },
  // {
  //   title: 'MathWallet',
  //   icon: MathWallet,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999
  // },
  // {
  //   title: 'TokenPocket',
  //   icon: TokenPocket,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999
  // },
  // {
  //   title: 'SafePal',
  //   icon: SafePal,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999,
  //   mobileOnly: true
  // },
  // {
  //   title: 'Coin98',
  //   icon: Coin98,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999
  // },
  // {
  //   title: 'Blocto',
  //   icon: Blocto,
  //   connectorId: ConnectorNames.Blocto,
  //   priority: 999
  // }
];

export default connectors;
export const connectorLocalStorageKey = 'luxWorldConnectorIdv2';
export const walletLocalStorageKey = 'wallet';

export const BASE_BSC_SCAN_URLS = {
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
  [ChainId.ETHEREUM]: 'https://etherscan.io/',
  [ChainId.GOERLI]: 'https://goerli.infura.io/v3/',
};

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

const POLLING_INTERVAL = 12000;
const chainId = parseInt(CHAIN_ID, 10);
// const rpcUrl = getNodeUrl() || ''

export const injected = new InjectedConnector({
  supportedChainIds: [chainId, ChainId.ETHEREUM, ChainId.GOERLI],
});
export const ethConnector = new InjectedConnector({
  supportedChainIds: [ChainId.BSC, ChainId.ETHEREUM, ChainId.GOERLI],
});

const walletconnect = new WalletConnectConnector({
  rpc: {
    [ChainId.BSC]: bscRPCEndpoint,
    [ChainId.ETHEREUM]: ethRPCEndpoint,
  },
  chainId: ChainId.BSC,
  qrcode: true,
});

const walletconnectETH = new WalletConnectConnector({
  rpc: {
    [ChainId.BSC]: bscRPCEndpoint,
    [ChainId.ETHEREUM]: ethRPCEndpoint,
  },
  chainId: ChainId.ETHEREUM,
  qrcode: true,
});

const bscConnector = new BscConnector({supportedChainIds: [ChainId.BSC]});

export const connectorsByName = {
  [ConnectorNames.Injected]: ethConnector,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletConnectETH]: walletconnectETH,
  [ConnectorNames.BSC]: bscConnector,
  [ConnectorNames.Goerli]: ethConnector,
  // [ConnectorNames.Blocto]: async () => {
  //   const {BloctoConnector} = await import('@blocto/blocto-connector')
  //   return new BloctoConnector({chainId, rpc: rpcUrl})
  // },
  // [ConnectorNames.WalletLink]: async () => {
  //   const {WalletLinkConnector} = await import('@web3-react/walletlink-connector')
  //   return new WalletLinkConnector({
  //     url: rpcUrl,
  //     appName: 'Luxworld Token',
  //     appLogoUrl: 'https://presale.lux.world/logo.png',
  //     supportedChainIds: [ChainId.BSC, ChainId.BSC_TESTNET]
  //   })
  // }
} as const;

export const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (
  connector: AbstractConnector,
  provider: any,
  account: string,
  message: string
): Promise<string> => {
  const BinanceChain = _.get(window, 'BinanceChain');
  if (BinanceChain && connector instanceof BscConnector) {
    const {signature} = await (BinanceChain as any).bnbSign(account, message);
    return signature;
  }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider?.provider?.wc) {
    const wcMessage = hexlify(toUtf8Bytes(message));
    return await provider.provider?.wc.signPersonalMessage([wcMessage, account]);
  }

  return provider.getSigner(account).signMessage(message);
};
