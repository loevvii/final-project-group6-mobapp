import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useGlobalContext } from '../global/globalcontext'; // this will attach to the table, which i think will store the accounts but only for runtime, we're not doing db
import { Props } from '../navigator/props';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format.').required('Email is empty!'),
    password: Yup.string().min(2, "dude surely you have more than 2 letters in your password").required('Password is empty!')
});

const LoginScreen: React.FC<Props> = ({ route, navigation }) => {
    const { accounts, addAccount, storeAccount, usernameExists } = useGlobalContext();

    // addAccount is used like addAccount()
    // add validation on if that account exists already using usernameExists(username), it will return either a true or false so if usernameExists("username") then allow it to be created ig
    // store account to our app's storage using storeAccount(username, password), like storeAccount("jeff", "imjeff123") or something

    return (
        <View>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    Alert.alert('Success', 'You are logged in!');
                    resetForm();
                    navigation.reset({ index: 0, routes: [{ name: 'JobFinder' }] });
                }}
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <View>
                        <Text>Email</Text>
                        <TextInput placeholder="Email" onChangeText={handleChange('email')} value={values.email} />
                        {errors.email && <Text>{errors.email}</Text>}

                        <Text>Password</Text>
                        <TextInput placeholder="Password" secureTextEntry onChangeText={handleChange('password')} value={values.password} />
                        {errors.password && <Text>{errors.password}</Text>}

                        <TouchableOpacity onPress={() => handleSubmit()}>
                            <Text>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { /* PUT REGISTER STUFF HERE */ }}>
                            <Text>Register</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default LoginScreen;
