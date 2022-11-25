import useActiveWeb3React from '@/hooks/useActiveWeb3React';
import {useMemo} from 'react';
import {getBep20ContractBSC} from '@/utils/contractHelpers';

export const useERC20BSC = (address: string, withSignerIfPossible = true) => {
  const {library, account} = useActiveWeb3React();
  return useMemo(
    () => getBep20ContractBSC(address, undefined),
    [account, address, library, withSignerIfPossible]
  );
};
