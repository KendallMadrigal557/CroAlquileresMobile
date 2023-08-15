import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./departmentSearch.style";
import { useFonts } from 'expo-font';

const DepartmentSearch = ({ onSearch }) => {
    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../../../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../../../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../../../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../../../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../../../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../../../assets/Ubuntu-Regular.ttf"),
    });

    const [searchDepartment, setSearchDepartment] = useState("");

    const handleSearch = () => {
        onSearch(searchDepartment);
    };

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={[styles.searchInput, {color: 'white', fontFamily: 'UbuntuRegular'}]}
                placeholder="Buscar por nombre del lugar"
                placeholderTextColor="white"
                value={searchDepartment}
                onChangeText={setSearchDepartment}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <MaterialIcons name="search" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default DepartmentSearch;
