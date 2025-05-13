import { AllProject, Standar } from "@/types/Project";
import { Grid, Typography } from "@mui/material";
import CardAnalytic from "./CardAnalytic";
import CardAnalytic2 from "./CardAnalytic2";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import ChartBar from "./ChartBar";
import ChartPie from "./ChartPie";

// extend plugin dayjs
dayjs.extend(isBetween);
dayjs.extend(isoWeek);

export type DataAnalytics = {
  countAuditThisWeek: number;
  countAuditLastWeek: number;
  gap: number;
};

interface ChartDashboardProps {
  data: AllProject[];
  standards: Standar[];
}

const ChartDashboard = ({ data, standards }: ChartDashboardProps) => {
  const totalProjects: AllProject[] = data;
  const totalInitialAudit: AllProject[] = data?.filter(
    (item) => item.tahapan === "IA"
  );
  const totalSurveillanceI: AllProject[] = data?.filter(
    (item) => item.tahapan === "surveilance1"
  );

  const totalSurveillanceII: AllProject[] = data?.filter(
    (item) => item.tahapan === "surveilance2"
  );
  const totalSurveillanceIII: AllProject[] = data?.filter(
    (item) => item.tahapan === "surveilance3"
  );
  const totalSurveillanceIV: AllProject[] = data?.filter(
    (item) => item.tahapan === "surveilance4"
  );
  const totalSurveillanceV: AllProject[] = data?.filter(
    (item) => item.tahapan === "surveilance5"
  );
  const totalRC: AllProject[] = data?.filter((item) => item.tahapan === "RC");
  const totalSpecial: AllProject[] = data?.filter(
    (item) => item.tahapan === "special"
  );

  const startOfThisWeek = dayjs().startOf("isoWeek");
  const startOfLastWeek = startOfThisWeek.subtract(1, "week");
  const endOfLastWeek = startOfThisWeek.subtract(1, "day");

  const dataRunning = data.filter(
    (item) => item.lead_time_project_finish_for_chart === 0
  ).length;
  const dataDone = data.filter(
    (item) => Number(item.lead_time_project_finish_for_chart) > 0
  ).length;

  const getThisWeek = (dates: Date[]) =>
    dates.filter((date) =>
      dayjs(date).isBetween(
        startOfThisWeek,
        startOfThisWeek.add(6, "day"),
        null,
        "[]"
      )
    );

  const getLastWeek = (dates: Date[]) =>
    dates.filter((date) =>
      dayjs(date).isBetween(startOfLastWeek, endOfLastWeek, null, "[]")
    );

  const dataCardAnalytics = (dates: AllProject[]): DataAnalytics => {
    console.log("dates", dates);
    const listDate = dates.map((item) => item.aplication_form);
    const countAuditThisWeek = getThisWeek(listDate).length;
    const countAuditLastWeek = getLastWeek(listDate).length;
    const gap = countAuditThisWeek - countAuditLastWeek;
    return { countAuditThisWeek, countAuditLastWeek, gap };
  };

  const salesNameWithTotal = data.reduce(
    (acc: AllProject[], curr: AllProject) => {
      const existing = acc.find(
        (item) => item.sales_person === curr.sales_person
      );
      if (existing && existing.value !== undefined) existing.value += 1;
      else
        acc.push({ sales_person: curr.sales_person, value: 1 } as AllProject);
      return acc;
    },
    []
  );

  const salesNameWitheLeadTime = data
    .map(
      ({
        customer,
        lead_time_project_finish_for_chart,
        lead_time_projec_audit_sertifikat,
        standar,
      }) => ({
        customer,
        value_all: lead_time_project_finish_for_chart,
        value_capa_to_certificate: lead_time_projec_audit_sertifikat,
        all_standar: standar?.map((item) => item.iso_standards).join(", "),
      })
    )
    .sort((a, b) => Number(b.value_all) - Number(a.value_all));

  const getStandardSummaryByMonthYear = (data: any[]) => {
    const summaryMap = new Map();
    data.forEach(({ month, year, standard_name, harga, quantity }) => {
      const key = `${month}-${year}`;
      const existing = summaryMap.get(key);
      if (!existing) {
        summaryMap.set(key, {
          month,
          year,
          standards: [
            { name: standard_name, totalHarga: harga, totalQuantity: quantity },
          ],
        });
      } else {
        const std = existing.standards.find(
          (s: any) => s.name === standard_name
        );
        if (std) {
          std.totalHarga += harga;
          std.totalQuantity += quantity;
        } else {
          existing.standards.push({
            name: standard_name,
            totalHarga: harga,
            totalQuantity: quantity,
          });
        }
      }
    });
    return Array.from(summaryMap.values());
  };

  const acreditationWithTotal = data.reduce(
    (acc: { nama_akreditasi: string; value: number }[], curr: AllProject) => {
      // Cek jika accreditation adalah array
      if (Array.isArray(curr.accreditation)) {
        curr.accreditation.forEach((akreditasi: string) => {
          const existing = acc.find(
            (item) => item.nama_akreditasi === akreditasi
          );
          if (existing) existing.value += 1;
          else acc.push({ nama_akreditasi: akreditasi, value: 1 });
        });
      } else if (typeof curr.accreditation === "string") {
        // Jika accreditation adalah string, kita bisa menangani kasus ini
        const existing = acc.find(
          (item) => item.nama_akreditasi === curr.accreditation
        );
        if (existing) existing.value += 1;
        else acc.push({ nama_akreditasi: curr.accreditation, value: 1 });
      }
      return acc;
    },
    [] // Initial value yang sesuai dengan tipe array yang diharapkan
  );

  const standardSummary = getStandardSummaryByMonthYear(standards as any);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} py={2} sx={{ mb: -2.25 }}>
        <Typography variant="h5" color="darkblue">
          Analytics
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <CardAnalytic
          title="Total Seluruh Audit"
          count={totalProjects.length}
          data={dataCardAnalytics(totalProjects)}
          dataRunning={dataRunning}
          dataDone={dataDone}
          moreData={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <CardAnalytic
          title="Total Initial Audit"
          count={totalInitialAudit.length}
          data={dataCardAnalytics(totalInitialAudit)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <CardAnalytic
          title="Total Surveillance I"
          count={totalSurveillanceI.length}
          data={dataCardAnalytics(totalSurveillanceI)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <CardAnalytic
          title="Total Surveilance II"
          count={totalSurveillanceII.length}
          data={dataCardAnalytics(totalSurveillanceII)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <CardAnalytic
          title="Total Surveilance III"
          count={totalSurveillanceIII.length}
          data={dataCardAnalytics(totalSurveillanceIII)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <CardAnalytic
          title="Total Surveilance IV"
          count={totalSurveillanceIV.length}
          data={dataCardAnalytics(totalSurveillanceIV)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardAnalytic2
          title="Total Surveilance V"
          count={totalSurveillanceV.length}
          data={dataCardAnalytics(totalSurveillanceV)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardAnalytic2
          title="Total RC"
          count={totalRC.length}
          data={dataCardAnalytics(totalRC)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardAnalytic2
          title="Total Special"
          count={totalSpecial.length}
          data={dataCardAnalytics(totalSpecial)}
        />
      </Grid>

      <Grid item xs={12} py={2} sx={{ mb: -2.25 }}>
        <Typography variant="h5" color="darkblue">
          Chart
        </Typography>
      </Grid>

      <Grid item xs={12} md={7} lg={8}>
        <ChartBar
          sales={salesNameWithTotal}
          standards={standardSummary}
          lead_time={salesNameWitheLeadTime}
        />
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <ChartPie data={acreditationWithTotal} />
      </Grid>
    </Grid>
  );
};

export default ChartDashboard;
