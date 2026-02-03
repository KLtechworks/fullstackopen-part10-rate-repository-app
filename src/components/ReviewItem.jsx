// Exercise 10.25: the user's reviews view
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
// Exercise 10.26: review actions
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  container: {
    flexDirection: 'row',
  },
  ratingCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#0066ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066ff',
  },
  content: {
    flex: 1,
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: 'gray',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d73a4a',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// Exercise 10.26: review actions
const ReviewItem = ({ review, refetch, deleteReview }) => {
  const navigate = useNavigate();
  const date = new Date(review.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '.');

  // Exercise 10.26: review actions
  const handleViewRepo = () => {
    navigate(`/repository/${review.repositoryId}`);  
    
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "CANCEL", style: "cancel" },
        { 
          text: "DELETE", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: review.id } });
              refetch();  
            } catch (e) {
              Alert.alert("Error", "Failed to delete review");
            }
          }
        },
      ]
    );
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.repoName}>{review.repository.fullName}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>

      {/* Exercise 10.26: review actions */}
      <View style={styles.buttons}>
        <Pressable style={styles.viewButton} onPress={handleViewRepo}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};


export default ReviewItem;