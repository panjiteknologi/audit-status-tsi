import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import PayslipHeading from "./PayslipHeading";
import InformationPT from "./InformationPT";
import EmployeeInfo from "./EmployeeInfo";
import { User } from "../../../types/User";
import BenefitInformation from "./BenefitInformation";
import { formatIdr } from "@/utils/formatIdr";
interface PayslipDocumentProps {
  data: User;
}

const PayslipDocument = ({ data }: PayslipDocumentProps) => {
  const totalLembur = Math.round((+data?.gaji_pokok / 173) * data?.lembur);

  const gajiProrate = Math.round(
    (+data?.gaji_pokok / +data?.total_timesheet_bulan_ini) *
      +data?.total_masuk_kerja
  );

  const totalPendapatan =
    data?.client_name === "MERCY"
      ? Math.round(
          gajiProrate +
            totalLembur +
            +data?.lembur_backup +
            +data?.insentive +
            +data?.tunjangan_jabatan +
            +data?.tunjangan_lembur_nasional +
            +data?.tunjangan_transport +
            +data?.thr +
            +data?.kekurangan_bayar_bulan_lalu
        )
      : Math.round(
          gajiProrate +
            totalLembur +
            +data?.lembur_backup +
            +data?.insentive +
            +data?.tunjangan_jabatan +
            +data?.tunjangan_transport +
            +data?.thr +
            +data?.kekurangan_bayar_bulan_lalu
        );

  const totalPotongan = Math.round(
    +data?.potongan_admin_bank +
      +data?.potongan_bpjs_tk +
      +data?.potongan_bpjs_kesehatan +
      +data?.potongan_iuran +
      +data?.potongan_ketidak_hadiran +
      +data?.potongan_tidak_absen +
      +data?.potongan_kelebihan_bayar_bulan_lalu +
      +data?.potongan_pinjaman
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PayslipHeading title="Slip Gaji Karyawan" />
        <View style={styles.hr} />
        <InformationPT />
        <View style={styles.hr} />
        <EmployeeInfo data={data} />
        <View style={styles.hr} />
        <BenefitInformation
          data={data}
          gajiProrate={gajiProrate}
          totalLembur={totalLembur}
          totalPendapatan={totalPendapatan}
          totalPotongan={totalPotongan}
        />
        <View style={styles.hr} />
        <View style={styles.totalView}>
          <Text style={styles.totalDiterima}>Jumlah Diterima</Text>
          <Text style={styles.total}>
            {formatIdr(totalPendapatan - totalPotongan) || "0"}
          </Text>
        </View>
        <View style={styles.hr} />
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 24,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  hr: {
    borderTopWidth: 0.5,
    borderColor: "#cdcdcd",
  },
  totalView: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginVertical: 8,
  },
  totalDiterima: {
    marginRight: 8,
    fontSize: "10px",
    color: "gray",
    fontWeight: "bold",
  },
  total: {
    fontSize: "10px",
    color: "#000",
    fontWeight: "bold",
  },
});

export default PayslipDocument;
