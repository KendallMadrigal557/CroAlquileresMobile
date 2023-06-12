import React from "react";
import { StyleSheet, View, Image, Text, Pressable, ScrollView } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import NavBar from '../components/navbar/navbar';
import { useNavigation } from "@react-navigation/native";

const DetailsPage = ({
    image = require("../assets/minimal-apartment.jpg"),
    price = 2333,
    name = "Ejemplo",
    location = "Ejemplo",
}) => {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };

    const handleFavoritePress = () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack} style={styles.back}>
                    <Entypo name="chevron-left" size={24} color="white" />
                </Pressable>
                <Pressable onPress={handleFavoritePress} style={styles.favoriteButton}>
                    <MaterialIcons name="favorite-border" size={24} color="white" />
                </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}>
                <View style={styles.priceContainer}>
                    <Image source={image} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.locationContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons
                                name="location-on"
                                size={16}
                                color="white"
                                style={styles.icon}
                            />
                        </View>
                        <Text style={styles.location}>{location}</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        tempus lectus ut rhoncus semper. Vestibulum tincidunt est at mauris
                        efficitur, sed aliquam lacus dapibus. Sed sed ipsum quis justo
                        fermentum feugiat. Suspendisse potenti. Nulla cursus leo risus, eu
                        dictum nibh pellentesque non. Aenean volutpat vestibulum purus ac
                        blandit.
                    </Text>
                </View>
                <Pressable style={styles.reviewsButton}>
                    <Text style={styles.reviewsButtonText}>Reseñas</Text>
                </Pressable>
                <View style={styles.priceButtonContainer}>
                    <Pressable style={styles.priceButton}>
                        <Text style={styles.priceButtonText}>Reservar ahora</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101010",
        padding: 24,
        paddingTop: 60,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    content: {
        flexGrow: 1,
        paddingBottom: 80, 
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 24,
    },
    image: {
        width: "100%",
        height: 250,
        marginTop: 30,
        borderRadius: 15,
    },
    overlay: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#7066e5",
        borderRadius: 7,
        padding: 8,
    },
    price: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    detailsContainer: {
        marginBottom: 16,
    },
    name: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    location: {
        color: "#8e9191",
        fontSize: 14,
        marginLeft: 4,
    },
    cardContainer: {
        backgroundColor: "#202020",
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    description: {
        color: "white",
    },
    favoriteButton: {
        paddingTop: 10,
    },
    reviewsButton: {
        backgroundColor: "#202020",
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        alignItems: "center",
    },
    reviewsButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    priceButtonContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    priceButton: {
        backgroundColor: "#7066e5",
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    priceButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    back: {
        backgroundColor: "#2f3030",
        padding: 10,
        borderRadius: 5,
    },
});

export default DetailsPage;
