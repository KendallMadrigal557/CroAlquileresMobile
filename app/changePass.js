import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import UserService from '../services/user.service';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const ChangePasswordPage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../assets/Ubuntu-Regular.ttf"),
    });

    const handleChangePassword = async () => {
        try {
            const response = await UserService.changePassword(email, newPassword, verificationCode);

            if (response.success) {
                Alert.alert(
                    'Contraseña cambiada',
                    'Tu contraseña ha sido cambiada con éxito',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('index'),
                        },
                    ]
                );
            } else {
                Alert.alert('Error', response.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await UserService.sendVerificationCode(email);

            if (response.success) {
                Alert.alert('Código enviado', 'Se ha enviado un código de verificación a tu correo electrónico');
            } else {
                Alert.alert('Error', response.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cambiar Contraseña</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su correo electrónico"
                    placeholderTextColor="#AAAAAA"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
                <Text style={styles.buttonText}>Enviar Código de Verificación</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Código de Verificación</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el código de verificación"
                    placeholderTextColor="#AAAAAA"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nueva Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese la nueva contraseña"
                    placeholderTextColor="#AAAAAA"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Cambiar Contraseña</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'UbuntuBold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#FFFFFF',
        fontFamily: 'UbuntuRegular',
    },
    input: {
        borderWidth: 1,
        borderColor: '#1f2025',
        borderRadius: 50,
        color: '#FFFFFF',
        padding: 15,
        fontFamily: 'UbuntuRegular',
        backgroundColor: "#1e1e1e",
        marginRight: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#491ea2',
        padding: 12,
        marginBottom:10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'UbuntuBold',
    },
});


export default ChangePasswordPage;