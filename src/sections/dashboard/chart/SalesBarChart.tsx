import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import MainCard from "@/components/MainCard";
import { AllProject } from "@/types/Project";
import { MouseEvent, SetStateAction, useState } from "react";

const SalesBarChart = ({
  sales,
  lead_time,
}: {
  sales: AllProject[];
  lead_time: AllProject[];
}) => {
  const theme = useTheme();

  const [slot, setSlot] = useState<"sales" | "lead_time">("sales");

  const categories_sales = sales?.map((item) => item.nama_sales_or_crr);
  const categories_lead_time = lead_time?.map((item) => item.nama_sales_or_crr);

  const sales_value = sales?.map((item) => item.total);
  const lead_time_value = lead_time?.map((item) => item.total);

  const initialSeries:
    | ApexAxisChartSeries
    | ApexNonAxisChartSeries
    | undefined = [
    {
      name: slot === "sales" ? "Total Sales" : "Total Lead Time",
      data:
        slot === "sales"
          ? sales_value?.map((n) => Number(n))
          : lead_time_value?.map((n) => Number(n)),
    },
  ];

  const primary = theme.palette.primary[400];

  // chart options
  const columnChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 530,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "100%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 8,
      colors: ["transparent"],
    },
    xaxis: {
      categories: slot === "sales" ? categories_sales : categories_lead_time,
      labels: {
        style: {
          // colors: [secondary, secondary, secondary, secondary],
          cssClass: "apexcharts-xaxis-label",
        },
        rotate: -0,
        trim: true,
      },
    },
    yaxis: {
      title: {
        text:
          slot === "sales"
            ? "Pencapaian Sales Tertinggi"
            : "Pencapaian Lead Time Tertinggi",
      },
      labels: {
        style: {
          // colors: [secondary, secondary, secondary, secondary],
        },
      },
    },
    colors: [primary],
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val: number) {
          return `${val}`;
        },
      },
    },
    legend: {
      position: "right",
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          yaxis: {
            show: false,
          },
        },
      },
    ],
  };

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: SetStateAction<"sales" | "lead_time">
  ) => {
    if (newAlignment) setSlot(newAlignment);
  };

  return (
    <MainCard sx={{ minHeight: 475 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" color="textSecondary">
          Sales & Lead Time
        </Typography>
        <ToggleButtonGroup
          exclusive
          onChange={handleChange}
          size="small"
          value={slot}
        >
          <ToggleButton
            disabled={slot === "sales"}
            value="sales"
            sx={{ px: 2, py: 0.5 }}
          >
            Sales
          </ToggleButton>
          <ToggleButton
            disabled={slot === "lead_time"}
            value="lead_time"
            sx={{ px: 2, py: 0.5 }}
          >
            Lead Time
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>
        <Box id="chart">
          {sales?.length > 0 || lead_time?.length > 0 ? (
            <ReactApexChart
              options={columnChartOptions}
              series={initialSeries}
              type="bar"
              height={395}
            />
          ) : (
            <Stack justifyContent="center" alignItems="center" height="100%">
              <Typography variant="subtitle1">No Data</Typography>
            </Stack>
          )}
        </Box>
      </Box>
    </MainCard>
  );
};

export default SalesBarChart;
