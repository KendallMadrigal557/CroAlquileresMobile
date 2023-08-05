import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./cardInsurance.style";

const InsuranceCard = ({ type, description, price, companyName }) => {


    return (
        <View style={styles.cardContainer}>
            <Text style={styles.name}>{type}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>{price} $</Text>
            <Text style={styles.companyName}>{companyName}</Text>
            
        </View> 
    );
};

export default InsuranceCard;
