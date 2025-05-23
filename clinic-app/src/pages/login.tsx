import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useGlobalContext } from '../context/globalcontext';
import { Props } from '../navigator/props';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { accounts, addAccount, storeAccount, usernameExists, emailExists, login } = useGlobalContext();
  const [isRegistering, setIsRegistering] = useState(false);
  const hasAddedDefault = useRef(false);

  useEffect(() => {
    if (!hasAddedDefault.current && !accounts.find(a => a.username === 'Doctor')) {
      addAccount('Doctor', 'doctor@gmail.com', 'admin123');
      hasAddedDefault.current = true;
      console.log("added doctor");
    }
  }, []);

  useEffect(() => {
    console.log("Current accounts:", accounts);
  }, [accounts]);
  
  const getValidationSchema = (isRegistering: boolean) =>
    Yup.object().shape({
      email: isRegistering
        ? Yup.string().email('Invalid email format.').required('Email is empty!')
        : Yup.string(),
      username: isRegistering
        ? Yup.string().required('Username is required.').min(3, 'Username must be at least 3 characters long.')
        : Yup.string(),
      emailOrUsername: !isRegistering
        ? Yup.string().required('Username or email is required.').min(3, 'Must be at least 3 characters.')
        : Yup.string(),
      password: Yup.string()
        .min(8, 'Password must be 8-15 letters long.')
        .max(15, 'Password must be 8-15 letters long.')
        .required('Password is empty!'),
      confirmPassword: isRegistering
        ? Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords do not match.')
          .required('Please confirm your password.')
        : Yup.string(),
    });

  const handleLogin = (emailOrUsername: string, password: string) => {
    console.log('running');
    console.log('Current accounts:', accounts);
    var redirectName = 'UserHome';
    if (emailOrUsername === "Doctor" || emailOrUsername === "doctor@gmail.com") {
      redirectName = 'DoctorHome';
      console.log('doc');
    }
    const user = accounts.find(
      (a) => (a.email === emailOrUsername || a.username === emailOrUsername) && a.password === password
    );
    if (!user) {
      Alert.alert('Login Failed', 'Incorrect email or password.');
      console.log('fail');

      return;
    }

    login(user);
    console.log('success');

    Alert.alert('Success', 'You are logged in!');
    navigation.reset({ index: 0, routes: [{ name: redirectName }] });
  };

  const handleRegister = (username: string, email: string, password: string) => {
    console.log('registering');
    if (emailExists(email)) {
      Alert.alert('Registration Failed', 'That email is already registered!');
      return;
    }
    if (usernameExists(username)) {
      Alert.alert('Registration Failed', 'That username is already taken!');
      return;
    }
    addAccount(username, email, password);
    const newUser = accounts.find((a) => a.username === username && a.email === email && a.password === password);
    if (newUser) storeAccount(newUser);
    Alert.alert('Registration Successful');
    setIsRegistering(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        {isRegistering ? 'Register' : 'Login'}
      </Text>
      <Formik
        initialValues={{ emailOrUsername: '', email: '', username: '', password: '', confirmPassword: '' }}
        validationSchema={getValidationSchema(isRegistering)}
        onSubmit={(values, { resetForm }) => {
          const { emailOrUsername, email, username, password } = values;
          isRegistering ? handleRegister(username, email, password) : handleLogin(emailOrUsername, password);
          resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            {!isRegistering ? (
              <>
                <Text>Email or Username</Text>
                <TextInput
                  placeholder="Email or Username"
                  onChangeText={handleChange('emailOrUsername')}
                  value={values.emailOrUsername}
                  autoCapitalize="none"
                  style={{ borderBottomWidth: 1, marginBottom: 10 }}
                />
                {touched.emailOrUsername && errors.emailOrUsername && (
                  <Text style={{ color: 'red' }}>{errors.emailOrUsername}</Text>
                )}
              </>
            ) : (
              <>
                <Text>Email</Text>
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  autoCapitalize="none"
                  style={{ borderBottomWidth: 1, marginBottom: 10 }}
                />
                {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

                <Text>Username</Text>
                <TextInput
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  value={values.username}
                  autoCapitalize="none"
                  style={{ borderBottomWidth: 1, marginBottom: 10 }}
                />
                {touched.username && errors.username && (
                  <Text style={{ color: 'red' }}>{errors.username}</Text>
                )}
              </>
            )}

            <Text>Password</Text>
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              value={values.password}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            {touched.password && errors.password && (
              <Text style={{ color: 'red' }}>{errors.password}</Text>
            )}

            {isRegistering && (
              <>
                <Text>Confirm Password</Text>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  style={{ borderBottomWidth: 1, marginBottom: 10 }}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                )}
              </>
            )}

            <TouchableOpacity onPress={() => handleSubmit()} style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 16, textAlign: 'center' }}>
                {isRegistering ? 'Register' : 'Login'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
              <Text style={{ textAlign: 'center', color: 'blue' }}>
                {isRegistering ? 'Already have an account? Login' : 'New here? Register'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;
