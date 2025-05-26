import MainCard from "@/components/MainCard";
import { AllProject } from "@/types/Project";
import { Box, Stack, Typography } from "@mui/material";
import { useLayoutEffect, useRef } from "react";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface SalesPieChartProps {
  data: AllProject[] | any;
}

const ChartPie = ({ data }: SalesPieChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Cegah duplikasi jika chart sudah ada
    const root = am5.Root.new(chartRef.current);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    const series = chart.series.push(
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
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );

    series.data.setAll(data);
    legend.data.setAll(series.dataItems);
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
      <Box mt={4} sx={{ bgcolor: "transparent", minHeight: 450 }}>
        {data?.length > 0 ? (
          <div ref={chartRef} style={{ width: "100%", height: 450 }} />
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
