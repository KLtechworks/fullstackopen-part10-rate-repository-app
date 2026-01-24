// Exercises 10.1-10.5
// import Main from './src/components/Main';

// const App = () => {
//   return <Main />;
// };

// export default App;

import { StatusBar } from 'expo-status-bar';

import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';

const App = () => {
  return (

    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
