// Exercise 10.17: testing the reviewed repositories list
// import { FlatList, View } from 'react-native';
// import RepositoryItem from './RepositoryItem';
//
// export const RepositoryListContainer = ({ repositories }) => {
//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];
//
//   return (
//     <FlatList
//       data={repositoryNodes}
//       renderItem={({ item }) => <RepositoryItem item={item} />}
//       keyExtractor={(item) => item.id}
//       ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: '#f0f0f0' }} />}
//     />
//   );
// };
//
// export default RepositoryListContainer;

// Exercise 10.19: the single repository view
// import { FlatList, View, Pressable } from 'react-native';
// import { useNavigate } from 'react-router-native';
// import RepositoryItem from './RepositoryItem';

// export const RepositoryListContainer = ({ repositories }) => {
//   const navigate = useNavigate();

//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];

//   return (
//     <FlatList
//       data={repositoryNodes}
//       renderItem={({ item }) => (
//         <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
//           <RepositoryItem item={item} />
//         </Pressable>
//       )}
//       keyExtractor={(item) => item.id}
//       ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: '#f0f0f0' }} />}
//     />
//   );
// };

// export default RepositoryListContainer;

// Exercise 10.23: sorting the reviewed repositories list
// import { FlatList, View, Pressable } from 'react-native';
// import { useNavigate } from 'react-router-native';
// import { Picker } from '@react-native-picker/picker';
// import RepositoryItem from './RepositoryItem';

// export const RepositoryListContainer = ({ repositories, sortBy, setSortBy }) => {
//   const navigate = useNavigate();

//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];

//   return (
//     <FlatList
//       data={repositoryNodes}
//       renderItem={({ item }) => (
//         <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
//           <RepositoryItem item={item} />
//         </Pressable>
//       )}
//       keyExtractor={(item) => item.id}
//       ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: '#f0f0f0' }} />}
//       ListHeaderComponent={
//         <View style={{ padding: 10 }}>
//           <Picker
//             selectedValue={sortBy}
//             onValueChange={(itemValue) => setSortBy(itemValue)}
//           >
//             <Picker.Item label="Latest repositories" value="Latest" />
//             <Picker.Item label="Highest rated repositories" value="Highest" />
//             <Picker.Item label="Lowest rated repositories" value="Lowest" />
//           </Picker>
//         </View>
//       }
//     />
//   );
// };

// export default RepositoryListContainer;

// Exercise 10.24: filtering the reviewed repositories list
import React from 'react';
import { FlatList, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  searchInput: {
    padding: 12,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 16,
  },
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortBy, setSortBy, searchKeyword, setSearchKeyword } = this.props;

    return (
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search repositories..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          autoCapitalize="none"
        />
        <View style={{ padding: 10 }}>
          <Picker
            selectedValue={sortBy}
            onValueChange={(itemValue) => setSortBy(itemValue)}
          >
            <Picker.Item label="Latest repositories" value="Latest" />
            <Picker.Item label="Highest rated repositories" value="Highest" />
            <Picker.Item label="Lowest rated repositories" value="Lowest" />
          </Picker>
        </View>
      </View>
    );
  };

  render() {
    const { repositories, navigate, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: '#f0f0f0' }} />}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;