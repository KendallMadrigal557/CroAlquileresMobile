import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import NavBar from '../components/navbar/navbar';
import UserService from '../services/user.service';
import PlaceService from '../services/place.service';

const RegisterPage = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        provincia: '',
        canton: '',
        distrito: '',
    });
    const [expiration, setExpiration] = useState(30);
    const [provincias, setProvincias] = useState([]);
    const [cantones, setCantones] = useState([]);
    const [distritos, setDistritos] = useState([]);

    useEffect(() => {
        loadProvincias();
    }, []);

    const loadProvincias = async () => {
        try {
            const response = await PlaceService.getPlaces();
            const provinciasData = response.map((provincia) => ({
                label: provincia.provincia,
                value: provincia.provincia,
                cantones: provincia.cantones,
            }));
            setProvincias(provinciasData);
        } catch (error) {
            console.log('Error loading provincias:', error);
        }
    };

    const loadCantones = (selectedProvincia) => {
        const provincia = provincias.find((provincia) => provincia.value === selectedProvincia);
        if (provincia) {
            const cantonesData = provincia.cantones.map((canton) => ({
                label: canton.nombre,
                value: canton.nombre,
                distritos: canton.distritos,
            }));
            setCantones(cantonesData);
            setDistritos([]);
        }
    };

    const loadDistritos = (selectedCanton) => {
        const provincia = provincias.find((provincia) => provincia.value === userData.provincia);
        if (provincia) {
            const canton = provincia.cantones.find((canton) => canton.nombre.toLowerCase() === selectedCanton.toLowerCase());
            if (canton) {
                const distritosData = canton.distritos.map((distrito) => ({
                    label: distrito.nombre,
                    value: distrito.nombre,
                }));
                setDistritos(distritosData);
            }
        }
    };

    const handleChangeText = (key, value) => {
        setUserData((prevState) => ({ ...prevState, [key]: value }));
    };

    const goToLogin = () => {
        navigation.navigate('login');
    };

    const handleRegister = async () => {
        try {
            const { confirmPassword, ...userDataWithoutConfirm } = userData;
            const response = await UserService.createUser({
                name: userDataWithoutConfirm.name,
                email: userDataWithoutConfirm.email,
                password: userDataWithoutConfirm.password,
                passwordDuration: expiration,
                provincia: userDataWithoutConfirm.provincia,
                canton: userDataWithoutConfirm.canton,
                distrito: userDataWithoutConfirm.distrito,
            });

            Alert.alert('Registro exitoso', 'Por favor, inicia sesión.', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('login'),
                },
            ]);
        } catch (error) {
            console.log('Error registering user:', error);
            if (error.response && error.response.data && error.response.data.message) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
                            placeholder="Nombre"
                            placeholderTextColor="#AAAAAA"
                            onChangeText={(text) => handleChangeText('name', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="correo@example.com"
                            placeholderTextColor="#AAAAAA"
                            onChangeText={(text) => handleChangeText('email', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#AAAAAA"
                            onChangeText={(text) => handleChangeText('password', text)}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Confirmar Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar contraseña"
                            placeholderTextColor="#AAAAAA"
                            onChangeText={(text) => handleChangeText('confirmPassword', text)}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Expiración de Contraseña</Text>
                        <Picker
                            selectedValue={expiration}
                            style={styles.picker}
                            onValueChange={(itemValue) => setExpiration(itemValue)}
                        >
                            <Picker.Item label="30 días" value={30} />
                            <Picker.Item label="60 días" value={60} />
                            <Picker.Item label="90 días" value={90} />
                        </Picker>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Provincia</Text>
                        <Picker
                            selectedValue={userData.provincia}
                            style={styles.picker}
                            onValueChange={(value) => {
                                handleChangeText('provincia', value);
                                loadCantones(value);
                            }}
                        >
                            <Picker.Item label="Seleccionar provincia" value="" />
                            {provincias.map((provincia) => (
                                <Picker.Item key={provincia.value} label={provincia.label} value={provincia.value} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Cantón</Text>
                        <Picker
                            selectedValue={userData.canton}
                            style={styles.picker}
                            onValueChange={(value) => {
                                handleChangeText('canton', value);
                                loadDistritos(value);
                            }}
                        >
                            <Picker.Item label="Seleccionar cantón" value="" />
                            {cantones.map((canton) => (
                                <Picker.Item key={canton.value} label={canton.label} value={canton.value} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Distrito</Text>
                        <Picker
                            selectedValue={userData.distrito}
                            style={styles.picker}
                            onValueChange={(value) => handleChangeText('distrito', value)}
                        >
                            <Picker.Item label="Seleccionar distrito" value="" />
                            {distritos.map((distrito) => (
                                <Picker.Item key={distrito.value} label={distrito.label} value={distrito.value} />
                            ))}
                        </Picker>
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
        backgroundColor: '#1e1e1e',
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
    picker: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        color: '#FFFFFF',
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
});

export default RegisterPage;