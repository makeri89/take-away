import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './UIcomponents/Text';
import FormikTextInput from './UIcomponents/FormikTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

const initialValues = {
  username: '',
  password: ''
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 10,
    position: 'relative',
    top: 250
  },
  actionButton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    overflow: 'hidden'
  },
  header: {
    textAlign: 'center',
    paddingVertical: 20
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
      <TouchableOpacity onPress={onSubmit}>
        <Text style={styles.actionButton}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoginForm = ({ navigation }) => {
  const onSubmit = (values) => {
    console.log(values);
    Alert.alert('Logged in');
    navigation.navigate('home');
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