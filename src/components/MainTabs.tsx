import { ListTab } from "@/types/Tabs";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
interface MainTabsProps {
  tabs: ListTab[];
  handleTabChange: (selectedMonth: string) => void;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

const MainTabs = ({ tabs, handleTabChange }: MainTabsProps) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handleTabChange(tabs[newValue].month, tabs[newValue].month_name);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        aria-label="scrollable force tabs example"
        textColor="secondary"
        indicatorColor="secondary"
      >
        {tabs?.map((tab, index) => (
          <Tab
            key={index}
            label={tab?.month_name}
            value={index}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabs?.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default MainTabs;
