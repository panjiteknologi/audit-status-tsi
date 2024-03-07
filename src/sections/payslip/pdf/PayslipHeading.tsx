import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Logo from "../../../assets/logo.png";

interface PayslipHeadingProps {
  title: string;
}

const PayslipHeading = ({ title }: PayslipHeadingProps) => (
  <View style={styles.container}>
    <Image style={styles.logo} src={Logo} />
    <Text style={styles.reportTitle}>{title}</Text>
    <Text style={styles.reportTitle}>{""}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  logo: {
    width: 85,
    height: 50,
  },
  reportTitle: {
    color: "#000",
    fontSize: 16,
    textTransform: "capitalize",
    marginRight: 20,
  },
});

export default PayslipHeading;
