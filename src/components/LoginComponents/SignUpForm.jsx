import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';

import FormikTextInput from '../UIcomponents/FormikTextInput';
import Button from '../UIcomponents/Button';
import Text from '../UIcomponents/Text';
import useSingUp from '../../hooks/useSignUp';
import useLogin from '../../hooks/useLogin';

const initialValues = {
  name: '',
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 30,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#555555',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 5
  },
  header: {
    textAlign: 'center',
    paddingVertical: 10
  }
});

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('A name is required'),
  email: yup
    .string()
    .email()
    .required('Email is required'),
  username: yup
    .string()
    .min(5, 'username must be at least 5 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(12, 'Password must be at least 12 characters long')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required')
});

const Form = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text fontSize='header' fontWeight='bold' style={styles.header}>
        Sign up
      </Text>
      <FormikTextInput name='name' placeholder='Your name' />
      <FormikTextInput name='email' placeholder='Email address' />
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput name='passwordConfirm' placeholder='Password confirmation' secureTextEntry />
      <Button text='Sign up' onPress={onSubmit} />
    </View>
  );
};

const SignUpForm = ({ navigation, setIsLoggedIn }) => {
  const [signUp] = useSingUp();
  const [login] = useLogin();

  const onSubmit = async (values) => {
    const { name, email, username, password } = values;

    try {
      const { data } = await signUp({ name, username, email, password });
      console.log(data);
      const { loginData } = await login({ username, password });
      console.log(loginData);
      setIsLoggedIn(true);
      navigation.navigate('home');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpForm;