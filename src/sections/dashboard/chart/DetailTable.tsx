import MainCard from "@/components/MainCard";
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
  slot: "sales" | "standards" | "lead_time";
}) => {
  return (
    <MainCard sx={{ minHeight: 475 }}>
      <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2}>
        <Typography variant="subtitle1" gutterBottom>
          Detail Data
        </Typography>

        <Box sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper} sx={{ minWidth: 300 }}>
            <Table size="small" sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  {slot === "sales" && (
                    <>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Sales Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Sales Closing
                      </TableCell>
                    </>
                  )}
                  {slot === "standards" && (
                    <>
                      <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Company Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Standard Name
                      </TableCell>
                    </>
                  )}
                  {slot === "lead_time" && (
                    <>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Company Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Total Days
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Capa → Cert
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {slot === "standards" &&
                  clickedData?.companyName?.length > 0 &&
                  clickedData.companyName.map((name: string, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        {Array.isArray(clickedData.name)
                          ? clickedData.name[index] || "-"
                          : clickedData.name || "-"}
                      </TableCell>
                    </TableRow>
                  ))}

                {slot === "sales" && (
                  <TableRow>
                    <TableCell>{clickedData?.sales_person || "-"}</TableCell>
                    <TableCell>{clickedData?.value ?? "0"} Closing</TableCell>
                  </TableRow>
                )}

                {slot === "lead_time" && (
                  <TableRow>
                    <TableCell>{clickedData?.customer || "-"}</TableCell>
                    <TableCell>{clickedData?.value_all ?? "0"} Days</TableCell>
                    <TableCell>
                      {clickedData?.value_capa_to_certificate ?? "-"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </MainCard>
  );
};

export default DetailTable;
