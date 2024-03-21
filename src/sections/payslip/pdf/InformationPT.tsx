import { Text, View, StyleSheet } from "@react-pdf/renderer";

const InformationPT = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.txt}>PT CHANDRA INOVASI SOLUSINDO</Text>
    <Text style={styles.txt}>
      Cabe Mutiara B-16, Jl. Raya Pondok Cabe Tangerang Selatan 15418
    </Text>
    <Text style={styles.txt}>TELP. 021 –7428221</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 8,
  },
  txt: {
    fontSize: "10px",
    color: "gray",
    fontWeight: "bold",
  },
});

export default InformationPT;
