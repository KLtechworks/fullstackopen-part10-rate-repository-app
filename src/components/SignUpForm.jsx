// Exercise 10.22: the sign up form
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';
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
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const SignUpForm = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          
          await createUser({
            variables: {
              user: {
                username: values.username,
                password: values.password,
              },
            },
          });

          
          await signIn({
            username: values.username,
            password: values.password,
          });

          resetForm();
          navigate('/');  
        } catch (e) {
          console.log('Sign up error:', e.message);
          
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, touched.username && errors.username && styles.inputError]}
            placeholder="Username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            autoCapitalize="none"
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            style={[styles.input, touched.password && errors.password && styles.inputError]}
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            style={[styles.input, touched.passwordConfirmation && errors.passwordConfirmation && styles.inputError]}
            placeholder="Password confirmation"
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            value={values.passwordConfirmation}
            secureTextEntry
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
          )}

          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;