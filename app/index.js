import { StyleSheet, Text, View, ScrollView } from "react-native";
import NavBar from "../components/navbar/navbar";
import DepartmentCard from "../components/Department/cardDepartment/carddepartment";
import DepartmentSearch from "../components/Department/DepartmentSeacrh/departmentSearch"
export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>

      </View>

      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer} >
        <DepartmentSearch/>
        <DepartmentCard
          image={require("../assets/minimal-apartment.jpg")}
          price="$250,000"
          name="Departamento Ejemplo"
          location="Ciudad Ejemplo"
        />
        <DepartmentCard
          image={require("../assets/minimal-apartment.jpg")}
          price="$250,000"
          name="Departamento Ejemplo"
          location="Ciudad Ejemplo"
        />
        <DepartmentCard
          image={require("../assets/minimal-apartment.jpg")}
          price="$250,000"
          name="Departamento Ejemplo"
          location="Ciudad Ejemplo"
        />
        <DepartmentCard
          image={require("../assets/minimal-apartment.jpg")}
          price="$250,000"
          name="Departamento Ejemplo"
          location="Ciudad Ejemplo"
        />
        <DepartmentCard
          image={require("../assets/minimal-apartment.jpg")}
          price="$250,000"
          name="Departamento Ejemplo"
          location="Ciudad Ejemplo"
        />
        <DepartmentCard
          image={require("../assets/minimal-apartment.jpg")}
          price="$250,000"
          name="Departamento Ejemplo"
          location="Ciudad Ejemplo"
        />
        <DepartmentCard
          image={require("../assets/minimal-apartment.jpg")}
          price="$250,000"
          name="Departamento Ejemplo"
          location="Ciudad Ejemplo"
        />
        <DepartmentCard
          image={require("../assets/minimal-apartment.jpg")}
          price="$250,000"
          name="Departamento Ejemplo"
          location="Ciudad Ejemplo"
        />
        <DepartmentCard
          image={require("../assets/minimal-apartment.jpg")}
          price="$250,000"
          name="Departamento Ejemplo"
          location="Ciudad Ejemplo"
        />
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
    marginTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, 
  },
});