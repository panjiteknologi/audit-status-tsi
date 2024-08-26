import MainCard from "@/components/MainCard";
import { Box, Grid, Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";

interface CardInfoProps {}

const CardInfo = ({}: CardInfoProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <Grid item xs={4} sx={{ marginTop: 1 }}>
      <MainCard
        btnHeader={true}
        isLogin={isLoggedIn}
        bgHeaderColor={"gray"}
        titleBtnHeader={"How to add audit status ?"}
        iconRight={false}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "gray",
          }}
        >
          <Typography>Please go to input menu for add audit status</Typography>
        </Box>
      </MainCard>
    </Grid>
  );
};

export default CardInfo;
