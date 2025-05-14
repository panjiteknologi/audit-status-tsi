import {
  Dispatch,
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
  Stack,
} from "@mui/material";
import { AllProject } from "@/types/Project";
import InputDate from "@/components/forms/InputDate";
import moment, { Moment } from "moment";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { formatNumber, formatRupiah } from "@/utils/formatIdr";

const ChartBar = ({
  sales,
  standards,
  lead_time,
  setClickedData,
  slot,
  setSlot,
}: {
  sales: AllProject[];
  standards: any;
  lead_time: AllProject[];
  setClickedData: Dispatch<SetStateAction<string | unknown>>;
  slot: "sales" | "standards" | "lead_time";
  setSlot: Dispatch<SetStateAction<"sales" | "standards" | "lead_time">>;
}) => {
  const chartRef = useRef<any>(null);
  const [currentDate, setCurrentDate] = useState(moment);

  const standardTransform = useMemo(() => {
    const month = moment(currentDate).format("MMMM");
    const year = moment(currentDate).format("YYYY");

    const transformStandard = standards.find(
      (x: { month: string; year: string; standards: string[] }) =>
        x.month === month && x.year == year
    );

    return transformStandard?.standards || [];
  }, [standards, currentDate]);

  useEffect(() => {
    let root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

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

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

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

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    function makeSeries(
      name: string,
      fieldName: string,
      customTooltip?: string
    ) {
      const series = chart.series.push(
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
          clustered: true,
          tooltip: am5.Tooltip.new(root, {
            labelText: customTooltip || `${name}: {valueY}`,
          }),
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      });

      series.columns.template.events.on("click", (e) => {
        const dataItem = e.target.dataItem;
        if (dataItem) {
          const data = dataItem.dataContext;
          setClickedData(data);
        }
      });

      series.columns.template.adapters.add("fill", (_, target) => {
        return chart.get("colors")?.getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", (_, target) => {
        return chart.get("colors")?.getIndex(series.columns.indexOf(target));
      });

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

      series.bullets.push(() => {
        const bullet = am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            fill: root.interfaceColors.get("alternativeText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
            text: "",
          }),
        });

        const label = bullet.get("sprite") as am5.Label;

        label.adapters.add("text", (_, target) => {
          const dataItem = target.dataItem;
          const value = dataItem?.get("valueYWorking" as any) as number;
          if (value == null) return "";

          if (slot === "sales") return formatNumber(value);
          if (slot === "standards") return formatRupiah(value);
          return `${formatNumber(value)} Hari\n(${label})`;
        });

        return bullet;
      });
    }

    if (slot === "sales") {
      makeSeries("Sales", "value");
    } else if (slot === "standards") {
      makeSeries(
        "Price",
        "totalHarga",
        "Price: {totalHarga} \nQuantity: {totalQuantity}"
      );
      // makeSeries("Quantity", "totalQuantity");
    } else {
      makeSeries("Lead Time All", "value_all", "Standar: {all_standar}");
      makeSeries(
        "Lead Time Capa to Certificate",
        "value_capa_to_certificate",
        "Audit - \n Certificate"
      );
    }

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

    chart.appear(1000, 100);
    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, [sales, lead_time, slot, standardTransform]);

  const handleChange = (
    _: MouseEvent<HTMLElement>,
    newAlignment: SetStateAction<"sales" | "standards" | "lead_time">
  ) => {
    if (newAlignment) setSlot(newAlignment);
  };

  const onChangeDate = (dt: Moment | null) => {
    if (dt) setCurrentDate(dt);
  };

  useEffect(() => {
    // Reset clicked data setiap kali slot berubah
    setClickedData(null);
  }, [slot, setClickedData]);

  return (
    <MainCard sx={{ minHeight: 475 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" color="textSecondary">
          Chart Sales, Standards, and Lead Time
        </Typography>
        <ToggleButtonGroup
          exclusive
          onChange={handleChange}
          size="small"
          value={slot}
        >
          <ToggleButton value="sales" sx={{ px: 2, py: 0.5 }}>
            Sales
          </ToggleButton>
          <ToggleButton value="standards" sx={{ px: 2, py: 0.5 }}>
            Standards
          </ToggleButton>
          <ToggleButton value="lead_time" sx={{ px: 2, py: 0.5 }}>
            Lead Time
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ mt: 2 }}>
        {slot === "standards" && (
          <InputDate
            selectedDate={currentDate}
            handleDateChange={onChangeDate}
            label="Filter"
            views={["month", "year"]}
          />
        )}
        <Box id="chart" sx={{ mt: 2 }}>
          {sales.length > 0 || standards.length > 0 || lead_time.length > 0 ? (
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
