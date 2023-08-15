import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import PaymentService  from '../services/payment.service';
import { useFonts } from 'expo-font';

const PaymentScreen = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cardBalance, setCardBalance] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const route = useRoute();
    const navigation = useNavigation(); 
    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../assets/Ubuntu-Regular.ttf"),
    });
    const { selectedInsurancePrices = [], departmentPrice = 0 } = route?.params || {};
    
    const calculateTotalPayment = () => {
        const insurancePricesSum = selectedInsurancePrices.reduce((total, price) => total + price, 0);
        return insurancePricesSum + departmentPrice;
    };

    const totalPayment = calculateTotalPayment();

    const normalizeCardNumber = (cardNumber) => {
        return cardNumber.replace(/\s/g, '');
    };

    const handlePayment = async () => {
        
        try {
            const paymentData = {
                cardNumber: normalizeCardNumber(cardNumber),
                expirationDate: `20${expirationYear}-${expirationMonth}-01T00:00:00.000Z`,
                securityCode,
                amount: totalPayment,
            };
    
            console.log('Payment Data Sent to API:', paymentData);
    
            const response = await PaymentService.createPayment(paymentData);
            console.log('API Response:', response);
    
            if (response && response.cardNumber) {
                setIsProcessing(true);
                setTimeout(() => {
                    setIsProcessing(false);
                    alert('¡Reserva realizada con éxito!');
                    navigation.navigate('index'); // Replace 'IndexScreen' with the name of your index screen
                }, 3000);
            } else {
                alert('La tarjeta es incorrecta.');
            }
        } catch (error) {
            alert('Error al verificar la tarjeta. Por favor, inténtalo de nuevo.');
        }
    };
    
    

    return (
        <View style={styles.containerDark}>
            <View style={styles.header}>
                <Text style={styles.title}>Ingrese los datos de la tarjeta:</Text>
                <TouchableOpacity onPress={() => alert('Botón de volver presionado')} style={styles.back}>
                    <Text style={{ color: '#FFFFFF', fontSize: 16 ,fontFamily: 'UbuntuBold' }}>Volver</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Número de tarjeta</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de tarjeta"
                        placeholderTextColor="#FFFFFF"
                        value={cardNumber}
                        onChangeText={text => setCardNumber(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Fecha de expiración (MM/AA)</Text>
                    <View style={styles.expirationContainer}>
                        <TextInput
                            style={styles.expirationInput}
                            placeholder="MM"
                            placeholderTextColor="#FFFFFF"
                            value={expirationMonth}
                            onChangeText={text => setExpirationMonth(text)}
                            keyboardType="numeric"
                        />
                        <Text style={styles.expirationDivider}>/</Text>
                        <TextInput
                            style={styles.expirationInput}
                            placeholder="AA"
                            placeholderTextColor="#FFFFFF"
                            value={expirationYear}
                            onChangeText={text => setExpirationYear(text)}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Pago a realizar</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Saldo de la tarjeta"
                        placeholderTextColor="#FFFFFF"
                        value={totalPayment.toString()}
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Código de seguridad</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Código de seguridad"
                        placeholderTextColor="#FFFFFF"
                        value={securityCode}
                        onChangeText={text => setSecurityCode(text)}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
                    <Text style={styles.payButtonText}>Aceptar el pago</Text>
                </TouchableOpacity>
            </View>
            {isProcessing && (
                <View style={styles.processingContainer}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.processingText}>Procesando pago...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    containerDark: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#222222',
        padding: 24,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'UbuntuBold',
        flex: 1,
    },
    back: {
        backgroundColor: '#2f3030',
        padding: 10,
        borderRadius: 5,
    },
    content: {
        marginTop: 20,
    },
    inputContainer: {
        marginTop: 16,
        marginBottom: 16,
        alignContent: 'center',
    },
    inputLabel: {
        color: '#FFFFFF',
        fontFamily: 'UbuntuBoldItalic',
        marginBottom: 8,
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: '#1f2025',
        borderRadius: 50,
        color: '#FFFFFF',
        padding: 15,
        fontFamily: 'UbuntuRegular',
        backgroundColor: '#1e1e1e',
        fontSize: 16,
    },
    expirationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    expirationInput: {
        width: '60%',
        borderWidth: 1,
        borderColor: '#1f2025',
        borderRadius: 50,
        color: '#FFFFFF',
        padding: 15,
        fontFamily: 'UbuntuRegular',
        backgroundColor: '#1e1e1e',
        flex: 0.45,
        fontSize: 16,
    },
    expirationDivider: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'UbuntuRegular',
        alignSelf: 'center',
        paddingHorizontal: 8,
    },
    payButton: {
        backgroundColor: '#7066e5',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 30,
    },
    payButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'UbuntuBold',
    },
    processingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    processingText: {
        color: '#FFFFFF',
        fontFamily: 'UbuntuRegular',
        fontSize: 20,
        marginTop: 16,
    },
});

export default PaymentScreen;
