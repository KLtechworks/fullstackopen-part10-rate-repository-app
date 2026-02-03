// Exercise 10.6: the sign-in view
// import Text from './Text';

// const SignIn = () => {
//   return <Text>The sign-in view</Text>;
// };

// export default SignIn;

// Exercise 10.8: the sign-in form
// import { TextInput, Pressable, View, StyleSheet } from 'react-native';
// import { useFormik } from 'formik';
// import  Text from './Text';
//
// // Exercise 10.15: storing the access token step2
// import { useNavigate } from 'react-router-native';
// // Exercise 10.9: validating the sign-in form
// import * as yup from 'yup';
// // Exercise 10.13: the sign in form mutation
// import useSignIn from '../hooks/useSignIn';
//
// // Exercise 10.14: storing the access token step1
// import AuthStorage from '../utils/authStorage';
//
//
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 12,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   inputError: {
//     borderColor: '#d73a4a',
//   },
//   errorText: {
//     color: '#d73a4a',
//     fontSize: 14,
//     marginBottom: 15,
//     marginLeft: 5,
//   },
//   button: {
//     backgroundColor: '#0366d6',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
//
// // Exercise 10.9: validating the sign-in form
// const validationSchema = yup.object().shape({
//   username: yup
//     .string()
//     .required('Username must be filled'),
//
//   password: yup
//     .string()
//     .min(5, 'with a range of 5-30 characters')
//     .required('Password must be filled'),
// });
//
// const initialValues = {
//   username: '',
//   password: '',
// };
//
//
// const SignIn = () => {
//   // Exercise 10.13: the sign in form mutation
//   const [signIn, result] = useSignIn();
//
//   // Exercise 10.15: storing the access token step2
//   const navigate = useNavigate();
//
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     // onSubmit: (values) => {
//     //   console.log(values);
//     // },
//
//     // Exercise 10.13: the sign in form mutation
//     onSubmit: async (values) => {
//       const { username, password } = values;
//
//       try {
//         const data = await signIn({ username, password });
//         console.log('signin success,Server response：', data);
//
//         // Exercise 10.14: storing the access token step1
//         const token = data.authenticate.accessToken;
//         const authStorage = new AuthStorage();
//         await authStorage.setAccessToken(token);
//         console.log('Token stored');
//
//         // Exercise 10.15: storing the access token step2
//         if (data?.authenticate?.accessToken) {
//           navigate('/repositories');
//         }
//
//       } catch (e) {
//         console.log('error', e.message);
//
//       }
//     },
//   });
//
//   return (
//     <View style={styles.container}>
//
//       <TextInput
//         // style={styles.input}
//         // Exercise 10.9: validating the sign-in form
//         style={[
//           styles.input,
//           formik.touched.username && formik.errors.username && styles.inputError
//         ]}
//         placeholder="Username"
//         value={formik.values.username}
//         onChangeText={formik.handleChange('username')}
//         onBlur={formik.handleBlur('username')}
//         autoCapitalize="none"
//       />
//       {/* // Exercise 10.9: validating the sign-in form */}
//       {formik.touched.username && formik.errors.username && (
//         <Text style={styles.errorText}>{formik.errors.username}</Text>
//       )}
//
//       <TextInput
//         // style={styles.input}
//         // Exercise 10.9: validating the sign-in form
//         style={[
//           styles.input,
//           formik.touched.password && formik.errors.password && styles.inputError
//         ]}
//         placeholder="Password"
//         value={formik.values.password}
//         onChangeText={formik.handleChange('password')}
//         onBlur={formik.handleBlur('password')}
//         secureTextEntry={true}
//         autoCapitalize="none"
//       />
//       {/* // Exercise 10.9: validating the sign-in form */}
//       {formik.touched.password && formik.errors.password && (
//         <Text style={styles.errorText}>{formik.errors.password}</Text>
//       )}
//
//       <Pressable
//         style={styles.button}
//         onPress={formik.handleSubmit}
//
//         disabled={result.loading}
//       >
//         {/* <Text style={styles.buttonText}>Sign in</Text> */}
//         <Text style={styles.buttonText}>
//           {result.loading ? 'Signing in...' : 'Sign in'}
//         </Text>
//       </Pressable>
//     </View>
//   );
// };
//
// export default SignIn;

// Exercise 10.18: testing the sign in form
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';
import { SignInContainer } from './SignInContainer';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log('signin success,Server response：', data);

      const token = data.authenticate.accessToken;
      const authStorage = new AuthStorage();
      await authStorage.setAccessToken(token);
      console.log('Token stored');

      if (data?.authenticate?.accessToken) {
        navigate('/repositories');
      }

    } catch (e) {
      console.log('error', e.message);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;