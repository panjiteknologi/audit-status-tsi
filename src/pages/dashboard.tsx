import DashboardSections from "@/sections/dashboard";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { SetStateAction, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import {
  ADD_PROJECT,
  BASE_URL,
  GET_AKREDITASI,
  GET_ALL_PROJECT,
  GET_STANDARD,
  GET_STATUS_PEMBAYARAN,
  GET_TAHAPAN,
  UPDATE_PROJECT,
} from "@/contexts/JWTContext";
import ModalDetail from "@/sections/dashboard/ModalDetail";
import { AllProject, MenuProject } from "@/types/Project";
import CloseButton from "@/sections/dashboard/CloseButton";
import IlustrationConfirmation from "../assets/ilustration/il-confirmation.svg";
import IlustrationCancel from "../assets/ilustration/il-notfound.svg";
import IlustrationLoading from "../assets/ilustration/il-loading.svg";
import IlustrationNotFound from "../assets/ilustration/il-notfound.svg";
import IlustrationNotAccountAccess from "../assets/ilustration/il-access.svg";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
    borderRadius: 15,
  },
  "& .MuiOutlinedInput-root": {
    height: "37px",
  },
}));

const Dashboard = () => {
  const navigation = useNavigate();
  const { isLoggedIn } = useAuth();

  const [value, setValue] = useState<string>("");

  const [allProject, setAllProject] = useState<AllProject[]>([]);
  const [filteredData, setFilteredData] = useState<AllProject[]>([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [dataAkreditasi, setDataAkreditasi] = useState<MenuProject[]>([]);
  const [dataStandard, setDataStandard] = useState<MenuProject[]>([]);
  const [dataStatusPembayaran, setDataStatusPembayaran] = useState<
    MenuProject[]
  >([]);
  const [dataTahapan, setDataTahapan] = useState<MenuProject[]>([]);

  const [add, setAdd] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [showModalVerification, setShowModalVerification] =
    useState<boolean>(false);
  const [error, setError] = useState(true);

  const [message, setMessage] = useState<string>("");

  const getAllProject = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL + GET_ALL_PROJECT);
      if (response?.data?.data) {
        setTimeout(() => {
          setLoading(false);
          setAllProject(response?.data?.data);
          setFilteredData(response?.data?.data);
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const getAkreditasi = async () => {
    try {
      const response = await axios.get(BASE_URL + GET_AKREDITASI);
      if (response?.data?.data) {
        setDataAkreditasi(response?.data?.data);
      }
    } catch (error) {
      console.log("ini error get akreditasi", error);
    }
  };

  const getStandard = async () => {
    try {
      const response = await axios.get(BASE_URL + GET_STANDARD);
      if (response?.data?.data) {
        setDataStandard(response?.data?.data);
      }
    } catch (error) {
      console.log("ini error get standard", error);
    }
  };

  const getStatusPembayaran = async () => {
    try {
      const response = await axios.get(BASE_URL + GET_STATUS_PEMBAYARAN);
      if (response?.data?.data) {
        setDataStatusPembayaran(response?.data?.data);
      }
    } catch (error) {
      console.log("ini error get status pembayaran", error);
    }
  };

  const getTahapan = async () => {
    try {
      const response = await axios.get(BASE_URL + GET_TAHAPAN);
      if (response?.data?.data) {
        setDataTahapan(response?.data?.data);
      }
    } catch (error) {
      console.log("ini error get tahapan", error);
    }
  };

  const handleSearch = (e: any) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = allProject.filter((item) =>
      Object.values(item).some(
        (field) =>
          typeof field === "string" && field.toLowerCase().includes(searchValue)
      )
    );
    setFilteredData(filtered);
    setValue(e.target.value);
  };

  const handleClearSearch = () => {
    setFilteredData(allProject);
    setValue("");
  };

  const openModal = (items: SetStateAction<null>) => {
    setSelectedProject(items);
    setShowModal(true);
  };

  const onSubmit = async (values: AllProject) => {
    setDisabled(true);
    setLoadingBtn(true);

    try {
      const idUser = window.localStorage.getItem("idUser");
      const token = window.localStorage.getItem("serviceToken");

      const data = {
        id_user: idUser,
        ...values,
      };

      const response = add
        ? await axios.post(BASE_URL + ADD_PROJECT, data, {
            headers: {
              Authorization: token,
            },
          })
        : await axios.post(BASE_URL + UPDATE_PROJECT, data, {
            headers: {
              Authorization: token,
            },
          });

      if (response) {
        setTimeout(() => {
          setDisabled(false);
          setLoadingBtn(false);
          setShowModal(false);
          setShowModalVerification(true);
          setError(false);
          setMessage(
            add
              ? "Congratulations, you can add auditor!"
              : "Congratulations, you can update auditor!"
          );
          getAllProject();
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setDisabled(false);
        setLoadingBtn(false);
        setError(true);
        setShowModal(false);
        setShowModalVerification(true);
        setMessage(
          add
            ? "Sorry, you cant add auditor!"
            : "Sorry, you cant update auditor!"
        );
        getAllProject();
      }, 500);
    }
  };

  useEffect(() => {
    getAllProject();
    getAkreditasi();
    getStandard();
    getStatusPembayaran();
    getTahapan();
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {isLoggedIn ? (
          <Typography variant="h4">Audit Status System</Typography>
        ) : (
          <StyledTextField
            placeholder="Search"
            type="text"
            variant="outlined"
            fullWidth
            size="medium"
            style={{ borderRadius: "20px", marginRight: 6 }}
            sx={{ backgroundColor: "white" }}
            onChange={handleSearch}
            value={value}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: value && (
                <IconButton
                  aria-label="clear search"
                  onClick={handleClearSearch}
                >
                  <CancelIcon />
                </IconButton>
              ),
            }}
          />
        )}

        {isLoggedIn && (
          <IconButton
            aria-label="add icon"
            onClick={() => {
              setAdd(true);
              setShowModal(true);
            }}
            sx={{
              backgroundColor: "black",
              borderRadius: 2,
              ":hover": {
                backgroundColor: "#1e2041",
                color: "white",
              },
            }}
          >
            <AddIcon
              sx={{
                color: "white",
                width: 18,
              }}
            />
          </IconButton>
        )}
      </Box>

      {isLoggedIn && (
        <StyledTextField
          placeholder="Search"
          type="text"
          variant="outlined"
          fullWidth
          size="medium"
          style={{ borderRadius: "20px" }}
          sx={{ backgroundColor: "white" }}
          onChange={handleSearch}
          value={value}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: value && (
              <IconButton aria-label="clear search" onClick={handleClearSearch}>
                <CancelIcon />
              </IconButton>
            ),
          }}
        />
      )}

      {loading ? (
        <Box
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            margin: "auto",
          }}
        >
          <img src={IlustrationLoading} style={{ width: 250, height: 250 }} />
          <Typography variant="h3" textAlign={"center"}>
            Waiting for a minutes...
          </Typography>
        </Box>
      ) : (
        <React.Fragment>
          {filteredData ? (
            <DashboardSections
              data={filteredData}
              setAdd={setAdd}
              openModal={openModal}
            />
          ) : (
            <Box
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                margin: "auto",
                marginTop: 4,
              }}
            >
              <img
                src={IlustrationNotFound}
                style={{ width: 250, height: 250 }}
              />
              <Typography variant="h3" textAlign={"center"} marginY={4}>
                Sorry, Data Not Found
              </Typography>
            </Box>
          )}
        </React.Fragment>
      )}

      {isLoggedIn && (
        <ModalDetail
          disabled={disabled}
          loadingBtn={loadingBtn}
          showdashboard={showModal}
          onClose={() => setShowModal(false)}
          data={selectedProject}
          add={add}
          dataStandard={dataStandard}
          dataAkreditasi={dataAkreditasi}
          dataTahapan={dataTahapan}
          dataStatusPembayaran={dataStatusPembayaran}
          onHandleSubmit={onSubmit}
        />
      )}

      <Dialog
        open={isLoggedIn ? showModalVerification : showModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{ textAlign: "center" }}
      >
        <CloseButton
          onClick={() => {
            if (isLoggedIn) {
              setShowModalVerification(false);
            } else {
              setShowModal(false);
            }
          }}
        />
        <DialogContent
          sx={{
            backgroundColor: "white",
            paddingTop: 8,
          }}
        >
          <Box>
            {isLoggedIn ? (
              !error ? (
                <img
                  src={IlustrationConfirmation}
                  style={{ width: 200, height: 200 }}
                />
              ) : (
                <img
                  src={IlustrationCancel}
                  style={{ width: 200, height: 200 }}
                />
              )
            ) : (
              <img
                src={IlustrationNotAccountAccess}
                style={{ width: 200, height: 200 }}
              />
            )}
          </Box>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              color: "gray",
              fontWeight: "semibold",
            }}
          >
            {message}
          </DialogContentText>
          <DialogTitle
            id="alert-dialog-title"
            fontWeight={"bold"}
            color={"steelblue"}
            marginTop={4}
            sx={{ fontSize: "18px" }}
          >
            {isLoggedIn
              ? add
                ? error
                  ? "Failed Add Form"
                  : "Successfully Add Form"
                : error
                ? "Failed Update Form"
                : "Successfully Update Form"
              : " Sorry, you haven't logged in yet, please log in."}
          </DialogTitle>
          {!isLoggedIn && (
            <DialogActions>
              <Button
                onClick={() => {
                  setShowModal(false);
                  navigation("/Login");
                }}
                sx={{
                  width: "100%",
                  backgroundColor: "steelblue",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  height: 45,
                  borderRadius: 4,
                  ":hover": {
                    backgroundColor: "#1e2041",
                    color: "white",
                  },
                }}
              >
                LOGIN
              </Button>
            </DialogActions>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Dashboard;
