import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ProfilePage from '../UserComponents/ProfilePage';
import Button from '../UIcomponents/Button';
import AuthStorageContext from '../../contexts/AuthStorageContext';

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

const UserPage = ({ navigation }) => {
  const [hasUserSignedUp, setHasUserSignedUp] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authStorage = useContext(AuthStorageContext);

  const fetchToken = async () => {
    const token = await authStorage.getToken();
    return token;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedToken = await fetchToken()
        .then(token => token === null
          ? setIsLoggedIn(false)
          : setIsLoggedIn(true)  
        );
      return fetchedToken;
    };
    fetchData();
  },[]);


  const actionText = hasUserSignedUp ? 'Sign up' : 'Login';

  const onPress = () => {
    setHasUserSignedUp(!hasUserSignedUp);
  };

  return (
    <View>
      {isLoggedIn
      ?
        <ProfilePage setIsLoggedIn={setIsLoggedIn} />
      :
        <View style={styles.container}>
          {hasUserSignedUp
            ? <LoginForm navigation={navigation} setIsLoggedIn={setIsLoggedIn} />
            : <SignUpForm navigation={navigation} setIsLoggedIn={setIsLoggedIn} />
          }
          <Button 
            text={actionText} 
            onPress={onPress} 
            style={styles.button} 
            color='#217720' 
          />
        </View>
      }
    </View>
  );
};

export default UserPage;