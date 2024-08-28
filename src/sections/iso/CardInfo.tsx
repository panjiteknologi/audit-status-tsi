import MainCard from "@/components/MainCard";
import {
  Box,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  styled,
  useMediaQuery,
} from "@mui/material";
import { AllProject } from "@/types/Project";
import { useTheme } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DataTable from "@/components/table/DataTable";
import useAuth from "@/hooks/useAuth";
import { getDataTable, getlatestProgress } from "@/utils/getProgressAndField";

interface CardInfoProps {
  items: AllProject;
  onEdit?: () => void;
  open: boolean[];
  index: number;
  handleClick: (index: number) => void;
}

const CardInfo = ({
  items,
  onEdit,
  open,
  index,
  handleClick,
}: CardInfoProps) => {
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const Item = styled(Paper)(({ theme }) => ({
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    fontSize: "12px",
    textTransform: "capitalize",
  }));

  const ItemLateProgress = styled(Paper)(() => ({
    textAlign: "left",
    color: "#059212",
    boxShadow: "none",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "capitalize",
    fontStyle: "italic",
  }));

  const ItemLeadTime = styled(Paper)(() => ({
    textAlign: "left",
    color: "#002379",
    boxShadow: "none",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "capitalize",
    fontStyle: "italic",
  }));

  const TitleItem = styled(Paper)(({ theme }) => ({
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    fontSize: sm ? "11px" : "12px",
    textTransform: "capitalize",
    fontWeight: "bold",
  }));

  const { isLoggedIn } = useAuth();

  return (
    <Grid item xs={4} sx={{ marginTop: 1 }}>
      <MainCard
        btnHeader={true}
        isLogin={isLoggedIn}
        bgHeaderColor={
          items?.status_pembayaran == 1
            ? "red"
            : items?.status_pembayaran === 2
              ? "#1677ff"
              : items?.status_pembayaran === 3
                ? "#1677ff"
                : items?.status_pembayaran === 4
                  ? "#1677ff"
                  : items?.status_pembayaran === 5
                    ? "#1677ff"
                    : items?.status_pembayaran === 6
                      ? "#1677ff"
                      : items?.status_pembayaran === null
                        ? "gray"
                        : "#5a8b5c"
        }
        titleBtnHeader={items?.nama_status_pembayaran}
        iconRight={
          <IconButton aria-label="edit" size="small" onClick={onEdit}>
            <ModeEditIcon
              sx={{
                width: 16,
                color: "white",
                cursor: "pointer",
              }}
            />
          </IconButton>
        }
        title={items?.nama_perusahaan || "-"}
        showButton={
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleClick(index)}
          >
            {open[index] ? (
              <KeyboardArrowUpIcon
                sx={{
                  width: 50,
                  color: isLoggedIn ? "white" : "black",
                  cursor: "pointer",
                  marginRight: 3,
                }}
              />
            ) : (
              <KeyboardArrowDownIcon
                sx={{
                  width: 50,
                  color: isLoggedIn ? "white" : "black",
                  cursor: "pointer",
                  marginRight: 3,
                }}
              />
            )}
          </IconButton>
        }
      >
        <Grid container rowSpacing={{ xs: 1 }}>
          <Grid item xs={12} xl={12} lg={12} md={12}>
            <Grid container sx={{ marginBottom: 1 }}>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Nama Sales</TitleItem>
                <Item>{items?.nama_sales_or_crr || "-"}</Item>
              </Grid>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Standar</TitleItem>
                {items?.standar?.map(
                  (item: { nama_standar: string }, index: number) => (
                    <Item key={index}>{item?.nama_standar || "-"}</Item>
                  )
                )}
              </Grid>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Akreditasi</TitleItem>
                <Item>{items?.nama_akreditasi || "-"}</Item>
              </Grid>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Tahapan</TitleItem>
                <Item>{items?.nama_tahapan || "-"}</Item>
              </Grid>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Latest Progress</TitleItem>
                <ItemLateProgress>
                  {getlatestProgress(items)}
                </ItemLateProgress>
              </Grid>
              <Grid item xs={6} xl={2} lg={2} md={2}>
                <TitleItem>Lead Time Project</TitleItem>
                <ItemLeadTime>
                  {items?.lead_time_project_finish
                    ? items?.lead_time_project_finish
                    : "-"}
                </ItemLeadTime>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {open[index] && <Divider />}

        <Collapse in={open[index]} timeout="auto" unmountOnExit>
          <Box
            sx={{
              margin: 1,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "gray",
            }}
          >
            <DataTable
              data={getDataTable(items)}
            />
          </Box>
        </Collapse>
      </MainCard>
    </Grid>
  );
};

export default CardInfo;
