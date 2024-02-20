import PayslipSections from "@/sections/payslip";
import TabContentDashboard from "@/sections/payslip/TabContentDashboard";
import { Grid } from "@mui/material";

const Payslip = () => {
  const TabMonth = [{
    id: 1,
    title: "Januari",
    content: (<TabContentDashboard />), 
    url: '/payslip-januari', 
  },{
    id: 2,
    title: "Februari",
    content: (<TabContentDashboard />), 
    url: '/payslip-februari', 
  },{
    id: 3,
    title: "Maret",
    content: (<TabContentDashboard />), 
    url: '/payslip-maret', 
  },{
    id: 4,
    title: "April",
    content: (<TabContentDashboard />), 
    url: '/payslip-april', 
  },{
    id: 5,
    title: "Mei",
    content: (<TabContentDashboard />), 
    url: '/payslip-mei', 
  },{
    id: 6,
    title: "Juni",
    content: (<TabContentDashboard />), 
    url: '/payslip-juni', 
  },{
    id: 7,
    title: "Juli",
    content: (<TabContentDashboard />), 
    url: '/payslip-juli', 
  },{
    id: 8,
    title: "Agustus",
    content: (<TabContentDashboard />), 
    url: '/payslip-agustus', 
  },{
    id: 9,
    title: "September",
    content: (<TabContentDashboard />), 
    url: '/payslip-september', 
  },{
    id: 10,
    title: "Oktober",
    content: (<TabContentDashboard />), 
    url: '/payslip-oktober', 
  },{
    id: 11,
    title: "November",
    content: (<TabContentDashboard />), 
    url: '/payslip-november', 
  },{
    id: 12,
    title: "Desember",
    content: (<TabContentDashboard />), 
    url: '/payslip-desember', 
  }]

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <PayslipSections 
          tabs={TabMonth}
        />
      </Grid>
    </Grid>
  )
};

export default Payslip