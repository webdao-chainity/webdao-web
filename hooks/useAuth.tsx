import React, {useCallback} from 'react';
import {UnsupportedChainIdError, useWeb3React} from '@web3-react/core';
import {setupNetwork} from '@/utils/wallet';
import {NoBscProviderError} from '@binance-chain/bsc-connector';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';

import {connectorLocalStorageKey, connectorsByName} from '@/engine/config';
import {ConnectorNames} from '@/engine/types';
import useToast from '@/hooks/useToast';

const useAuth = () => {
  const {chainId, activate, deactivate, setError, account} = useWeb3React();
  const {toastError} = useToast();

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      // const connectorOrGetConnector = connectorsByName[connectorID]
      // const connector = typeof connectorOrGetConnector !== 'function' ? connectorsByName[connectorID] : await connectorOrGetConnector()
      const connector = connectorsByName[connectorID];
      if (typeof connector !== 'function' && connector) {
        await activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            setError(error);
            const provider = await connector.getProvider();
            const hasSetup = await setupNetwork(provider);
            if (hasSetup) {
              await activate(connector);
            }
          } else {
            window?.localStorage?.removeItem(connectorLocalStorageKey);
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              console.log('Provider Error: No provider was found');
              toastError('Provider Error: No provider was found');
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = undefined;
              }
              console.log('Authorization Error, Please authorize to access your account');
              toastError('Authorization Error, Please authorize to access your account');
            } else {
              console.log(error.message);
            }
          }
        });
      }
    },
    [activate, setError]
  );
  const logout = useCallback(() => {
    deactivate();
  }, [deactivate, chainId]);

  return {login, logout, account};
};

export default useAuth;
