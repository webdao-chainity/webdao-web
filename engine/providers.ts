import {StaticJsonRpcProvider} from '@ethersproject/providers';

export const bscRPCEndpoint = 'https://bsc-mainnet.nodereal.io/v1/173974ed477148119bc45f563c745a13';
export const ethRPCEndpoint = 'https://eth-mainnet.nodereal.io/v1/ad2773b85d334644b1c537eb14bf2eea';

// export const bscRPCEndpoint = 'https://bsc-dataseed1.binance.org'
// export const ethRPCEndpoint = 'https://eth-mainnet.public.blastapi.io'

export const bscProvider = new StaticJsonRpcProvider(
  {
    url: bscRPCEndpoint,
    skipFetchSetup: true,
  },
  56
);

export const ethProvider = new StaticJsonRpcProvider(
  {
    url: ethRPCEndpoint,
    skipFetchSetup: true,
  },
  1
);
