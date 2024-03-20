import InputDropdown from "@/components/InputDropdown";
import {
  Box,
  CircularProgress,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CardModal from "./CardModal";
import { User } from "@/types/User";
import Logo from "../../assets/logo.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PayslipDocument from "./pdf/PayslipDocument";
import { formatIdr } from "@/utils/formatIdr";
import CloseButton from "./CloseButton";

const menu = [
  {
    status_name: "Belum Sesuai",
    status_id: "0",
  },
  {
    status_name: "Sesuai",
    status_id: "1",
  },
];
interface ModalDetailProps {
  showPayslip: boolean;
  onClose: () => void;
  data: User[];
  dataSlip: User;
  selectedMonthName: string;
  openModal: () => void;
  value: string;
  updateStatus: (selectedStatus: string) => void;
  disabled: boolean;
}

const ModalDetail = ({
  showPayslip,
  onClose,
  data,
  selectedMonthName,
  value,
  updateStatus,
  disabled,
}: ModalDetailProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const dataSlip = data[0];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? "95%" : "80%",
    height: 620,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
    overflow: "auto",
    pt: 2,
    px: 4,
    pb: 3,
  };

  const totalLembur = Math.round(
    (+dataSlip?.gaji_pokok / 173) * dataSlip?.lembur
  );

  const gajiProrate = Math.round(
    (+dataSlip?.gaji_pokok / +dataSlip?.total_timesheet_bulan_ini) *
      +dataSlip?.total_masuk_kerja
  );

  const totalPendapatan =
    dataSlip?.client_name === "MERCY"
      ? Math.round(
          gajiProrate +
            totalLembur +
            +dataSlip?.lembur_backup +
            +dataSlip?.insentive +
            +dataSlip?.tunjangan_jabatan +
            +dataSlip?.tunjangan_lembur_nasional +
            +dataSlip?.tunjangan_transport +
            +dataSlip?.thr +
            +dataSlip?.kekurangan_bayar_bulan_lalu
        )
      : Math.round(
          gajiProrate +
            totalLembur +
            +dataSlip?.lembur_backup +
            +dataSlip?.insentive +
            +dataSlip?.tunjangan_jabatan +
            +dataSlip?.tunjangan_transport +
            +dataSlip?.thr +
            +dataSlip?.kekurangan_bayar_bulan_lalu
        );

  const totalPotongan = Math.round(
    +dataSlip?.potongan_admin_bank +
      +dataSlip?.potongan_bpjs_tk +
      +dataSlip?.potongan_bpjs_kesehatan +
      +dataSlip?.potongan_iuran +
      +dataSlip?.potongan_ketidak_hadiran +
      +dataSlip?.potongan_kelebihan_bayar_bulan_lalu +
      +dataSlip?.potongan_pinjaman
  );

  return (
    <Modal
      open={showPayslip}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box sx={style}>
        <CloseButton onClick={onClose} />

        <Box
          flexDirection={"row"}
          justifyContent={"space-between"}
          display={"flex"}
          alignItems={"center"}
          marginTop={4}
        >
          <img style={{ width: 85, height: 50 }} src={Logo} />

          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{
              textAlign: "center",
              marginBottom: "24px",
              fontSize: 18,
              marginLeft: -8,
              marginTop: 2,
            }}
          >
            Slip Gaji Karyawan
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
          ></Typography>
        </Box>

        <Box borderTop={1} borderColor={"#dedede"} marginTop={2} />

        <Box marginTop={2} marginLeft={1}>
          <Typography fontSize={"12px"} color={"gray"} fontWeight={"bold"}>
            PT CHANDRA INOVASI SOLUSINDO
          </Typography>
          <Typography fontSize={"12px"} color={"gray"} fontWeight={"bold"}>
            Cabe Mutiara B-16, Jl. Raya Pondok Cabe Tangerang Selatan 15418
          </Typography>
          <Typography fontSize={"12px"} color={"gray"} fontWeight={"bold"}>
            TELP. 021 –7428221
          </Typography>
        </Box>

        <Box borderTop={1} borderColor={"#dedede"} marginTop={2} />

        <Grid container spacing={{ xs: 2 }} columns={{ xs: 1 }}>
          {data?.map((items, index) => {
            return (
              <CardModal
                key={index}
                item={selectedMonthName}
                items={items}
                totalPendapatan={totalPendapatan}
                totalPotongan={totalPotongan}
                gajiProrate={gajiProrate}
                totalLembur={totalLembur}
              />
            );
          })}
        </Grid>

        <Box borderTop={1} borderColor={"#dedede"} marginTop={2} />

        <Box
          flexDirection={"row"}
          justifyContent={"flex-end"}
          display={"flex"}
          alignItems={"center"}
          marginTop={1}
        >
          <Typography
            fontSize={"12px"}
            color={"gray"}
            fontWeight={"bold"}
            marginRight={2}
          >
            Jumlah Diterima
          </Typography>
          <Typography fontSize={"12px"} color={"gray"}>
            {formatIdr(totalPendapatan + totalPotongan) || "0"}
          </Typography>
        </Box>

        <Box borderTop={1} borderColor={"#dedede"} marginTop={2} />

        <Box width={"100%"} marginTop={2}>
          <Grid container spacing={1}>
            <Grid item xs={8} sm={10} md={10} lg={10} xl={11}>
              <InputDropdown
                title="Apakah data gaji Anda telah sesuai?"
                selectMenu={menu}
                value={value}
                setValue={updateStatus}
                disabled={disabled}
                rightIcon={
                  <CircularProgress
                    color="inherit"
                    size={14}
                    sx={{ marginRight: 2 }}
                  />
                }
              />
            </Grid>
            <Grid item xs={4} sm={2} md={2} lg={2} xl={1}>
              <Box
                style={{
                  backgroundColor: "steelblue",
                  borderRadius: 4,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 8,
                  height: 40,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <PDFDownloadLink
                  document={<PayslipDocument data={dataSlip} />}
                  fileName="slip-gaji.pdf"
                  style={{
                    backgroundColor: "steelblue",
                    color: "white",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  {({ loading }) => (loading ? "Tunggu sebentar..." : "Export")}
                </PDFDownloadLink>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDetail;
