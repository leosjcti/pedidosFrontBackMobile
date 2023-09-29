import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvier } from './src/contexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvier>
        <StatusBar backgroundColor="#1d1d2e" barStyle={'light-content'}translucent={false} />
        <Routes/>
      </AuthProvier>
    </NavigationContainer>
  );
}


