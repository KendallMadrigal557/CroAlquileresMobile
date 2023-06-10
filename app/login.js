import React from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NavBar from '../components/navbar/navbar';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const goToRegister = () => {
        navigation.navigate('register'); 
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.back}>
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
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Contraseña'
                        placeholderTextColor="#AAAAAA"
                    />
                </View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
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
        backgroundColor: '#101010',
        padding: 24,
        paddingTop: 40,
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
});

export default LoginPage;
