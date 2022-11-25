import React from 'react'
import styled from 'styled-components'
import {Box, Flex} from '@/components/Box'
import ArrowBackIcon from '@/components/Svg/Icons/ArrowBack'
import CloseIcon from '@/components/Svg/Icons/Close'
import IconButton from '@/components/Button/IconButton'
import {ModalProps} from './types'

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  display: flex;
  padding: 12px 24px;
`

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
`

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps['onDismiss'] }> = ({onDismiss}) => {
    return (
        <IconButton variant='text' onClick={onDismiss} aria-label='Close the dialog'>
            <CloseIcon color='text'/>
        </IconButton>
    )
}

export const ModalBackButton: React.FC<{ onBack: ModalProps['onBack'] }> = ({onBack}) => {
    return (
        <IconButton variant='text' onClick={onBack} area-label='go back' mr='8px'>
            <ArrowBackIcon color='primary'/>
        </IconButton>
    )
}

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: black;
  box-shadow: 0 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid black;
  border-radius: 6px;
  width: 100%;
  max-height: 100vh;
  
`
