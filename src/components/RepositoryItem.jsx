// Exercise 10.3: the reviewed repositories list
import { View, Image, StyleSheet } from 'react-native';
// import { Text } from 'react-native';
import CustomText from './Text';
import theme from '../theme';

// Exercise 10.5: polished reviewed repositories list
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,           
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 5,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  languageText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: theme.fontWeights.bold,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body - 2,
  }
});

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};


const RepositoryItem = ({ item }) => {
  const repo = item;

  return (
    // // Exercise 10.3: the reviewed repositories list
    // <View>
    //   <Text>Full name: {item.fullName}</Text>
    //   <Text>Description: {item.description}</Text>
    //   <Text>Language: {item.language}</Text>
    //   <Text>Stars: {item.stargazersCount}</Text>
    //   <Text>Forks: {item.forksCount}</Text>
    //   <Text>Reviews: {item.reviewCount}</Text>
    //   <Text>Rating: {item.ratingAverage}</Text>              
    // </View>
    
    <View style={styles.container}>
     
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: repo.ownerAvatarUrl }}   
        />
        
        <View style={styles.info}>
          <CustomText fontWeight="bold" fontSize="subheading" style={{ marginBottom: 6 }}>
            {repo.fullName}
          </CustomText>
          
          <CustomText color="textSecondary" style={{ marginBottom: 6 }}>
            {repo.description || 'No description'}
          </CustomText>
          
          <View style={styles.languageTag}>
            <CustomText style={styles.languageText}>
              {repo.language || 'N/A'}
            </CustomText>
          </View>
        </View>
      </View>

     
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <CustomText style={styles.statNumber}>
            {formatCount(repo.stargazersCount)}
          </CustomText>
          <CustomText style={styles.statLabel}>Stars</CustomText>
        </View>
        
        <View style={styles.statItem}>
          <CustomText style={styles.statNumber}>
            {formatCount(repo.forksCount)}
          </CustomText>
          <CustomText style={styles.statLabel}>Forks</CustomText>
        </View>
        
        <View style={styles.statItem}>
          <CustomText style={styles.statNumber}>
            {formatCount(repo.reviewCount)}
          </CustomText>
          <CustomText style={styles.statLabel}>Reviews</CustomText>
        </View>
        
        <View style={styles.statItem}>
          <CustomText style={styles.statNumber}>
            {repo.ratingAverage}
          </CustomText>
          <CustomText style={styles.statLabel}>Rating</CustomText>
        </View>
      </View>
    </View>

    
  );
};

export default RepositoryItem;