import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./cardInsurance.style";
import { useFonts } from 'expo-font';

const InsuranceCard = ({ type, description, price, companyName }) => {

    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../../../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../../../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../../../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../../../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../../../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../../../assets/Ubuntu-Regular.ttf"),
    });

    return (
        <View style={styles.cardContainer}>
            <Text style={[styles.name, {fontFamily: 'UbuntuBold'}]}>{type}</Text>
            <Text style={[styles.description, {fontFamily: 'UbuntuRegular'}]}>{description}</Text>
            <Text style={[styles.price, {fontFamily: 'UbuntuBold'}]}>{price} USD</Text>
            <Text style={[styles.companyName, {fontFamily: 'UbuntuRegular'}]}>{companyName}</Text>
        </View> 
    );
};

export default InsuranceCard;
