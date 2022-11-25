// Set of helper functions to facilitate wallet setup

import {ExternalProvider} from '@ethersproject/providers'
import {BAD_SRCS} from 'components/Logo/Logo'
import {nodes} from './getRpcUrl'
import {ChainId} from '@/engine/types'
import {BASE_BSC_SCAN_URLS, CHAIN_ID} from '@/engine/config'
import _ from "lodash";

const NETWORK_CONFIG = {
  [ChainId.BSC]: {
    name: 'BNB Smart Chain Mainnet',
    scanURL: BASE_BSC_SCAN_URLS[ChainId.BSC],
  },
  [ChainId.BSC_TESTNET]: {
    name: 'BNB Smart Chain Testnet',
    scanURL: BASE_BSC_SCAN_URLS[ChainId.BSC_TESTNET],
  },
  [ChainId.ETHEREUM]: {
    name: 'Ethereum Mainnet',
    scanURL: BASE_BSC_SCAN_URLS[ChainId.ETHEREUM],
  },
  [ChainId.GOERLI]: {
    name: 'Goerli',
    scanURL: BASE_BSC_SCAN_URLS[ChainId.ETHEREUM],
  }
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (externalProvider?: ExternalProvider) => {
  const provider = (externalProvider || _.get(window, 'ethereum')) as any
  const chainId = parseInt(CHAIN_ID, 10) as keyof typeof NETWORK_CONFIG
  if (!NETWORK_CONFIG[chainId]) {
    console.error('Invalid chain id')
    return false
  }
  if (!!provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      return true
    } catch (switchError) {
      if ((switchError as any)?.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: NETWORK_CONFIG[chainId].name,
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'bnb',
                  decimals: 18,
                },
                rpcUrls: nodes,
                blockExplorerUrls: [`${NETWORK_CONFIG[chainId].scanURL}/`],
              },
            ],
          })
          return true
        } catch (error) {
          console.error('Failed to setup the network in Metamask:', error)
          return false
        }
      }
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenLogo
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenLogo?: string,
) => {
  // better leave this undefined for default image instead of broken image url
  const image = tokenLogo ? (BAD_SRCS[tokenLogo] ? undefined : tokenLogo) : undefined

  return await (_.get(window, 'ethereum') as any).request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image,
      },
    },
  })
}
