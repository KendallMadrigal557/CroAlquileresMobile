import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/navbar/navbar';
import { Ionicons } from '@expo/vector-icons'; 

const ProfileScreen = () => {
    
    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../assets/Ubuntu-Regular.ttf"),
    });

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        setShowTwoFactorForm(false);
    };
    
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                if (user) {
                    setUserData(JSON.parse(user));
                }
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const UserInfoContainer = ({ label, value, iconName }) => {
        return (
            <View style={styles.userInfoContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name={iconName} size={24} color="#FFFFFF" />
                </View>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.userInfoLabel}>{label}</Text>
                    <Text style={styles.userInfoValue}>{value}</Text>
                </View>
            </View>
        );
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.centerContainer}>
                <View style={styles.titleContainer}>
                    <View style={styles.titleWrapper}>
                        <View style={styles.spacer} />
                        <Text style={styles.title}>Perfil de usuario</Text>
                    </View>
                </View>
                {userData && (
                    <View style={styles.userInfo}>
                        <UserInfoContainer label="Nombre:" value={userData.name} iconName="person"  />
                        <UserInfoContainer label="Email:" value={userData.email} iconName="mail" />
                        <UserInfoContainer label="Localidad:" value={userData.provincia + ', ' + userData.canton+ ', ' + userData.distrito } iconName="location" />
                    </View>
                )}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'UbuntuBold',
    },
    userInfo: {
        marginTop: 20,
    },
    userInfoText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'UbuntuRegular',
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#491ea2',
        borderRadius: 50,
        padding: 12,
        alignItems: 'center',
        width: '50%',
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        marginRight: 10,
    },
    infoTextContainer: {
        flex: 1,
    },
    userInfoLabel: {
        color: '#AAAAAA',
        fontSize: 16,
        fontFamily: 'UbuntuBold',
        marginBottom: 4,
    },
    userInfoValue: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'UbuntuRegular',
    },
});
export default ProfileScreen;
