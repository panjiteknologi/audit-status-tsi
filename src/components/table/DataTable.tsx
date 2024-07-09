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
  Box,
  Grid,
  Typography,
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

interface DataTableProps {
  data?: AllProject[] | null;
}

const DataTable = ({ data }: DataTableProps) => {
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
              const parseTimeString = (timeString: any) => {
                if (!timeString) {
                  return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                  };
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

                return {
                  days: days,
                  hours: hours,
                  minutes: minutes,
                };
              };
              const timeString = row?.leadTime;
              const result = parseTimeString(timeString);

              const days = result?.days;
              const hours = result?.hours;
              const minutes = result?.minutes;

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
                    {row?.sla ? formatDateTime(row?.sla) : "-"}
                  </ScrollableTableCell>
                  <ScrollableTableCell>
                    {days || hours || minutes ? (
                      <Box>
                        <Grid container>
                          <Grid item xl={3} xs={4}>
                            <Typography>
                              {days ? days + " Hari" : ""}
                            </Typography>
                          </Grid>
                          <Grid item xl={3} xs={4}>
                            <Typography>
                              {hours ? hours + " Jam" : ""}
                            </Typography>
                          </Grid>
                          <Grid item xl={3} xs={4}>
                            <Typography>
                              {minutes ? minutes + " Menit" : ""}
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
