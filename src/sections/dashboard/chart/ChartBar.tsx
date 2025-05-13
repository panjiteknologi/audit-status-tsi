import {
  MouseEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MainCard from "@/components/MainCard";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { AllProject } from "@/types/Project";
import InputDate from "@/components/forms/InputDate";
import moment, { Moment } from "moment";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Stack } from "@mui/material";
import { formatNumber, formatToK } from "@/utils/formatIdr";

const ChartBar = ({
  sales,
  standards,
  lead_time,
}: {
  sales: AllProject[];
  standards: any;
  lead_time: AllProject[];
}) => {
  const chartRef = useRef<any>(null);
  const [currentDate, setCurrentDate] = useState(moment);

  const [slot, setSlot] = useState<"sales" | "standards" | "lead_time">(
    "sales"
  );

  const standardTransform = useMemo(() => {
    const month = moment(currentDate).format("MMMM");
    const year = moment(currentDate).format("YYYY");

    const transformStandard = standards.find(
      (x: { month: string; year: string; standards: string[] }) =>
        x.month === month && x.year == year
    );

    return transformStandard?.standards || {};
  }, [standards, currentDate]);

  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });

    xRenderer.labels.template.setAll({
      oversizedBehavior: "wrap",
      textAlign: "center",
      maxWidth: slot === "sales" ? 95 : 150,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField:
          slot === "sales"
            ? "sales_person"
            : slot === "standards"
            ? "name"
            : "customer",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
    });

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name: string, fieldName: string, _label?: string) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField:
            slot === "sales"
              ? "sales_person"
              : slot === "standards"
              ? "name"
              : "customer",
          tooltip: am5.Tooltip.new(root, {
            labelText:
              slot === "sales"
                ? `Sales: {valueY}`
                : slot === "standards"
                ? `Standar: {valueX} {valueY}`
                : `Standar: {all_standar}`,
          }),
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      });
      series.columns.template.adapters.add("fill", function (_, target) {
        return chart.get("colors")?.getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (_, target) {
        return chart.get("colors")?.getIndex(series.columns.indexOf(target));
      });

      // Pre-zoom the chart
      if (slot === "lead_time") {
        series.events.once("datavalidated", () => {
          xAxis.zoomToIndexes(0, 4);
        });
      }

      series.data.setAll(
        slot === "sales"
          ? sales
          : slot === "standards"
          ? standardTransform
          : lead_time
      );
      series.appear(1000);

      // Add Label bullet
      series.bullets.push(function () {
        const bullet = am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            fill: root.interfaceColors.get("alternativeText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
            text: "", // biarkan kosong, nanti diisi oleh adapter
          }),
        });

        const label = bullet.get("sprite") as am5.Label;

        label.adapters.add("text", function (_, target) {
          const dataItem = target.dataItem;
          const value = dataItem?.get("valueYWorking" as any) as number;
          if (value == null) return "";

          if (slot === "sales") {
            return formatNumber(value);
          } else if (slot === "standards") {
            return formatToK(value);
          } else {
            return `${formatNumber(value)} Hari\n(${label})`; //label// <- `label` di sini bisa kamu sesuaikan atau ambil dari konteks
          }
        });

        return bullet;
      });

      // legend.data.push(series);
    }

    if (slot === "sales") {
      makeSeries("Sales", "value");
    } else if (slot === "standards") {
      makeSeries("Standars", "totalHarga");
    } else {
      makeSeries("Lead Time All", "value_all", "All");
      makeSeries(
        "Lead Time Capa to Certificate",
        "value_capa_to_certificate",
        "Audit - \n Crtificate"
      );
    }

    // Add scrollbar
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    xAxis.data.setAll(
      slot === "sales"
        ? sales
        : slot === "standards"
        ? standardTransform
        : lead_time
    );

    // Make stuff animate on load
    chart.appear(1000, 100);

    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, [sales, lead_time, slot, standardTransform]);

  // Group Button
  const handleChange = (
    _: MouseEvent<HTMLElement>,
    newAlignment: SetStateAction<"sales" | "standards" | "lead_time">
  ) => {
    if (newAlignment) setSlot(newAlignment);
  };

  const onChangeDate = (dt: Moment | null) => {
    if (dt) setCurrentDate(dt);
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
            disabled={slot === "standards"}
            value="standards"
            sx={{ px: 2, py: 0.5 }}
          >
            Standards
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
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          {slot === "standards" && (
            <InputDate
              selectedDate={currentDate}
              handleDateChange={onChangeDate}
              label="Filter"
              views={["month", "year"]}
            />
          )}
        </Box>
        <Box id="chart">
          {sales?.length > 0 ||
          standards?.length > 0 ||
          lead_time?.length > 0 ? (
            <div id="chartdiv" style={{ width: "100%", height: 475 }} />
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

export default ChartBar;
