import React, {useState} from 'react';
import styled from 'styled-components';
import {isMobile} from 'react-device-detect';
import Grid from '@/components/Box/Grid';
import Box from '@/components/Box/Box';
import Heading from '@/components/Heading/Heading';
import {ModalBody, ModalContainer, ModalHeader, ModalTitle} from '@/components/Modal';
import WalletCard, {MoreWalletCard} from './WalletCard';
import {Config, Login} from './types';
import config, {walletLocalStorageKey} from '@/engine/config';
import _ from 'lodash';

interface Props {
  login: Login;
  onDismiss?: () => void;
}

const WalletWrapper = styled(Box)``;

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
  const sortedConfig = walletConfig.sort((a: Config, b: Config) => a.priority - b.priority);

  const preferredWalletName = localStorage?.getItem(walletLocalStorageKey);

  if (!preferredWalletName) {
    return sortedConfig;
  }

  const preferredWallet = sortedConfig.find(
    (sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName
  );

  if (!preferredWallet) {
    return sortedConfig;
  }

  return [
    preferredWallet,
    ...sortedConfig
      .filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName)
      .filter((sortedWalletConfig) =>
        typeof sortedWalletConfig.mobileOnly === 'boolean'
          ? sortedWalletConfig.mobileOnly && isMobile
          : true
      ),
  ];
};

const ConnectModal: React.FC<Props> = ({login, onDismiss = () => null}) => {
  const [showMore, setShowMore] = useState(true);
  const sortedConfig = getPreferredConfig(config as any);
  // Filter out WalletConnect if user is inside TrustWallet built-in browser
  const walletsToShow = _.get(window, 'ethereum.isTrust')
    ? sortedConfig.filter((wallet) => wallet.title !== 'WalletConnect')
    : sortedConfig;
  const displayListConfig = showMore ? walletsToShow : walletsToShow.slice(0, 3);

  return (
    <ModalContainer minWidth="320px">
      <ModalHeader background={'black'}>
        <ModalTitle>
          <Heading>{'Connect Wallet'}</Heading>
        </ModalTitle>
        {/*<ModalCloseButton />*/}
      </ModalHeader>
      <ModalBody>
        <WalletWrapper>
          <Grid>
            {displayListConfig.map((wallet) => (
              <Box key={wallet.title}>
                <WalletCard walletConfig={wallet} login={login} onDismiss={onDismiss} />
              </Box>
            ))}
            {!showMore && <MoreWalletCard onClick={() => setShowMore(true)} />}
          </Grid>
        </WalletWrapper>
      </ModalBody>
    </ModalContainer>
  );
};

export default ConnectModal;
