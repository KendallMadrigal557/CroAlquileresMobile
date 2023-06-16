import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./departmentSearch.style";

const DepartmentSearch = ({ onSearch }) => {
    const [searchDepartment, setSearchDepartment] = useState("");

    const handleSearch = () => {
        onSearch(searchDepartment);
    };

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={[styles.searchInput, {color: 'white'}]}
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
