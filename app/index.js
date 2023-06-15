import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import NavBar from '../components/navbar/navbar';
import DepartmentCard from '../components/Department/cardDepartment/carddepartment';
import DepartmentSearch from '../components/Department/DepartmentSeacrh/departmentSearch';
import DepartmentService from '../services/department.service';

export default function Page() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departments = await DepartmentService.getDepartments();
        setDepartments(departments);
      } catch (error) {
        console.log('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <DepartmentSearch />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : departments.length === 0 ? (
          <Text style={styles.noDepartmentsText}>No se encontraron departamentos.</Text>
        ) : (
          departments.map((department) => (
            <DepartmentCard
              key={department._id}
              image={`http:/192.168.0.2:3002/uploads/${department.image}`}
              price={department.price}
              name={department.place}
              location={department.location}
            />
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
