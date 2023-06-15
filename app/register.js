import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/navbar/navbar';
import UserService from '../services/user.service';

const RegisterPage = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChangeText = (key, value) => {
        setUserData(prevState => ({ ...prevState, [key]: value }));
    };

    const goToLogin = () => {
        navigation.navigate('login');
    };

    const handleRegister = async () => {
        try {
            const { confirmPassword, ...userDataWithoutConfirm } = userData;
            const response = await UserService.createUser(userDataWithoutConfirm);
            console.log('User registered:', response);
            // Aquí puedes redirigir al usuario a la página de inicio de sesión o realizar otras acciones
        } catch (error) {
            console.log('Error registering user:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error al registrar el usuario.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Pressable onPress={goToLogin} style={styles.back}>
                        <Entypo name="chevron-left" size={24} color="white" />
                    </Pressable>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleWrapper}>
                            <View style={styles.spacer} />
                            <Text style={styles.title}>Registro</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre'
                            placeholderTextColor="#AAAAAA"
                            onChangeText={text => handleChangeText('name', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='correo@example.com'
                            placeholderTextColor="#AAAAAA"
                            onChangeText={text => handleChangeText('email', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Contraseña'
                            placeholderTextColor="#AAAAAA"
                            onChangeText={text => handleChangeText('password', text)}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Confirmar Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Confirmar contraseña'
                            placeholderTextColor="#AAAAAA"
                            onChangeText={text => handleChangeText('confirmPassword', text)}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Registrarse</Text>
                    </TouchableOpacity>
                    <View style={styles.orContainer}>
                        <Text style={styles.orText}>o</Text>
                    </View>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
                        <TouchableOpacity onPress={goToLogin}>
                            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {errorMessage ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            ) : null}
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222',
        padding: 24,
        paddingTop: 40,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 90,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        marginTop: 20,
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        marginTop: 20,
        marginLeft: 80,
        marginBottom: 10,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'column',
        marginTop: 16,
        marginBottom: 16,
        alignContent: 'center',
    },
    inputLabel: {
        color: '#FFFFFF',
        marginBottom: 8,
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: '#1f2025',
        borderRadius: 50,
        color: '#FFFFFF',
        padding: 15,
        backgroundColor: "#1e1e1e",
        marginRight: 8,
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: '#491ea2',
        borderRadius: 50,
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    orText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginHorizontal: 8,
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        color: '#AAAAAA',
        fontSize: 16,
        marginRight: 8,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    back: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        backgroundColor: '#2f3030',
        padding: 10,
        borderRadius: 5,
    },
    errorContainer: {
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
    },
    errorText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RegisterPage;