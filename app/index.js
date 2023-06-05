import { StyleSheet, Text, View, ScrollView } from "react-native";
import NavBar from "../components/navbar/navbar";
import DepartmentCard from "../components/cardDepartment/carddepartment";
export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>

      </View>

      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer} >
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
    paddingBottom: 80, // Ajusta el valor según el tamaño del navbar
  },
  cardContainer: {
    marginBottom: 80, // Ajusta el valor según el tamaño del navbar
  },
});