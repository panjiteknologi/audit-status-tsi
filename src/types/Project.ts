export type Standar = {
  id_project: number;
  id_standar: number;
  nama_standar: string;
  project_detail_standar_id: number;
  status: number;
};

export interface AllProject {
  customer_id?: number | string;
  status_pembayaran_id?: string | number | readonly string[] | undefined;
  nama_status_pembayaran?: string | any;
  tanggalStatus?: any;
  catatan?: string | any;
  id_project?: number;
  nama_perusahaan?: string | any;
  nama_sales_or_crr?: string | any;
  standar?: Standar[];
  akreditasi?: number;
  tahapan?: string | any;
  tgl_kontrak?: string | any;
  note_tgl_kontrak?: string | any;
  tgl_apl_form_or_request?: string | any;
  note_tgl_apl_form_or_request?: string | any;
  tgl_review_penugasan_st_satu?: string | any;
  note_tgl_review_penugasan_st_satu?: string | undefined;
  tgl_review_penugasan_st_dua?: string;
  note_tgl_review_penugasan_st_dua?: string;
  tgl_pengiriman_notif_st_satu?: string;
  note_tgl_pengiriman_notif_st_satu?: string | undefined;
  tgl_pengiriman_notif_st_dua?: string;
  note_tgl_pengiriman_notif_st_dua?: string | undefined;
  tgl_persetujuan_notif_st_satu?: string;
  note_tgl_persetujuan_notif_st_satu?: string | undefined;
  tgl_persetujuan_notif_st_dua?: string;
  note_tgl_persetujuan_notif_st_dua?: string | undefined;
  tgl_pengiriman_audit_plan_st_satu?: string;
  note_tgl_pengiriman_audit_plan_st_satu?: string | undefined;
  tgl_pengiriman_audit_plan_st_dua?: string;
  note_tgl_pengiriman_audit_plan_st_dua?: string | undefined;
  tgl_pelaksanaan_audit_st_satu?: string;
  note_tgl_pelaksanaan_audit_st_satu?: string | undefined;
  tgl_pelaksanaan_audit_st_dua?: string;
  note_tgl_pelaksanaan_audit_st_dua?: string | undefined;
  tgl_penyelesaian_capa_st_satu?: string;
  note_tgl_penyelesaian_capa_st_satu?: string | undefined;
  tgl_proses_review_tahap_satu?: string; // for ISPO
  note_tgl_proses_review_tahap_satu?: string | undefined; // for ISPO
  tgl_pengambilan_keputusan_tahap_satu?: string; // for ISPO
  note_tgl_pengambilan_keputusan_tahap_satu?: string | undefined; // for ISPO
  tgl_penyelesaian_capa_st_dua?: string;
  note_tgl_penyelesaian_capa_st_dua?: string | undefined;
  tgl_proses_review_tahap_dua?: string; // for ISPO
  note_tgl_proses_review_tahap_dua?: string | undefined; // for ISPO
  tgl_pengambilan_keputusan_tahap_dua?: string; // for ISPO
  note_tgl_pengambilan_keputusan_tahap_dua?: string | undefined; // for ISPO
  tgl_pengiriman_draft_sertifikat?: string;
  note_tgl_pengiriman_draft_sertifikat?: string | undefined;
  tgl_persetujuan_draft_sertifikat?: string;
  note_tgl_persetujuan_draft_sertifikat?: string | undefined;
  tgl_pengajuan_ke_kan?: string;
  note_tgl_pengajuan_ke_kan?: string | undefined;
  tgl_persetujuan_kan?: string;
  note_tgl_persetujuan_kan?: string | undefined;
  status_pembayaran?: number | undefined;
  note_status_pembayaran?: string | undefined;
  tgl_kirim_sertifikat?: string;
  note_tgl_kirim_sertifikat?: string | undefined;
  lead_time_tgl_apl_form_or_request?: string | undefined;
  lead_time_tgl_kontrak?: string | undefined;
  lead_time_tgl_review_penugasan_st_satu?: string | undefined;
  lead_time_tgl_pengiriman_notif_st_satu?: string | undefined;
  lead_time_tgl_persetujuan_notif_st_satu?: string | undefined;
  lead_time_tgl_pengiriman_audit_plan_st_satu?: string | undefined;
  lead_time_tgl_pelaksanaan_audit_st_satu?: string | undefined;
  lead_time_tgl_penyelesaian_capa_st_satu?: string | undefined;
  lead_time_tgl_proses_review_tahap_satu?: string | undefined;
  lead_time_tgl_pengambilan_keputusan_tahap_satu?: string | undefined;
  lead_time_project_finish?: string | undefined;
  lead_time_project_finish_for_chart?: number;
  lead_time_tgl_kirim_sertifikat?: string | undefined;
  lead_time_tgl_pelaksanaan_audit_st_dua?: string | undefined;
  lead_time_tgl_proses_review_tahap_dua?: string | undefined;
  lead_time_tgl_pengambilan_keputusan_tahap_dua?: string | undefined;
  lead_time_tgl_pengajuan_ke_kan?: string | undefined;
  lead_time_tgl_pengiriman_audit_plan_st_dua?: string | undefined;
  lead_time_tgl_pengiriman_draft_sertifikat?: string | undefined;
  lead_time_tgl_pengiriman_notif_st_dua?: string | undefined;
  lead_time_tgl_penyelesaian_capa_st_dua?: string | undefined;
  lead_time_tgl_persetujuan_draft_sertifikat?: string | undefined;
  lead_time_tgl_persetujuan_kan?: string | undefined;
  lead_time_tgl_persetujuan_notif_st_dua?: string | undefined;
  lead_time_tgl_review_penugasan_st_dua?: string | undefined;
  status_data?: number;
  create_date?: string;
  cycle_date?: string;
  create_user?: string | undefined;
  cycle_user?: number;
  nama_akreditasi?: string;
  nama_tahapan?: string;
  leadTime?: string;
  sla?: string;
  total?: number;
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
