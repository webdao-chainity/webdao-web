import type {Signer} from '@ethersproject/abstract-signer';
import type {Provider} from '@ethersproject/providers';
import bep20Abi from '@/abi/erc20.json';
import pancakeswapAbi from '@/abi/pancakeswapAbi.json';
import {Contract} from '@ethersproject/contracts';
import {simpleRpcProvider} from '@/utils/providers';
import {Erc20} from '@/abi/types/Erc20';
import {IPancakeRouter02} from '@/abi/types/IPancakeRouter02';
import {VOTE_CONTRACT_ABI, VOTE_CONTRACT_ADDRESS} from '@/constants/env';

export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(bep20Abi, address, signer) as Erc20;
};

export const getBep20ContractBSC = (address: string, signer?: Signer | Provider) => {
  return getContract(pancakeswapAbi, address, signer) as IPancakeRouter02;
};

export const getVotingContract = (address: string, signer?: Signer | Provider) => {
  return getContract(VOTE_CONTRACT_ABI, address, signer);
};
