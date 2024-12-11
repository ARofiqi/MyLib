import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import NavigationApp from './src/navigation/NavigationApp';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <NavigationApp />
      </NavigationContainer>
    </>
  );
};

export default App;
