import { MouseEvent, SetStateAction, useLayoutEffect, useRef, useState } from "react";
import MainCard from '@/components/MainCard'
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { AllProject } from "@/types/Project";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { Stack } from "@mui/material";

const ChartBar = ({
  sales,
  lead_time,
  certificate
}: {
  sales: AllProject[];
  lead_time: AllProject[];
  certificate: AllProject[];
}) => {
  const chartRef = useRef<any>(null);

  const [slot, setSlot] = useState<"sales" | "lead_time" | "certificate">("sales");

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
      paddingRight: 1
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      oversizedBehavior: "wrap",
      textAlign: "center",
      maxWidth: slot === 'sales' ? 95 : 150
    })

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: slot === 'sales' ? "nama_sales_or_crr" : "nama_perusahaan",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {}),
    }));

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: yRenderer
    }));

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: slot === 'sales' ? "value" : "value",
      categoryXField: slot === 'sales' ? "nama_sales_or_crr" : "nama_perusahaan",
      tooltip: am5.Tooltip.new(root, {
        labelText: slot === 'sales' ? `Sales: {valueY}` : `Standar: {all_standar}`
      }),
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    });

    // Add Label bullet
    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          text: slot === 'sales' ? "{valueYWorking.formatNumber('#.')}" : "{valueYWorking.formatNumber('#.')} Hari",
          fill: root.interfaceColors.get("alternativeText"),
          centerY: 0,
          centerX: am5.p50,
          populateText: true
        })
      });
    });

    // Add scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    // Pre-zoom the chart
    if (slot === "lead_time" || slot === 'certificate') {
      series.events.once("datavalidated", () => {
        xAxis.zoomToIndexes(0, 4)
      })
    }

    xAxis.data.setAll(slot === 'sales' ? sales : slot === 'lead_time' ? lead_time : certificate);
    series.data.setAll(slot === 'sales' ? sales : slot === 'lead_time' ? lead_time : certificate);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, [sales, lead_time, certificate, slot]);

  // Group Button
  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: SetStateAction<"sales" | "lead_time" | "certificate">
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
          <ToggleButton
            disabled={slot === "certificate"}
            value="certificate"
            sx={{ px: 2, py: 0.5 }}
          >
            Lead Time Audit - Sertifikat
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>
        <Box id="chart">
          {sales?.length > 0 || lead_time?.length > 0 || certificate?.length > 0 ? (
            <div id="chartdiv" style={{ width: '100%', height: 475 }} />
          ) : (
            <Stack justifyContent="center" alignItems="center" height="100%">
              <Typography variant="subtitle1">No Data</Typography>
            </Stack>
          )}
        </Box>
      </Box>
    </MainCard>
  )
}

export default ChartBar