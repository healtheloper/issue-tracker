export const checkIfUrlHasQuery = (
  queryKey: string,
  queryValue: string | number,
) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.getAll(queryKey).includes(String(queryValue));
};

export const makeUrlQuery = (
  method: 'delete' | 'set',
  queryKey: string,
  queryValue?: string,
) => {
  const searchParams = new URLSearchParams(window.location.search);

  switch (method) {
    case 'delete':
      searchParams.delete(queryKey);
      break;
    case 'set': {
      if (!queryValue) break;
      searchParams.set(queryKey, queryValue);
      break;
    }
    default:
      throw new Error('invalid method');
  }

  return searchParams.toString();
};

export const convertInputValueToQuery = (inputValue: string) => {
  const queryString = inputValue.replaceAll(':', '=').replaceAll(' ', '&');
  return queryString;
};

export const convertUrlToInputValue = () => {
  const queryString = window.location.search;
  const inputValue = queryString
    .slice(1)
    .replaceAll('=', ':')
    .replaceAll('&', ' ');
  return inputValue;
};
