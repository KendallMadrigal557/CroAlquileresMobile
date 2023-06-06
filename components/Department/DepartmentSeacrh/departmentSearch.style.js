import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
        padding: 8,
        marginRight: 8,
        fontSize: 16,
        
    },
    searchButton: {
        backgroundColor: "#7066e5",
        borderRadius: 10,
        padding: 8,
    },
});

export default styles;