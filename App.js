import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './infrastructure/navigation/StackNav';
import { Home } from './infrastructure/screens/Home';

export default function App() {

  return (
    // <NavigationContainer>
    //   <StackNavigation />
    // </NavigationContainer>
    <Home />
  );
}

const styles = StyleSheet.create({
 
});

