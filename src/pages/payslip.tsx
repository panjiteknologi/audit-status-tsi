import PayslipSections from "@/sections/payslip";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BASE_URL,
  GET_ID_EMPLOYEE,
  UPDATE_PAY_SLIP,
} from "@/contexts/JWTContext";
import { User } from "@/types/User";
import { formatIdr } from "@/utils/formatIdr";
import { Box } from "@mui/system";
import IllustrationConfirmation from "../assets/illustration/il-confirmation.svg";
import IllustrationCancel from "../assets/illustration/il-notfound.svg";
import CloseButton from "@/sections/payslip/CloseButton";
import { ListTab } from "@/types/Tabs";

const Payslip = () => {
  const [value, setValue] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("01");
  const [message, setMessage] = useState<string>("");

  const [month, setMonth] = useState<ListTab[]>([]);
  const [data, setData] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [match, setMatch] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const gajiProrate = Math.round(
    (+data[0]?.gaji_pokok / +data[0]?.total_timesheet_bulan_ini) *
      +data[0]?.total_masuk_kerja
  );

  const getDataEmployee = async () => {
    setLoading(true);
    const token = window.localStorage.getItem("serviceToken");
    const id = window.localStorage.getItem("idEmployee");
    try {
      const response = await axios.post(
        BASE_URL + GET_ID_EMPLOYEE,
        {
          master_employee_id: id,
          periode: selectedMonth,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTimeout(() => {
        setValue((response?.data?.data[0]?.sesuai > 0 ? 1 : 0) + "");
        setError(false);
        setLoading(false);
        setData(response?.data?.data);
      }, 1500);
    } catch (err) {
      setTimeout(() => {
        setError(true);
        setLoading(false);
        setData([]);
      }, 1500);
    }
  };

  const updateStatus = async (selectedStatus: string) => {
    setValue(selectedStatus);
    const token = window.localStorage.getItem("serviceToken");
    const id = window.localStorage.getItem("idEmployee");
    try {
      const response = await axios.post(
        BASE_URL + UPDATE_PAY_SLIP,
        {
          master_employee_id: id,
          salary_slip_id: data[0].salary_slip_id,
          status_slip: selectedStatus,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response && selectedStatus === "0") {
        setMatch(true);
        setShowModal(true);
        setMessage(
          "Status berhasil diperbaharui, dan kirimkan pesan anda ke Whatsapp agar segera diperbaiki!"
        );
        setError(false);
      } else if (response && selectedStatus === "1") {
        setMatch(false);
        setShowModal(true);
        setMessage(
          "Status berhasil diperbaharui, dan data anda tidak ada yang salah."
        );
        setError(false);
      }
    } catch (err) {
      setMatch(false);
      setError(true);
      setMessage(
        "Status tidak berhasil diperbaharui, silakan ulangi beberapa saat lagi."
      );
    }
  };

  const createWhatsAppLink = () => {
    const whatsappNumber = "+6288219738719";
    const message = `
    Hallo Bpk/Ibu. Mohon di cek kembali dikarenakan masih ada data yg belum sesuai 
      Nomor PKWT: ${data[0]?.no_pkwt}
      Nama: ${data[0]?.nama}
      Gaji Pokok: ${formatIdr(data[0]?.gaji_pokok)}
      Gaji Diterima: ${formatIdr(gajiProrate)}
      Area: ${data[0]?.client_name + data[0]?.area}
      Catatan:
    Terima kasih.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    setShowModal(false);
    window.open(whatsappUrl, "_blank");
  };

  const getMonth = async () => {
    const response = await axios.post(
      "https://api-cis.manajemensistem.com/api/v1/cis/employee/get_month"
    );
    setMonth(response?.data?.data);
  };

  const handleTabChange = (selectedMonth: string) => {
    setSelectedMonth(selectedMonth);
  };

  const getMonthName = (selectedMonth: string) => {
    const selectedMonthObj = month.find((m) => m?.month === selectedMonth);
    return selectedMonthObj ? selectedMonthObj?.month_name : "";
  };

  useEffect(() => {
    getMonth();
  }, []);

  useEffect(() => {
    getDataEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <PayslipSections
          tabs={month}
          data={data}
          handleTabChange={handleTabChange}
          selectedMonthName={getMonthName(selectedMonth)}
          loading={loading}
          value={value}
          updateStatus={updateStatus}
          error={error}
        />
        <Dialog
          open={showModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ textAlign: "center" }}
        >
          <CloseButton onClick={() => setShowModal(false)} />
          <DialogTitle
            id="alert-dialog-title"
            fontWeight={"bold"}
            color={"steelblue"}
            marginTop={6}
          >
            {error ? "Failed Change Status" : "Successfully Change Status"}
          </DialogTitle>
          <DialogContent>
            <Box>
              {!error ? (
                <img
                  src={IllustrationConfirmation}
                  style={{ width: 250, height: 250 }}
                />
              ) : (
                <img
                  src={IllustrationCancel}
                  style={{ width: 250, height: 250 }}
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
          </DialogContent>
          <DialogActions>
            {match && (
              <Button
                onClick={createWhatsAppLink}
                sx={{
                  backgroundColor: "steelblue",
                  color: "white",
                  fontSize: "12px",
                  borderRadius: 2,
                  marginBottom: 2,
                  width: "100%",
                  marginRight: 2,
                  marginLeft: 2,
                  height: 40,
                }}
              >
                Send Message on Whatsapp
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default Payslip;
