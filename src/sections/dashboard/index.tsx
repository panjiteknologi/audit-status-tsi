import { ReactNode, SetStateAction, SyntheticEvent, useState } from "react";
import { AllProject } from "@/types/Project";
import TableInfo from "./TableInfo";
import ChartInfo from "./ChartInfo";
import { Box, Tab, Tabs } from "@mui/material";
import { TableChartRounded, BarChartRounded } from "@mui/icons-material"

function TabPanel({ children, value, index, ...other }: { children: ReactNode, value: number, index: number }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

interface DashboardSectionsProps {
  data: AllProject[] | null;
  openModal?: (items: SetStateAction<null>) => void;
  setAdd?: (v: boolean) => void;
}

const DashboardSections = ({
  data
}: DashboardSectionsProps) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Table" icon={<TableChartRounded />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Chart" icon={<BarChartRounded />} iconPosition="start" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* Table Panel */}
      <TabPanel value={value} index={0}>
        <TableInfo
          data={data || []}
        />
      </TabPanel>

      {/* Chart Panel */}
      <TabPanel value={value} index={1}>
        <ChartInfo data={data || []} />
      </TabPanel>
    </>
  );
};

export default DashboardSections;
