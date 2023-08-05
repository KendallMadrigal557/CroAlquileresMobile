import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/navbar/navbar';
import DepartmentSearch from '../components/Department/DepartmentSeacrh/departmentSearch';
import DepartmentService from '../services/department.service';
import DepartmentCard from '../components/Department/cardDepartment/carddepartment';
import PlaceService from '../services/place.service';
import { Picker } from '@react-native-picker/picker';
import {ipAPI} from '../config/config';
export default function Page() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [userData, setUserData] = useState({
    provincia: '',
    canton: '',
    distrito: '',
  });
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

  useEffect(() => {
    filterDepartments(searchText);
  }, [userData.provincia, userData.canton, userData.distrito]);
  
  const handleDepartmentCardPress = (department) => {
    navigation.navigate('detailsDepartment', { departmentId: department._id });
  };

  const filterDepartments = (text) => {
    setSearchText(text);
    const filtered = departments.filter(
      (department) =>
        department.place.toLowerCase().includes(text.toLowerCase()) &&
        (userData.provincia === '' || department.provincia.toLowerCase().trim() === userData.provincia.toLowerCase().trim()) &&
        (userData.canton === '' || department.canton.toLowerCase().trim() === userData.canton.toLowerCase().trim()) &&
        (userData.distrito === '' || department.distrito.toLowerCase().trim() === userData.distrito.toLowerCase().trim())
    );
    setFilteredDepartments(filtered);
  };

  const loadProvincias = async () => {
    try {
      const response = await PlaceService.getPlaces();
      const provinciasData = response.map((provincia) => ({
        label: provincia.provincia,
        value: provincia.provincia,
        cantones: provincia.cantones,
      }));
      setProvincias(provinciasData);
    } catch (error) {
      console.log('Error loading provincias:', error);
    }
  };

  const loadCantones = (selectedProvincia) => {
    const provincia = provincias.find((provincia) => provincia.value === selectedProvincia);
    if (provincia) {
      const cantonesData = provincia.cantones.map((canton) => ({
        label: canton.nombre,
        value: canton.nombre,
        distritos: canton.distritos,
      }));
      setCantones(cantonesData);
      setDistritos([]);
      setUserData((prevState) => ({
        ...prevState,
        canton: '',
        distrito: '',
      }));
    }
  };

  const loadDistritos = (selectedCanton) => {
    const provincia = provincias.find((provincia) => provincia.value === userData.provincia);
    if (provincia) {
      const canton = provincia.cantones.find(
        (canton) => canton.nombre.toLowerCase() === selectedCanton.toLowerCase()
      );
      if (canton) {
        const distritosData = canton.distritos.map((distrito) => ({
          label: distrito.nombre,
          value: distrito.nombre,
        }));
        setDistritos(distritosData);
        setUserData((prevState) => ({
          ...prevState,
          distrito: '',
        }));
      }
    }
  };

  useEffect(() => {
    loadProvincias();
  }, []);

  const handleClearSearch = () => {
    setUserData({
      provincia: '',
      canton: '',
      distrito: '',
    });
    loadProvincias();
    setFilteredDepartments(departments);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <DepartmentSearch onSearch={filterDepartments} />
        <View style={styles.pickersContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Provincia</Text>
            <Picker
              selectedValue={userData.provincia}
              style={styles.picker}
              onValueChange={(value) => {
                setUserData((prevState) => ({
                  ...prevState,
                  provincia: value,
                }));
                loadCantones(value);
              }}
            >
              <Picker.Item label="" value="" />
              {provincias.map((provincia) => (
                <Picker.Item key={provincia.value} label={provincia.label} value={provincia.value} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Cantón</Text>
            <Picker
              selectedValue={userData.canton}
              style={styles.picker}
              onValueChange={(value) => {
                setUserData((prevState) => ({
                  ...prevState,
                  canton: value,
                }));
                loadDistritos(value);
              }}
            >
              <Picker.Item label="" value="" />
              {cantones.map((canton) => (
                <Picker.Item key={canton.value} label={canton.label} value={canton.value} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Distrito</Text>
            <Picker
              selectedValue={userData.distrito}
              style={styles.picker}
              onValueChange={(value) => setUserData((prevState) => ({ ...prevState, distrito: value }))}
            >
              <Picker.Item label="" value="" />
              {distritos.map((distrito) => (
                <Picker.Item key={distrito.value} label={distrito.label} value={distrito.value} />
              ))}
            </Picker>
          </View>
        </View>
        <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
          
          <Text style={styles.clearButtonText}>Limpiar busqueda</Text>
        </TouchableOpacity>

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
                image={`http://${ipAPI}:3002/uploads/${department.image}`}
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
});
