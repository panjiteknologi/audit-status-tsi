import { BrowserView, MobileView } from "react-device-detect";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useState,
  Fragment,
} from "react";
import { AllProject, Standar } from "@/types/Project";
import TableInfo from "./TableInfo";
import ChartDashboard from "./chart";
import {
  Box,
  Tab,
  Tabs,
  Alert,
  Typography,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { TableChartRounded, BarChartRounded } from "@mui/icons-material";
import CardInfo from "../card-sections/CardInfo";
import MainCard from "@/components/MainCard";
import ScrollX from "@/components/ScrollX";

function TabPanel({
  children,
  value,
  index,
  ...other
}: {
  children: ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface DashboardSectionsProps {
  data: AllProject[] | null | undefined;
  isProjectsLoading: boolean;
  isProjectsError: boolean;
  standards: Standar[];
  uniqueStandards: Standar;
  selectedStandard: string | null;
  setSelectedStandard: Dispatch<SetStateAction<string | null>>;
  isStandardsLoading: boolean;
  isStandardsError: boolean;
}

const TableInfoSkeleton = () => {
  const columnCount = 8;

  const headerTitle = [
    "Nama Perusahaan",
    "Nama Sales",
    "Standar",
    "Akreditasi",
    "Tahapan",
    "Latest Progress",
    "Next Step",
    "Lead Time Project",
  ];

  return (
    <Fragment>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          width: "100%",
          gap: 2,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Skeleton variant="rectangular" height={40} />
        </Box>
        <Box sx={{ minWidth: 200 }}>
          <Skeleton variant="rectangular" height={40} />
        </Box>
      </Stack>

      <MainCard content={false} sx={{ my: 1 }}>
        <ScrollX>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ "& > th:first-of-type": { width: "58px" } }}>
                  {headerTitle.map((item, idx) => (
                    <TableCell key={idx}>
                      <Typography variant="h5" color="GrayText">
                        {item}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 5 }).map((_, rowIdx) => (
                  <TableRow key={rowIdx}>
                    {Array.from({ length: columnCount }).map((_, colIdx) => (
                      <TableCell key={colIdx}>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollX>

        <Stack sx={{ padding: 2 }}>
          <Skeleton variant="rectangular" height={32} />
        </Stack>
      </MainCard>
    </Fragment>
  );
};

const CardInfoSkeleton = () => {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Box
          key={idx}
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            p: 2,
          }}
        >
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="50%" height={20} />
          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            <Skeleton variant="rectangular" width={70} height={28} />
            <Skeleton variant="rectangular" width={90} height={28} />
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

const ChartSkeleton = () => (
  <MainCard content={false} sx={{ my: 1 }}>
    <Box sx={{ p: 2 }}>
      <Skeleton variant="text" width="30%" height={28} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={280} />
    </Box>
  </MainCard>
);

const DashboardSections = ({
  data,
  isProjectsLoading,
  isProjectsError,
  standards,
  uniqueStandards,
  selectedStandard,
  setSelectedStandard,
  isStandardsLoading,
  isStandardsError,
}: DashboardSectionsProps) => {
  const safeData: AllProject[] = Array.isArray(data) ? data : [];
  const [open, setOpen] = useState<boolean[]>(
    Array(safeData.length).fill(false)
  );
  const [value, setValue] = useState<number>(0);

  const handleClick = (index: number) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const isLoading = isProjectsLoading || isStandardsLoading;
  const isError = isProjectsError || isStandardsError;
  const isEmpty = !isLoading && !isError && safeData.length === 0;

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
          <Tab
            label="Table"
            icon={<TableChartRounded />}
            iconPosition="start"
            {...a11yProps(0)}
          />
          <Tab
            label="Chart"
            icon={<BarChartRounded />}
            iconPosition="start"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {isLoading && (
          <>
            <BrowserView>
              <TableInfoSkeleton />
            </BrowserView>
            <MobileView>
              <CardInfoSkeleton />
            </MobileView>
          </>
        )}

        {!isLoading && isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Terjadi kesalahan saat memuat data proyek atau standar. Silakan coba
            beberapa saat lagi.
          </Alert>
        )}

        {!isLoading && !isError && isEmpty && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Belum ada data proyek yang bisa ditampilkan.
            </Typography>
          </Alert>
        )}

        {!isLoading && !isError && !isEmpty && (
          <>
            <MobileView>
              {safeData.map((items, index) => (
                <CardInfo
                  key={index}
                  items={items}
                  index={index}
                  open={open}
                  handleClick={handleClick}
                />
              ))}
            </MobileView>
            <BrowserView>
              <TableInfo
                data={safeData}
                uniqueStandards={uniqueStandards}
                selectedStandard={selectedStandard}
                setSelectedStandard={setSelectedStandard}
              />
            </BrowserView>
          </>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {isLoading && <ChartSkeleton />}

        {!isLoading && isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Terjadi kesalahan saat memuat data untuk chart.
          </Alert>
        )}

        {!isLoading && !isError && isEmpty && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Belum ada data yang bisa ditampilkan pada chart.
            </Typography>
          </Alert>
        )}

        {!isLoading && !isError && !isEmpty && (
          <ChartDashboard data={safeData} standards={standards} />
        )}
      </TabPanel>
    </>
  );
};

export default DashboardSections;
