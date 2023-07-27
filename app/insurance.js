import React , { useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import InsuranceCard from "../components/Insurance/cardInsurance/cardInsurance.jsx";
import NavBar from '../components/navbar/navbar';
import InsuranceService from '../services/insurance.service.js'

const InsurancePage = () => {
    const [insuranceData, setInsuranceData] = useState([]);

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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Available Insurance Options</Text>
                {insuranceData.map((insurance) => (
                    <InsuranceCard
                        key={insurance._id}
                        type={insurance.type}
                        description={insurance.description}
                        price={insurance.price}
                        companyName={insurance.company.name}
                    />
                ))}
                <TouchableOpacity
                    style={styles.processPaymentButton}
                    onPress={() => navigation.navigate('PaymentScreen')}
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
        marginTop: 30,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 80,
        marginBottom: 80
    },
    loadingIndicator: {
        marginTop: 50,
    },
    pickersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flex: 1,
        marginRight: 10,
    },
    inputLabel: {
        color: '#ffffff',
        marginBottom: 5,
    },
    picker: {
        backgroundColor: '#222222',
        borderRadius: 5,
        padding: 5,
        color: '#ffffff',
    },
    noDepartmentsText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 50,
        color: '#ffffff',
    },
    departmentCard: {
        marginBottom: 10,
    },
    clearButton: {
        backgroundColor: '#222222',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    clearButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        borderRadius: 30,
    },
    processPaymentButton: {
        backgroundColor: '#7066e5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    processPaymentButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default InsurancePage;
