import MainCard from '@/components/MainCard'
import { AllProject } from '@/types/Project';
import { Box, Stack, Typography } from '@mui/material'
import { useLayoutEffect } from 'react'

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface SalesPieChartProps {
  data: AllProject[];
}

const ChartPie = ({ data }: SalesPieChartProps) => {
  useLayoutEffect(() => {
    let root = am5.Root.new("piechartdiv");

    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "nama_akreditasi",
        endAngle: 270
      })
    );

    series.states.create("hidden", {
      endAngle: -90
    });

    series.data.setAll(data);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <MainCard>
      <Typography variant="h6" color="textSecondary">
        Akreditasi
      </Typography>
      <Box id="chart" mt={4} sx={{ bgcolor: "transparent" }}>
        {data?.length > 0 ? (
          <div id='piechartdiv' style={{ width: '100%', height: 450 }} />
        ) : (
          <Stack justifyContent="center" alignItems="center" height="100%">
            <Typography variant="subtitle1">No Data</Typography>
          </Stack>
        )}
      </Box>
    </MainCard>
  )
}

export default ChartPie