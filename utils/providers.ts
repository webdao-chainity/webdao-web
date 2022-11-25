import { StaticJsonRpcProvider } from '@ethersproject/providers'
import getRpcUrl from '@/utils/getRpcUrl'

const RPC_URL = getRpcUrl()

// const ETH_RPC_URL = 'https://api.mycryptoapi.com/eth'

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL)
// export const simpleETHRpcProvider = new StaticJsonRpcProvider(ETH_RPC_URL)

export default null
