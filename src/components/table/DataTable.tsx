import { AllProject } from "@/types/Project";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  position: "sticky",
  left: 0,
  zIndex: 1,
}));

const ScrollableTableCell = styled(TableCell)(() => ({
  minWidth: "200px",
  "& .MuiTableContainer-root": {
    overflowX: "scroll",
    overflowY: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
  },
  "& .scroll-gradient": {
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: "none",
    background:
      "linear-gradient(to right, transparent, transparent 30%, white 30%, white 70%, transparent 70%, transparent)",
  },
}));

interface DataTableProps {
  data?: AllProject[];
}

const DataTable = ({ data }: DataTableProps) => {
  return (
    <CustomPaper>
      <TableContainer
        style={{
          overflow: "auto",
          height: 400,
        }}
      >
        <Table style={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Tahapan</StyledTableCell>
              <StyledTableCell>Tanggal Status</StyledTableCell>
              <StyledTableCell>Catatan</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: AllProject, index: number) => (
              <StyledTableRow key={index}>
                <BoldTableCell>{row.tahapan}</BoldTableCell>
                <ScrollableTableCell>
                  {row?.tanggalStatus || "- "}
                </ScrollableTableCell>
                <ScrollableTableCell>{row?.catatan || "-"}</ScrollableTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomPaper>
  );
};

export default DataTable;
