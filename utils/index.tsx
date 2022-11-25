import {JsonRpcSigner, Web3Provider} from '@ethersproject/providers';

export const truncateString = (value: string, maxLength = 36) => {
  try {
    if (value && value.length > maxLength) {
      return `${value.slice(0, maxLength - 1)} ...`;
    } else {
      return value;
    }
  } catch (error) {
    console.log('Truncate string failed: ', error);
  }
};

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export const parseIntValue = (value: string | null) => {
  try {
    if (value == null) return null;
    return parseInt(value);
  } catch (e) {
    console.log(e);
    return null;
  }
};
