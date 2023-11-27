import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../components/common/ShowToast';

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@token_key');

    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
    return null;
  }
};

export const persistToken = async value => {
  try {
    await AsyncStorage.setItem('@token_key', value);
    // showToast('token persisted');
    return true
  } catch (e) {
    showToast('error storing token', e);
    console.log("STORING:", e);
    return false
  }
};

export const removeToken = async value => {
  try {
    await AsyncStorage.removeItem('@token_key');
    // showToast('token persisted');
    return true
  } catch (e) {
    showToast('error removing token', e);
    return false
  }
};


export const getMpin = async () => {
  try {
    const value = await AsyncStorage.getItem('@mpin_key');

    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
    return null;
  }
};

export const persistMpin = async value => {
  try {
    await AsyncStorage.setItem('@mpin_key', value);
    // showToast('token persisted');
    return true
  } catch (e) {
    showToast('error storing token', e);
    console.log("STORING:", e);
    return false
  }
};

export const removeMpin = async value => {
  try {
    await AsyncStorage.removeItem('@mpin_key');
    // showToast('token persisted');
    return true
  } catch (e) {
    showToast('error removing token', e);
    return false
  }
};
