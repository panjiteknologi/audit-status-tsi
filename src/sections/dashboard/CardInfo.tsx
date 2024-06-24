import MainCard from "@/components/MainCard";
import {
  Box,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  styled,
  useMediaQuery,
} from "@mui/material";
import { AllProject } from "@/types/Project";
import { useTheme } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DataTable from "@/components/table/DataTable";

interface CardInfoProps {
  items: AllProject;
  onEdit: () => void;
  open: boolean[];
  index: number;
  handleClick: (index: number) => void;
}

const CardInfo = ({
  items,
  onEdit,
  open,
  index,
  handleClick,
}: CardInfoProps) => {
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

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
    fontSize: sm ? "11px" : "12px",
    textTransform: "capitalize",
    fontWeight: "bold",
  }));

  const dataField: AllProject[] = [
    {
      tahapan: "Tanggal Aplication Form or Request",
      tanggalStatus: items?.tgl_apl_form_or_request,
      catatan: items?.note_tgl_apl_form_or_request,
    },
    {
      tahapan: "Tanggal Review Penugasan ST Satu",
      tanggalStatus: items?.tgl_review_penugasan_st_satu,
      catatan: items?.note_tgl_review_penugasan_st_satu,
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi ST Satu",
      tanggalStatus: items?.tgl_pengiriman_notif_st_satu,
      catatan: items?.note_tgl_pengiriman_notif_st_satu,
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Satu",
      tanggalStatus: items?.tgl_persetujuan_notif_st_satu,
      catatan: items?.note_tgl_persetujuan_notif_st_satu,
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Satu",
      tanggalStatus: items?.tgl_pengiriman_audit_plan_st_satu,
      catatan: items?.note_tgl_pengiriman_audit_plan_st_satu,
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Satu",
      tanggalStatus: items?.tgl_pelaksanaan_audit_st_satu,
      catatan: items?.note_tgl_pelaksanaan_audit_st_satu,
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Satu",
      tanggalStatus: items?.tgl_penyelesaian_capa_st_satu,
      catatan: items?.note_tgl_penyelesaian_capa_st_satu,
    },
    {
      tahapan: "Tanggal Review Penugasan ST Dua",
      tanggalStatus: items?.tgl_review_penugasan_st_dua,
      catatan: items?.note_tgl_review_penugasan_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi ST Dua",
      tanggalStatus: items?.tgl_pengiriman_notif_st_dua,
      catatan: items?.note_tgl_pengiriman_notif_st_dua,
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Dua",
      tanggalStatus: items?.tgl_persetujuan_notif_st_dua,
      catatan: items?.note_tgl_persetujuan_notif_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Dua",
      tanggalStatus: items?.tgl_pengiriman_audit_plan_st_dua,
      catatan: items?.note_tgl_pengiriman_audit_plan_st_dua,
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Dua",
      tanggalStatus: items?.tgl_pelaksanaan_audit_st_dua,
      catatan: items?.note_tgl_pelaksanaan_audit_st_dua,
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Dua",
      tanggalStatus: items?.tgl_penyelesaian_capa_st_dua,
      catatan: items?.note_tgl_penyelesaian_capa_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Sertifikat",
      tanggalStatus: items?.tgl_pengiriman_sertifikat,
      catatan: items?.note_tgl_pengiriman_sertifikat,
    },
    {
      tahapan: "Tanggal Persetujuan Draft Sertifikat",
      tanggalStatus: items?.tgl_persetujuan_draft_sertifikat,
      catatan: items?.note_tgl_persetujuan_draft_sertifikat,
    },
    {
      tahapan: "Tanggal Pengajuan ke KAN",
      tanggalStatus: items?.tgl_pengajuan_ke_kan,
      catatan: items?.note_tgl_pengajuan_ke_kan,
    },
    {
      tahapan: "Tanggal Persetujuan KAN",
      tanggalStatus: items?.tgl_persetujuan_kan,
      catatan: items?.note_tgl_persetujuan_kan,
    },
    {
      tahapan: "Tanggal Kirim Sertifikat",
      tanggalStatus: items?.tgl_kirim_sertifikat,
      catatan: items?.note_tgl_kirim_sertifikat,
    },
  ];

  const latestProgress = dataField
    .filter((item) => item.tanggalStatus)
    .sort((a, b) =>
      new Date(a.tanggalStatus as string) > new Date(b.tanggalStatus as string)
        ? -1
        : 1
    )[0];

  return (
    <Grid item xs={4} sx={{ marginTop: 4 }}>
      <MainCard
        btnHeader={true}
        bgHeaderColor={
          items?.status_pembayaran == 1
            ? "red"
            : items?.status_pembayaran === 2
            ? "#1677ff"
            : items?.status_pembayaran === 3
            ? "#1677ff"
            : items?.status_pembayaran === 4
            ? "#1677ff"
            : items?.status_pembayaran === 5
            ? "#1677ff"
            : items?.status_pembayaran === 6
            ? "#1677ff"
            : items?.status_pembayaran === null
            ? "gray"
            : "#5a8b5c"
        }
        titleBtnHeader={items?.nama_status_pembayaran}
        iconRight={
          <IconButton aria-label="edit" size="small" onClick={onEdit}>
            <ModeEditIcon
              sx={{
                width: 16,
                color: "white",
                cursor: "pointer",
              }}
            />
          </IconButton>
        }
        title={items?.nama_perusahaan || "-"}
        showButton={
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleClick(index)}
          >
            {open[index] ? (
              <KeyboardArrowUpIcon
                sx={{
                  width: 50,
                  color: "white",
                  cursor: "pointer",
                  paddingRight: 3,
                }}
              />
            ) : (
              <KeyboardArrowDownIcon
                sx={{
                  width: 50,
                  color: "white",
                  cursor: "pointer",
                  paddingRight: 3,
                }}
              />
            )}
          </IconButton>
        }
      >
        <Grid container rowSpacing={{ xs: 1 }}>
          <Grid item xs={12} xl={12} lg={12} md={12}>
            <Grid container sx={{ marginBottom: 1 }}>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Nama Sales</TitleItem>
                <Item>{items?.nama_sales_or_crr || "-"}</Item>
              </Grid>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Standar</TitleItem>
                {items?.standar?.map(
                  (item: { nama_standar: string }, index: number) => (
                    <Item key={index}>{item?.nama_standar || "-"}</Item>
                  )
                )}
              </Grid>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Akreditasi</TitleItem>
                <Item>{items?.nama_akreditasi || "-"}</Item>
              </Grid>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Tahapan</TitleItem>
                <Item>{items?.nama_tahapan || "-"}</Item>
              </Grid>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Latest Progress</TitleItem>
                <Item>
                  {latestProgress
                    ? `${latestProgress.tahapan?.replace("Tanggal ", "")}`
                    : "-"}
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {open[index] && <Divider />}

        <Collapse in={open[index]} timeout="auto" unmountOnExit>
          <Box
            sx={{
              margin: 1,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "gray",
            }}
          >
            <DataTable data={dataField} />
          </Box>
        </Collapse>
      </MainCard>
    </Grid>
  );
};

export default CardInfo;
