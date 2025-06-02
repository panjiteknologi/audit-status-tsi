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
import moment from "moment";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { formatNumber } from "@/utils/formatIdr";
import InputDateRange from "@/components/forms/InputDateRange";

type LaunchingCertificate = {
  customer: string;
  iso_standards: string[];
  tgl_kirim_sertifikat: string;
};

type DateRangeType = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const ChartBar = ({
  sales,
  standards,
  launching_certificate,
  lead_time,
  setClickedData,
  slot,
  setSlot,
}: {
  sales: AllProject[];
  standards: any;
  launching_certificate: LaunchingCertificate[];
  lead_time: AllProject[];
  setClickedData: Dispatch<SetStateAction<string | unknown>>;
  slot: "sales" | "standards" | "launching_certificate" | "lead_time";
  setSlot: Dispatch<
    SetStateAction<
      "sales" | "standards" | "launching_certificate" | "lead_time"
    >
  >;
}) => {
  const chartRef = useRef<any>(null);

  const [noData, setNoData] = useState(false);

  const [currentDateRange, setCurrentDateRange] = useState<DateRangeType>({
    startDate: moment().subtract(1, "month").toDate(),
    endDate: moment().toDate(),
    key: "selection",
  });

  // Sales data transform
  const salesTransform = useMemo(() => {
    const start = moment(currentDateRange.startDate).startOf("day");
    const end = moment(currentDateRange.endDate).endOf("day");

    return sales.filter((x) =>
      moment(x.tgl_review_penugasan_st_satu).isBetween(
        start,
        end,
        undefined,
        "[]"
      )
    );
  }, [sales, currentDateRange]);

  // Standard data transform
  const standardTransform = useMemo(() => {
    const start = moment(currentDateRange.startDate).startOf("day");
    const end = moment(currentDateRange.endDate).endOf("day");

    const filtered = (
      slot === "launching_certificate" ? launching_certificate : standards
    )
      .filter((x: { date: string }) =>
        moment(x.date).isBetween(start, end, undefined, "[]")
      )
      .flatMap((x: { date: string; standards: any[] }) =>
        x.standards.map((s) => ({
          ...s,
          date: x.date,
        }))
      );

    const grouped: Record<
      string,
      {
        name: string;
        totalQuantity: number;
        companies: { name: string; date: string }[];
      }
    > = {};

    filtered.forEach(
      (item: {
        name: string;
        totalQuantity: number;
        companyName: string[];
        date: string;
      }) => {
        const names = item.name?.split(/[,;&]+/).map((s) => s.trim());

        names.forEach((standardName) => {
          if (!grouped[standardName]) {
            grouped[standardName] = {
              name: standardName,
              totalQuantity: 0,
              companies: [],
            };
          }

          grouped[standardName].totalQuantity += item.totalQuantity;

          item.companyName.forEach((company) => {
            const exists = grouped[standardName].companies.some(
              (c) => c.name === company && c.date === item.date
            );
            if (!exists) {
              grouped[standardName].companies.push({
                name: company,
                date: item.date,
              });
            }
          });
        });
      }
    );

    return Object.values(grouped);
  }, [standards, launching_certificate, currentDateRange]);

  const handleChange = (
    _: MouseEvent<HTMLElement>,
    newAlignment: SetStateAction<
      "sales" | "standards" | "launching_certificate" | "lead_time"
    >
  ) => {
    if (newAlignment) setSlot(newAlignment);
  };

  const onChangeDateRange = (range: { startDate: Date; endDate: Date }) => {
    setCurrentDateRange({ ...range, key: "selection" });
  };

  useEffect(() => {
    const hasData =
      slot === "sales"
        ? salesTransform.length > 0
        : slot === "standards" || slot === "launching_certificate"
        ? standardTransform.length > 0
        : lead_time.length > 0;

    setNoData(!hasData);
  }, [salesTransform, standardTransform, lead_time, slot]);

  useEffect(() => {
    if (noData) return;

    const chartContainer = document.getElementById("chartdiv");
    if (!chartContainer) return;

    const root = am5.Root.new("chartdiv");

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
            : slot === "standards" || slot === "launching_certificate"
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
              : slot === "standards" || slot === "launching_certificate"
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
          ? salesTransform
          : slot === "standards" || slot === "launching_certificate"
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
          if (slot === "standards" || slot === "launching_certificate")
            return formatNumber(value);
          return `${formatNumber(value)} Hari\n(${label})`;
        });

        return bullet;
      });
    }

    if (slot === "sales") {
      makeSeries("Sales", "value");
    } else if (slot === "standards" || slot === "launching_certificate") {
      makeSeries(
        "Quantity",
        "totalQuantity"
        // "Price",
        // "totalHarga",
        // // "Price: {totalHarga} \nQuantity: {totalQuantity}"
        // "Quantity: {totalQuantity}"
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
        ? salesTransform
        : slot === "standards" || slot === "launching_certificate"
        ? standardTransform
        : lead_time
    );

    chart.appear(1000, 100);
    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, [noData, lead_time, slot, standardTransform, salesTransform]);

  useEffect(() => {
    // Reset clicked data setiap kali slot berubah
    setClickedData(null);
  }, [slot, setClickedData]);

  return (
    <MainCard sx={{ minHeight: 475 }}>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <InputDateRange
          label="Choose date (01/01/2025 - 01/02/2025)"
          selectedDate={currentDateRange}
          handleDateChange={onChangeDateRange}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" color="textSecondary">
          Chart Sales, Standards, Launching Certificate, and Lead Time
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
          <ToggleButton value="launching_certificate" sx={{ px: 2, py: 0.5 }}>
            Launching Certificate
          </ToggleButton>
          <ToggleButton value="lead_time" sx={{ px: 2, py: 0.5 }}>
            Lead Time
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box id="chart" sx={{ mt: 2 }}>
        {!noData ? (
          <div id="chartdiv" style={{ width: "100%", height: 475 }} />
        ) : (
          <Stack justifyContent="center" alignItems="center" height={475}>
            <Typography variant="subtitle1" color="textSecondary">
              Data chart tidak tersedia di tanggal yang dipilih.
            </Typography>
          </Stack>
        )}
      </Box>
    </MainCard>
  );
};

export default ChartBar;
