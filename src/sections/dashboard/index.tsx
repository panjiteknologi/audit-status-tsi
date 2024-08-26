import { BrowserView, MobileView } from "react-device-detect";
import { ReactNode, SetStateAction, SyntheticEvent, useState } from "react";
import { AllProject } from "@/types/Project";
import TableInfo from "./TableInfo";
import ChartInfo from "./ChartInfo";
import { Box, Tab, Tabs } from "@mui/material";
import { TableChartRounded, BarChartRounded } from "@mui/icons-material"
import CardInfo from "../input/CardInfo";

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
  const [open, setOpen] = useState<boolean[]>(Array(data?.length).fill(false));
  const [value, setValue] = useState<number>(0);

  const handleClick = (index: number) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  }

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <MobileView>
        {data?.map((items, index) => {
          return (
            <CardInfo
              key={index}
              items={items}
              index={index}
              open={open}
              handleClick={handleClick}
            />
          );
        })}
      </MobileView>
      <BrowserView>
        <TableInfo
          data={data || []}
        />
      </BrowserView>
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
