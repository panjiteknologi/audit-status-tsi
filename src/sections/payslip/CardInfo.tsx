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
        <Grid container columnSpacing={{ xs: 2 }} width={"100%"}>
          <Grid item xs={6} width={"50%"}>
            <Item>Nama</Item>
            <Item>Jabatan</Item>
            <Item>Area</Item>
            <Item>Basic Salary</Item>
            <Item>Insentive</Item>
            <Item>Transport Allowance</Item>
            <Item>Status</Item>
            <Item>Notes</Item>
          </Grid>
          <Grid item xs={6} width={"50%"}>
            <Item>{items?.nama || "-"}</Item>
            <Item>{items?.jabatan || "-"}</Item>
            <Item>{items?.client_name + " - " + items?.area || "-"}</Item>
            <Item>{formatIdr(items?.gaji_pokok) || "-"}</Item>
            <Item>{formatIdr(items?.insentive) || "-"}</Item>
            <Item>{formatIdr(items?.tunjangan_transport) || "-"}</Item>
            <Item>{items?.status || "-"}</Item>
            <Item>{items?.catatan || "-"}</Item>
          </Grid>
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default CardInfo;
