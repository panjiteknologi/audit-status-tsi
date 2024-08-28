import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import MainCard from "@/components/MainCard";
import { AllProject } from "@/types/Project";

const SalesBarChart = ({ data }: { data: AllProject[] }) => {
  const theme = useTheme();

  const categories = data?.map((item) => item.nama_sales_or_crr);
  const sales_value = data?.map((item) => item.total);

  const initialSeries:
    | ApexAxisChartSeries
    | ApexNonAxisChartSeries
    | undefined = [
      {
        name: "Total Sales",
        data: sales_value?.map((n) => Number(n)),
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
      categories,
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
        text: "Pencapaian Sales Tertinggi",
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

  return (
    <MainCard sx={{ minHeight: 475 }}>
      <Typography variant="h6" color="textSecondary">
        Sales
      </Typography>
      <Box>
        <Box id="chart">
          {data?.length > 0 ? (
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
