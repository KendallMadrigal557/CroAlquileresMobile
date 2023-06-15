import React from "react";
import NavBar from "../components/navbar/navbar";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ReviewPage = () => {
    const reviewData = [
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
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
            >
                <Text style={styles.title}>Reseñas</Text>
                {reviewData.map((item, index) => (
                    <View key={index} style={styles.reviewItem}>
                        <Text style={styles.review}>{item.review}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                ))}
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
    scrollViewContainer: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 80,
    },
});

export default ReviewPage;
