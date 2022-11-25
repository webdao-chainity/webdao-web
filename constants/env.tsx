import _ from 'lodash';
import voteAbi from '@/constants/voteContractAbi.json';

export const BASE_URL = _.get(process, '.env.NEXT_PUBLIC_API_URL') || 'http://154.26.134.145:5555/';

export const VOTE_CONTRACT_ADDRESS =
  _.get(process, '.env.NEXT_PUBLIC_VOTE_ADDRESS') || '0x78B534F2B83863C21FabE5447e7af4ee71ddfC55';

export const VOTE_CONTRACT_ABI = voteAbi;
