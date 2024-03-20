import { User } from "@/types/User";
import { formatIdr } from "@/utils/formatIdr";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";

interface EmployeeInfoProps {
  data: User;
}

const EmployeeInfo = ({ data }: EmployeeInfoProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.txt}>Kepada Yth</Text>
      <View style={styles.content}>
        <View style={styles.informationContent}>
          <View style={{ width: "60%" }}>
            <Text style={styles.titleItem}>Nama</Text>
            <Text style={styles.titleItem}>Jabatan</Text>
            <Text style={styles.titleItem}>Lokasi</Text>
            <Text style={styles.titleItem}>Periode</Text>
          </View>
          <View style={{ width: "40%" }}>
            <Text style={styles.text}>{data?.nama || "-"}</Text>
            <Text style={styles.text}>{data?.jabatan || "-"}</Text>
            <Text style={styles.text}>
              {data?.client_name + " - " + data?.area || "-"}
            </Text>
            <Text style={styles.text}>
              {dayjs(new Date(data?.periode)).format("MMMM YYYY") || "-"}
            </Text>
          </View>
        </View>
        <View style={styles.informationContent}>
          <View style={{ width: "60%" }}>
            <Text style={styles.titleItem}>Tanggal</Text>
            <Text style={styles.titleItem}>Periode Timesheet</Text>
            <Text style={styles.titleItem}>Total Timesheet</Text>
            <Text style={styles.titleItem}>Gaji Pokok</Text>
          </View>
          <View style={{ width: "40%" }}>
            <Text style={styles.text}>
              {dayjs(new Date(data?.periode)).format("DD/MM/YYYY") || "-"}
            </Text>
            <Text style={[styles.text, { textTransform: "lowercase" }]}>
              {dayjs(new Date(data?.timesheet_start)).format("DD/MM/YYYY") +
                " s/d " +
                dayjs(new Date(data?.timesheet_end)).format("DD/MM/YYYY")}
            </Text>
            <Text style={styles.text}>
              {data?.total_timesheet_bulan_ini || "0"} Hari
            </Text>
            <Text style={styles.text}>
              {formatIdr(data?.gaji_pokok) || "0"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 6,
  },
  informationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  txt: {
    fontSize: "10px",
    color: "gray",
    fontWeight: "bold",
  },
  titleItem: {
    textAlign: "left",
    color: "gray",
    boxShadow: "none",
    fontSize: "8px",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 2,
  },
  text: {
    fontWeight: "semibold",
    textAlign: "left",
    color: "gray",
    boxShadow: "none",
    fontSize: "8px",
    textTransform: "capitalize",
    marginBottom: 2,
  },
});

export default EmployeeInfo;
