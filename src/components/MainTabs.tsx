import { ListTab } from "@/types/Tabs";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
interface MainTabsProps {
  tabs: ListTab[];
  handleTabChange: (selectedMonth: string) => void;
}

const MainTabs = ({ tabs, handleTabChange }: MainTabsProps) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handleTabChange(tabs[newValue].month);
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
    </Box>
  );
};

export default MainTabs;
