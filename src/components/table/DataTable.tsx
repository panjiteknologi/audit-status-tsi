import { AllProject } from "@/types/Project";
import { formatDateTime } from "@/utils/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#1e2041",
  color: theme.palette.common.white,
  fontSize: 14,
  padding: "8px 16px",
  border: "none",
  textTransform: "capitalize",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[200],
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomPaper = styled(Paper)(() => ({
  borderRadius: 8,
  overflow: "hidden",
  marginTop: "20px",
  marginLeft: "-8px",
  marginRight: "-8px",
  boxShadow: "none",
  position: "relative",
}));

const BoldTableCell = styled(TableCell)(() => ({
  fontWeight: "bold",
  padding: "8px 16px",
  border: "none",
  whiteSpace: "nowrap",
  left: 0,
  zIndex: 1,
}));

const ScrollableTableCell = styled(TableCell)(() => ({
  minWidth: "250px",
}));

const HiddenScrollbarTableContainer = styled(TableContainer)(() => ({
  overflowX: "auto",
  overflowY: "auto",
  height: 500,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
}));

const getSLAISO = (tahapan: string) => {
  switch (tahapan) {
    case "Tanggal Aplication Form or Request":
    case "Tanggal Review Penugasan ST Satu":
    case "Tanggal Kontrak":
    case "Tanggal Pengiriman Notifikasi ST Satu":
    case "Tanggal Review Penugasan":
    case "Tanggal Review Penugasan ST Dua":
    case "Tanggal Pengiriman Audit Plan":
    case "Tanggal Pengiriman Audit Plan ST Dua":
    case "Tanggal Pengiriman Notifikasi":
    case "Tanggal Pengiriman Notifikasi ST Dua":
    case "Tanggal Pengiriman Audit Plan ST Satu":
    case "Tanggal Persetujuan Draft Sertifikat":
      return 2;
    case "Tanggal Persetujuan Notifikasi":
    case "Tanggal Persetujuan Notifikasi ST Satu":
    case "Tanggal Persetujuan Notifikasi ST Dua":
    case "Tanggal Persetujuan ke KAN":
      return 3;
    case "Tanggal Pelaksanaan Audit ST Satu":
    case "Tanggal Penyelesaian CAPA ST Satu":
    case "Tanggal Pelaksanaan Audit":
    case "Tanggal Pelaksanaan Audit ST Dua":
    case "Tanggal Penyelesaian CAPA":
    case "Tanggal Penyelesaian CAPA ST Dua":
      return 5;
    case "Tanggal Pengiriman Draft Sertifikat":
    case "Tanggal Pengajuan ke KAN":
    case "Tanggal Kirim Sertifikat":
      return 1;
    default:
      return "-";
  }
};

function getSLAISPO(tahapan: string) {
  switch (tahapan) {
    case "Tanggal Review Penugasan ST Satu":
    case "Tanggal Review Penugasan ST Dua":
    case "Tanggal Review Penugasan":
    case "Tanggal Pengiriman Notifikasi":
    case "Tanggal Pengiriman Draft Sertifikat":
      return 2;
    case "Tanggal Aplication Form or Request":
    case "Tanggal Kirim Sertifikat":
    case "Tanggal Persetujuan Draft Sertifikat":
      return 3;
    case "Tanggal Pengambilan Keputusan":
    case "Tanggal Pengambilan Keputusan ST Satu":
    case "Tanggal Pengambilan Keputusan ST Dua":
      return 5;
    case "Tanggal Pelaksanaan Audit":
    case "Tanggal Pelaksanaan Audit ST Satu":
    case "Tanggal Pelaksanaan Audit ST Dua":
    case "Tanggal Pengajuan Notifikasi ST Dua":
    case "Tanggal Proses Review ST Satu":
    case "Tanggal Proses Review":
      return 7;
    case "Tanggal Persetujuan Notifikasi":
    case "Tanggal Persetujuan Notifikasi ST Satu":
    case "Tanggal Persetujuan Notifikasi ST Dua":
      return 14;
    case "Tanggal Proses Review ST Dua":
      return 15;
    case "Tanggal Pengiriman Audit Plan":
    case "Tanggal Pengiriman Audit Plan ST Satu":
    case "Tanggal Pengiriman Audit Plan ST Dua":
      return 21;
    case "Tanggal Kontrak":
      return 30;
    case "Tanggal Pengajuan Notifikasi ST Satu":
      return 45;
    case "Tanggal Penyelesaian CAPA":
    case "Tanggal Penyelesaian CAPA ST Dua":
    case "Tanggal Penyelesaian CAPA ST Satu":
      return 180;
    default:
      return "-";
  }
}

