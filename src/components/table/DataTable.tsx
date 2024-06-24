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
  left: 0,
  zIndex: 1,
}));

const ScrollableTableCell = styled(TableCell)(() => ({
  minWidth: "200px",
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
  data?: AllProject[];
}

const DataTable = ({ data }: DataTableProps) => {
  return (
    <CustomPaper>
      <HiddenScrollbarTableContainer>
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
      </HiddenScrollbarTableContainer>
    </CustomPaper>
  );
};

export default DataTable;
