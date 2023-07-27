import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#202020",
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    name: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 12,
    },
    description: {
        color: "white",
        fontSize: 14,
        marginTop: 8,
    },
    price: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
    },
    companyName: {
        color: "white",
        fontSize: 14,
        marginTop: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    checkedCheckbox: {
        backgroundColor: "#ffffff",
    },
    checkIcon: {
        color: "black",
        fontSize: 16,
    },
});

export default styles;
