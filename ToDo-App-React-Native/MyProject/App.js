import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyToDoScreen from './screens/MyToDoScreen';  

const App = () => {
  return (
    <NavigationContainer>
      <MyToDoScreen />
    </NavigationContainer>
  );
}

export default App;
