import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import styles from './navbar.styles'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavBar = () => {
    const navigation = useNavigation();
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');

    const handleIconPress = (screenName) => {
        navigation.navigate(screenName);
    };
    
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

    return (
        <View style={styles.navBar}>
            <FontAwesome name="home" size={24} color="white" onPress={() => handleIconPress('index')} />
            {loggedIn ? (
                <>
                    <Fontisto name="favorite" size={24} color="white" onPress={() => handleIconPress('favoritePage')} />
                    <MaterialCommunityIcons name="account-question" size={24} color="white" onPress={() => handleIconPress('faq')} />
                    <FontAwesome name="user" size={24} color="white" onPress={() => handleIconPress('profile')} />
                </>
            ) : (
                <>
                    <FontAwesome name="question" size={24} color="white" onPress={() => handleIconPress('faq')} />
                    <FontAwesome name="user" size={24} color="white" onPress={() => handleIconPress('login')} />
                </>
            )}
        </View>
    );
};

export default NavBar;
