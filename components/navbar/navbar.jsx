import React from "react";
import { Text, View } from "react-native";
import { FontAwesome, MaterialCommunityIcons, Fontisto  } from '@expo/vector-icons'; 
import styles from './navbar.syles'

const NavBar = () => {
    return (
        <View style={styles.navBar}>
            <FontAwesome name="home" size={24} color="white" />
            <Fontisto name="favorite" size={24} color="white" />
            <FontAwesome name="question" size={24} color="white" />
            <MaterialCommunityIcons name="login" size={24} color="white" />
        </View>
    );
};


export default NavBar;