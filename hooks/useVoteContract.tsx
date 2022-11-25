import _ from 'lodash';
import Web3 from 'web3';
import {VOTE_CONTRACT_ABI, VOTE_CONTRACT_ADDRESS} from '@/constants/env';
import {useState, useEffect} from 'react';
import {useVoting} from '@/hooks/useContract';
import useToast from '@/hooks/useToast';

export const VOTE_VALUE_ENUM = {
  YES: '1',
  NO: '0',
};

const IS_PRIVATE = false;

const useVoteContract = (voteId: number | null, account: string | null | undefined) => {
  console.log(voteId);
  const {toastError, toastSuccess} = useToast();
  const contract = useVoting(VOTE_CONTRACT_ADDRESS);
  const [data, setData] = useState({});
  const [hasVoted, setHasVoted] = useState<boolean | null>(false);
  const [lastVoted, setLastVoted] = useState<string | null>(VOTE_VALUE_ENUM.NO);
  const [isFinished, setIsFinished] = useState<boolean>(false);
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
        setHasVoted(_.get(dataVotedToUse, 'isVoted', false));
        setLastVoted(_.get(dataVotedToUse, 'answerVote', false));
      } else {
        setHasVoted(null);
        setLastVoted(null);
      }
      setData(convertData(dataToUse));
      console.log(dataToUse);
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
      'Vote result',
      'Is finished',
    ];
    const mappedData: any = {};
    keyMap.map((el: string, index: number) => {
      if (el > value.length) return;
      mappedData[el] = value[index];
    });
    const isFinishedValue = _.get(mappedData, 'Is finished') == 1;
    mappedData['Is finished'] = isFinishedValue;
    setIsFinished(isFinishedValue);
    return mappedData;
  };

  const handleVote = async (value: string) => {
    if (!contract) return false;
    try {
      await contract.votingFunction(voteId, IS_PRIVATE, value);
      toastSuccess('Request vote success. Waiting for update');
      return true;
    } catch (e) {
      console.log(e);
      toastError('Vote failed');
      return false;
    }
  };

  const handleCancelVote = async () => {
    if (!contract) return false;
    try {
      await contract.voterCancelVoting(voteId, IS_PRIVATE, lastVoted);
      toastSuccess('Request revoke vote success. Waiting for update');
      return true;
    } catch (e) {
      console.log(e);
      toastError('Revoke vote failed');
      return false;
    }
  };

  useEffect(() => {
    if (voteId) connectContract();
  }, [voteId, account]);

  const handleCreateVoting = (value: any) => {
    const {description, currency, minVoter, maxVoter, startTime, endTime} = value;
    return contract.createVoting(
      voteId,
      IS_PRIVATE,
      description,
      currency,
      minVoter,
      maxVoter,
      startTime,
      endTime
    );
  };

  useEffect(() => {
    connectContract();
  }, [voteId, account]);

  return {
    data,
    contract,
    hasVoted,
    handleVote,
    handleCancelVote,
    isFinished,
    lastVoted,
    handleCreateVoting,
  };
};

export default useVoteContract;
