import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../services/user.service';
import NavBar from '../components/navbar/navbar';
import AuditLogService from '../services/auditLog.service';
import axios from 'axios';

const LoginPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [showTwoFactorForm, setShowTwoFactorForm] = useState(false);
    const [twoFactorCode, setTwoFactorCode] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            const user = await AsyncStorage.getItem('user');

            if (user) {
                const { _id } = JSON.parse(user);
                setUserId(_id);
                setLoggedIn(true);
            }
        };

        checkLoginStatus();
    }, []);

    const getIPAddress = async () => {
        try {
            const response = await axios.get('https://api.ipify.org/?format=json');
            const ipAddress = response.data.ip;
            return ipAddress;
        } catch (error) {
            console.log('Error fetching IP address:', error);
            return null;
        }
    };


    const handleLogin = async () => {
        try {
            const response = await UserService.loginUser(email, password);
            if (response.success === true) {
                const { user } = response;
                const ipAddress = await getIPAddress();
                const timestamp = new Date().toISOString()
                const auditLogData = {
                    timestamp: timestamp,
                    iduser: user._id,
                    ipAddress: ipAddress
                };

                await AuditLogService.createAuditLog(auditLogData);

                await AsyncStorage.setItem('user', JSON.stringify(user));
                setLoggedIn(true);

                setShowTwoFactorForm(true);
            } else {
                Alert.alert('Error', 'Credenciales inválidas');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
            console.log('Error', error);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        setLoggedIn(false);
        setUserId('');
        setShowTwoFactorForm(false);
    };

    const handleVerifyTwoFactorCode = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const { email } = JSON.parse(userData);
                const users = await UserService.getUsers();
                const user = users.find(user => user.email === email);

                if (user && user.verificationCode === twoFactorCode) {
                    Alert.alert(
                        'Inicio de sesión exitoso',
                        '¡Inicio de sesión exitoso!'
                    );

                    setTwoFactorCode('');
                    setShowTwoFactorForm(false);
                    setUserId(user._id);
                } else {
                    Alert.alert(
                        'Código de doble factor inválido',
                        'Por favor, vuelve a intentarlo.'
                    );
                }
            } else {
                Alert.alert(
                    'Inicio de sesión requerido',
                    'Por favor, inicia sesión antes de verificar el código de doble factor.'
                );
            }
        } catch (error) {
            console.log('Error', error.message);
        }
    };

    const goToChangePassword = () => {
        navigation.navigate('changePass');
    };
    const goToRegister = () => {
        navigation.navigate('register');
    };

    if (loggedIn && showTwoFactorForm) {
        return (
            <View style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.loggedInText}>Ingrese el código de doble factor</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Código de doble factor'
                        placeholderTextColor="#AAAAAA"
                        value={twoFactorCode}
                        onChangeText={setTwoFactorCode}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleVerifyTwoFactorCode}>
                        <Text style={styles.verifyButtonText}>Verificar</Text>
                    </TouchableOpacity>
                </View>
                <NavBar />
            </View>
        );
    }

    if (loggedIn) {
        return (
            <View style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.loggedInText}>¡Inicio de sesión exitoso!</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
                <NavBar />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                    <Entypo name="chevron-left" size={24} color="white" />
                </Pressable>
                <View style={styles.titleContainer}>
                    <View style={styles.titleWrapper}>
                        <View style={styles.spacer} />
                        <Text style={styles.title}>Iniciar Sesión</Text>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='correo@example.com'
                        placeholderTextColor="#AAAAAA"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Contraseña'
                        placeholderTextColor="#AAAAAA"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.changePasswordButton} onPress={goToChangePassword}>
                    <Text style={styles.registerButtonText}>Cambiar Contraseña</Text>
                </TouchableOpacity>
                <View style={styles.orContainer}>
                    <Text style={styles.orText}>o</Text>
                </View>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>No tienes cuenta?</Text>
                    <TouchableOpacity onPress={goToRegister}>
                        <Text style={styles.registerButtonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        marginTop: 50,
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
    loginButton: {
        backgroundColor: '#491ea2',
        borderRadius: 50,
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    loginButtonText: {
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
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerText: {
        color: '#AAAAAA',
        fontSize: 16,
        marginRight: 8,
    },
    registerButtonText: {
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
    loggedInText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    logoutButton: {
        backgroundColor: '#491ea2',
        borderRadius: 50,
        padding: 12,
        alignItems: 'center',
        width: '50%',
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginPage;
