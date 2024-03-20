import MainCard from "@/components/MainCard";
import { Grid, Link, Paper, styled } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { formatIdr } from "@/utils/formatIdr";
import { User } from "@/types/User";

interface CardInfoProps {
  item: string;
  openModal: () => void;
  items: User;
}

const CardInfo = ({ item, openModal, items }: CardInfoProps) => {
  const Item = styled(Paper)(({ theme }) => ({
    textAlign: "left",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    fontSize: "12px",
    textTransform: "capitalize",
  }));

  return (
    <Grid item xs={4}>
      <MainCard
        title={item}
        showButton={
          <Link onClick={() => openModal()}>
            <KeyboardArrowRightOutlinedIcon
              sx={{
                marginTop: 1.5,
                paddingRight: 1.5,
                width: 50,
                cursor: "pointer",
              }}
            />
          </Link>
        }
      >
        <Grid container columnSpacing={{ xs: 1 }}>
          <Grid item xs={12}>
            <Grid container sx={{ marginBottom: 1 }}>
              <Grid item xs={6}>
                <Item>Nama</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{items?.nama || "-"}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Jabatan</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{items?.jabatan || "-"}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Area</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{items?.client_name + " - " + items?.area || "-"}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Basic Salary</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{formatIdr(items?.gaji_pokok) || "-"}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Insentive</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{formatIdr(items?.insentive) || "-"}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Transport Allowance</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>{formatIdr(items?.tunjangan_transport) || "-"}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>Status</Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  {items?.sesuai === 0 ? "Belum Sesuai" : "Sesuai" || "-"}
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default CardInfo;
