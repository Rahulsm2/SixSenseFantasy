import axios from 'axios';
import {BASE_URI} from '../Constants';

export const postData = async (url, requestData=null, token = null) => {
  const apiUri = `${BASE_URI}${url}`;

  if (token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  }

  console.log("API url",apiUri);
  console.log("API Body",requestData);
  console.log("API token",token);

  try {
    const response = await axios.post(apiUri, requestData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const statusCode = response.status;
    const responseJson = response.data;
    console.log(url, statusCode, responseJson);
    return {...responseJson, statusCode};
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error;
  }
};

export const getData = async (url, requestData = {}, token = null) => {
  const apiUri = `${BASE_URI}${url}`;
  if (token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  }

  console.log("API url",apiUri);
  console.log("API Body",requestData);
  console.log("API token",token);

  try {
    const response =
      requestData != {}
        ? await axios.get(apiUri, {params: requestData})
        : await axios.get(apiUri);
    const statusCode = response.status;
    const responseJson = await response.data;
    console.log("API response", url, statusCode, responseJson);
    return {...responseJson, statusCode};
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};
