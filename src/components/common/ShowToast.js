import React from 'react';
import Toast from 'react-native-root-toast';

export const showToast = (message) => {
  console.log(message);

  const keyboardHeight = 100;

  const toast = Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM - keyboardHeight,
    
    hideOnPress: true,
    delay: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    textColor: 'black',      
  });

  setTimeout(() => {
    Toast.hide(toast);
  }, 2000);
};
