import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './infrastructure/navigation/StackNav';
import { Service } from './infrastructure/screens/Service';

export default function App() {

  return (
    <Service />
    // <NavigationContainer>
    //   <StackNavigation />
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
});

