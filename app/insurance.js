import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, ScrollView, SafeAreaView, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import InsuranceCard from '../components/Insurance/cardInsurance/cardInsurance.jsx';
import NavBar from '../components/navbar/navbar';
import InsuranceService from '../services/insurance.service.js';
import { useFonts } from 'expo-font';

const InsurancePage = () => {
    const navigation = useNavigation();
    const [insuranceData, setInsuranceData] = useState([]);
    const [selectedInsurances, setSelectedInsurances] = useState([]);
    const route = useRoute();
    const { departmentPrice } = route.params;

    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../assets/Ubuntu-Regular.ttf"),
    });

    useEffect(() => {
        const fetchInsuranceData = async () => {
            try {
                const response = await InsuranceService.getAllInsurances();
                setInsuranceData(response);
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        };
        fetchInsuranceData();
    }, []);

    const handleInsuranceSelection = (insuranceId) => {
        setSelectedInsurances((prevSelectedInsurances) =>
            prevSelectedInsurances.includes(insuranceId)
                ? prevSelectedInsurances.filter((id) => id !== insuranceId)
                : [...prevSelectedInsurances, insuranceId]
        );
    };
    const getSelectedInsurancesData = () => {
        return insuranceData.filter((insurance) => selectedInsurances.includes(insurance._id));
    };

    const handlePaymentButtonPress = () => {
        navigation.navigate('payment', {
            selectedInsurancePrices: getSelectedInsurancesData().map((insurance) => insurance.price),
            departmentPrice,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerText, { color: 'white' }]}>Opciones de seguros disponibles</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {insuranceData.map((insurance) => (
                    <TouchableOpacity
                        key={insurance._id}
                        style={[
                            styles.insuranceCard,
                            selectedInsurances.includes(insurance._id) && styles.selectedCard,
                        ]}
                        onPress={() => handleInsuranceSelection(insurance._id)}
                    >
                        <InsuranceCard
                            type={insurance.type}
                            description={insurance.description}
                            price={insurance.price}
                            companyName={insurance.company.name}
                        />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    style={styles.processPaymentButton}
                    onPress={handlePaymentButtonPress}
                >
                    <Text style={styles.processPaymentButtonText}>Procesar Pago</Text>
                </TouchableOpacity>
            </ScrollView>
            <NavBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 24,
    },
    header: {
        marginTop: 60,
        marginBottom: 20,
    },
    headerText:{
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'UbuntuBold',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 80,
        marginBottom: 80,
    },
    insuranceCard: {
        marginBottom: 10,
    },
    selectedCard: {
        borderColor: '#7066e5',
        borderWidth: 2,
        borderRadius: 10,
    },
    processPaymentButton: {
        width: '80%',
        backgroundColor: '#7066e5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    processPaymentButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'UbuntuBold'
    },
});

export default InsurancePage;