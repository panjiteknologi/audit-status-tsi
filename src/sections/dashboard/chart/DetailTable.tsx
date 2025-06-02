import MainCard from "@/components/MainCard";
import { formatDateWithoutTime } from "@/utils/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";

const DetailTable = ({
  clickedData,
  slot,
}: {
  clickedData: any;
  slot: "sales" | "standards" | "launching_certificate" | "lead_time";
}) => {
  return (
    <MainCard
      sx={{
        minHeight: 475,
        maxHeight: 630,
        overflow: "auto",
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 1,
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
        "&::-webkit-scrollbar": {
          height: "6px",
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Detail Data
      </Typography>

      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
          <Table
            size="small"
            sx={{
              minWidth: 500,
              borderCollapse: "separate",
              borderSpacing: "0 2px", // Jarak antar baris
            }}
          >
            <TableHead sx={{ bgcolor: "#f0f0f0", textAlign: "center" }}>
              <TableRow>
                {slot === "sales" && (
                  <>
                    <TableCell sx={{ fontWeight: "bold", px: 2 }}>
                      Sales Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", px: 2 }}>
                      Sales Closing
                    </TableCell>
                  </>
                )}
                {(slot === "standards" || slot === "launching_certificate") && (
                  <>
                    <TableCell sx={{ fontWeight: "bold", px: 2 }}>No</TableCell>
                    <TableCell sx={{ fontWeight: "bold", px: 2 }}>
                      Company Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", px: 2 }}>
                      Certificate Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", px: 2 }}>
                      Standard Name
                    </TableCell>
                  </>
                )}
                {slot === "lead_time" && (
                  <>
                    <TableCell sx={{ fontWeight: "bold", px: 2 }}>
                      Company Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", px: 2 }}>
                      Total Days
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", px: 2 }}>
                      Capa → Cert
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {(slot === "standards" || slot === "launching_certificate") &&
                clickedData?.companies?.length > 0 &&
                clickedData.companies.map(
                  (company: { name: string; date: string }, index: number) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        bgcolor: "#fff",
                        boxShadow: 1,
                        borderRadius: 2,
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#fafafa",
                        },
                      }}
                    >
                      <TableCell sx={{ px: 2 }}>{index + 1}</TableCell>
                      <TableCell sx={{ px: 2 }}>{company.name}</TableCell>
                      <TableCell sx={{ px: 2 }}>
                        {formatDateWithoutTime(company.date)}
                      </TableCell>
                      <TableCell sx={{ px: 2 }}>{clickedData.name}</TableCell>
                    </TableRow>
                  )
                )}

              {slot === "sales" && (
                <TableRow
                  hover
                  sx={{ bgcolor: "#fff", boxShadow: 1, borderRadius: 2 }}
                >
                  <TableCell sx={{ px: 2 }}>
                    {clickedData?.sales_person || "-"}
                  </TableCell>
                  <TableCell sx={{ px: 2 }}>
                    {clickedData?.value ?? "0"} Closing
                  </TableCell>
                </TableRow>
              )}

              {slot === "lead_time" && (
                <TableRow
                  hover
                  sx={{ bgcolor: "#fff", boxShadow: 1, borderRadius: 2 }}
                >
                  <TableCell sx={{ px: 2 }}>
                    {clickedData?.customer || "-"}
                  </TableCell>
                  <TableCell sx={{ px: 2 }}>
                    {clickedData?.value_all ?? "0"} Days
                  </TableCell>
                  <TableCell sx={{ px: 2 }}>
                    {clickedData?.value_capa_to_certificate ?? "-"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MainCard>
  );
};

export default DetailTable;
