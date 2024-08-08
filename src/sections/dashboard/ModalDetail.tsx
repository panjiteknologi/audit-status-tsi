import React, { useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as Yup from "yup";
import CloseButton from "./CloseButton";
import { AllProject, MenuProject } from "@/types/Project";
import { Formik } from "formik";
import InputText from "@/components/forms/InputText";
import InputDate from "@/components/forms/InputDate";
import moment, { Moment } from "moment";
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
}: ModalDetailProps) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));

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
          {add ? "Add Audit System" : "Update Audit System"}
        </Typography>
        <Formik
          initialValues={{
            create_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            id_project: data?.id_project,
            nama_perusahaan: add ? "" : data?.nama_perusahaan || "",
            nama_sales_or_crr: add ? "" : data?.nama_sales_or_crr || "",
            standar: add ? [] : data?.standar || [],
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
            tgl_penyelesaian_capa_st_dua: add
              ? ""
              : data?.tgl_penyelesaian_capa_st_dua || "",
            note_tgl_penyelesaian_capa_st_dua: add
              ? ""
              : data?.note_tgl_penyelesaian_capa_st_dua || "",
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
            akreditasi: Yup.string().required("Akreditasi is required"),
            tahapan: Yup.string().required("Tahapan is required"),
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
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        options={dataStandard}
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

                  <React.Fragment>
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
                            touched.status_pembayaran &&
                              errors.status_pembayaran
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
                  </React.Fragment>

                  {values?.tahapan === 1 ? (
                    <React.Fragment>
                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !add && data?.tgl_apl_form_or_request ? true : false
                          }
                          selectedDate={
                            values?.tgl_apl_form_or_request
                              ? moment(values.tgl_apl_form_or_request)
                              : null
                          }
                          handleDateChange={(newDate: Moment | null) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_apl_form_or_request",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Aplication Form or Request"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Aplication Form or Request`}
                          values={values?.note_tgl_apl_form_or_request}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_apl_form_or_request"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_apl_form_or_request ||
                            (!add && !!data?.tgl_review_penugasan_st_satu)
                              ? true
                              : false
                          }
                          selectedDate={
                            values?.tgl_review_penugasan_st_satu
                              ? moment(values.tgl_review_penugasan_st_satu)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_review_penugasan_st_satu",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Review Penugasan ST Satu"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Review Penugasan ST Satu`}
                          values={values?.note_tgl_review_penugasan_st_satu}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_review_penugasan_st_satu"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_review_penugasan_st_satu ||
                            (!add && !!data?.tgl_kontrak)
                          }
                          selectedDate={
                            values?.tgl_kontrak
                              ? moment(values.tgl_kontrak)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_kontrak",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Kontrak"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Kontrak`}
                          values={values?.note_tgl_kontrak}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_kontrak"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_kontrak ||
                            (!add && !!data?.tgl_pengiriman_notif_st_satu)
                          }
                          selectedDate={
                            values?.tgl_pengiriman_notif_st_satu
                              ? moment(values.tgl_pengiriman_notif_st_satu)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_pengiriman_notif_st_satu",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Pengiriman Notifikasi ST Satu"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Pengiriman Notifikasi ST Satu`}
                          values={values?.note_tgl_pengiriman_notif_st_satu}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_pengiriman_notif_st_satu"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_pengiriman_notif_st_satu ||
                            (!add && !!data?.tgl_persetujuan_notif_st_satu)
                          }
                          selectedDate={
                            values?.tgl_persetujuan_notif_st_satu
                              ? moment(values.tgl_persetujuan_notif_st_satu)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_persetujuan_notif_st_satu",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Persetujuan Notifikasi ST Satu"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Persetujuan Notifikasi ST Satu`}
                          values={values?.note_tgl_persetujuan_notif_st_satu}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_persetujuan_notif_st_satu"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_persetujuan_notif_st_satu ||
                            (!add && !!data?.tgl_pengiriman_audit_plan_st_satu)
                          }
                          selectedDate={
                            values?.tgl_pengiriman_audit_plan_st_satu
                              ? moment(values.tgl_pengiriman_audit_plan_st_satu)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_pengiriman_audit_plan_st_satu",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Pengiriman Audit Plan ST Satu"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Pengiriman Audit Plan ST Satu`}
                          values={
                            values?.note_tgl_pengiriman_audit_plan_st_satu
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_pengiriman_audit_plan_st_satu"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_pengiriman_audit_plan_st_satu ||
                            (!add && !!data?.tgl_pelaksanaan_audit_st_satu)
                          }
                          selectedDate={
                            values?.tgl_pelaksanaan_audit_st_satu
                              ? moment(values.tgl_pelaksanaan_audit_st_satu)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_pelaksanaan_audit_st_satu",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Pelaksanaan Audit ST Satu"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Pelaksanaan Audit ST Satu`}
                          values={values?.note_tgl_pelaksanaan_audit_st_satu}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_pelaksanaan_audit_st_satu"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_pelaksanaan_audit_st_satu ||
                            (!add && !!data?.tgl_penyelesaian_capa_st_satu)
                          }
                          selectedDate={
                            values?.tgl_penyelesaian_capa_st_satu
                              ? moment(values.tgl_penyelesaian_capa_st_satu)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_penyelesaian_capa_st_satu",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Penyelesaian CAPA ST Satu"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Penyelesaian CAPA ST Satu`}
                          values={values?.note_tgl_penyelesaian_capa_st_satu}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_penyelesaian_capa_st_satu"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_penyelesaian_capa_st_satu ||
                            (!add && !!data?.tgl_review_penugasan_st_dua)
                          }
                          selectedDate={
                            values?.tgl_review_penugasan_st_dua
                              ? moment(values.tgl_review_penugasan_st_dua)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_review_penugasan_st_dua",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Review Penugasan Dua"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Review Penugasan Dua`}
                          values={values?.note_tgl_review_penugasan_st_dua}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_penyelesaian_capa_st_dua"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_review_penugasan_st_dua ||
                            (!add && !!data?.tgl_pengiriman_notif_st_dua)
                          }
                          selectedDate={
                            values?.tgl_pengiriman_notif_st_dua
                              ? moment(values.tgl_pengiriman_notif_st_dua)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_pengiriman_notif_st_dua",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Pengiriman Notifikasi Dua"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Pengiriman Notifikasi Dua`}
                          values={values?.note_tgl_pengiriman_notif_st_dua}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_pengiriman_notif_st_dua"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_pengiriman_notif_st_dua ||
                            (!add && !!data?.tgl_persetujuan_notif_st_dua)
                          }
                          selectedDate={
                            values?.tgl_persetujuan_notif_st_dua
                              ? moment(values.tgl_persetujuan_notif_st_dua)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_persetujuan_notif_st_dua",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Persetujuan Notifikasi Dua"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Persetujuan Notifikasi Dua`}
                          values={values?.note_tgl_persetujuan_notif_st_dua}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_persetujuan_notif_st_dua"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_persetujuan_notif_st_dua ||
                            (!add && !!data?.tgl_pengiriman_audit_plan_st_dua)
                          }
                          selectedDate={
                            values?.tgl_pengiriman_audit_plan_st_dua
                              ? moment(values.tgl_pengiriman_audit_plan_st_dua)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_pengiriman_audit_plan_st_dua",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Pengiriman Audit Plan Dua"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Pengiriman Audit Plan Dua`}
                          values={values?.note_tgl_pengiriman_audit_plan_st_dua}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_pengiriman_audit_plan_st_dua"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_pengiriman_audit_plan_st_dua ||
                            (!add && !!data?.tgl_pelaksanaan_audit_st_dua)
                          }
                          selectedDate={
                            values?.tgl_pelaksanaan_audit_st_dua
                              ? moment(values.tgl_pelaksanaan_audit_st_dua)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_pelaksanaan_audit_st_dua",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Pelaksanaan Audit Dua"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Pelaksanaan Audit Dua`}
                          values={values?.note_tgl_pelaksanaan_audit_st_dua}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_pelaksanaan_audit_st_dua"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_pelaksanaan_audit_st_dua ||
                            (!add && !!data?.tgl_penyelesaian_capa_st_dua)
                          }
                          selectedDate={
                            values?.tgl_penyelesaian_capa_st_dua
                              ? moment(values.tgl_penyelesaian_capa_st_dua)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_penyelesaian_capa_st_dua",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Penyelesaian CAPA Dua"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Penyelesaian CAPA Dua`}
                          values={values?.note_tgl_penyelesaian_capa_st_dua}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_penyelesaian_capa_st_dua"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_penyelesaian_capa_st_dua ||
                            (!add && !!data?.tgl_pengiriman_draft_sertifikat)
                          }
                          selectedDate={
                            values?.tgl_pengiriman_draft_sertifikat
                              ? moment(values.tgl_pengiriman_draft_sertifikat)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_pengiriman_draft_sertifikat",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Pengiriman Draft Sertifikat"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Pengiriman Draft Sertifikat`}
                          values={values?.note_tgl_pengiriman_draft_sertifikat}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_pengiriman_draft_sertifikat"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_pengiriman_draft_sertifikat ||
                            (!add && !!data?.tgl_persetujuan_draft_sertifikat)
                          }
                          selectedDate={
                            values?.tgl_persetujuan_draft_sertifikat
                              ? moment(values.tgl_persetujuan_draft_sertifikat)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_persetujuan_draft_sertifikat",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Persetujuan Draft Sertifikat"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Persetujuan Draft Sertifikat`}
                          values={values?.note_tgl_persetujuan_draft_sertifikat}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_persetujuan_draft_sertifikat"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_persetujuan_draft_sertifikat ||
                            (!add && !!data?.tgl_pengajuan_ke_kan)
                          }
                          selectedDate={
                            values?.tgl_pengajuan_ke_kan
                              ? moment(values.tgl_pengajuan_ke_kan)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_pengajuan_ke_kan",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Pengajuan ke KAN"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Pengajuan ke KAN`}
                          values={values?.note_tgl_pengajuan_ke_kan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_pengajuan_ke_kan"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_pengajuan_ke_kan ||
                            (!add && !!data?.tgl_persetujuan_kan)
                          }
                          selectedDate={
                            values?.tgl_persetujuan_kan
                              ? moment(values.tgl_persetujuan_kan)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_persetujuan_kan",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Persetujuan KAN"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Persetujuan KAN`}
                          values={values?.note_tgl_persetujuan_kan}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_persetujuan_kan"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <InputDate
                          disabled={
                            !values?.tgl_persetujuan_kan ||
                            (!add && !!data?.tgl_kirim_sertifikat)
                          }
                          selectedDate={
                            values?.tgl_kirim_sertifikat
                              ? moment(values.tgl_kirim_sertifikat)
                              : null
                          }
                          handleDateChange={(newDate) => {
                            const selectedDate = newDate?.format("YYYY-MM-DD");
                            const currentTime = moment().format("HH:mm:ss");
                            setFieldValue(
                              "tgl_kirim_sertifikat",
                              selectedDate + " " + currentTime
                            );
                          }}
                          label="Tanggal Kirim Sertifikat"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputText
                          label={`Catatan Tanggal Kirim Sertifikat`}
                          values={values?.note_tgl_kirim_sertifikat}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="note_tgl_kirim_sertifikat"
                        />
                      </Grid>
                    </React.Fragment>
                  ) : (
                    values?.tahapan > 1 && (
                      <React.Fragment>
                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !add && data?.tgl_apl_form_or_request
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_apl_form_or_request
                                ? moment(values.tgl_apl_form_or_request)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_apl_form_or_request",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Aplication Form or Request"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Aplication Form or Request`}
                            values={values?.note_tgl_apl_form_or_request}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_apl_form_or_request"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_apl_form_or_request ||
                              (!add && !!data?.tgl_review_penugasan_st_dua)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_review_penugasan_st_dua
                                ? moment(values.tgl_review_penugasan_st_dua)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_review_penugasan_st_dua",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Review Penugasan"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Review Penugasan`}
                            values={values?.note_tgl_review_penugasan_st_dua}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_review_penugasan_st_dua"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_review_penugasan_st_dua ||
                              (!add && !!data?.tgl_pengiriman_notif_st_dua)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_pengiriman_notif_st_dua
                                ? moment(values.tgl_pengiriman_notif_st_dua)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_pengiriman_notif_st_dua",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Pengiriman Notifikasi"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Pengiriman Notifikasi`}
                            values={values?.note_tgl_pengiriman_notif_st_dua}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_pengiriman_notif_st_dua"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_pengiriman_notif_st_dua ||
                              (!add && !!data?.tgl_persetujuan_notif_st_dua)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_persetujuan_notif_st_dua
                                ? moment(values.tgl_persetujuan_notif_st_dua)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_persetujuan_notif_st_dua",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Persetujuan Notifikasi"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Persetujuan Notifikasi`}
                            values={values?.note_tgl_persetujuan_notif_st_dua}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_persetujuan_notif_st_dua"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_persetujuan_notif_st_dua ||
                              (!add && !!data?.tgl_pengiriman_audit_plan_st_dua)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_pengiriman_audit_plan_st_dua
                                ? moment(
                                    values.tgl_pengiriman_audit_plan_st_dua
                                  )
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_pengiriman_audit_plan_st_dua",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Pengiriman Audit Plan"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Pengiriman Audit Plan`}
                            values={
                              values?.note_tgl_pengiriman_audit_plan_st_dua
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_pengiriman_audit_plan_st_dua"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_pengiriman_audit_plan_st_dua ||
                              (!add && !!data?.tgl_pelaksanaan_audit_st_dua)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_pelaksanaan_audit_st_dua
                                ? moment(values.tgl_pelaksanaan_audit_st_dua)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_pelaksanaan_audit_st_dua",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Pelaksanaan Audit"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Pelaksanaan Audit`}
                            values={values?.note_tgl_pelaksanaan_audit_st_dua}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_pelaksanaan_audit_st_dua"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_pelaksanaan_audit_st_dua ||
                              (!add && !!data?.tgl_penyelesaian_capa_st_dua)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_penyelesaian_capa_st_dua
                                ? moment(values.tgl_penyelesaian_capa_st_dua)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_penyelesaian_capa_st_dua",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Penyelesaian CAPA"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Penyelesaian CAPA`}
                            values={values?.note_tgl_penyelesaian_capa_st_dua}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_penyelesaian_capa_st_dua"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_penyelesaian_capa_st_dua ||
                              (!add && !!data?.tgl_pengiriman_draft_sertifikat)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_pengiriman_draft_sertifikat
                                ? moment(values.tgl_pengiriman_draft_sertifikat)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_pengiriman_draft_sertifikat",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Pengiriman Draft Sertifikat"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Pengiriman Draft Sertifikat`}
                            values={
                              values?.note_tgl_pengiriman_draft_sertifikat
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_pengiriman_draft_sertifikat"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_pengiriman_draft_sertifikat ||
                              (!add && !!data?.tgl_persetujuan_draft_sertifikat)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_persetujuan_draft_sertifikat
                                ? moment(
                                    values.tgl_persetujuan_draft_sertifikat
                                  )
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_persetujuan_draft_sertifikat",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Persetujuan Draft Sertifikat"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Persetujuan Draft Sertifikat`}
                            values={
                              values?.note_tgl_persetujuan_draft_sertifikat
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_persetujuan_draft_sertifikat"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_persetujuan_draft_sertifikat ||
                              (!add && !!data?.tgl_pengajuan_ke_kan)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_pengajuan_ke_kan
                                ? moment(values.tgl_pengajuan_ke_kan)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_pengajuan_ke_kan",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Pengajuan ke KAN"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Pengajuan ke KAN`}
                            values={values?.note_tgl_pengajuan_ke_kan}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_pengajuan_ke_kan"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_pengajuan_ke_kan ||
                              (!add && !!data?.tgl_persetujuan_kan)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_persetujuan_kan
                                ? moment(values.tgl_persetujuan_kan)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_persetujuan_kan",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Persetujuan KAN"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Persetujuan KAN`}
                            values={values?.note_tgl_persetujuan_kan}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_persetujuan_kan"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputDate
                            disabled={
                              !values?.tgl_persetujuan_kan ||
                              (!add && !!data?.tgl_kirim_sertifikat)
                                ? true
                                : false
                            }
                            selectedDate={
                              values?.tgl_kirim_sertifikat
                                ? moment(values.tgl_kirim_sertifikat)
                                : null
                            }
                            handleDateChange={(newDate) => {
                              const selectedDate =
                                newDate?.format("YYYY-MM-DD");
                              const currentTime = moment().format("HH:mm:ss");
                              setFieldValue(
                                "tgl_kirim_sertifikat",
                                selectedDate + " " + currentTime
                              );
                            }}
                            label="Tanggal Kirim Sertifikat"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputText
                            label={`Catatan Tanggal Kirim Sertifikat`}
                            values={values?.note_tgl_kirim_sertifikat}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="note_tgl_kirim_sertifikat"
                          />
                        </Grid>
                      </React.Fragment>
                    )
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
                          {add ? "Add" : "Update"}
                        </>
                      ) : (
                        <>{add ? "Add" : "Update"}</>
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
