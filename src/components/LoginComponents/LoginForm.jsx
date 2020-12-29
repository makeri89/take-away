import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from '../UIcomponents/Text';
import FormikTextInput from '../UIcomponents/FormikTextInput';
import Button from '../UIcomponents/Button';

import useLogin from '../../hooks/useLogin';

const initialValues = {
  username: '',
  password: ''
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 10,
    // position: 'relative',
    // top: 250,
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
    paddingVertical: 20
  },
  signUpButton: {
    // backgroundColor: '#555555'
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Username is required')
});

const Form = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <Text fontSize='header' fontWeight='bold' style={styles.header}>Log in here</Text>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <Button text='Login' onPress={onSubmit} />
    </View>
  );
};

const LoginForm = ({ navigation, setIsLoggedIn }) => {
  const [login] = useLogin();

  const onSubmit = async (values) => {
    // console.log('values', values);
    const { username, password } = values;
    // console.log(username);
    try {
      await login({ username, password});
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

export default LoginForm;