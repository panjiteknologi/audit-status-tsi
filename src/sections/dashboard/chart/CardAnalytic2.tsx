import MainCard from "@/components/MainCard";
import { Chip, Stack, Typography } from "@mui/material";
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

interface CardAnalyticProps2 {
  title: string;
  count: number;
  data: DataAnalytics;
}

export default function CardAnalytic2({ title, count, data }: CardAnalyticProps2) {
  let labelChip =
    data.gap < 0
      ? `Turun ${data.gap} dari`
      : data.gap > 0
        ? `Naik ${data.gap} dari`
        : `Sama dengan`;

  return (
    <MainCard sx={{ p: 0.25 }}>
      <Stack spacing={0.5} direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant="h5" color="text.secondary">
          {title}
        </Typography>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography variant="h4" color="inherit">
            {formatNumber(count)}
          </Typography>
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
        </Stack>
      </Stack>
      <Stack sx={{ pt: 0.25 }} direction='row'>
        <Typography variant="body2" component={"span"} color="text.secondary">
          Audit minggu ini:{" "}
          <Typography
            variant="body2"
            component={"span"}
            sx={{ color: "blue", fontWeight: "bold" }}
          >
            {data.countAuditThisWeek}
          </Typography>
          {", "}Audit minggu lalu:{" "}
          <Typography
            variant="body2"
            component={"span"}
            sx={{ color: "blue", fontWeight: "bold" }}
          >
            {data.countAuditLastWeek}
          </Typography>
        </Typography>
      </Stack>
    </MainCard>
  )
}