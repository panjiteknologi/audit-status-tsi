import MainCard from "@/components/MainCard";
import { AllProject } from "@/types/Project";
import { Box, Stack, Typography } from "@mui/material";
import { useLayoutEffect } from "react";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface SalesPieChartProps {
  data: AllProject[] | any;
}

const ChartPie = ({ data }: SalesPieChartProps) => {
  useLayoutEffect(() => {
    let root = am5.Root.new("piechartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: true,
        calculateAggregates: true,
        valueField: "value",
        categoryField: "nama_akreditasi",
      })
    );

    series.labels.template.setAll({
      textType: "circular",
      centerX: 0,
      centerY: 0,
    });

    // Create legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

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
          <div id="piechartdiv" style={{ width: "100%", height: 450 }} />
        ) : (
          <Stack justifyContent="center" alignItems="center" height="100%">
            <Typography variant="subtitle1">No Data</Typography>
          </Stack>
        )}
      </Box>
    </MainCard>
  );
};

export default ChartPie;
