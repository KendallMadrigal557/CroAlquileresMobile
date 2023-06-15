import React from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import NavBar from "../components/navbar/navbar";
import DepartmentCard from "../components/Department/cardDepartment/carddepartment";
import { FontAwesome } from "@expo/vector-icons";

export default function FavoritesPage() {
    const handleFavoritePress = () => {
        // Lógica para manejar el evento de presionar el botón de favorito
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                <DepartmentCard
                    image={require("../assets/minimal-apartment.jpg")}
                    price="$250,000"
                    name="Departamento Ejemplo"
                    location="Ciudad Ejemplo"
                    isFavorite={true}
                />
            </ScrollView>
            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222",
        padding: 24,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 80,
    },
});
