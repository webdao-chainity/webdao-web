import _ from 'lodash';
import voteAbi from '@/constants/voteContractAbi.json';

export const BASE_URL = _.get(process, '.env.NEXT_PUBLIC_API_URL') || 'http://154.26.134.145:5555/';

export const VOTE_CONTRACT_ADDRESS =
  _.get(process, '.env.NEXT_PUBLIC_VOTE_ADDRESS') || '0xc95E1f96bdf7814a7DF770e5b51b1d7561d5788c';

export const VOTE_CONTRACT_ABI = voteAbi;
