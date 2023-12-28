import axios from 'axios';
import { BASE_URI } from '../Constants';

export const getData = async (url, requestData = {}, token = null, headers = null) => {
  const apiUri = `${BASE_URI}${url}`;

  if (token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  }

  console.log("API url", apiUri);
  console.log("API Body", requestData);
  console.log("API Headers", headers);
  console.log("API token", token);

  try {
    const response =
      requestData != {} || headers != {}
        ? await axios.get(apiUri, { params: requestData, headers: headers })
        : await axios.get(apiUri);
    const statusCode = response.status;
    const responseJson = await response.data;
    console.log("API response", url, statusCode, responseJson);
    return { ...responseJson, statusCode };
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};