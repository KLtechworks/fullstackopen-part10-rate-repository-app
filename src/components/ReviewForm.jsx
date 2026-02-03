// Exercise 10.21: the review form
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/queries';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white', flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
  },
  multiline: { height: 120, textAlignVertical: 'top' },
  inputError: { borderColor: '#d73a4a' },
  errorText: { color: '#d73a4a', marginBottom: 10 },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

const validationSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required('Repository owner name is required'),
  repositoryName: Yup.string()
    .required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: Yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const { data } = await createReview({
            variables: {
              review: {
                ownerName: values.ownerName,
                repositoryName: values.repositoryName,
                rating: Number(values.rating),  
                text: values.text || undefined,  
              },
            },
          });

          const repoId = data.createReview.repositoryId;
          resetForm();  
          navigate(`/repository/${repoId}`);  
        } catch (e) {
          console.log('Create review error:', e.message);
          
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, touched.ownerName && errors.ownerName && styles.inputError]}
            placeholder="Repository owner name"
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          <TextInput
            style={[styles.input, touched.repositoryName && errors.repositoryName && styles.inputError]}
            placeholder="Repository name"
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          <TextInput
            style={[styles.input, touched.rating && errors.rating && styles.inputError]}
            placeholder="Rating between 0 and 100"
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            keyboardType="numeric"
          />
          {touched.rating && errors.rating && (
            <Text style={styles.errorText}>{errors.rating}</Text>
          )}

          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Review"
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
            multiline
            numberOfLines={5}
          />
         

          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};


export default ReviewForm;