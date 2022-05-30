import axios, { AxiosResponse } from 'axios';

export const evaluateToken = (token: string, apiUrl: string): Promise<AxiosResponse<boolean>> => {
  const config = {
    headers: {
      token,
    },
  };

  const requestUrl = `${apiUrl}`;
  const response = axios.get<boolean>(requestUrl, config);

  return response;
};
