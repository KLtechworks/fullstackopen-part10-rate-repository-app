// Exercises 10.1-10.5
// import Main from './src/components/Main';

// const App = () => {
//   return <Main />;
// };

// export default App;

// import { StatusBar } from 'expo-status-bar';

// import { NativeRouter } from 'react-router-native';

// import Main from './src/components/Main';

// const App = () => {
//   return (

//     <>
//       <NativeRouter>
//         <Main />
//       </NativeRouter>
//       <StatusBar style="auto" />
//     </>
//   );
// };

// export default App;

// Exercises 10.6-10.16
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import Constants from 'expo-constants';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

// const apolloClient = createApolloClient();
const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {

  console.log(Constants.expoConfig.extra.env);

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
        {/* <Main /> */}
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;