// Exercise 10.18: testing the sign in form
import { Formik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    fontSize: 14,
    marginBottom: 15,
    marginTop: -10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              touched.username && errors.username && styles.inputError,
            ]}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            autoCapitalize="none"
            testID="usernameField"
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            style={[
              styles.input,
              touched.password && errors.password && styles.inputError,
            ]}
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
            autoCapitalize="none"
            testID="passwordField"
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <Pressable onPress={handleSubmit} style={styles.button} testID="submitButton">
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};
