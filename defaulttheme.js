import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './infrastructure/navigation/StackNav';
import {DefaultTheme} from '@react-navigation/native';

const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background:"transparent"
  }
}

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <StackNavigation />
    </NavigationContainer>
  );
}
