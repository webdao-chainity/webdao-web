import _ from 'lodash';

export const BASE_URL = _.get(process, '.env.NEXT_PUBLIC_API_URL') || 'http://154.26.134.145:5555/'