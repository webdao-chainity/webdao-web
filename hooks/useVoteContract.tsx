import _ from 'lodash';
import {VOTE_CONTRACT_ADDRESS} from '@/constants/env';
import React, {useState, useEffect, useContext} from 'react';
import {useVoting} from '@/hooks/useContract';
import {ToastContext} from '@/context/toast';
import {parseEtherDataList, parseNumberEtherData} from '@/utils';

export const VOTE_VALUE_ENUM = {
  YES: '1',
  NO: '0',
};

const IS_PRIVATE = false;

const useVoteContract = (voteId: number | null, account: string | null | undefined) => {
  const [data, setData] = useState({});
  const [hasVoted, setHasVoted] = useState<boolean | null>(false);
  const [lastVoted, setLastVoted] = useState<string | null>(VOTE_VALUE_ENUM.NO);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const connectContract = async () => {
    try {
      const ethereum = _.get(window, 'ethereum');
      if (!ethereum) return;
      // const providerToRead = new Web3(ethereum);
      // Contract.setProvider(ethereum)

      // let eth = providerToRead?.eth;
      // @ts-ignore
      // let contractToRead = new Contract(VOTE_CONTRACT_ABI, VOTE_CONTRACT_ADDRESS);
      // contractToRead.setProvider(ethereum)
      // const dataToUse = await contractToRead.methods.viewVotingById(voteId, IS_PRIVATE).call();
      const dataToUse = await contract.viewVotingById(voteId, IS_PRIVATE);
      if (account) {
        // const dataVotedToUse = await contractToRead.methods.voterIdVoting(voteId, account).call();
        const dataVotedToUse = await contract.voterIdVoting(voteId, account);
        setHasVoted(_.get(dataVotedToUse, 'isVoted', false));
        setLastVoted(parseNumberEtherData(_.get(dataVotedToUse, 'answerVote', false)));
      } else {
        setHasVoted(null);
        setLastVoted(null);
      }
      setData(convertData(parseEtherDataList(dataToUse)));
    } catch (e) {
      console.log('connectContract', e);
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

  const handleVote = async (value: string | number) => {
    if (!contract) return false;
    try {
      // @ts-ignore
      await contract.votingFunction(voteId, IS_PRIVATE, value);
      toastSuccess('Request vote success. Waiting for update');
      return true;
    } catch (e) {
      console.log('handleVote', e);
      toastError('Vote failed');
      return false;
    }
  };

  const handleCancelVote = async () => {
    if (!contract) return false;
    try {
      // @ts-ignore
      await contract.voterCancelVoting(voteId, IS_PRIVATE, lastVoted);
      toastSuccess('Request revoke vote success. Waiting for update');
      return true;
    } catch (e) {
      console.log('handleCancelVote', e);
      toastError('Revoke vote failed');
      return false;
    }
  };

  const {toastError, toastSuccess} = useContext(ToastContext);
  const contract = useVoting(VOTE_CONTRACT_ADDRESS);

  useEffect(() => {
    if (voteId) connectContract();
  }, [voteId, account, contract]);

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

  return {
    data,
    hasVoted,
    handleVote,
    handleCancelVote,
    isFinished,
    lastVoted,
    handleCreateVoting,
  };
};

export default useVoteContract;
