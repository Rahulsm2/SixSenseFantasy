import React from 'react';
import Main from './src/Main';
import { Provider } from 'react-redux';

import configureStore from './src/store';
const store = configureStore()

const App = () => {

  return (
    <Provider store = { store }>
      <Main />
    </Provider>
  );
}

export default App;