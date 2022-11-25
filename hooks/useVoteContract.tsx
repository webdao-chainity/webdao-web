import _ from 'lodash';
import Web3 from 'web3';
import {VOTE_CONTRACT_ABI, VOTE_CONTRACT_ADDRESS} from '@/constants/env';
import {useState, useEffect} from 'react';
import useActiveWeb3React from '@/hooks/useActiveWeb3React';
import {getContract} from '@/utils/contractHelpers';
import {getProviderOrSigner} from '@/utils';

export const VOTE_VALUE_ENUM = {
  YES: 1,
  NO: 0,
};

const IS_PRIVATE = false;

const useVoteContract = (voteId: string | number, account: string | null | undefined) => {
  const {library} = useActiveWeb3React();
  // @ts-ignore
  const signer = getProviderOrSigner(library, account);
  const contract = getContract(VOTE_CONTRACT_ABI, VOTE_CONTRACT_ADDRESS, signer);
  console.log(library, 'dasdsadas', contract);
  const [data, setData] = useState({});
  const [hasVoted, setHasVoted] = useState(true);
  const connectContract = async () => {
    try {
      const ethereum = _.get(window, 'ethereum');
      if (!ethereum) return {data: {}, contract: null};
      const providerToRead = new Web3(Web3.givenProvider);
      // @ts-ignore
      let contractToRead = new providerToRead.eth.Contract(
        VOTE_CONTRACT_ABI,
        VOTE_CONTRACT_ADDRESS
      );
      const dataToUse = await contractToRead.methods.viewVotingById(voteId, IS_PRIVATE).call();
      if (account) {
        const dataVotedToUse = await contractToRead.methods.voterIdVoting(voteId, account).call();
        setHasVoted(dataVotedToUse);
      }
      setData(convertData(dataToUse));
    } catch (e) {
      console.log(e);
    }
  };

  const convertData = (value: any) => {
    const keyMap = [
      'Description',
      'Currency',
      'Min voter',
      'Max Voter',
      'Start time',
      'End time',
      'Number of Yes votes',
      'Number of No votes',
      'Is finished',
    ];
    const mappedData: any = {};
    keyMap.map((el: string, index: number) => {
      if (el > value.length) return;
      mappedData[el] = value[index];
    });
    return mappedData;
  };

  const handleVote = async (value: number) => {
    if (!contract) return false;
    try {
      await contract.votingFunction(voteId, IS_PRIVATE, value);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const handleCancelVote = async () => {
    if (!contract) return false;
    try {
      await contract.voterCancelVoting(voteId, IS_PRIVATE, VOTE_VALUE_ENUM.NO);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useEffect(() => {
    connectContract();
  }, [voteId, account]);

  return {data, contract, hasVoted, handleVote, handleCancelVote};
};

export default useVoteContract;
