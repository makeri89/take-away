import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Button from '../UIcomponents/Button';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 100,
  },
  button: {
    marginHorizontal: 100,
    shadowColor: '#555555',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
  }
});

const LoginPage = ({ navigation }) => {
  const [hasUserSignedUp, setHasUserSignedUp] = useState(true);

  const actionText = hasUserSignedUp ? 'Sign up' : 'Login';

  const onPress = () => {
    setHasUserSignedUp(!hasUserSignedUp);
  };

  return (
    <View style={styles.container}>
      {hasUserSignedUp
        ? <LoginForm navigation={navigation} />
        : <SignUpForm />
      }
      <Button 
        text={actionText} 
        onPress={onPress} 
        style={styles.button} 
        color='#217720' 
      />
    </View>
  );
};

export default LoginPage;