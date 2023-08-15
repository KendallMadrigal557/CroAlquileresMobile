import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from "../components/navbar/navbar";
import { useRoute } from '@react-navigation/native';
import ReviewService from "../services/review.service";
import { useFonts } from 'expo-font'; 

const ReviewPage = () => {
    const [reviewInput, setReviewInput] = useState("");
    const [reviews, setReviews] = useState([]);
    const [userId, setUserId] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const route = useRoute();
    const { departmentId } = route.params;
    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../assets/Ubuntu-Regular.ttf"),
      });
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
        const fetchReviews = async () => {
            try {
                const reviews = await ReviewService.getReviewsByDepartment(departmentId);
                setReviews(reviews);
            } catch (error) {
                console.log('Error fetching reviews:', error);
            }
        };
    
        fetchReviews();
    }, [departmentId]);

    const handleReviewSubmit = async () => {
        const newReview = {
            idUser: userId,
            idDepartment: departmentId,
            review: reviewInput,
            date: new Date().toLocaleDateString()
        };

        try {
            const createdReview = await ReviewService.createReview(newReview);
            setReviews([...reviews, createdReview]);
            setReviewInput("");
        } catch (error) {
            console.log('Error creating review:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Text style={styles.title}>Reseñas</Text>
                {reviews.map((item, index) => (
                    <View key={index} style={styles.reviewItem}>
                        <Text style={styles.review}>{item.review}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                ))}
                {loggedIn && (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Escribe una reseña..."
                            placeholderTextColor="white"
                            value={reviewInput}
                            onChangeText={text => setReviewInput(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleReviewSubmit}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222",
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: "UbuntuBold",
        marginBottom: 24,
        textAlign: "center",
        color: "#FFFFFF",
    },
    reviewItem: {
        marginBottom: 24,
        backgroundColor: "#333333",
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    review: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: "UbuntuBoldItalic",
        color: "#FFFFFF",
    },
    date: {
        fontSize: 14,
        fontFamily: "UbuntuLight",
        color: "#CCCCCC",
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 80,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
        padding: 8,
        marginRight: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#7066e5",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
});

export default ReviewPage;
