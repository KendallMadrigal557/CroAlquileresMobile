import React, { useEffect, useState } from "react";
import NavBar from '../components/navbar/navbar';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FAQService from "../services/faq.service";

const FAQPage = () => {
    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const faqs = await FAQService.getFAQs();
                setFaqData(faqs);
            } catch (error) {
                console.error("Error al obtener las preguntas frecuentes:", error);
            }
        };

        fetchFAQs();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
            >
                <Text style={styles.title}>Preguntas frecuentes</Text>
                {faqData.map((item, index) => (
                    <View key={index} style={styles.faqItem}>
                        <Text style={styles.question}>{item.question}</Text>
                        <Text style={styles.answer}>{item.answer}</Text>
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
        backgroundColor: "#202020",
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
    faqItem: {
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
    question: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#FFFFFF",
    },
    answer: {
        fontSize: 16,
        color: "#CCCCCC",
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 80,
    },
});

export default FAQPage;
