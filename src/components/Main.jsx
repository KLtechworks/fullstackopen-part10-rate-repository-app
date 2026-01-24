// Exercise 10.3: the reviewed repositories list
// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';  
import AppBar from './AppBar'
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
     
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        {/* Exercise 10.4: the app bar */}
        <AppBar />
        {/* <RepositoryList /> */}
        
        {/* Exercise 10.6: the sign-in view */}
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/sign-in" element={<SignIn />} /> 

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </View>
  );
};

export default Main;