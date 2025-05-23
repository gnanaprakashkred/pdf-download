import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from './component/textinput';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App'; // Import from your App.tsx

// Define your navigation types


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    address: Yup.string().required('Address is required')
});

const Submit = () => {
    
   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.welcomeText}>Welcome</Text>
            </View>
            <View style={styles.formWrapper}>
                <Text style={styles.registerText}>Register</Text>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        mobile: '',
                        address: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, {resetForm}) => {
                        console.log("submitted Values:", values);
                        resetForm();
                        navigation.navigate('Tickets');
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View>
                            <Input
                                label="Name"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                error={touched.name && errors.name ? errors.name : ''}
                            />
                            <Input
                                label="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                error={touched.email && errors.email ? errors.email : ''}
                            />
                            <Input
                                label="Phone Number"
                                value={values.mobile}
                                onChangeText={handleChange('mobile')}
                                onBlur={handleBlur('mobile')}
                                error={touched.mobile && errors.mobile ? errors.mobile : ''}
                            />
                            <Input
                                label="Address"
                                value={values.address}
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                error={touched.address && errors.address ? errors.address : ''}
                            />
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={() => handleSubmit()}
                            >
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#f3f3f3'
    },
    topContainer: {
        height: '40%',
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9b4dca'
    },
    welcomeText: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
    },
    formWrapper: {
        marginHorizontal: 20,
        marginTop: -100,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 6,
    },
    registerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#9b4dca',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 11,
        color: 'red',
        marginBottom: 5,
        marginLeft: 5,
    },
});

export default Submit;