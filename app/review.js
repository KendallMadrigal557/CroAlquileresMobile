import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import NavBar from "../components/navbar/navbar";
const ReviewPage = () => {
    const [reviewInput, setReviewInput] = useState("");
    const [reviews, setReviews] = useState([
        {
            review: "Excelente departamento. Muy espacioso y bien ubicado.",
            date: "12/08/2022",
        },
        {
            review: "Me encantó este departamento. Tiene una vista increíble.",
            date: "5/04/2023",
        },
        {
            review: "El departamento es muy cómodo y moderno. Lo recomiendo.",
            date: "21/05/2023",
        },
    ]);

    const handleReviewSubmit = () => {
        const newReview = {
            review: reviewInput,
            date: new Date().toLocaleDateString(),
        };
        setReviews([...reviews, newReview]);
        setReviewInput("");
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
            </ScrollView>
            <NavBar/>
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
        fontWeight: "bold",
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
        color: "#FFFFFF",
    },
    date: {
        fontSize: 14,
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
