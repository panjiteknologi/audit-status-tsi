import { User } from "@/types/User";
import { formatIdr } from "@/utils/formatIdr";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface BenefitInformationProps {
  data: User;
  gajiProrate: number;
  totalLembur: number;
  totalPendapatan: number;
  totalPotongan: number;
}

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
          <View style={{ width: "60%" }}>
            <Text style={styles.titleItem}>Gaji Pokok</Text>
            <Text style={styles.titleItem}>Jumlah Masuk Kerja</Text>
            <Text style={styles.titleItem}>Gaji Prorate Diterima</Text>
            <Text style={styles.titleItem}>Total Lembur</Text>
            <Text style={styles.titleItem}>Total Uang Lembur</Text>
            <Text style={styles.titleItem}>Insentive</Text>
            <Text style={styles.titleItem}>Tunjangan Transport</Text>
            <Text style={styles.titleItem}>THR</Text>
            <Text style={styles.titleItem}>Kekurangan Bayar Bulan Lalu</Text>
            <Text style={styles.titleItem}>TOTAL PENDAPATAN</Text>
          </View>
          <View style={{ width: "40%" }}>
            <Text style={styles.text}>
              {formatIdr(data?.gaji_pokok) || "0"}
            </Text>
            <Text style={styles.text}>
              {data?.total_masuk_kerja || "0"} Hari
            </Text>
            <Text style={styles.text}>{formatIdr(gajiProrate) || "0"}</Text>
            <Text style={styles.text}>{data?.lembur || "0"} Jam</Text>
            <Text style={styles.text}>{formatIdr(totalLembur) || "0"}</Text>
            <Text style={styles.text}>{formatIdr(data?.insentive) || "0"}</Text>
            <Text style={styles.text}>
              {formatIdr(data?.tunjangan_transport) || "0"}
            </Text>
            <Text style={styles.text}>{formatIdr(data?.thr) || "0"}</Text>
            <Text style={styles.text}>
              {formatIdr(data?.kekurangan_bayar_bulan_lalu) || "0"}
            </Text>
            <Text style={styles.text}>{formatIdr(totalPendapatan) || "0"}</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.txt}>Potongan</Text>

        <View style={styles.informationContent}>
          <View style={{ width: "70%" }}>
            <Text style={styles.titleItem}>
              Potongan Admin {data?.rekening}
            </Text>
            <Text style={styles.titleItem}>Potongan BPJS Ketenagakerjaan</Text>
            <Text style={styles.titleItem}>Potongan BPJS Kesehatan</Text>
            <Text style={styles.titleItem}>Potongan Iuran</Text>
            <Text style={styles.titleItem}>Potongan Ketidakhadiran</Text>
            <Text style={styles.titleItem}>Potongan Tidak Absen</Text>
            <Text style={styles.titleItem}>
              Potongan Kelebihan Bayar Bulan Lalu
            </Text>
            <Text style={styles.titleItem}>Potongan Pinjaman</Text>
            <Text style={styles.titleItem}>TOTAL POTONGAN</Text>
          </View>
          <View style={{ width: "30%" }}>
            <Text style={styles.text}>
              {formatIdr(data?.potongan_admin_bank) || "0"}
            </Text>
            <Text style={styles.text}>
              {formatIdr(data?.potongan_bpjs_tk) || "0"}
            </Text>
            <Text style={styles.text}>
              {formatIdr(data?.potongan_bpjs_kesehatan) || "0"}
            </Text>
            <Text style={styles.text}>
              {formatIdr(data?.potongan_iuran) || "0"}
            </Text>
            <Text style={styles.text}>
              {formatIdr(data?.potongan_ketidak_hadiran) || "0"}
            </Text>
            <Text style={styles.text}>
              {formatIdr(data?.potongan_tidak_absen) || "0"}
            </Text>
            <Text style={styles.text}>
              {formatIdr(data?.potongan_kelebihan_bayar_bulan_lalu) || "0"}
            </Text>
            <Text style={styles.text}>
              {formatIdr(data?.potongan_pinjaman) || "0"}
            </Text>
            <Text style={styles.text}>{formatIdr(totalPotongan) || "0"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  content: {
    flexDirection: "column",
    width: "50%",
    marginTop: 10,
  },
  informationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
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

export default BenefitInformation;
