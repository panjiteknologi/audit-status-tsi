import { User } from "@/types/User";
import { formatIdr } from "@/utils/formatIdr";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ReactNode } from "react";

interface BenefitInformationProps {
  data: User;
  gajiProrate: number;
  totalLembur: number;
  totalPendapatan: number;
  totalPotongan: number;
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

const BenefitInformation = ({
  data,
  gajiProrate,
  totalLembur,
  totalPendapatan,
  totalPotongan,
}: BenefitInformationProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.content}>
        <Text style={styles.txt}>Pendapatan</Text>
        <View style={styles.informationContent}>
          <Grid>
            <GridItem>
              <Text style={styles.titleItem}>Jumlah Masuk Kerja</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {data?.total_masuk_kerja || "0"} Hari
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Gaji Prorate Diterima</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>{formatIdr(gajiProrate) || "0"}</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Total Lembur</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>{data?.lembur || "0"} Jam</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Total Uang Lembur</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>{formatIdr(totalLembur) || "0"}</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Insentive</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.insentive) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Tunjangan Transport</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.tunjangan_transport) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>THR</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>{formatIdr(data?.thr) || "0"}</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Kekurangan Bayar Bulan Lalu</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.kekurangan_bayar_bulan_lalu) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>TOTAL PENDAPATAN</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(totalPendapatan) || "0"}
              </Text>
            </GridItem>
          </Grid>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.txt}>Potongan</Text>
        <View style={styles.informationContent}>
          <Grid>
            <GridItem>
              <Text style={styles.titleItem}>
                Potongan Admin {data?.rekening}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.potongan_admin_bank) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>
                Potongan BPJS Ketenagakerjaan
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.potongan_bpjs_tk) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Potongan BPJS Kesehatan</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.potongan_bpjs_kesehatan) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Potongan Iuran</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.potongan_iuran) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Potongan Ketidakhadiran</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.potongan_ketidak_hadiran) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Potongan Tidak Absen</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.potongan_tidak_absen) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>
                Potongan Kelebihan Bayar Bulan Lalu
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.potongan_kelebihan_bayar_bulan_lalu) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>Potongan Pinjaman</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>
                {formatIdr(data?.potongan_pinjaman) || "0"}
              </Text>
            </GridItem>
            <GridItem>
              <Text style={styles.titleItem}>TOTAL POTONGAN</Text>
            </GridItem>
            <GridItem>
              <Text style={styles.text}>{formatIdr(totalPotongan) || "0"}</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  content: {
    width: "100%",
  },
  informationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
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

export default BenefitInformation;
