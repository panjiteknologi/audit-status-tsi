import Logo from "../../assets/logo.png";
import { StyleSheet } from "@react-pdf/renderer";

const LogoMain = () => {
  return <img style={styles.logo} src={Logo} />;
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 60,
  },
});

export default LogoMain;
