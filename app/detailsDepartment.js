import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Pressable, ScrollView } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavBar from '../components/navbar/navbar';
import DepartmentService from '../services/department.service';

const DetailsPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { departmentId } = route.params;
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const department = await DepartmentService.getDepartmentById(departmentId);
                setDepartment(department);
            } catch (error) {
                console.log('Error fetching department:', error);
            }
        };

        fetchDepartment();
    }, [departmentId]);

    const goBack = () => {
        navigation.goBack();
    };

    const handleFavoritePress = () => { };

    if (!department) {
        return null; // Mostrar una pantalla de carga o un indicador mientras se carga el departamento
    }

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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.priceContainer}>
                    <Image source={{ uri: `http://192.168.0.2:3002/uploads/${department.image}` }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.price}>{department.price}</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{department.place}</Text>
                    <View style={styles.locationContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="location-on" size={16} color="white" style={styles.icon} />
                        </View>
                        <Text style={styles.location}>{department.location}</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <Text style={styles.description}>{department.description}</Text>
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
        backgroundColor: "#000000",
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
