import { JSX } from "react/jsx-runtime";

export type Standar = {
  [x: string]: any;
  iso_standards: Standar[] | undefined;
  map(
    arg0: (standard: any, idx: any) => JSX.Element
  ): import("react").ReactNode;
  listDate: string[];
};

export interface AllAudit {
  tanggalStatus: string;
  tahapan: string;
  catatan: string;
  leadTime: string;
}

export interface AllProject {
  catatan: string;
  tanggalStatus: string;
  iso_standards: Standar[] | undefined;
  leadTime: string;
  value: number;
  customer: string;
  sales_person: string;
  accreditation: string[];
  lead_time_finish: string;
  lead_time_project_finish: string;
  tgl_apl_form_or_request: string;
  note_tgl_apl_form_or_request: string;
  lead_time_tgl_apl_form_or_request: string;
  lead_time_tgl_review_penugasan_st_satu: string;
  lead_time_tgl_pengiriman_notif_st_satu: string;
  lead_time_tgl_persetujuan_notif_st_satu: string;
  lead_time_tgl_pelaksanaan_audit_st_satu: string;
  lead_time_tgl_penyelesaian_capa_st_satu: string;
  lead_time_tgl_review_penugasan_st_dua: string;
  lead_time_tgl_pengiriman_notif_st_dua: string;
  lead_time_tgl_persetujuan_notif_st_dua: string;
  lead_time_tgl_pengiriman_audit_plan_st_dua: string;
  lead_time_tgl_pelaksanaan_audit_st_dua: string;
  lead_time_tgl_penyelesaian_capa_st_dua: string;
  lead_time_tgl_pengiriman_draft_sertifikat: string;
  lead_time_tgl_persetujuan_draft_sertifikat: string;
  lead_time_tgl_kirim_sertifikat: string;
  tahapan: string | number | any;
  standar: Standar[];
  aplication_form: string;
  note_aplication_form: string;
  tgl_review_penugasan_st_satu: string;
  note_tgl_review_penugasan_st_satu: string;
  lead_time_aplication_form_to_review_penugasan: string;
  tgl_kontrak: string;
  note_tgl_kontrak: string;
  lead_time_tgl_kontrak: string;
  tgl_pengiriman_notif_st_satu: string;
  note_tgl_pengiriman_notif_st_satu: string;
  lead_time_review_penugasan_to_pengiriman_notifikasi_st_satu: string;
  tgl_persetujuan_notif_st_satu: string;
  note_tgl_persetujuan_notif_st_satu: string;
  tgl_pengiriman_audit_plan_st_satu: string;
  note_tgl_pengiriman_audit_plan_st_satu: string;
  lead_time_pengiriman_notifikasi_st_satu_to_pengiriman_audit_plan_st_satu: string;
  tgl_pelaksanaan_audit_st_satu: string;
  note_tgl_pelaksanaan_audit_st_satu: string;
  lead_time_pengiriman_audit_plan_st_satu_to_pelaksanaan_audit_st_satu: string;
  tgl_penyelesaian_capa_st_satu: string;
  note_tgl_penyelesaian_capa_st_satu: string;
  lead_time_pelaksanaan_audit_st_satu_to_penyelesaian_capa_st_satu: string;
  tgl_proses_review_tahap_satu: string;
  note_tgl_proses_review_tahap_satu: string;
  tgl_pengambilan_keputusan_tahap_satu: string;
  note_tgl_pengambilan_keputusan_tahap_satu: string;
  tgl_review_penugasan_st_dua: string;
  note_tgl_review_penugasan_st_dua: string;
  tgl_pengiriman_notif_st_dua: string;
  note_tgl_pengiriman_notif_st_dua: string;
  tgl_persetujuan_notif_st_dua: string;
  note_tgl_persetujuan_notif_st_dua: string;
  tgl_pengiriman_audit_plan_st_dua: string;
  note_tgl_pengiriman_audit_plan_st_dua: string;
  tgl_pelaksanaan_audit_st_dua: string;
  note_tgl_pelaksanaan_audit_st_dua: string;
  tgl_penyelesaian_capa_st_dua: string;
  note_tgl_penyelesaian_capa_st_dua: string;
  tgl_proses_review_tahap_dua: string;
  note_tgl_proses_review_tahap_dua: string;
  tgl_pengambilan_keputusan_tahap_dua: string;
  note_tgl_pengambilan_keputusan_tahap_dua: string;
  tgl_pengiriman_draft_sertifikat: string;
  note_tgl_pengiriman_draft_sertifikat: string;
  lead_time_tanggal_pengajuan_to_pengiriman_draft_sertifikat: string;
  tgl_persetujuan_draft_sertifikat: string;
  note_tgl_persetujuan_draft_sertifikat: string;
  tgl_kirim_sertifikat: string;
  note_tgl_kirim_sertifikat: string;
  lead_time_tgl_pengiriman_audit_plan_st_satu: string;
  nama_akreditasi: string;
  tgl_pengajuan_ke_kan: string;
  note_tgl_pengajuan_ke_kan: string;
  lead_time_tgl_pengajuan_ke_kan: string;
  tgl_persetujuan_kan: string;
  note_tgl_persetujuan_kan: string;
  lead_time_tgl_persetujuan_kan: string;
  lead_time_project_finish_for_chart: number | string;
  lead_time_projec_audit_sertifikat: string;
}

export interface MenuProject {
  status_pembayaran_id: string | number | readonly string[] | undefined;
  nama_status_pembayaran: string;
  id_standar: string | number | readonly string[] | undefined;
  nama_standar: string;
  id_tahapan: string | number | readonly string[] | undefined;
  nama_tahapan: string;
  id_akreditasi: number;
  nama_akreditasi: string;
  status: number;
  id: string;
  name: string;
}

export interface AllNotification {
  id_notifikasi: number;
  id_project: number;
  field_update: null;
  message_notif: string;
  role_penerima: string;
  status_notif: number;
  create_date: string;
}
