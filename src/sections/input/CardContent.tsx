import { formatIdr } from "@/utils/formatIdr";
import {
  Box,
  Grid,
  Paper,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";

interface CardContentProps {
  items: any;
  gajiProrate: number;
  totalPendapatan: number;
  totalPotongan: number;
  totalLembur: number;
}

const CardContent = ({
  items,
  gajiProrate,
  totalPendapatan,
  totalPotongan,
  totalLembur,
}: CardContentProps) => {
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const Item = styled(Paper)(({ theme }) => ({
    textAlign: "right",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    fontSize: sm ? "11px" : "12px",
    textTransform: "capitalize",
  }));

  const TitleItem = styled(Paper)(({ theme }) => ({
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    fontSize: sm ? "11px" : "12px",
    textTransform: "capitalize",
    fontWeight: "bold",
  }));

  const TextItem = styled(Paper)(({ theme }) => ({
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    fontSize: sm ? "11px" : "12px",
    textTransform: "capitalize",
  }));

  const ItemBlue = styled(Paper)(() => ({
    textAlign: "right",
    color: "#326aa6",
    boxShadow: "none",
    fontSize: sm ? "11px" : "12px",
    textTransform: "capitalize",
  }));

  const TextBlue = styled(Paper)(() => ({
    textAlign: "left",
    color: "#326aa6",
    boxShadow: "none",
    fontSize: sm ? "11px" : "12px",
    textTransform: "capitalize",
    fontWeight: "bold",
  }));

  return (
    <>
      <Box
        sx={{
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography
          fontWeight={"bold"}
          fontSize={"12px"}
          color={"gray"}
          marginBottom={1}
        >
          Kepada Yth
        </Typography>

        <Grid container columnSpacing={{ xs: 1 }}>
          <Grid item xs={12}>
            <Grid container sx={{ marginBottom: 1 }}>
              <Grid item xs={6}>
                <TitleItem>Nama</TitleItem>
              </Grid>
              <Grid item xs={6}>
                <TextItem>{items?.nama || "-"}</TextItem>
              </Grid>
              <Grid item xs={6}>
                <TitleItem>Jabatan</TitleItem>
              </Grid>
              <Grid item xs={6}>
                <TextItem>{items?.jabatan || "-"}</TextItem>
              </Grid>
              <Grid item xs={6}>
                <TitleItem>Lokasi</TitleItem>
              </Grid>
              <Grid item xs={6}>
                <TextItem sx={{ textTransform: "uppercase" }}>
                  {items?.client_name + " - " + items?.area || "-"}
                </TextItem>
              </Grid>
              <Grid item xs={6}>
                <TitleItem>Periode</TitleItem>
              </Grid>
              <Grid item xs={6}>
                <TextItem>
                  {dayjs(new Date(items?.periode)).format("MMMM YYYY") || "-"}
                </TextItem>
              </Grid>
              <Grid item xs={6}>
                <TitleItem>Tanggal</TitleItem>
              </Grid>
              <Grid item xs={6}>
                <TextItem>
                  {dayjs(new Date(items?.periode)).format("DD/MM/YYYY") || "-"}
                </TextItem>
              </Grid>
              <Grid item xs={6}>
                <TitleItem>Periode Timesheet</TitleItem>
              </Grid>
              <Grid item xs={6}>
                <TextItem style={{ textTransform: "lowercase" }}>
                  {dayjs(new Date(items?.timesheet_start)).format(
                    "DD/MM/YYYY"
                  ) +
                    " s/d " +
                    dayjs(new Date(items?.timesheet_end)).format("DD/MM/YYYY")}
                </TextItem>
              </Grid>
              <Grid item xs={6}>
                <TitleItem>Total Timesheet</TitleItem>
              </Grid>
              <Grid item xs={6}>
                <TextItem>
                  {items?.total_timesheet_bulan_ini || "0"} Hari
                </TextItem>
              </Grid>
              <Grid item xs={6}>
                <TitleItem>Gaji Pokok</TitleItem>
              </Grid>
              <Grid item xs={6}>
                <TextItem>{formatIdr(items?.gaji_pokok) || "0"}</TextItem>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box borderTop={1} borderColor={"#dedede"} marginTop={2} />

      <Box
        sx={{
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography
          fontWeight={"bold"}
          fontSize={"12px"}
          color={"gray"}
          marginTop={2}
          marginBottom={1}
        >
          Pendapatan
        </Typography>
        <Grid container columnSpacing={{ xs: 1 }}>
          <Grid item xs={12}>
            <Grid container sx={{ marginBottom: 1 }}>
              <Grid item xs={8}>
                <TitleItem>Jumlah Masuk Kerja</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{items?.total_masuk_kerja || "0"} Hari</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Gaji Prorate Diterima</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(gajiProrate) || "0"}</Item>
              </Grid>

              <Grid item xs={8}>
                <TitleItem>Total Lembur</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{items?.lembur || "0"} Jam</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Total Uang Lembur</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(totalLembur) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Lembur Backup</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.lembur_backup) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Insentive</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.insentive) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Tunjangan Jabatan</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.tunjangan_jabatan) || "0"}</Item>
              </Grid>
              {items?.client_name === "MERCY" && (
                <>
                  <Grid item xs={8}>
                    <TitleItem>Tunjangan Lembur Nasional</TitleItem>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      {formatIdr(items?.tunjangan_lembur_nasional) || "0"}
                    </Item>
                  </Grid>
                </>
              )}
              <Grid item xs={8}>
                <TitleItem>Tunjangan Transport</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.tunjangan_transport) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>THR</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.thr) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Kekurangan Bayar Bulan Lalu</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  {formatIdr(items?.kekurangan_bayar_bulan_lalu) || "0"}
                </Item>
              </Grid>
              <Grid item xs={8} marginTop={2}>
                <TextBlue>TOTAL PENDAPATAN</TextBlue>
              </Grid>
              <Grid item xs={4} marginTop={2}>
                <ItemBlue>{formatIdr(totalPendapatan) || "0"}</ItemBlue>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box borderTop={1} borderColor={"#dedede"} marginTop={2} />

      <Box
        sx={{
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography
          fontWeight={"bold"}
          fontSize={"12px"}
          color={"gray"}
          marginTop={2}
          marginBottom={1}
        >
          Potongan
        </Typography>
        <Grid container columnSpacing={{ xs: 1 }}>
          <Grid item xs={12}>
            <Grid container sx={{ marginBottom: 1 }}>
              <Grid item xs={8}>
                <TitleItem>Potongan Admin {items?.rekening}</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.potongan_admin_bank) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Potongan BPJS Ketenagakerjaan</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.potongan_bpjs_tk) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Potongan BPJS Kesehatan</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.potongan_bpjs_kesehatan) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Potongan Iuran</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.potongan_iuran) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Potongan Ketidak Hadiran</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.potongan_ketidak_hadiran) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Potongan Tidak Absen</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.potongan_tidak_absen) || "0"}</Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Potongan Kelebihan Bayar Bulan Lalu</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  {formatIdr(items?.potongan_kelebihan_bayar_bulan_lalu) || "0"}
                </Item>
              </Grid>
              <Grid item xs={8}>
                <TitleItem>Potongan Pinjaman</TitleItem>
              </Grid>
              <Grid item xs={4}>
                <Item>{formatIdr(items?.potongan_pinjaman) || "0"}</Item>
              </Grid>
              <Grid item xs={8} marginTop={2}>
                <TextBlue>TOTAL POTONGAN</TextBlue>
              </Grid>
              <Grid item xs={4} marginTop={2}>
                <ItemBlue>{formatIdr(totalPotongan) || "0"}</ItemBlue>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CardContent;
