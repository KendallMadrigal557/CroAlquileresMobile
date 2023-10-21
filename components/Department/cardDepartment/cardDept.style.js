import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#202020",
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 15,
    },
    overlay: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#7066e5",
        borderRadius: 7,
        padding: 8,
    },

    price: {
        color: "white",
        fontSize: 16,
    },
    name: {
        color: "white",
        fontSize: 18,
        marginTop: 12,
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    location: {
        color: "#8e9191",
        fontSize: 14,
        marginLeft: 4,
    },
});

export default styles;
