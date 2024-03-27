import InputDropdown from "@/components/InputDropdown";
import {
  Box,
  Button,
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
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import IconWhatsApp from "../../assets/icons/ic-wa.svg";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

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
  gajiProrate: number;
  totalPendapatan: number;
  totalPotongan: number;
  totalLembur: number;
  selectedMonthName: string;
  openModal: () => void;
  value: string;
  updateStatus: (selectedStatus: string) => void;
  disabled: boolean;
  createWhatsAppLink: () => void;
  selectedStatus: string;
  dataSlips: User[];
}

const ModalDetail = ({
  showPayslip,
  onClose,
  data,
  dataSlip,
  gajiProrate,
  totalPendapatan,
  totalPotongan,
  totalLembur,
  selectedMonthName,
  value,
  updateStatus,
  disabled,
  createWhatsAppLink,
  selectedStatus,
}: // dataSlips,
ModalDetailProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? "95%" : md ? "80%" : lg ? "80%" : "50%",
    height: 650,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    overflow: "auto",
    pt: 2,
    px: 2,
    pb: 3,
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };

  // const handleDownload = async () => {
  //   const zipProdia = new JSZip();
  //   const zipMercy = new JSZip();
  //   const zipDjarum = new JSZip();

  //   try {
  //     // Mendapatkan data berdasarkan klien
  //     const dataToDownload = dataSlips?.data?.filter(
  //       (items) => items?.client_name === "PRODIA"
  //     );
  //     const dataToDownload2 = dataSlips?.data?.filter(
  //       (items) => items?.client_name === "MERCY"
  //     );
  //     const dataToDownload3 = dataSlips?.data?.filter(
  //       (items) => items?.client_name === "DJARUM"
  //     );

  //     // Mengatur fungsi pembuatan ZIP file
  //     const generateZip = async (zip, data, zipName) => {
  //       const chunkedData = chunkArray(data, 50);
  //       for (let i = 0; i < chunkedData.length; i++) {
  //         const chunk = chunkedData[i];
  //         await Promise.all(
  //           chunk.map(async (items, index) => {
  //             const fileName = `Slip Gaji - ${
  //               items?.nama + ` (${items?.client_name}) ` + items?.area
  //             }.pdf`;
  //             const blob = await pdf(<PayslipDocument data={items} />).toBlob();
  //             zip.file(fileName, blob);
  //           })
  //         );
  //         const zipBlob = await zip.generateAsync({ type: "blob" });
  //         saveAs(zipBlob, `${zipName}-part-${i + 1}.zip`); // Ubah nama zip sesuai kebutuhan Anda
  //         zip = new JSZip(); // Reset ZIP object
  //       }
  //     };

  //     // Memanggil fungsi pembuatan ZIP file untuk setiap klien
  //     await generateZip(zipProdia, dataToDownload, "PRODIA");
  //     await generateZip(zipMercy, dataToDownload2, "MERCY");
  //     await generateZip(zipDjarum, dataToDownload3, "DJARUM");
  //   } catch (error) {
  //     console.error("Error generating ZIP file:", error);
  //     // Handle error if any
  //   }
  // };

  // // Fungsi untuk membagi array menjadi bagian-bagian dengan ukuran tertentu
  // const chunkArray = (array, size) => {
  //   const chunkedArray = [];
  //   for (let i = 0; i < array.length; i += size) {
  //     chunkedArray.push(array.slice(i, i + size));
  //   }
  //   return chunkedArray;
  // };

  return (
    <Modal
      open={showPayslip}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
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
          <img style={{ width: 80, height: 45 }} src={Logo} />

          <Typography
            id="modal-modal-title"
            variant="h5"
            marginLeft={-2}
            marginTop={2}
            fontSize={14}
            textAlign="center"
            marginBottom="20px"
          >
            Slip Gaji Karyawan
          </Typography>
          <PDFDownloadLink
            document={<PayslipDocument data={dataSlip} />}
            fileName="slip-gaji.pdf"
            style={{
              backgroundColor: "red",
              borderRadius: 6,
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 4,
              height: 30,
              textAlign: "center",
              width: 70,
              color: "white",
              textDecoration: "none",
            }}
          >
            {({ loading }) => (
              <Box flexDirection="row" display="flex" alignItems="center">
                <FileDownloadOutlinedIcon
                  sx={{
                    height: 20,
                    width: 20,
                  }}
                />
                <Typography fontSize="12px" marginLeft={0.5} fontWeight="bold">
                  {loading ? "Tunggu sebentar..." : "PDF"}
                </Typography>
              </Box>
            )}
          </PDFDownloadLink>
          {/* <Button
            onClick={handleDownload}
            variant="contained"
            color="primary"
            style={{ margin: "20px auto", display: "block" }}
            startIcon={<FileDownloadOutlinedIcon />}
          >
            Unduh Slip Gaji (ZIP)
          </Button> */}
        </Box>

        <Box borderTop={1} borderColor={"#dedede"} marginTop={2} />

        <Box marginTop={2}>
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
          justifyContent={"space-between"}
          display={"flex"}
          alignItems={"center"}
          marginTop={1}
        >
          <Typography
            fontSize={"12px"}
            color={"#326aa6"}
            fontWeight={"bold"}
            marginRight={2}
            textTransform={"uppercase"}
          >
            Jumlah Diterima
          </Typography>
          <Typography fontSize={"12px"} color={"#326aa6"}>
            {formatIdr(totalPendapatan - totalPotongan) || "0"}
          </Typography>
        </Box>

        <Box borderTop={1} borderColor={"#dedede"} marginTop={1} />

        <Box width={"100%"} marginTop={2}>
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
        </Box>

        <Box marginTop={2}>
          {selectedStatus === "0" && dataSlip?.sesuai === 0 && (
            <Button
              onClick={createWhatsAppLink}
              sx={{
                backgroundColor: "#25d366",
                color: "white",
                fontSize: "12px",
                borderRadius: 2,
                marginBottom: 2,
                width: "100%",
                height: 40,
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: "#25d366",
                  color: "white",
                  opacity: 0.6,
                },
              }}
            >
              <img
                src={IconWhatsApp}
                width={18}
                height={18}
                style={{ marginRight: 6 }}
              />
              Send Whatsapp Message
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDetail;
