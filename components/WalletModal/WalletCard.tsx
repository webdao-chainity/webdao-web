import React from 'react'
import styled from 'styled-components'
import Button from '@/components/Button/Button'
import Text from '@/components/Text/Text'
import MoreHorizontal from '@/components/Svg/Icons/MoreHorizontal'
import {Config, Login} from './types'
import {ButtonProps} from '@/components/Button/types'
import {connectorLocalStorageKey, walletLocalStorageKey} from '@/engine/config'
import _ from 'lodash'

interface Props {
    walletConfig: Config
    login: Login
    onDismiss: () => void
}

const WalletButton = styled(Button).attrs({width: '100%', variant: 'text', py: '16px'})`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`

interface MoreWalletCardProps extends ButtonProps {
    onClick?: () => void;
}

export const MoreWalletCard: React.FC<MoreWalletCardProps> = ({...props}) => {
    return (
        <WalletButton variant='tertiary' {...props}>
            <MoreHorizontal />
            <Text fontSize='14px'>{'More'}</Text>
        </WalletButton>
    )
}

const WalletCard: React.FC<Props> = ({login, walletConfig, onDismiss}) => {
    const {title, icon: Icon} = walletConfig
    console.log(login)

    return (
        <WalletButton
            variant='tertiary'
            onClick={() => {
                const ethereum = _.get(window, 'ethereum')
                if (!ethereum && title === 'Metamask' && walletConfig.href) {
                    window.open(walletConfig.href, '_blank', 'noopener noreferrer')
                } else {
                    login(walletConfig.connectorId)
                    localStorage?.setItem(walletLocalStorageKey, walletConfig.title)
                    localStorage?.setItem(connectorLocalStorageKey, walletConfig.connectorId)
                    onDismiss()
                }
            }}
            id={`wallet-connect-${title.toLocaleLowerCase()}`}
        >
            <Icon width='40px'/>
            <Text fontSize='14px'>{title}</Text>
        </WalletButton>
    )
}

export default WalletCard
