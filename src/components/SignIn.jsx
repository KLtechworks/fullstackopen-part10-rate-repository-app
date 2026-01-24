// Exercise 10.6: the sign-in view
// import Text from './Text';

// const SignIn = () => {
//   return <Text>The sign-in view</Text>;
// };

// export default SignIn;

// Exercise 10.8: the sign-in form
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
// Exercise 10.9: validating the sign-in form
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
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

// Exercise 10.9: validating the sign-in form
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username must be filled'),               

  password: yup
    .string()
    .min(5, 'with a range of 5-30 characters')                     
    .required('Password must be filled'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);  
    },
  });

  return (
    <View style={styles.container}>
      
      <TextInput
        // style={styles.input}
        // Exercise 10.9: validating the sign-in form
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.inputError
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        autoCapitalize="none"          
      />
      {/* // Exercise 10.9: validating the sign-in form */}
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        // style={styles.input}
        // Exercise 10.9: validating the sign-in form
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.inputError
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')} 
        secureTextEntry={true}         
        autoCapitalize="none"
      />
      {/* // Exercise 10.9: validating the sign-in form */}
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <Pressable 
        style={styles.button}
        onPress={formik.handleSubmit}   
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;