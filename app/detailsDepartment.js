import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, Pressable, ScrollView, Alert, Animated } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/navbar/navbar';
import DepartmentService from '../services/department.service';
import FavoriteService from '../services/favorite.service';
import { ipAPI } from '../config/config';
import { useFonts } from 'expo-font';
import Modal from 'react-native-modal';

const DetailsPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const { departmentId } = route.params;
    const [department, setDepartment] = useState(null);
    const [favoriteStatus, setFavoriteStatus] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);

    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../assets/Ubuntu-Regular.ttf"),
    });

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

    useEffect(() => {
        const checkLoginStatus = async () => {
            const user = await AsyncStorage.getItem('user');

            if (user) {
                const { _id } = JSON.parse(user);
                setUserId(_id);
                setLoggedIn(true);
            }
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        const checkIsFavorite = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                const { _id: userId } = JSON.parse(user);
                const favorites = await FavoriteService.getFavoritesByUserId(userId);
                setFavoriteStatus(favorites.some((favorite) => favorite.idDepartment === departmentId));
            } catch (error) {
                console.log('Error fetching favorite departments:', error);
            }
        };

        checkIsFavorite();
    }, [departmentId]);

    const goBack = () => {
        navigation.goBack();
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageChangeInterval = 3000;
    const fadeValue = useRef(new Animated.Value(1)).current;
    const MAX_DESCRIPTION_LENGTH = 100;
    useEffect(() => {
        const imageInterval = setInterval(() => {
            // Start fade-out animation
            Animated.timing(fadeValue, {
                toValue: 0,
                duration: 500, // Fade-out duration in milliseconds
                useNativeDriver: false, // Set to true if available on your React Native version
            }).start(() => {
                setCurrentImageIndex(prevIndex =>
                    (prevIndex + 1) % department.images.length
                );

                // Start fade-in animation after changing image
                Animated.timing(fadeValue, {
                    toValue: 1,
                    duration: 500, // Fade-in duration in milliseconds
                    useNativeDriver: false, // Set to true if available on your React Native version
                }).start();
            });
        }, imageChangeInterval);

        return () => {
            clearInterval(imageInterval);
        };
    }, [department]);
    const handleInsurancePress = () => {
        if (!loggedIn) {
            Alert.alert('Debe iniciar sesión para realizar una reserva.');

            return;
        }

        navigation.navigate('insurance', { departmentPrice: department?.price, departmentId: department._id });
    };
    const handleReviewsPress = () => {
        navigation.navigate('review', { departmentId: department._id });
    };

    const handleFavoritePress = async () => {
        try {
            const user = await AsyncStorage.getItem('user');

            if (!user) {
                Alert.alert('Usuario no autenticado');
                return;
            }

            const iduser = JSON.parse(user)._id;

            if (!departmentId) {
                console.log('ID de departamento no disponible');
                return;
            }

            const favorites = await FavoriteService.getFavoritesByUserId(iduser);
            const isFavorite = favorites.some((favorite) => favorite.idDepartment === departmentId);

            if (isFavorite) {
                const favorite = favorites.find((favorite) => favorite.idDepartment === departmentId);
                await FavoriteService.deleteFavorite(favorite._id);
                Alert.alert('Departamento eliminado de favoritos');
            } else {
                await FavoriteService.createFavorite({ iduser, idDepartment: departmentId });
                Alert.alert('Departamento agregado a favoritos');
            }
        } catch (error) {
            console.log('Error handling favorite:', error);
        }
    };


    if (!department) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={goBack} style={styles.back}>
                    <Entypo name="chevron-left" size={24} color="white" />
                </Pressable>
                <Pressable onPress={handleFavoritePress} style={styles.favoriteButton}>
                    <MaterialIcons
                        name={favoriteStatus ? 'favorite' : 'favorite-border'}
                        size={24}
                        color="white"
                    />
                </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.priceContainer}>
                    <Animated.Image
                        source={{ uri: `http://${ipAPI}:3002/uploads/${department.images[currentImageIndex]}` }}
                        style={[styles.image, { opacity: fadeValue }]}
                    />
                    <View style={styles.overlay}>
                        <Text style={styles.price}>{department.price} USD</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{department.place}</Text>
                    <View style={styles.locationContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="location-on" size={16} color="white" style={styles.icon} />
                        </View>
                        <Text style={styles.location}>{department.provincia + ', ' + department.canton + ', ' + department.distrito}</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <Text style={styles.description}>
                        {showFullDescription
                            ? department.description
                            : department.description.length > MAX_DESCRIPTION_LENGTH
                                ? department.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
                                : department.description}
                    </Text>
                    {department.description.length > MAX_DESCRIPTION_LENGTH && !showFullDescription && (
                        <Text style={styles.verMasLink} onPress={() => setShowFullDescription(true)}>
                            Ver más
                        </Text>
                    )}
                </View>
                <Modal isVisible={showFullDescription}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalDescription}>{department.description}</Text>
                        <Text style={styles.cerrarLink} onPress={() => setShowFullDescription(false)}>
                            Cerrar
                        </Text>
                    </View>
                </Modal>
                <View style={styles.availabilityContainer}>
                    <MaterialIcons
                        name={department.isOccupied ? 'event-busy' : 'event-available'}
                        size={24}
                        color={department.isOccupied ? 'red' : 'green'}
                    />
                    <Text style={styles.availabilityText}>
                        {department.isOccupied ? 'No disponible' : 'Disponible'}
                    </Text>
                </View>

                <View style={styles.roomsContainer}>
                    <View style={styles.iconTextContainer}>
                        <MaterialIcons name="hotel" size={24} color="white" />
                        <Text style={styles.roomText}>
                            Habitaciones: {department.rooms}
                        </Text>
                    </View>
                    <View style={styles.iconTextContainer}>
                        <MaterialIcons name="group" size={24} color="white" />
                        <Text style={styles.roomText}>
                            Capacidad: {department.capacity} personas
                        </Text>
                    </View>
                </View>
                <Pressable style={styles.reviewsButton} onPress={handleReviewsPress}>
                    <Text style={styles.reviewsButtonText}>Reseñas</Text>
                </Pressable>
                <View style={styles.priceButtonContainer}>
                    {!department.isOccupied && (
                        <Pressable
                            style={styles.priceButton}
                            onPress={handleInsurancePress}
                            disabled={isProcessing}
                        >
                            <Text style={styles.priceButtonText}>
                                {isProcessing ? 'Procesando...' : 'Reservar ahora'}
                            </Text>
                        </Pressable>
                    )}
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
        fontFamily: "UbuntuBold",
    },
    detailsContainer: {
        marginBottom: 16,
    },
    name: {
        color: "white",
        fontSize: 18,
        fontFamily: "UbuntuBold",
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    location: {
        color: "#8e9191",
        fontSize: 14,
        fontFamily: "UbuntuItalic",
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
        fontFamily: "UbuntuRegular"
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
        fontFamily: "UbuntuBold"
    },
    priceButtonContainer: {
        alignItems: "center",
        fontFamily: "UbuntuBold",
        marginBottom: 16,
    },
    priceButton: {
        backgroundColor: "#7066e5",
        borderRadius: 20,
        fontFamily: "UbuntuBold",
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    priceButtonText: {
        color: "white",
        fontSize: 16,
        fontFamily: "UbuntuBold"
    },
    back: {
        backgroundColor: "#2f3030",
        padding: 10,
        borderRadius: 5,
    }, verMasLink: {
        color: '#FFFFFF',
        marginTop: 8,
        textDecorationLine: 'underline',
        fontFamily: 'UbuntuBold',
        textAlign: 'center',
    },
    modalContainer: {
        height: '90%',
        backgroundColor: '#202020',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalDescription: {
        fontSize: 11,
        marginBottom: 10,
        textAlign: 'justify',
        color: '#FFFFFF',
    },
    cerrarLink: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#202020',
        borderRadius: 25,
        padding: 16,
    },
    availabilityText: {
        marginLeft: 8,
        color: 'white',
        fontFamily: 'UbuntuRegular',
    },
    roomsContainer: {
        marginTop: 16,
        backgroundColor: '#202020',
        borderRadius: 25,
        padding: 16,
        marginBottom: 16,
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    roomText: {
        marginLeft: 8,
        color: 'white',
        fontSize: 16,
        fontFamily: 'UbuntuRegular',
    },
});

export default DetailsPage;