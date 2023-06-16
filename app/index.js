import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/navbar/navbar';
import DepartmentSearch from '../components/Department/DepartmentSeacrh/departmentSearch';
import DepartmentService from '../services/department.service';
import DepartmentCard from '../components/Department/cardDepartment/carddepartment';

export default function Page() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departments = await DepartmentService.getDepartments();
        setDepartments(departments);
        setFilteredDepartments(departments);
      } catch (error) {
        console.log('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentCardPress = (department) => {
    navigation.navigate('detailsDepartment', { departmentId: department._id });
  };

  const filterDepartments = (text) => {
    setSearchText(text);
    const filtered = departments.filter(
      (department) =>
        department.place.toLowerCase().includes(text.toLowerCase()) ||
        department.location.toLowerCase().trim().includes(text.toLowerCase())
    );
    setFilteredDepartments(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <DepartmentSearch onSearch={filterDepartments} />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : filteredDepartments.length === 0 ? (
          <Text style={styles.noDepartmentsText}>No se encontraron departamentos.</Text>
        ) : (
          filteredDepartments.map((department) => (
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
                location={department.location}
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
    backgroundColor: '#000000',
    padding: 24,
  },
  header: {
    marginTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  noDepartmentsText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
    color: '#ffffff',
  },
});
