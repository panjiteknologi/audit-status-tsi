import MainCard from '@/components/MainCard'
import MainTabs from '@/components/MainTabs'
import { ListTab } from '@/types/Tabs'
import { Box, Grid, Typography } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface PayslipSectionProps {
  tabs: ListTab[]
}

const PayslipSections = ({ tabs } : PayslipSectionProps) => {
  return (
    <MainCard>
      <Grid container spacing={2} md={12} xs={12} alignItems={"center"}>
        <Grid item md={9} xs={10}>
          <Typography variant="h5">Payslip</Typography>
        </Grid>
        <Grid item md={3} xs={10} justifyContent="flex-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Pilih Tahun" views={['year']} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <MainTabs
          tabs={tabs}
        />
      </Box>
    </MainCard>
  )
}

export default PayslipSections