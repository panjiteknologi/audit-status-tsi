import { AllProject } from "@/types/Project";
import { Grid, Typography } from "@mui/material";
import CardAnalytic from "./CardAnalytic";
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
}

const ChartDashboard = ({ data }: ChartDashboardProps) => {
  const current = data;

  const startOfThisWeek = dayjs().startOf("isoWeek"); // Get the start of the current week (Monday)
  const startOfLastWeek = startOfThisWeek.subtract(1, "week"); // Get the start of the previous week (Monday)
  const endOfLastWeek = startOfThisWeek.subtract(1, "day"); // Get the end of the previous week (Sunday)

  const totalProjects: AllProject[] = data;
  const totalInitialAudit: AllProject[] = data?.filter(
    (item) => item.tahapan === 1
  );
  const totalSurveillanceI: AllProject[] = data?.filter(
    (item) => item.tahapan === 2
  );
  const totalSurveillanceII: AllProject[] = data?.filter(
    (item) => item.tahapan === 3
  );

  function getThisWeek(dates: Date[]) {
    return dates.filter((date) => {
      const parsedDate = dayjs(date);
      return parsedDate.isBetween(
        startOfThisWeek,
        startOfThisWeek.add(6, "day"),
        null,
        "[]"
      );
    });
  }

  function getLastWeek(dates: Date[]) {
    return dates.filter((date) => {
      const parsedDate = dayjs(date);
      return parsedDate.isBetween(startOfLastWeek, endOfLastWeek, null, "[]");
    });
  }

  const dataCardAnalytics = (dates: AllProject[]): DataAnalytics => {
    const listDate = dates?.map((item) => item.tgl_apl_form_or_request);

    const countAuditThisWeek = getThisWeek(listDate).length;
    const countAuditLastWeek = getLastWeek(listDate).length;

    const gap = countAuditThisWeek - countAuditLastWeek;

    return {
      countAuditThisWeek,
      countAuditLastWeek,
      gap,
    };
  };

  const salesNameWithTotal = current.reduce(
    (acc: AllProject[], curr: AllProject) => {
      const existing = acc.find(
        (item) => item?.nama_sales_or_crr === curr.nama_sales_or_crr
      );

      if (existing) {
        if (existing.value !== undefined) {
          existing.value += 1;
        }
      } else {
        acc.push({ nama_sales_or_crr: curr.nama_sales_or_crr, value: 1 });
      }

      return acc;
    },
    []
  );

  const salesNameWitheLeadTime = current.map(({ nama_perusahaan, lead_time_project_finish_for_chart, standar }) => {
    const all_standar = standar?.map((item) => item.nama_standar).join(', ')
    return {
      nama_perusahaan,
      value: lead_time_project_finish_for_chart,
      all_standar
    }
  }).sort((a, b) => Number(b.value) - Number(a.value));

  const companyNameWithCertificate = current.map(({ nama_perusahaan, lead_time_projec_audit_sertifikat, standar }) => {
    const all_standar = standar?.map((item) => item.nama_standar).join(', ')
    return {
      nama_perusahaan,
      value: lead_time_projec_audit_sertifikat === undefined ? 0 : lead_time_projec_audit_sertifikat,
      all_standar
    }
  }).sort((a, b) => Number(b.value) - Number(a.value));

  const acreditationWithTotal = current.reduce(
    (acc: AllProject[], curr: AllProject) => {
      const existing = acc.find(
        (item) => item?.nama_akreditasi === curr.nama_akreditasi
      );

      if (existing) {
        if (existing.value !== undefined) {
          existing.value += 1;
        }
      } else {
        acc.push({ nama_akreditasi: curr.nama_akreditasi, value: 1 });
      }

      return acc;
    },
    []
  );

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} mt={2} sx={{ mb: -2.25 }}>
        <Typography variant="h5" color="darkblue">
          Analytics
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardAnalytic
          title="Total Seluruh Audit"
          count={totalProjects.length}
          data={dataCardAnalytics(totalProjects)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardAnalytic
          title="Total Initial Audit"
          count={totalInitialAudit.length}
          data={dataCardAnalytics(totalInitialAudit)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardAnalytic
          title="Total Surveillance I"
          count={totalSurveillanceI.length}
          data={dataCardAnalytics(totalSurveillanceI)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CardAnalytic
          title="Total Surveilance II"
          count={totalSurveillanceII.length}
          data={dataCardAnalytics(totalSurveillanceII)}
        />
      </Grid>

      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5" color="darkblue">
          Chart
        </Typography>
      </Grid>

      <Grid item xs={12} md={7} lg={8}>
        <ChartBar
          sales={salesNameWithTotal}
          lead_time={salesNameWitheLeadTime}
          certificate={companyNameWithCertificate}
        />
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <ChartPie data={acreditationWithTotal} />
      </Grid>
    </Grid>
  );
};

export default ChartDashboard;
