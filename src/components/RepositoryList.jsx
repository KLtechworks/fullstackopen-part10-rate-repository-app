// Exercise 10.1-10.10
// import { FlatList, View, StyleSheet } from 'react-native';
// import RepositoryItem from './RepositoryItem';

// const styles = StyleSheet.create({
//   separator: {
//     height: 10,
//   },
// });

// const repositories = [
//   {
//     id: 'jaredpalmer.formik',
//     fullName: 'jaredpalmer/formik',
//     description: 'Build forms in React, without the tears',
//     language: 'TypeScript',
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
//   },
//   {
//     id: 'rails.rails',
//     fullName: 'rails/rails',
//     description: 'Ruby on Rails',
//     language: 'Ruby',
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
//   },
//   {
//     id: 'django.django',
//     fullName: 'django/django',
//     description: 'The Web framework for perfectionists with deadlines.',
//     language: 'Python',
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
//   },
//   {
//     id: 'reduxjs.redux',
//     fullName: 'reduxjs/redux',
//     description: 'Predictable state container for JavaScript apps',
//     language: 'TypeScript',
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
//   },
// ];

// const ItemSeparator = () => <View style={styles.separator} />;

// const RepositoryList = () => {
//   return (
//     <FlatList
//       data={repositories}
//       ItemSeparatorComponent={ItemSeparator}
//       // Exercise 10.3: the reviewed repositories list
//       renderItem={({ item }) => <RepositoryItem item={item} />}
      
//       keyExtractor={({ id }) => id}
//     />
//   );
// };

// export default RepositoryList;

//Http requests notes
// import { useState, useEffect } from 'react';
// import { FlatList, View,  Text } from 'react-native';
// // import { StyleSheet } from 'react-native';
// import RepositoryItem from './RepositoryItem';

// const RepositoryList = () => {
//   const [repositories, setRepositories] = useState(null);

//   const fetchRepositories = async () => {
//     // Replace the IP address part with your own IP address!
//     // const response = await fetch('http://192.168.1.58:5001/api/repositories');
//     // const json = await response.json();

//     // console.log(json);

//     // setRepositories(json);
//     try {
//       const response = await fetch('http://192.168.1.58:5001/api/repositories');
//       const json = await response.json();
//       console.log(json);
//       setRepositories(json);
//     } catch (error) {
//       console.error('error', error);
//     }
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   // Get the nodes from the edges array
//   const repositoryNodes = repositories
//     ? repositories.edges.map(edge => edge.node)
//     : [];

//   if (repositoryNodes.length === 0) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={repositoryNodes}
//       renderItem={({ item }) => <RepositoryItem item={item} />}   
//       keyExtractor={(item) => item.id}                             
           
//     />
//   );
// };

// export default RepositoryList;

// Exercise 10.11: fetching repositories with Apollo Client
import { FlatList, View, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';  

const RepositoryList = () => {
  const { repositories, loading} = useRepositories();   

  // const repositoryNodes = repositories
  //   ? repositories.edges.map(edge => edge.node)
  //   : [];
  const repositoryNodes = repositories || [];
  
  if (loading || repositoryNodes.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
      
      ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: '#f0f0f0' }} />}
    />
  );
};

export default RepositoryList;