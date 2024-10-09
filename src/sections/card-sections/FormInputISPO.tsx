import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { AllProject } from "@/types/Project";
import InputText from "@/components/forms/InputText";
import InputDate from "@/components/forms/InputDate";
import moment, { Moment } from "moment";

interface FormInputISPOProps {
  data: AllProject | null;
  add: boolean;
  handleBlur: any;
  handleChange: any;
  values: any;
  setFieldValue: any;
}

const FormInputISPO = ({
  data,
  add,
  handleBlur,
  handleChange,
  values,
  setFieldValue,
}: FormInputISPOProps) => {
  useEffect(() => {
    if (data) {
      data;
    }
  }, []);

  return (
    <>
      {values?.tahapan === 1 ? (
        <React.Fragment>
          <Grid item xs={12} sm={6}>
            <InputDate
              disabled={!add && data?.tgl_apl_form_or_request ? true : false}
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
                values?.tgl_kontrak ? moment(values.tgl_kontrak) : null
              }
              handleDateChange={(newDate) => {
                const selectedDate = newDate?.format("YYYY-MM-DD");
                const currentTime = moment().format("HH:mm:ss");
                setFieldValue("tgl_kontrak", selectedDate + " " + currentTime);
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
              values={values?.note_tgl_pengiriman_audit_plan_st_satu}
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
                (!add && !!data?.tgl_proses_review_tahap_satu)
              }
              selectedDate={
                values?.tgl_proses_review_tahap_satu
                  ? moment(values.tgl_proses_review_tahap_satu)
                  : null
              }
              handleDateChange={(newDate) => {
                const selectedDate = newDate?.format("YYYY-MM-DD");
                const currentTime = moment().format("HH:mm:ss");
                setFieldValue(
                  "tgl_proses_review_tahap_satu",
                  selectedDate + " " + currentTime
                );
              }}
              label="Tanggal Proses Review ST Satu"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Proses Review ST Satu`}
              values={values?.note_tgl_proses_review_tahap_satu}
              onChange={handleChange}
              onBlur={handleBlur}
              name="note_tgl_proses_review_tahap_satu"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputDate
              disabled={
                !values?.tgl_proses_review_tahap_satu ||
                (!add && !!data?.tgl_pengambilan_keputusan_tahap_satu)
              }
              selectedDate={
                values?.tgl_pengambilan_keputusan_tahap_satu
                  ? moment(values.tgl_pengambilan_keputusan_tahap_satu)
                  : null
              }
              handleDateChange={(newDate) => {
                const selectedDate = newDate?.format("YYYY-MM-DD");
                const currentTime = moment().format("HH:mm:ss");
                setFieldValue(
                  "tgl_pengambilan_keputusan_tahap_satu",
                  selectedDate + " " + currentTime
                );
              }}
              label="Tanggal Pengambilan Keputusan ST Satu"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Pengambilan Keputusan ST Satu`}
              values={values?.note_tgl_pengambilan_keputusan_tahap_satu}
              onChange={handleChange}
              onBlur={handleBlur}
              name="note_tgl_pengambilan_keputusan_tahap_satu"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputDate
              disabled={
                !values?.tgl_pengambilan_keputusan_tahap_satu ||
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
              label="Tanggal Review Penugasan ST Dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Review Penugasan ST Dua`}
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
              label="Tanggal Pengiriman Notifikasi ST Dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Pengiriman Notifikasi ST Dua`}
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
              label="Tanggal Persetujuan Notifikasi ST Dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Persetujuan Notifikasi ST Dua`}
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
              label="Tanggal Pengiriman Audit Plan ST Dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Pengiriman Audit Plan ST Dua`}
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
              label="Tanggal Pelaksanaan Audit ST Dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Pelaksanaan Audit ST Dua`}
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
              label="Tanggal Penyelesaian CAPA ST Dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Penyelesaian CAPA ST Dua`}
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
                (!add && !!data?.tgl_proses_review_tahap_dua)
              }
              selectedDate={
                values?.tgl_proses_review_tahap_dua
                  ? moment(values.tgl_proses_review_tahap_dua)
                  : null
              }
              handleDateChange={(newDate) => {
                const selectedDate = newDate?.format("YYYY-MM-DD");
                const currentTime = moment().format("HH:mm:ss");
                setFieldValue(
                  "tgl_proses_review_tahap_dua",
                  selectedDate + " " + currentTime
                );
              }}
              label="Tanggal Proses Review ST Dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Proses Review ST Dua`}
              values={values?.note_tgl_proses_review_tahap_dua}
              onChange={handleChange}
              onBlur={handleBlur}
              name="note_tgl_proses_review_tahap_dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputDate
              disabled={
                !values?.tgl_proses_review_tahap_dua ||
                (!add && !!data?.tgl_pengambilan_keputusan_tahap_dua)
              }
              selectedDate={
                values?.tgl_pengambilan_keputusan_tahap_dua
                  ? moment(values.tgl_pengambilan_keputusan_tahap_dua)
                  : null
              }
              handleDateChange={(newDate) => {
                const selectedDate = newDate?.format("YYYY-MM-DD");
                const currentTime = moment().format("HH:mm:ss");
                setFieldValue(
                  "tgl_pengambilan_keputusan_tahap_dua",
                  selectedDate + " " + currentTime
                );
              }}
              label="Tanggal Pengambilan Keputusan ST Dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputText
              label={`Catatan Tanggal Pengambilan Keputusan ST Dua`}
              values={values?.note_tgl_pengambilan_keputusan_tahap_dua}
              onChange={handleChange}
              onBlur={handleBlur}
              name="note_tgl_pengambilan_keputusan_tahap_dua"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputDate
              disabled={
                !values?.tgl_pengambilan_keputusan_tahap_dua ||
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
                disabled={!add && data?.tgl_apl_form_or_request ? true : false}
                selectedDate={
                  values?.tgl_apl_form_or_request
                    ? moment(values.tgl_apl_form_or_request)
                    : null
                }
                handleDateChange={(newDate) => {
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
                  const selectedDate = newDate?.format("YYYY-MM-DD");
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
                  const selectedDate = newDate?.format("YYYY-MM-DD");
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
                  const selectedDate = newDate?.format("YYYY-MM-DD");
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
                label="Tanggal Pengiriman Audit Plan"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputText
                label={`Catatan Tanggal Pengiriman Audit Plan`}
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
                    ? true
                    : false
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
                  const selectedDate = newDate?.format("YYYY-MM-DD");
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
                  (!add && !!data?.tgl_proses_review_tahap_dua)
                }
                selectedDate={
                  values?.tgl_proses_review_tahap_dua
                    ? moment(values.tgl_proses_review_tahap_dua)
                    : null
                }
                handleDateChange={(newDate) => {
                  const selectedDate = newDate?.format("YYYY-MM-DD");
                  const currentTime = moment().format("HH:mm:ss");
                  setFieldValue(
                    "tgl_proses_review_tahap_dua",
                    selectedDate + " " + currentTime
                  );
                }}
                label="Tanggal Proses Review"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputText
                label={`Catatan Tanggal Proses Review`}
                values={values?.note_tgl_proses_review_tahap_dua}
                onChange={handleChange}
                onBlur={handleBlur}
                name="note_tgl_proses_review_tahap_dua"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputDate
                disabled={
                  !values?.tgl_proses_review_tahap_dua ||
                  (!add && !!data?.tgl_pengambilan_keputusan_tahap_dua)
                }
                selectedDate={
                  values?.tgl_pengambilan_keputusan_tahap_dua
                    ? moment(values.tgl_pengambilan_keputusan_tahap_dua)
                    : null
                }
                handleDateChange={(newDate) => {
                  const selectedDate = newDate?.format("YYYY-MM-DD");
                  const currentTime = moment().format("HH:mm:ss");
                  setFieldValue(
                    "tgl_pengambilan_keputusan_tahap_dua",
                    selectedDate + " " + currentTime
                  );
                }}
                label="Tanggal Pengambilan Keputusan"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputText
                label={`Catatan Tanggal Pengambilan Keputusan`}
                values={values?.note_tgl_pengambilan_keputusan_tahap_dua}
                onChange={handleChange}
                onBlur={handleBlur}
                name="note_tgl_pengambilan_keputusan_tahap_dua"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputDate
                disabled={
                  !values?.tgl_pengambilan_keputusan_tahap_dua ||
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
                    ? true
                    : false
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
        )
      )}
    </>
  );
};

export default FormInputISPO;
