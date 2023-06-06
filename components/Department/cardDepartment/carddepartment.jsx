import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./cardDept.style";

const DepartmentCard = ({ image, price, name, location }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
                <View style={styles.overlay}>
                    <Text style={styles.price}>{price}</Text>
                </View>
            </View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.locationContainer}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="location-on" size={16} color="white" style={styles.icon} />
                </View>
                <Text style={styles.location}>{location}</Text>
            </View>
        </View>
    );
};

export default DepartmentCard;
