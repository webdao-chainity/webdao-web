import React from 'react';
import {SvgProps} from '@/components/Svg/types';

export enum ChainId {
  ETHEREUM = 1,
  BSC = 56,
  BSC_TESTNET = 97,
  GOERLI = 5,
}

export interface Address {
  97?: string;
  56: string;
}

export interface SerializedToken {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
  projectLink?: string;
  logoURI?: string;
}

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  WalletConnectETH = 'walletconnectETH',
  BSC = 'bsc',
  Goerli = 'goerli',
  // Blocto = 'blocto',
  // WalletLink = 'walletlink',
}

export interface Config {
  title: string;
  icon: React.FC<SvgProps>;
  connectorId: ConnectorNames;
  priority: number;
  mobileOnly?: boolean;
  href?: string;
}

export enum FetchStatus {
  Idle = 'IDLE',
  Fetching = 'FETCHING',
  Fetched = 'FETCHED',
  Failed = 'FAILED',
}
