import MainCard from "@/components/MainCard";
import { Grid } from "@mui/material";
// import { User } from "@/types/Project";
import CardContent from "./CardContent";
interface CardModalProps {
  item: string;
  items: any;
  gajiProrate: number;
  totalPendapatan: number;
  totalPotongan: number;
  totalLembur: number;
}

const CardModal = ({
  items,
  gajiProrate,
  totalPendapatan,
  totalPotongan,
  totalLembur,
}: CardModalProps) => {
  return (
    <Grid item xs={4}>
      <MainCard
        sx={{
          borderRadius: 2,
          border: "none",
          marginLeft: -2,
          marginRight: -2,
        }}
        showButton={false}
      >
        <CardContent
          items={items}
          gajiProrate={gajiProrate}
          totalPendapatan={totalPendapatan}
          totalPotongan={totalPotongan}
          totalLembur={totalLembur}
        />
      </MainCard>
    </Grid>
  );
};

export default CardModal;
