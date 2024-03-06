import MainCard from "@/components/MainCard";
import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import { formatIdr } from "@/utils/formatIdr";
import { User } from "@/types/User";
import dayjs from "dayjs";

interface CardModalProps {
  item: string;
  items: User;
  gajiProrate: number;
  totalPendapatan: number;
  totalPotongan: number;
  totalLembur: number;
}

const CardModal = ({
  items,
  gajiProrate,
  totalPendapatan,
  totalPotongan,
  totalLembur,
}: CardModalProps) => {
  const Item = styled(Paper)(({ theme }) => ({
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    fontSize: "12px",
    textTransform: "capitalize",
  }));

  const TitleItem = styled(Paper)(({ theme }) => ({
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    fontSize: "12px",
    textTransform: "capitalize",
    fontWeight: "bold",
  }));

  return (
    <Grid item xs={4}>
      <MainCard
        sx={{
          borderRadius: 2,
          overflow: "scroll",
          border: "none",
          marginLeft: -2,
          marginRight: -2,
        }}
        showButton={false}
      >
        <Box>
          <Typography
            fontWeight={"bold"}
            fontSize={"14px"}
            color={"gray"}
            marginBottom={2}
          >
            Kepada Yth
          </Typography>

          <Grid container columnSpacing={{ xs: 1 }} sx={{ marginTop: -1 }}>
            <Grid item xs={6} md={6} xl={6}>
              <Grid container sx={{ marginBottom: 1 }}>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Nama</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{items?.nama || "-"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Jabatan</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{items?.jabatan || "-"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Lokasi</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item sx={{ textTransform: "uppercase" }}>
                    {items?.client_name + " - " + items?.area || "-"}
                  </Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Periode</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>
                    {dayjs(new Date(items?.periode)).format("MMMM YYYY") || "-"}
                  </Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <Grid container sx={{ marginBottom: 1 }}>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Tanggal</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>
                    {dayjs(new Date(items?.periode)).format("DD/MM/YYYY") ||
                      "-"}
                  </Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Periode Timesheet</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item style={{ textTransform: "lowercase" }}>
                    {dayjs(new Date(items?.timesheet_start)).format(
                      "DD/MM/YYYY"
                    ) +
                      " s/d " +
                      dayjs(new Date(items?.timesheet_end)).format(
                        "DD/MM/YYYY"
                      )}
                  </Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Total Timesheet</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{items?.total_timesheet_bulan_ini || "0"} Hari</Item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container columnSpacing={{ xs: 1 }} sx={{ marginTop: 4 }}>
          <Grid item xs={6} md={6} xl={6}>
            <Typography
              fontWeight={"bold"}
              fontSize={"14px"}
              color={"gray"}
              marginBottom={2}
            >
              Pendapatan
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} xl={6}>
            <Typography
              fontWeight={"bold"}
              fontSize={"14px"}
              color={"gray"}
              marginBottom={2}
            >
              Potongan
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <Grid container columnSpacing={{ xs: 1 }} sx={{ marginTop: -1 }}>
            <Grid item xs={6} md={6} xl={6}>
              <Grid container sx={{ marginBottom: 1 }}>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Gaji Pokok</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(items?.gaji_pokok) || "0"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Jumlah Masuk Kerja</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{items?.total_masuk_kerja || "0"} Hari</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Gaji Prorate Diterima</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(gajiProrate) || "0"}</Item>
                </Grid>

                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Total Lembur</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{items?.lembur || "0"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Total Uang Lembur</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(totalLembur) || "0"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Insentif</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(items?.insentive) || "-"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Tunjangan Transport</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(items?.tunjangan_transport) || "-"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>THR</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(items?.thr) || "0"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Kekurangan Bayar Bulan Lalu</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>
                    {formatIdr(items?.kekurangan_bayar_bulan_lalu) || "0"}
                  </Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>TOTAL PENDAPATAN</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(totalPendapatan) || "0"}</Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <Grid container sx={{ marginBottom: 1 }}>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Potongan Admin {items?.rekening}</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(items?.potongan_admin_bank) || "0"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Potongan BPJS Ketenagakerjaan</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(items?.potongan_bpjs_tk) || "0"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Potongan BPJS Kesehatan</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>
                    {formatIdr(items?.potongan_bpjs_kesehatan) || "0"}
                  </Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Potongan Iuran</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(items?.potongan_iuran) || "0"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Potongan Ketidak Hadiran</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>
                    {formatIdr(items?.potongan_ketidak_hadiran) || "0"}
                  </Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Potongan Tidak Absen</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(items?.potongan_tidak_absen) || "0"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Potongan Kelebihan Bayar Bulan Lalu</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>
                    {formatIdr(items?.potongan_kelebihan_bayar_bulan_lalu) ||
                      "0"}
                  </Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>Potongan Pinjaman</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(items?.potongan_pinjaman) || "0"}</Item>
                </Grid>
                <Grid item xs={12} md={8} xl={6}>
                  <TitleItem>TOTAL POTONGAN</TitleItem>
                </Grid>
                <Grid item xs={12} md={4} xl={6}>
                  <Item>{formatIdr(totalPotongan) || "0"}</Item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </Grid>
  );
};

export default CardModal;
