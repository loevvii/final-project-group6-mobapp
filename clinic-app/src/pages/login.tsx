import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useGlobalContext } from '../context/globalcontext';
import { Props } from '../navigator/props';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { accounts, addAccount, storeAccount, usernameExists } = useGlobalContext();
  const [isRegistering, setIsRegistering] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format.')
      .required('Email is empty!'),
    password: Yup.string()
      .min(8, 'Password must be 8-15 letters long.')
      .max(15, 'Password must be 8-15 letters long.')
      .required('Password is empty!'),
    confirmPassword: Yup.string().when('isRegistering', {
      is: true,
      then: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords do not match.')
        .required('Please confirm your password.'),
    }),
  });

  const handleLogin = (email: string, password: string) => {
    const user = accounts.find((a) => a.username === email && a.password === password);
    if (!user) {
      Alert.alert('Login Failed', 'Incorrect email or password.');
      return;
    }
    storeAccount(user);
    Alert.alert('Success', 'You are logged in!');
    navigation.reset({ index: 0, routes: [{ name: 'JobFinder' }] }); // or your valid screen
  };

  const handleRegister = (email: string, password: string) => {
    if (usernameExists(email)) {
      Alert.alert('Registration Failed', 'That email is already registered!');
      return;
    }
    addAccount(email, password);
    const newUser = accounts.find((a) => a.username === email && a.password === password);
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
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const { email, password } = values;
          isRegistering ? handleRegister(email, password) : handleLogin(email, password);
          resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <Text>Email</Text>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
              autoCapitalize="none"
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
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
