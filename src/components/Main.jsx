// Exercise 10.3: the reviewed repositories list
// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar'
import SignIn from './SignIn';
// Exercise 10.19: the single repository view
import SingleRepository from './SingleRepository';
// Exercise 10.21: the review form
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
// Exercise 10.25: the user's reviews view
import MyReviewsList from './MyReviewsList';

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
          {/* Exercise 10.19: the single repository view */}
          <Route path="/repository/:id" element={<SingleRepository />} />
          {/* Exercise 10.21: the review form */}
          <Route path="/create-review" element={<ReviewForm />} />
          {/* Exercise 10.22: the sign up form */}
          <Route path="/sign-up" element={<SignUpForm />} />
          {/* Exercise 10.25: the user's reviews view */}
          <Route path="/my-reviews" element={<MyReviewsList />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </View>
  );
};

export default Main;