const parseTimeString = (timeString: string) => {
  if (!timeString) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const timeParts = timeString.split(" ");
  let days = 0;
  let hours = 0;
  let minutes = 0;

  for (let i = 0; i < timeParts.length; i += 2) {
    const value = parseInt(timeParts[i], 10);
    const unit = timeParts[i + 1];

    if (unit && unit.includes("hari")) {
      days = value;
    } else if (unit && unit.includes("jam")) {
      hours = value;
    } else if (unit && unit.includes("menit")) {
      minutes = value;
    }
  }

  return { days, hours, minutes };
};
interface DataTableProps {
  data?: AllProject[] | any;
  pathName: string;
}

const DataTable = ({ data, pathName }: DataTableProps) => {
  return (
    <CustomPaper>
      <HiddenScrollbarTableContainer>
        <Table style={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Tahapan</StyledTableCell>
              <StyledTableCell>Tanggal Pelaksanaan</StyledTableCell>
              <StyledTableCell>SLA</StyledTableCell>
              <StyledTableCell>Lead Time</StyledTableCell>
              <StyledTableCell>Catatan</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: AllProject, index: number) => {
              const sla =
                pathName?.includes("iso") || pathName === "dashboard"
                  ? getSLAISO(row?.tahapan)
                  : getSLAISPO(row?.tahapan);
              const timeString = row?.leadTime;
              const result = parseTimeString(timeString as string);

              const totalLeadTimeInDays =
                result.days + result.hours / 24 + result.minutes / 1440;
              const slaInDays = sla === "-" ? Infinity : sla;

              const isExceeding = slaInDays < totalLeadTimeInDays;

              return (
                <StyledTableRow key={index}>
                  <BoldTableCell>
                    {row?.tahapan ? row.tahapan : "-"}
                  </BoldTableCell>
                  <ScrollableTableCell>
                    {row?.tanggalStatus
                      ? formatDateTime(row?.tanggalStatus)
                      : "-"}
                  </ScrollableTableCell>
                  <ScrollableTableCell>
                    {sla !== "-" ? `${sla} Hari` : "-"}
                  </ScrollableTableCell>
                  <ScrollableTableCell>
                    {result?.days || result?.hours || result?.minutes ? (
                      <Box>
                        <Grid container>
                          <Grid item xl={3} xs={4}>
                            <Typography
                              sx={{
                                color: isExceeding ? "red" : "inherit",
                              }}
                            >
                              {result?.days ? result?.days + " Hari" : "-"}
                            </Typography>
                          </Grid>
                          <Grid item xl={3} xs={4}>
                            <Typography
                              sx={{
                                color: isExceeding ? "red" : "inherit",
                              }}
                            >
                              {result?.hours ? result?.hours + " Jam" : "-"}
                            </Typography>
                          </Grid>
                          <Grid item xl={3} xs={4}>
                            <Typography
                              sx={{
                                color: isExceeding ? "red" : "inherit",
                              }}
                            >
                              {result?.minutes
                                ? result?.minutes + " Menit"
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    ) : (
                      <>
                        <Typography textAlign="center">-</Typography>
                      </>
                    )}
                  </ScrollableTableCell>
                  <ScrollableTableCell>
                    {row?.catatan ? row?.catatan : "-"}
                  </ScrollableTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </HiddenScrollbarTableContainer>
    </CustomPaper>
  );
};

export default DataTable;
