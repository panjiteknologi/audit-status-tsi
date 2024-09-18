import ModalCardSections from "@/sections/modal-card-sections";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import {
  ADD_PROJECT,
  BASE_URL,
  GET_AKREDITASI,
  GET_PROJECT_BY_ID_PROJECT,
  GET_STANDARD,
  GET_STATUS_PEMBAYARAN,
  GET_TAHAPAN,
  UPDATE_PROJECT,
} from "@/contexts/JWTContext";
import ModalDetail from "@/sections/modal-card-sections/ModalDetail";
import { AllProject, MenuProject } from "@/types/Project";
import CloseButton from "@/sections/modal-card-sections/CloseButton";
import IlustrationConfirmation from "../assets/ilustration/il-confirmation.svg";
import IlustrationCancel from "../assets/ilustration/il-notfound.svg";
import IlustrationLoading from "../assets/ilustration/il-loading.svg";
import IlustrationNotFound from "../assets/ilustration/il-notfound.svg";
import IlustrationNotAccountAccess from "../assets/ilustration/il-access.svg";
import useAuth from "@/hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const DetailProject = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

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

  const { data: allProject = [] } = useQuery({
    queryKey: ["allProjects"],
    queryFn: async () => {
      const token = window.localStorage.getItem("serviceToken");

      const data = {
        id_project: id,
      };

      try {
        const response = await axios.post(
          BASE_URL + GET_PROJECT_BY_ID_PROJECT,
          data,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setLoading(false);
        return response?.data?.data;
      } catch (error) {
        setLoading(false);
        return [];
      } finally {
        setLoading(false);
      }
    },
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    refetchInterval: 500,
  });

  const getAkreditasi = async () => {
    try {
      const response = await axios.get(BASE_URL + GET_AKREDITASI);
      if (response?.data?.data) {
        setDataAkreditasi(response?.data?.data);
      }
    } catch (error) {
      setDataAkreditasi([]);
    }
  };

  const getStandard = async () => {
    try {
      const response = await axios.get(BASE_URL + GET_STANDARD);
      if (response?.data?.data) {
        setDataStandard(response?.data?.data);
      }
    } catch (error) {
      setDataStandard([]);
    }
  };

  const getStatusPembayaran = async () => {
    try {
      const response = await axios.get(BASE_URL + GET_STATUS_PEMBAYARAN);
      if (response?.data?.data) {
        setDataStatusPembayaran(response?.data?.data);
      }
    } catch (error) {
      setDataStatusPembayaran([]);
    }
  };

  const getTahapan = async () => {
    try {
      const response = await axios.get(BASE_URL + GET_TAHAPAN);
      if (response?.data?.data) {
        setDataTahapan(response?.data?.data);
      }
    } catch (error) {
      setDataTahapan([]);
    }
  };

  const openModal = (items: SetStateAction<null>) => {
    setSelectedProject(items);
    setShowModal(true);
  };

  const mutation = useMutation({
    mutationFn: async (values: AllProject) => {
      const idUser = window.localStorage.getItem("idUser");
      const token = window.localStorage.getItem("serviceToken");
      const data = { id_user: idUser, is_ispo: "0", ...values };

      delete data.tgl_proses_review_tahap_satu;
      delete data.note_tgl_proses_review_tahap_satu;
      delete data.tgl_pengambilan_keputusan_tahap_satu;
      delete data.note_tgl_pengambilan_keputusan_tahap_satu;

      delete data.tgl_proses_review_tahap_dua;
      delete data.note_tgl_proses_review_tahap_dua;
      delete data.tgl_pengambilan_keputusan_tahap_dua;
      delete data.note_tgl_pengambilan_keputusan_tahap_dua;

      return add
        ? axios.post(BASE_URL + ADD_PROJECT, data, {
            headers: { Authorization: token },
          })
        : axios.post(BASE_URL + UPDATE_PROJECT, data, {
            headers: { Authorization: token },
          });
    },
    onSuccess: () => {
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
      queryClient.invalidateQueries({ queryKey: ["allProjects"] });
    },
    onError: () => {
      setDisabled(false);
      setLoadingBtn(false);
      setShowModal(false);
      setShowModalVerification(true);
      setError(true);
      setMessage(
        add
          ? "Sorry, you can't add auditor!"
          : "Sorry, you can't update auditor!"
      );
    },
  });

  const onSubmit = async (values: AllProject) => {
    setDisabled(true);
    setLoadingBtn(true);
    mutation.mutate(values);
  };

  useEffect(() => {
    if (allProject) {
      setFilteredData(allProject);
    }

    getAkreditasi();
    getStandard();
    getStatusPembayaran();
    getTahapan();
  }, [allProject]);

  useEffect(() => {
    setFilteredData(allProject);
    getAkreditasi();
    getStandard();
    getStatusPembayaran();
    getTahapan();
  }, [allProject]);

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
        {isLoggedIn && <Typography variant="h4">Detail Project</Typography>}
      </Box>

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
            <React.Fragment>
              {isLoggedIn && (
                <Typography
                  variant="h6"
                  style={{
                    marginTop: 16,
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: 10,
                  }}
                >
                  Total: {filteredData?.length ? filteredData?.length : 0}{" "}
                  Project
                </Typography>
              )}

              <ModalCardSections
                data={filteredData}
                setAdd={setAdd}
                openModal={openModal}
              />
            </React.Fragment>
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
          origin="iso"
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

export default DetailProject;
