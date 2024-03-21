import { User } from "@/types/User";
import { formatIdr } from "@/utils/formatIdr";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { ReactNode } from "react";

interface EmployeeInfoProps {
  data: User;
}
interface PropsGrid {
  children: ReactNode;
}

const GridItem = ({ children }: PropsGrid) => (
  <View style={styles.gridItem}>{children}</View>
);

const Grid = ({ children }: PropsGrid) => (
  <View style={styles.gridContainer}>{children}</View>
);

const EmployeeInfo = ({ data }: EmployeeInfoProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.txt}>Kepada Yth</Text>
      <View style={styles.content}>
        <View style={styles.informationContent}>
          <Grid>
            <GridItem>
              <Text style={styles.titleItem}>Nama</Text>
            </GridItem>

            <GridItem>
              <Text style={styles.text}>{data?.nama || "-"}</Text>
            </GridItem>

            <GridItem>
              <Text style={styles.titleItem}>Jabatan</Text>
            </GridItem>

            <GridItem>
              <Text style={styles.text}>{data?.jabatan || "-"}</Text>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <Text style={styles.titleItem}>Tanggal</Text>
            </GridItem>

            <GridItem>
              <Text style={styles.text}>
                {data?.periode
                  ? dayjs(new Date(data?.periode)).format("DD/MM/YYYY")
                  : "-"}
              </Text>
            </GridItem>

            <GridItem>
              <Text style={styles.titleItem}>Periode Timesheet</Text>
            </GridItem>

            <GridItem>
              <Text style={styles.text}>
                {data?.timesheet_start || data?.timesheet_end
                  ? dayjs(new Date(data?.timesheet_start)).format(
                      "DD/MM/YYYY"
                    ) +
                    " s/d " +
                    dayjs(new Date(data?.timesheet_end)).format("DD/MM/YYYY")
                  : "-"}
              </Text>
            </GridItem>
          </Grid>
        </View>
        <View style={styles.informationContent}>
          <Grid>
            <GridItem>
              <Text style={styles.titleItem}>Lokasi</Text>
            </GridItem>

            <GridItem>
              <Text style={styles.text}>
                {data?.client_name || data?.area
                  ? data?.client_name + " - " + data?.area
                  : "-"}
              </Text>
            </GridItem>

            <GridItem>
              <Text style={styles.titleItem}>Periode</Text>
            </GridItem>

            <GridItem>
              <Text style={styles.text}>
                {data?.periode
                  ? dayjs(new Date(data?.periode)).format("MMMM YYYY")
                  : "-"}
              </Text>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <Text style={styles.titleItem}>Total Timesheet</Text>
            </GridItem>

            <GridItem>
              <Text style={styles.text}>
                {data?.total_timesheet_bulan_ini || "0"} Hari
              </Text>
            </GridItem>

            <GridItem>
              <Text style={styles.titleItem}>Gaji Pokok</Text>
            </GridItem>

            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.gaji_pokok) || "0"}
              </Text>
            </GridItem>
          </Grid>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 14,
  },
  content: {
    marginTop: 6,
  },
  informationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
  },
  text: {
    fontWeight: "semibold",
    textAlign: "left",
    color: "gray",
    boxShadow: "none",
    fontSize: "8px",
    textTransform: "capitalize",
    marginRight: 8,
    width: "45%",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
  },
});

export default EmployeeInfo;
