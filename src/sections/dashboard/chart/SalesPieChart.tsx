import { useEffect, useState } from "react";
import { ThemeMode } from "@/config";
import MainCard from "@/components/MainCard";
import useConfig from "@/hooks/useConfig";
import { AllProject } from "@/types/Project";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface SalesPieChartProps {
  data: AllProject[];
}

const SalesPieChart = ({ data }: SalesPieChartProps) => {
  const theme = useTheme();
  const { mode } = useConfig();

  const series = data?.map((item) => item.total) as number[];
  const labels = data?.map((item) => item.nama_akreditasi) as string[];

  // chart options
  const pieChartOptions: ApexOptions = {
    chart: {
      type: "pie",
      width: 550,
      height: 550,
    },
    labels,
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false,
      },
      itemMargin: {
        horizontal: 25,
        vertical: 4,
      },
    },
    responsive: [
      {
        breakpoint: 450,
        options: {
          legend: {
            show: false,
            position: "bottom",
          },
        },
      },
    ],
  };

  const [options, setOptions] = useState(pieChartOptions);

  const { primary } = theme.palette.text;
  const backColor = theme.palette.background.paper;

  const line = theme.palette.divider;

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      legend: {
        labels: {
          colors: "grey.500",
        },
      },
      stroke: {
        colors: [backColor],
      },
      theme: {
        mode: mode === ThemeMode.DARK ? "dark" : "light",
      },
    }));
  }, [mode, primary, backColor]);

  return (
    <MainCard>
      <Typography variant="h6" color="textSecondary">
        Akreditasi
      </Typography>
      <Box id="chart" mt={4} sx={{ bgcolor: "transparent" }}>
        {data?.length > 0 ? (
          <ReactApexChart options={options} series={series} type="pie" />
        ) : (
          <Stack justifyContent="center" alignItems="center" height="100%">
            <Typography variant="subtitle1">No Data</Typography>
          </Stack>
        )}
      </Box>
    </MainCard>
  );
};

export default SalesPieChart;
