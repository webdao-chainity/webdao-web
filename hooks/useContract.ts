import useActiveWeb3React from '@/hooks/useActiveWeb3React';
import {useMemo} from 'react';
import {getBep20ContractBSC, getVotingContract} from '@/utils/contractHelpers';
import {getProviderOrSigner} from '@/utils';

export const useERC20BSC = (address: string, withSignerIfPossible = true) => {
  const {library, account} = useActiveWeb3React();
  return useMemo(
    () => getBep20ContractBSC(address, undefined),
    [account, address, library, withSignerIfPossible]
  );
};

export const useVoting = (address: string, withSignerIfPossible = true) => {
  const {library, account} = useActiveWeb3React();

  return useMemo(
    () =>
      getVotingContract(
        address,
        withSignerIfPossible && library && account
          ? getProviderOrSigner(library, account)
          : undefined
      ),
    [account, address, library, withSignerIfPossible]
  );
};
