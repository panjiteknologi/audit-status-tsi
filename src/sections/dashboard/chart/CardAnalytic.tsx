import MainCard from "@/components/MainCard";
import { Chip, Grid, Stack, Typography, useTheme } from "@mui/material";
import { DataAnalytics } from ".";
import { formatNumber } from "@/utils/formatIdr";

import {
  TrendingDownRounded,
  TrendingUpRounded,
  TrendingFlatRounded,
} from "@mui/icons-material";

const iconSX = {
  fontSize: "0.75rem",
  color: "inherit",
  marginLeft: 0,
  marginRight: 0,
};

interface CardAnalyticProps {
  title: string;
  count: number;
  data: DataAnalytics;
  moreData?: boolean;
  dataRunning?: number;
  dataDone?: number;
}

export default function CardAnalytic({ title, count, data, moreData, dataRunning, dataDone }: CardAnalyticProps) {
  const theme = useTheme();

  let labelChip =
    data.gap < 0
      ? `Turun ${data.gap} dari`
      : data.gap > 0
        ? `Naik ${data.gap} dari`
        : `Sama dengan`;

  return (
    <MainCard sx={{ p: 0.25, borderColor: moreData ? "lightblue" : theme.palette.divider }}>
      <Stack spacing={0.5}>
        <Typography variant="h5" color="text.secondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {formatNumber(count)}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              variant="combined"
              color={
                data.gap < 0 ? "error" : data.gap > 0 ? "success" : "warning"
              }
              icon={
                data.gap < 0 ? (
                  <TrendingDownRounded style={iconSX} />
                ) : data.gap > 0 ? (
                  <TrendingUpRounded style={iconSX} />
                ) : (
                  <TrendingFlatRounded style={iconSX} />
                )
              }
              label={`${labelChip} minggu lalu`}
              sx={{ ml: 1.25, pl: 1, fontSize: 10 }}
              size="small"
            />
          </Grid>
        </Grid>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={moreData ? 6 : 12}>
          <Stack sx={{ pt: 2.25 }}>
            <Typography variant="body2" component={"span"} color="text.secondary">
              Audit minggu ini:{" "}
              <Typography
                variant="body2"
                component={"span"}
                sx={{ color: "blue", fontWeight: "bold" }}
              >
                {data.countAuditThisWeek}
              </Typography>
            </Typography>
            <Typography variant="body2" component={"span"} color="text.secondary">
              Audit minggu lalu:{" "}
              <Typography
                variant="body2"
                component={"span"}
                sx={{ color: "blue", fontWeight: "bold" }}
              >
                {data.countAuditLastWeek}
              </Typography>
            </Typography>
          </Stack>
        </Grid>
        {moreData && (
          <Grid item xs={6}>
            <Stack sx={{ pt: 2.25 }}>
              <Typography variant="body2" component={"span"} color="text.secondary">
                Audit berjalan:{" "}
                <Typography
                  variant="body2"
                  component={"span"}
                  sx={{ color: "blue", fontWeight: "bold" }}
                >
                  {dataRunning}
                </Typography>
              </Typography>
              <Typography variant="body2" component={"span"} color="text.secondary">
                Audit selesai:{" "}
                <Typography
                  variant="body2"
                  component={"span"}
                  sx={{ color: "green", fontWeight: "bold" }}
                >
                  {dataDone}
                </Typography>
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};