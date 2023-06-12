import React from "react";
import { Text, View, Pressable } from "react-native";
import { FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import styles from './navbar.styles'
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
    const navigation = useNavigation();

    const handleIconPress = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.navBar}>
            <FontAwesome name="home" size={24} color="white" onPress={() => handleIconPress('index')} />
            <Fontisto name="favorite" size={24} color="white" onPress={() => handleIconPress('detailsDepartment')} />
            <MaterialCommunityIcons name="account-question" size={24} color="white" onPress={() => handleIconPress('faq')} />
            <FontAwesome name="user" size={24} color="white" onPress={() => handleIconPress('login')} />
        </View>
    );
};

export default NavBar;
