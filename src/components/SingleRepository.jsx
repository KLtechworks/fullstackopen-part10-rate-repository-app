// Exercise 10.19: the single repository view
// import { View, Text } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
// Exercise 10.20: repository's review list
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';

const styles = StyleSheet.create({
  list: { flex: 1 },
  reviewContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,          
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0366d6',
  },
  reviewContent: { flex: 1 },
  username: { fontWeight: 'bold', fontSize: 16 },
  date: { color: '#586069', marginBottom: 5 },
  text: { fontSize: 14 },
  separator: { height: 10, backgroundColor: '#e1e4e8' },
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showOpenButton={true} />;
};

const ReviewItem = ({ review }) => {
  const formattedDate = format(parseISO(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  // Exercise 10.27: infinite scrolling for reviews
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 8 },
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const repository = data?.repository;

  if (!repository) return null;

  const reviews = repository.reviews?.edges?.map(edge => edge.node) || [];

  // Exercise 10.27: fetch more reviews when end of list is reached
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first: 8,
      },
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.list}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
