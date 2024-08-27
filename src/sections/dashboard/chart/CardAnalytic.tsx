import MainCard from "@/components/MainCard";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
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
}

const CardAnalytic = ({ title, count, data }: CardAnalyticProps) => {
  let labelChip =
    data.gap < 0
      ? `Turun ${data.gap}`
      : data.gap > 0
      ? `Naik ${data.gap}`
      : `Tetap ${data.gap}`;

  return (
    <MainCard sx={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h5" color="text.secondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h2" color="inherit">
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
              label={`${labelChip} dari minggu lalu`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
            />
          </Grid>
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="body1" component={"span"} color="text.secondary">
          Audit minggu ini:{" "}
          <Typography
            variant="body1"
            component={"span"}
            sx={{ color: "blue", fontWeight: "bold" }}
          >
            {data.countAuditThisWeek}
          </Typography>
          {", "}
          minggu lalu:{" "}
          <Typography
            variant="body1"
            component={"span"}
            sx={{ color: "blue", fontWeight: "bold" }}
          >
            {data.countAuditLastWeek}
          </Typography>
        </Typography>
      </Box>
    </MainCard>
  );
};

export default CardAnalytic;
