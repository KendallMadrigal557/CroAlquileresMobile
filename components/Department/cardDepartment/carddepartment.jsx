import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./cardDept.style";
import { useFonts } from 'expo-font';

const DepartmentCard = ({ image, price, name, provincia, canton, distrito }) => {
    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../../../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../../../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../../../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../../../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../../../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../../../assets/Ubuntu-Regular.ttf"),
    });

    const location = `${provincia}, ${canton}, ${distrito}`;

    return (
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.overlay}>
                    <Text style={[styles.price, {fontFamily: 'UbuntuBold'}]}>{price} USD</Text>
                </View>
            </View>
            <Text style={[styles.name, {fontFamily: 'UbuntuBold'}]}>{name}</Text>
            <View style={styles.locationContainer}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="location-on" size={16} color="white" style={styles.icon} />
                </View>
                <Text style={[styles.location,{fontFamily: 'UbuntuItalic'}]}>{location}</Text>
            </View>
        </View>
    );
};

export default DepartmentCard;

