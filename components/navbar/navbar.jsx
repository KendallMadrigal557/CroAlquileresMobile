import React, { useRef, useEffect } from "react";
import { Text, View, Pressable, Animated } from "react-native";
import { FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import styles from './navbar.syles'
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleIconPress = (screenName) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500, // Duración de la animación en milisegundos
            useNativeDriver: true
        }).start(() => {
            navigation.navigate(screenName);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500, // Duración de la animación en milisegundos
                useNativeDriver: true
            }).start();
        });
    };

    return (
        <Animated.View style={[styles.navBar, { opacity: fadeAnim }]}>
            <FontAwesome name="home" size={24} color="white" onPress={() => handleIconPress('index')} />
            <Fontisto name="favorite" size={24} color="white" onPress={() => handleIconPress('Favorites')} />
            <MaterialCommunityIcons name="account-question" size={24} color="white" onPress={() => handleIconPress('Questions')} />
            <FontAwesome name="user" size={24} color="white" onPress={() => handleIconPress('login')} />
        </Animated.View>
    );
};

export default NavBar;
