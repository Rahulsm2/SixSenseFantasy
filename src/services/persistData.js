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

//Node tockens actions 

export const getNodeToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@node_token_key');

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

export const persistNodeToken = async value => {
  try {
    await AsyncStorage.setItem('@node_token_key', value);
    // showToast('token persisted');
    return true
  } catch (e) {
    showToast('error storing node token', e);
    console.log("Node STORING:", e);
    return false
  }
};

export const removeNodeToken = async value => {
  try {
    await AsyncStorage.removeItem('@node_token_key');
    // showToast('token persisted');
    return true
  } catch (e) {
    showToast('error removing node token', e);
    return false
  }
};

export const getNodeUser = async () => {
  try {
    const value = await AsyncStorage.getItem('@node_user_key');

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

export const persistNodeUser = async value => {
  try {
    await AsyncStorage.setItem('@node_user_key', value);
    // showToast('token persisted');
    return true
  } catch (e) {
    showToast('error storing node user', e);
    console.log("Node STORING:", e);
    return false
  }
};

export const removeNodeUser = async value => {
  try {
    await AsyncStorage.removeItem('@node_user_key');
    // showToast('token persisted');
    return true
  } catch (e) {
    showToast('error removing node user', e);
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