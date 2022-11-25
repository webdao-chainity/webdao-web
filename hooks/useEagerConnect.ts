import { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import { connectorLocalStorageKey, injected } from '@/engine/config'
import { ConnectorNames } from '@/engine/types'
import { useWeb3React } from '@web3-react/core'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    }),
  )

const useEagerConnect = () => {
  const { login } = useAuth()
  const { account, connector } = useWeb3React()

  useEffect(() => {
    if (account && connector) {
      setTimeout(async () => {
        // const accessToken = window?.localStorage?.getItem('accessToken')
        // const userInfo = window?.localStorage?.getItem('userInfo')
        // const luxWorldConnector = window?.localStorage?.getItem('luxWorldConnectorIdv2')
        // if (luxWorldConnector === 'injected' || luxWorldConnector === 'walletconnect' || luxWorldConnector === 'walletconnectETH') {
        //   let checkToken: any = null
        //   if (accessToken) {
        //     checkToken = checkTokenAPI({
        //       accessToken
        //     }).then(res => {
        //       return accessToken
        //     }).catch((e: any) => {
        //       console.error(e)
        //       return null
        //     })
        //     if (checkToken && userInfo) return
        //   }
        //   let signature
        //   try {
        //     let lib: any = luxWorldConnector === 'injected' ? window.ethereum : library
        //     const provider = new ethers.providers.Web3Provider(lib)
        //     const msg = await generateMessageAPI({ publicAddress: account })
        //     signature = await signMessage(connector, provider, account, msg?.data?.data?.signMessage)
        //   } catch (e: any) {
        //     console.error(e)
        //     // if (e?.code) {
        //     //   if (e.toString().includes('user rejected signing')) {
        //     //     toastError('Error occurred! Please sign message and try again later!')
        //     //   } else {
        //     //     toastError(`${e?.message || 'Error occurred! Please try again later!'} (Code: ${e?.code})`, 5000)
        //     //   }
        //     // } else {
        //     //   toastError('Error occurred! Please try again later!')
        //     // }
        //   }
        //   if (signature) {
        //     signMessageAPI({
        //       publicAddress: account,
        //       signature,
        //       chainId: `${chainId}`
        //     }).then(res3 => {
        //       window?.localStorage?.setItem('accessToken', res3?.data?.data?.accessToken)
        //       window?.localStorage?.setItem('userInfo', JSON.stringify(res3?.data?.data))
        //     }).catch(() => {})
        //   }
        // }
      })
    }
  }, [account, connector])

  useEffect(() => {
    const tryLogin = (c: ConnectorNames) => {
      setTimeout(() => login(c))
    }

    const connectorId =
      typeof window?.localStorage?.getItem === 'function' &&
      (window?.localStorage?.getItem(connectorLocalStorageKey) as ConnectorNames)

    if (connectorId) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener().then(() => login(connectorId))

        return
      }
      if (connectorId === ConnectorNames.Injected) {
        // somehow injected login not working well on development mode
        injected.isAuthorized().then(async () => {
          await tryLogin(connectorId)


        })
      } else {
        tryLogin(connectorId)
      }
    } else {
      // Tự động connect lại khi người dùng bấm Disconnect và Refresh lại trang
      // injected.isAuthorized().then((isAuthorized) => {
      //   if (isAuthorized) {
      //     tryLogin(ConnectorNames.Injected)
      //   } else {
      //     // eslint-disable-next-line no-lonely-if
      //     if (isMobile && window.ethereum) {
      //       tryLogin(ConnectorNames.Injected)
      //     }
      //   }
      // })
    }
  }, [login])
}

export default useEagerConnect
