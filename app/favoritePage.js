import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/navbar/navbar';
import DepartmentService from '../services/department.service';
import FavoriteService from '../services/favorite.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DepartmentCard from '../components/Department/cardDepartment/carddepartment'
import { useFonts } from 'expo-font';

export default function FavoritePage() {
    const [favoriteDepartments, setFavoriteDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        UbuntuBold: require("../assets/Ubuntu-Bold.ttf"),
        UbuntuBoldItalic: require("../assets/Ubuntu-BoldItalic.ttf"),
        UbuntuItalic: require("../assets/Ubuntu-Italic.ttf"),
        UbuntuLight: require("../assets/Ubuntu-Light.ttf"),
        UbuntuLightItalic: require("../assets/Ubuntu-LightItalic.ttf"),
        UbuntuRegular: require("../assets/Ubuntu-Regular.ttf"),
    });
    const handleDepartmentCardPress = (department) => {
        navigation.navigate('detailsDepartment', { departmentId: department._id });
    };

    useEffect(() => {
        const fetchFavoriteDepartments = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                if (!user) {
                    setFavoriteDepartments([]);
                    setLoading(false);
                    return;
                }

                const { _id: userId } = JSON.parse(user);

                const favorites = await FavoriteService.getFavoritesByUserId(userId);

                if (favorites.length === 0) {
                    setFavoriteDepartments([]);
                    setLoading(false);
                    return;
                }

                const departmentIds = favorites.map((favorite) => favorite.idDepartment);

                const departments = await DepartmentService.getDepartments();
                const favoriteDepartments = departments.filter((department) =>
                    departmentIds.includes(department._id)
                );

                setFavoriteDepartments(favoriteDepartments);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching favorite departments:', error);
                setLoading(false);
            }
        };

        fetchFavoriteDepartments();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Departamentos favoritos</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                ) : favoriteDepartments.length === 0 ? (
                    <Text style={styles.noDepartmentsText}>No se encontraron departamentos favoritos.</Text>
                ) : (
                    favoriteDepartments.map((department) => (
                        <Pressable
                            key={department._id}
                            onPress={() => handleDepartmentCardPress(department)}
                            style={({ pressed }) => [
                                styles.departmentCard,
                                {
                                    opacity: pressed ? 0.5 : 1,
                                },
                            ]}
                        >
                            <DepartmentCard
                                image={`http:/192.168.0.2:3002/uploads/${department.image}`}
                                price={department.price}
                                name={department.place}
                                provincia={department.provincia}
                                canton={department.canton}
                                distrito={department.distrito}
                            />
                        </Pressable>
                    ))
                )}
            </ScrollView>

            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        padding: 24,
    },
    header: {
        marginTop: 60,
        marginBottom: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontFamily: 'UbuntuBold',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 40,
        paddingBottom: 80,
    },
});
