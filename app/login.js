import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import NavBar from '../components/navbar/navbar'

const LoginPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            </View>
            <NavBar/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        padding: 24,
    },
    header: {
        marginTop: 30,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 80,
    },
});

export default LoginPage