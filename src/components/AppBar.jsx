// Exercise 10.4: the app bar
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
// import {Pressable } from 'react-native'
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
// Exercise 10.16: sign out
import { useQuery, gql } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',  
    paddingBottom: 15,                       
    paddingLeft: 10,    
    paddingRight: 10,
  },
  scroll: {
    
  },
  tab: {    
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tabText: {
    color: 'white',                          
    fontSize: 18,
    fontWeight: 'bold',
  }
});

const AppBar = () => {
  // Exercise 10.16: sign out
  const { data, loading } = useQuery(GET_ME);   
  const authStorage = useAuthStorage();         
  const apolloClient = useApolloClient();       
  const navigate = useNavigate();               

  const isSignedIn = !!data?.me;

  const handleSignOut = async () => {
    
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();

    navigate('/');
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.tabText}>Loading...</Text>
      </View>
    );
  }

  return (
        // Exercise 10.4: the app bar
        // <View style={styles.container}>
        //     <Pressable>
        //         <Text style={styles.tabText}>Repositories</Text>
        //     </Pressable>
        // </View>
    // Exercise 10.6: the sign-in view
    // <View style={styles.container}>
    //   <ScrollView horizontal contentContainerStyle={styles.scroll}>
    //     <Link to="/" style={styles.tab}>
    //       <Text style={styles.tabText}>Repositories</Text>
    //     </Link>

    //     <Link to="/sign-in" style={styles.tab}>
    //       <Text style={styles.tabText}>Sign in</Text>
    //     </Link>
    //   </ScrollView>
    // </View>

    // Exercise 10.7: scrollable app bar
    <View style={styles.container}>

      <ScrollView 
        horizontal                
        showsHorizontalScrollIndicator={false}  
      >
        <Link to="/" style={styles.tab}>
          <Text style={styles.tabText}>Repositories</Text>
        </Link>

        {/* <Link to="/sign-in" style={styles.tab}>
          <Text style={styles.tabText}>Sign in</Text>
        </Link> */}

        {/* Exercise 10.16: sign out  */}
        {isSignedIn ? (
          <Pressable style={styles.tab} onPress={handleSignOut}>
            <Text style={styles.tabText}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/sign-in" style={styles.tab}>
            <Text style={styles.tabText}>Sign in</Text>
          </Link>
        )}

        <Link to="/test1" style={styles.tab}>
          <Text style={styles.tabText}>Test 1</Text>
        </Link>

        <Link to="/test2" style={styles.tab}>
          <Text style={styles.tabText}>Test 2</Text>
        </Link>

        <Link to="/test3" style={styles.tab}>
          <Text style={styles.tabText}>Test 3</Text>
        </Link>

        <Link to="/test4" style={styles.tab}>
          <Text style={styles.tabText}>Test 4</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;