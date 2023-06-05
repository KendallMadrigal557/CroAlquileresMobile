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
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#7066e5",
        opacity: 1,
        borderRadius: 8,
        marginTop: 147,
        marginLeft: 165,
        width: 100,
        height: 40
    },
    price: {
        position: "absolute",
        top: 16,
        left: 16,
        marginTop: 140,
        marginLeft: 160,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    name: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
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
