// Exercise 10.25: the user's reviews view
// Exercise 10.26: review actions
import { FlatList, Text } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER, DELETE_REVIEW } from '../graphql/queries';  
import ReviewItem from './ReviewItem';

const MyReviewsList = () => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },  
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) return <Text>Loading your reviews...</Text>;

  const reviews = data?.me?.reviews?.edges || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ node }) => node.id}
      // Exercise 10.26: review actions (added refetch and deleteReview)
      renderItem={({ item }) => <ReviewItem review={item.node} refetch={refetch} deleteReview={deleteReview}/>}
      ListEmptyComponent={<Text>You haven&apos;t left any reviews yet!</Text>}
    />
  );
};

export default MyReviewsList;