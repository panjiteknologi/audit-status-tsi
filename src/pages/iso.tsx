import CardSections from "@/sections/card-sections";
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
  GET_ALL_ISO,
  GET_STANDARD,
  GET_STATUS_PEMBAYARAN,
  GET_TAHAPAN,
  UPDATE_PROJECT,
} from "@/contexts/JWTContext";
import ModalDetail from "@/sections/card-sections/ModalDetail";
import { AllProject, MenuProject } from "@/types/Project";
import CloseButton from "@/sections/card-sections/CloseButton";
import IlustrationConfirmation from "../assets/ilustration/il-confirmation.svg";
import IlustrationCancel from "../assets/ilustration/il-notfound.svg";
import IlustrationLoading from "../assets/ilustration/il-loading.svg";
import IlustrationNotFound from "../assets/ilustration/il-notfound.svg";
import IlustrationNotAccountAccess from "../assets/ilustration/il-access.svg";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string>("");
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
      try {
        const response = await axios.get(BASE_URL + GET_ALL_ISO);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setValue(searchValue);

    const filtered = allProject?.filter((item: AllProject) => {
      const dataFieldAudit: AllProject[] = [
        {
          tahapan: "Tanggal Aplication Form or Request",
          tanggalStatus: item?.tgl_apl_form_or_request,
          catatan: item?.note_tgl_apl_form_or_request,
          leadTime: item?.lead_time_tgl_apl_form_or_request,
        },
        {
          tahapan: "Tanggal Review Penugasan ST Satu",
          tanggalStatus: item?.tgl_review_penugasan_st_satu,
          catatan: item?.note_tgl_review_penugasan_st_satu,
          leadTime: item?.lead_time_tgl_review_penugasan_st_satu,
        },
        {
          tahapan: "Tanggal Kontrak",
          tanggalStatus: item?.tgl_kontrak,
          catatan: item?.note_tgl_kontrak,
          leadTime: item?.lead_time_tgl_kontrak,
        },
        {
          tahapan: "Tanggal Pengiriman Notifikasi ST Satu",
          tanggalStatus: item?.tgl_pengiriman_notif_st_satu,
          catatan: item?.note_tgl_pengiriman_notif_st_satu,
          leadTime: item?.lead_time_tgl_pengiriman_notif_st_satu,
        },
        {
          tahapan: "Tanggal Persetujuan Notifikasi ST Satu",
          tanggalStatus: item?.tgl_persetujuan_notif_st_satu,
          catatan: item?.note_tgl_persetujuan_notif_st_satu,
          leadTime: item?.lead_time_tgl_persetujuan_notif_st_satu,
        },
        {
          tahapan: "Tanggal Pengiriman Audit Plan ST Satu",
          tanggalStatus: item?.tgl_pengiriman_audit_plan_st_satu,
          catatan: item?.note_tgl_pengiriman_audit_plan_st_satu,
          leadTime: item?.lead_time_tgl_pengiriman_audit_plan_st_satu,
        },
        {
          tahapan: "Tanggal Pelaksanaan Audit ST Satu",
          tanggalStatus: item?.tgl_pelaksanaan_audit_st_satu,
          catatan: item?.note_tgl_pelaksanaan_audit_st_satu,
          leadTime: item?.lead_time_tgl_pelaksanaan_audit_st_satu,
        },
        {
          tahapan: "Tanggal Penyelesaian CAPA ST Satu",
          tanggalStatus: item?.tgl_penyelesaian_capa_st_satu,
          catatan: item?.note_tgl_penyelesaian_capa_st_satu,
          leadTime: item?.lead_time_tgl_penyelesaian_capa_st_satu,
        },
        {
          tahapan: "Tanggal Review Penugasan Dua",
          tanggalStatus: item?.tgl_review_penugasan_st_dua,
          catatan: item?.note_tgl_review_penugasan_st_dua,
          leadTime: item?.lead_time_tgl_review_penugasan_st_dua,
        },
        {
          tahapan: "Tanggal Pengiriman Notifikasi Dua",
          tanggalStatus: item?.tgl_pengiriman_notif_st_dua,
          catatan: item?.note_tgl_pengiriman_notif_st_dua,
          leadTime: item?.lead_time_tgl_pengiriman_notif_st_dua,
        },
        {
          tahapan: "Tanggal Persetujuan Notifikasi Dua",
          tanggalStatus: item?.tgl_persetujuan_notif_st_dua,
          catatan: item?.note_tgl_persetujuan_notif_st_dua,
          leadTime: item?.lead_time_tgl_persetujuan_notif_st_dua,
        },
        {
          tahapan: "Tanggal Pengiriman Audit Plan Dua",
          tanggalStatus: item?.tgl_pengiriman_audit_plan_st_dua,
          catatan: item?.note_tgl_pengiriman_audit_plan_st_dua,
          leadTime: item?.lead_time_tgl_pengiriman_audit_plan_st_dua,
        },
        {
          tahapan: "Tanggal Pelaksanaan Audit Dua",
          tanggalStatus: item?.tgl_pelaksanaan_audit_st_dua,
          catatan: item?.note_tgl_pelaksanaan_audit_st_dua,
          leadTime: item?.lead_time_tgl_pelaksanaan_audit_st_dua,
        },
        {
          tahapan: "Tanggal Penyelesaian CAPA Dua",
          tanggalStatus: item?.tgl_penyelesaian_capa_st_dua,
          catatan: item?.note_tgl_penyelesaian_capa_st_dua,
          leadTime: item?.lead_time_tgl_penyelesaian_capa_st_dua,
        },
        {
          tahapan: "Tanggal Pengiriman Draft Sertifikat",
          tanggalStatus: item?.tgl_pengiriman_draft_sertifikat,
          catatan: item?.note_tgl_pengiriman_draft_sertifikat,
          leadTime: item?.lead_time_tgl_pengiriman_draft_sertifikat,
        },
        {
          tahapan: "Tanggal Persetujuan Draft Sertifikat",
          tanggalStatus: item?.tgl_persetujuan_draft_sertifikat,
          catatan: item?.note_tgl_persetujuan_draft_sertifikat,
          leadTime: item?.lead_time_tgl_persetujuan_draft_sertifikat,
        },
        {
          tahapan: "Tanggal Pengajuan ke KAN",
          tanggalStatus: item?.tgl_pengajuan_ke_kan,
          catatan: item?.note_tgl_pengajuan_ke_kan,
          leadTime: item?.lead_time_tgl_pengajuan_ke_kan,
        },
        {
          tahapan: "Tanggal Persetujuan KAN",
          tanggalStatus: item?.tgl_persetujuan_kan,
          catatan: item?.note_tgl_persetujuan_kan,
          leadTime: item?.lead_time_tgl_persetujuan_kan,
        },
        {
          tahapan: "Tanggal Kirim Sertifikat",
          tanggalStatus: item?.tgl_kirim_sertifikat,
          catatan: item?.note_tgl_kirim_sertifikat,
          leadTime: item?.lead_time_tgl_kirim_sertifikat,
        },
      ];

      const dataField: AllProject[] = [
        {
          tahapan: "Tanggal Aplication Form or Request",
          tanggalStatus: item?.tgl_apl_form_or_request,
          catatan: item?.note_tgl_apl_form_or_request,
          leadTime: item?.lead_time_tgl_apl_form_or_request,
        },
        {
          tahapan: "Tanggal Review Penugasan",
          tanggalStatus: item?.tgl_review_penugasan_st_dua,
          catatan: item?.note_tgl_review_penugasan_st_dua,
          leadTime: item?.lead_time_tgl_review_penugasan_st_dua,
        },
        {
          tahapan: "Tanggal Pengiriman Notifikasi",
          tanggalStatus: item?.tgl_pengiriman_notif_st_dua,
          catatan: item?.note_tgl_pengiriman_notif_st_dua,
          leadTime: item?.lead_time_tgl_pengiriman_notif_st_dua,
        },
        {
          tahapan: "Tanggal Persetujuan Notifikasi",
          tanggalStatus: item?.tgl_persetujuan_notif_st_dua,
          catatan: item?.note_tgl_persetujuan_notif_st_dua,
          leadTime: item?.lead_time_tgl_persetujuan_notif_st_dua,
        },
        {
          tahapan: "Tanggal Pengiriman Audit Plan",
          tanggalStatus: item?.tgl_pengiriman_audit_plan_st_dua,
          catatan: item?.note_tgl_pengiriman_audit_plan_st_dua,
          leadTime: item?.lead_time_tgl_pengiriman_audit_plan_st_dua,
        },
        {
          tahapan: "Tanggal Pelaksanaan Audit",
          tanggalStatus: item?.tgl_pelaksanaan_audit_st_dua,
          catatan: item?.note_tgl_pelaksanaan_audit_st_dua,
          leadTime: item?.lead_time_tgl_pelaksanaan_audit_st_dua,
        },
        {
          tahapan: "Tanggal Penyelesaian CAPA",
          tanggalStatus: item?.tgl_penyelesaian_capa_st_dua,
          catatan: item?.note_tgl_penyelesaian_capa_st_dua,
          leadTime: item?.lead_time_tgl_penyelesaian_capa_st_dua,
        },
        {
          tahapan: "Tanggal Pengiriman Draft Sertifikat",
          tanggalStatus: item?.tgl_pengiriman_draft_sertifikat,
          catatan: item?.note_tgl_pengiriman_draft_sertifikat,
          leadTime: item?.lead_time_tgl_pengiriman_draft_sertifikat,
        },
        {
          tahapan: "Tanggal Persetujuan Draft Sertifikat",
          tanggalStatus: item?.tgl_persetujuan_draft_sertifikat,
          catatan: item?.note_tgl_persetujuan_draft_sertifikat,
          leadTime: item?.lead_time_tgl_persetujuan_draft_sertifikat,
        },
        {
          tahapan: "Tanggal Pengajuan ke KAN",
          tanggalStatus: item?.tgl_pengajuan_ke_kan,
          catatan: item?.note_tgl_pengajuan_ke_kan,
          leadTime: item?.lead_time_tgl_pengajuan_ke_kan,
        },
        {
          tahapan: "Tanggal Persetujuan KAN",
          tanggalStatus: item?.tgl_persetujuan_kan,
          catatan: item?.note_tgl_persetujuan_kan,
          leadTime: item?.lead_time_tgl_persetujuan_kan,
        },
        {
          tahapan: "Tanggal Kirim Sertifikat",
          tanggalStatus: item?.tgl_kirim_sertifikat,
          catatan: item?.note_tgl_kirim_sertifikat,
          leadTime: item?.lead_time_tgl_kirim_sertifikat,
        },
      ];

      const latestProgressAudit = dataFieldAudit
        .filter((item) => item.tanggalStatus)
        .sort((a, b) =>
          new Date(a.tanggalStatus as string) >
          new Date(b.tanggalStatus as string)
            ? -1
            : 1
        )[0];

      const latestProgress = dataField
        .filter((item) => item.tanggalStatus)
        .sort((a, b) =>
          new Date(a.tanggalStatus as string) >
          new Date(b.tanggalStatus as string)
            ? -1
            : 1
        )[0];

      return item?.tahapan === 1
        ? Object.values(latestProgressAudit)?.some((field) => {
            return (
              typeof field === "string" &&
              field.toLowerCase().includes(searchValue)
            );
          }) ||
            Object.values(item).some((field) => {
              return (
                typeof field === "string" &&
                field.toLowerCase().includes(searchValue)
              );
            }) ||
            item?.standar?.some((standar) => {
              return Object.values(standar).some((field) => {
                return (
                  typeof field === "string" &&
                  field.toLowerCase().includes(searchValue)
                );
              });
            })
        : (item?.tahapan > 1 &&
            Object.values(latestProgress)?.some((field) => {
              return (
                typeof field === "string" &&
                field.toLowerCase().includes(searchValue)
              );
            })) ||
            Object.values(item).some((field) => {
              return (
                typeof field === "string" &&
                field.toLowerCase().includes(searchValue)
              );
            }) ||
            item?.standar?.some((standar) => {
              return Object.values(standar).some((field) => {
                return (
                  typeof field === "string" &&
                  field.toLowerCase().includes(searchValue)
                );
              });
            });
    });
    setFilteredData(filtered);
  };

  const handleClearSearch = () => {
    setFilteredData(allProject);
    setValue("");
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
    if (value === "") {
      setFilteredData(allProject);
    }

    getAkreditasi();
    getStandard();
    getStatusPembayaran();
    getTahapan();
  }, [value, allProject]);

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
        {isLoggedIn && (
          <Typography variant="h4">Audit Status System</Typography>
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

              <CardSections
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

export default Dashboard;
