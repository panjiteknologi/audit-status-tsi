import { useState } from "react";
import MainCard from "@/components/MainCard";
import MainTabs from "@/components/MainTabs";
import { ListTab } from "@/types/Tabs";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { User } from "@/types/User";
import CardInfo from "./CardInfo";
import ModalDetail from "./ModalDetail";
interface PayslipSectionProps {
  tabs: ListTab[];
  data: User[];
  handleTabChange: (selectedMonth: string) => void;
  selectedMonthName: string;
  loading: boolean;
  value: string;
  error: boolean;
  updateStatus: (selectedStatus: string) => void;
}

const PayslipSections = ({
  tabs,
  data,
  handleTabChange,
  selectedMonthName,
  loading,
  value,
  updateStatus,
  error,
}: PayslipSectionProps) => {
  const [showPayslip, setShowPayslip] = useState(false);
  const dataSlip = data[0];

  const openModal = () => {
    setShowPayslip(true);
  };

  return (
    <MainCard
      title="Payslip 2024"
      boxShadow
      showButton={false}
      sx={{ minHeight: 500 }}
    >
      <Box sx={{ marginBottom: 4 }}>
        <MainTabs tabs={tabs} handleTabChange={handleTabChange} />
      </Box>
      {loading ? (
        <Box
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          {error && (
            <Typography>
              Data {selectedMonthName} saat ini belum tersedia...
            </Typography>
          )}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 10, xl: 12 }}
          >
            <ModalDetail
              showPayslip={showPayslip}
              setShowPayslip={() => setShowPayslip(false)}
              data={data}
              dataSlip={dataSlip}
              selectedMonthName={selectedMonthName}
              openModal={openModal}
              value={value}
              updateStatus={updateStatus}
            />

            {data?.map((items, index) => {
              return (
                <CardInfo
                  key={index}
                  item={selectedMonthName}
                  openModal={openModal}
                  items={items}
                />
              );
            })}
          </Grid>
        </>
      )}
    </MainCard>
  );
};

export default PayslipSections;
