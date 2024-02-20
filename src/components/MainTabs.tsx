import { ListTab } from '@/types/Tabs';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

interface MainTabsProps {
  tabs: ListTab[]
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
}

const MainTabs = ({ tabs } : MainTabsProps) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  return (
    <Box sx={{ marginLeft: -2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {tabs?.map((tab, index) => (
          <Tab
            key={index}
            label={tab?.title}
            value={index}
            iconPosition="start"
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabs?.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}  >
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  )
}

export default MainTabs