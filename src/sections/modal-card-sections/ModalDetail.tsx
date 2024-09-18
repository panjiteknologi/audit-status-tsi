import { useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  CircularProgress,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
} from "@mui/material";
import CloseButton from "./CloseButton";
import { AllProject, MenuProject } from "@/types/Project";
import FormInputISO from "./FormInputISO";
import FormInputISPO from "./FormInputISPO";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import InputText from "@/components/forms/InputText";

interface ModalDetailProps {
  disabled: boolean;
  loadingBtn: boolean;
  showdashboard: boolean;
  onClose: () => void;
  data: AllProject | null;
  add: boolean;
  dataAkreditasi: MenuProject[];
  dataStandard: MenuProject[];
  dataStatusPembayaran: MenuProject[];
  dataTahapan: MenuProject[];
  onHandleSubmit: (values: AllProject) => void;
  origin: "iso" | "ispo";
}

const ModalDetail = ({
  disabled,
  loadingBtn,
  showdashboard,
  onClose,
  data,
  add,
  dataAkreditasi,
  dataStandard,
  dataStatusPembayaran,
  dataTahapan,
  onHandleSubmit,
  origin,
}: ModalDetailProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

  const initialValueTahapan =
    origin === "iso"
      ? []
      : [
          {
            id_standar: "9",
          },
        ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: sm ? "95%" : md ? "80%" : lg ? "80%" : "50%",
    height: 650,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    overflow: "auto",
    pt: 2,
    px: 2,
    pb: 3,
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };

  useEffect(() => {
    if (data) {
      data;
    }
  }, []);

  return (
    <Modal
      open={showdashboard}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={style}>
        <CloseButton onClick={onClose} />

        <Typography
          id="modal-modal-title"
          variant="h5"
          marginTop={4}
          fontSize={18}
          textAlign="center"
          marginBottom={4}
        >
          {add
            ? `Add Audit System ${origin.toUpperCase()}`
            : `Update Audit System ${origin.toUpperCase()}`}
        </Typography>
        <Formik
          initialValues={{
            create_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            customer_id: add ? "" : data?.customer_id || "",
            id_project: data?.id_project,
            nama_perusahaan: add ? "" : data?.nama_perusahaan || "",
            nama_sales_or_crr: add ? "" : data?.nama_sales_or_crr || "",
            standar: add ? initialValueTahapan : data?.standar || [],
            akreditasi: add ? [] : data?.akreditasi || [],
            tahapan: add ? [] : data?.tahapan || [],
            tgl_apl_form_or_request: add
              ? ""
              : data?.tgl_apl_form_or_request || "",
            note_tgl_apl_form_or_request: add
              ? ""
              : data?.note_tgl_apl_form_or_request || "",
            tgl_review_penugasan_st_satu: add
              ? ""
              : data?.tgl_review_penugasan_st_satu || "",
            tgl_kontrak: add ? "" : data?.tgl_kontrak || "",
            note_tgl_kontrak: add ? "" : data?.note_tgl_kontrak || "",
            note_tgl_review_penugasan_st_satu: add
              ? ""
              : data?.note_tgl_review_penugasan_st_satu || "",
            tgl_review_penugasan_st_dua: add
              ? ""
              : data?.tgl_review_penugasan_st_dua || "",
            note_tgl_review_penugasan_st_dua: add
              ? ""
              : data?.note_tgl_review_penugasan_st_dua || "",
            tgl_pengiriman_notif_st_satu: add
              ? ""
              : data?.tgl_pengiriman_notif_st_satu || "",
            note_tgl_pengiriman_notif_st_satu: add
              ? ""
              : data?.note_tgl_pengiriman_notif_st_satu || "",
            tgl_pengiriman_notif_st_dua: add
              ? ""
              : data?.tgl_pengiriman_notif_st_dua || "",
            note_tgl_pengiriman_notif_st_dua: add
              ? ""
              : data?.note_tgl_pengiriman_notif_st_dua || "",
            tgl_persetujuan_notif_st_satu: add
              ? ""
              : data?.tgl_persetujuan_notif_st_satu || "",
            note_tgl_persetujuan_notif_st_satu: add
              ? ""
              : data?.note_tgl_persetujuan_notif_st_satu || "",
            tgl_persetujuan_notif_st_dua: add
              ? ""
              : data?.tgl_persetujuan_notif_st_dua || "",
            note_tgl_persetujuan_notif_st_dua: add
              ? ""
              : data?.note_tgl_persetujuan_notif_st_dua || "",
            tgl_pengiriman_audit_plan_st_satu: add
              ? ""
              : data?.tgl_pengiriman_audit_plan_st_satu || "",
            note_tgl_pengiriman_audit_plan_st_satu: add
              ? ""
              : data?.note_tgl_pengiriman_audit_plan_st_satu || "",
            tgl_pengiriman_audit_plan_st_dua: add
              ? ""
              : data?.tgl_pengiriman_audit_plan_st_dua || "",
            note_tgl_pengiriman_audit_plan_st_dua: add
              ? ""
              : data?.note_tgl_pengiriman_audit_plan_st_dua || "",
            tgl_pelaksanaan_audit_st_satu: add
              ? ""
              : data?.tgl_pelaksanaan_audit_st_satu || "",
            note_tgl_pelaksanaan_audit_st_satu: add
              ? ""
              : data?.note_tgl_pelaksanaan_audit_st_satu || "",
            tgl_pelaksanaan_audit_st_dua: add
              ? ""
              : data?.tgl_pelaksanaan_audit_st_dua || "",
            note_tgl_pelaksanaan_audit_st_dua: add
              ? ""
              : data?.note_tgl_pelaksanaan_audit_st_dua || "",
            tgl_penyelesaian_capa_st_satu: add
              ? ""
              : data?.tgl_penyelesaian_capa_st_satu || "",
            note_tgl_penyelesaian_capa_st_satu: add
              ? ""
              : data?.note_tgl_penyelesaian_capa_st_satu || "",
            // ============ | ISPO ONLY | ============
            // ---- after capa st satu ----
            tgl_proses_review_tahap_satu: add
              ? ""
              : data?.tgl_proses_review_tahap_satu,
            note_tgl_proses_review_tahap_satu: add
              ? ""
              : data?.note_tgl_proses_review_tahap_satu,
            tgl_pengambilan_keputusan_tahap_satu: add
              ? ""
              : data?.tgl_pengambilan_keputusan_tahap_satu,
            note_tgl_pengambilan_keputusan_tahap_satu: add
              ? ""
              : data?.note_tgl_pengambilan_keputusan_tahap_satu,
            // ============ | ISPO ONLY | ============
            tgl_penyelesaian_capa_st_dua: add
              ? ""
              : data?.tgl_penyelesaian_capa_st_dua || "",
            note_tgl_penyelesaian_capa_st_dua: add
              ? ""
              : data?.note_tgl_penyelesaian_capa_st_dua || "",
            // ============ | ISPO ONLY | ============
            // ---- after capa st dua ----
            tgl_proses_review_tahap_dua: add
              ? ""
              : data?.tgl_proses_review_tahap_dua,
            note_tgl_proses_review_tahap_dua: add
              ? ""
              : data?.note_tgl_proses_review_tahap_dua,
            tgl_pengambilan_keputusan_tahap_dua: add
              ? ""
              : data?.tgl_pengambilan_keputusan_tahap_dua,
            note_tgl_pengambilan_keputusan_tahap_dua: add
              ? ""
              : data?.note_tgl_pengambilan_keputusan_tahap_dua,
            // ============ | ISPO ONLY | ============
            tgl_pengiriman_draft_sertifikat: add
              ? ""
              : data?.tgl_pengiriman_draft_sertifikat || "",
            note_tgl_pengiriman_draft_sertifikat: add
              ? ""
              : data?.note_tgl_pengiriman_draft_sertifikat || "",
            tgl_persetujuan_draft_sertifikat: add
              ? ""
              : data?.tgl_persetujuan_draft_sertifikat || "",
            note_tgl_persetujuan_draft_sertifikat: add
              ? ""
              : data?.note_tgl_persetujuan_draft_sertifikat || "",
            tgl_pengajuan_ke_kan: add ? "" : data?.tgl_pengajuan_ke_kan || "",
            note_tgl_pengajuan_ke_kan: add
              ? ""
              : data?.note_tgl_pengajuan_ke_kan || "",
            tgl_persetujuan_kan: add ? "" : data?.tgl_persetujuan_kan || "",
            note_tgl_persetujuan_kan: add
              ? ""
              : data?.note_tgl_persetujuan_kan || "",
            status_pembayaran: add ? "" : data?.status_pembayaran || "",
            note_status_pembayaran: add
              ? ""
              : data?.note_status_pembayaran || "",
            tgl_kirim_sertifikat: add ? "" : data?.tgl_kirim_sertifikat || "",
            note_tgl_kirim_sertifikat: add
              ? ""
              : data?.note_tgl_kirim_sertifikat || "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            nama_perusahaan: Yup.string().required(
              "Nama Perusahaan is required"
            ),
            nama_sales_or_crr: Yup.string().required("Nama Sales is required"),
            standar: Yup.array()
              .min(1, "At least one standar is required")
              .required("Standar is required"),
            akreditasi: Yup.string()
              .min(1, "At least one standar is required")
              .required("Akreditasi is required"),
            tahapan: Yup.string()
              .min(1, "At least one standar is required")
              .required("Tahapan is required"),
          })}
          onSubmit={async (values: any) => {
            onHandleSubmit(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue,
          }) => {
            return (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputText
                      label="Customer ID"
                      values={values?.customer_id}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="customer_id"
                      error={Boolean(touched.customer_id && errors.customer_id)}
                      errorMessage={errors.customer_id as string}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Nama Perusahaan"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      values={values?.nama_perusahaan}
                      name="nama_perusahaan"
                      error={Boolean(
                        touched.nama_perusahaan && errors.nama_perusahaan
                      )}
                      errorMessage={errors.nama_perusahaan as string}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputText
                      label="Nama Sales or CRR"
                      values={values?.nama_sales_or_crr}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="nama_sales_or_crr"
                      error={Boolean(
                        touched.nama_sales_or_crr && errors.nama_sales_or_crr
                      )}
                      errorMessage={errors.nama_perusahaan as string}
                    />
                  </Grid>
                  {origin === "iso" && (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={dataStandard.filter(
                            (item) => item.id_standar !== 9
                          )}
                          getOptionLabel={(option) => option.nama_standar}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Standar"
                              placeholder="Standar"
                            />
                          )}
                          value={values.standar || []}
                          onBlur={handleBlur}
                          onChange={(_, newValue) => {
                            setFieldValue("standar", newValue);
                          }}
                        />
                        {touched.standar && errors.standar && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-standar"
                          >
                            {errors.standar as string}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  )}
                  {origin === "ispo" && (
                    <Grid item xs={12}>
                      <InputLabel>Standar</InputLabel>
                      <Chip label="ISPO" variant="combined" size="medium" />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Akreditasi</InputLabel>
                      <Select
                        value={values?.akreditasi || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="akreditasi"
                        error={Boolean(touched.akreditasi && errors.akreditasi)}
                      >
                        {dataAkreditasi.map((item, index) => (
                          <MenuItem key={index} value={item.id_akreditasi}>
                            {item.nama_akreditasi}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.akreditasi && errors.akreditasi && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-akreditasi-login"
                        >
                          {errors.akreditasi as string}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Tahapan</InputLabel>
                      <Select
                        value={values?.tahapan || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="tahapan"
                        error={Boolean(touched.tahapan && errors.tahapan)}
                      >
                        {dataTahapan.map((item, index) => (
                          <MenuItem key={index} value={item.id_tahapan}>
                            {item.nama_tahapan}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.tahapan && errors.tahapan && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-tahapan-login"
                        >
                          {errors.tahapan as string}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="status_pembayaran-label">
                        Status Pembayaran
                      </InputLabel>
                      <Select
                        labelId="status_pembayaran-label"
                        value={values?.status_pembayaran || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="status_pembayaran"
                        error={Boolean(
                          touched.status_pembayaran && errors.status_pembayaran
                        )}
                      >
                        {dataStatusPembayaran.map((item, index) => (
                          <MenuItem
                            key={index}
                            value={item.status_pembayaran_id}
                          >
                            {item.nama_status_pembayaran}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.status_pembayaran &&
                        errors.status_pembayaran && (
                          <FormHelperText error id="status_pembayaran-error">
                            {errors.status_pembayaran as string}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputText
                      label="Catatan Status Pembayaran"
                      values={values?.note_status_pembayaran}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="note_status_pembayaran"
                      error={Boolean(
                        touched.note_status_pembayaran &&
                          errors.note_status_pembayaran
                      )}
                    />
                  </Grid>

                  {origin === "iso" && (
                    <FormInputISO
                      data={data}
                      add={add}
                      dataAkreditasi={dataAkreditasi}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {origin === "ispo" && (
                    <FormInputISPO
                      data={data}
                      add={add}
                      dataAkreditasi={dataAkreditasi}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}

                  <Grid item xs={12} textAlign="center" marginTop={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={disabled}
                      sx={{ backgroundColor: "#1e2041" }}
                    >
                      {loadingBtn ? (
                        <>
                          <CircularProgress
                            color="inherit"
                            size={14}
                            sx={{ marginRight: 1 }}
                          />
                          {add
                            ? `Add ${origin.toUpperCase()}`
                            : `Update ${origin.toUpperCase()}`}
                        </>
                      ) : (
                        <>
                          {add
                            ? `Add ${origin.toUpperCase()}`
                            : `Update ${origin.toUpperCase()}`}
                        </>
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ModalDetail;
