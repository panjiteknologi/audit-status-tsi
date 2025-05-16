import { AllProject } from "@/types/Project";

export function getFieldAuditISPO(field: AllProject) {
  return [
    {
      tahapan: "Tanggal Aplication Form or Request",
      tanggalStatus: field?.tgl_aplication_form ?? "",
      catatan: field?.note_aplication_form ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Review Penugasan ST Satu",
      tanggalStatus: field?.tgl_review_penugasan_st_satu ?? "",
      catatan: field?.note_tgl_review_penugasan_st_satu ?? "",
      leadTime:
        field?.lead_time_tgl_aplication_form_to_tgl_review_penugasan_st_satu ??
        "",
    },
    {
      tahapan: "Tanggal Kontrak",
      tanggalStatus: field?.tgl_kontrak ?? "",
      catatan: field?.note_tgl_kontrak ?? "",
      leadTime: field?.lead_time_tgl_kontrak ?? "",
    },
    {
      tahapan: "Tanggal Pengajuan Notifikasi ST Satu",
      tanggalStatus: field?.tgl_pengiriman_notif_st_satu ?? "",
      catatan: field?.note_tgl_pengiriman_notif_st_satu ?? "",
      leadTime:
        field?.lead_time_tgl_review_penugasan_st_satu_to_tgl_pengiriman_notif_st_satu ??
        "",
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Satu",
      tanggalStatus: field?.tgl_persetujuan_notif_st_satu ?? "",
      catatan: field?.note_tgl_persetujuan_notif_st_satu ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Satu",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_satu ?? "",
      catatan: field?.note_tgl_pengiriman_audit_plan_st_satu ?? "",
      leadTime:
        field?.lead_time_tgl_pengiriman_notif_st_satu_to_tgl_pengiriman_audit_plan_st_satu ??
        "",
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Satu",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_satu ?? "",
      catatan: field?.note_tgl_pelaksanaan_audit_st_satu ?? "",
      leadTime:
        field?.lead_time_tgl_pengiriman_notif_st_satu_to_tgl_pengiriman_audit_plan_st_satu ??
        "",
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Satu",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_satu ?? "",
      catatan: field?.note_tgl_penyelesaian_capa_st_satu ?? "",
      leadTime:
        field?.lead_time_tgl_pelaksanaan_audit_st_satu_to_tgl_penyelesaian_capa_st_satu ??
        "",
    },
    {
      tahapan: "Tanggal Proses Review ST Satu",
      tanggalStatus: field?.tgl_proses_review_tahap_satu ?? "",
      catatan: field?.note_tgl_proses_review_tahap_satu ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengambilan Keputusan ST Satu",
      tanggalStatus: field?.tgl_pengambilan_keputusan_tahap_satu ?? "",
      catatan: field?.note_tgl_pengambilan_keputusan_tahap_satu ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Review Penugasan ST Dua",
      tanggalStatus: field?.tgl_review_penugasan_st_dua ?? "",
      catatan: field?.note_tgl_review_penugasan_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengajuan Notifikasi ST Dua",
      tanggalStatus: field?.tgl_pengiriman_notif_st_dua ?? "",
      catatan: field?.note_tgl_pengiriman_notif_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Dua",
      tanggalStatus: field?.tgl_persetujuan_notif_st_dua ?? "",
      catatan: field?.note_tgl_persetujuan_notif_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Dua",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_dua ?? "",
      catatan: field?.note_tgl_pengiriman_audit_plan_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Dua",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_dua ?? "",
      catatan: field?.note_tgl_pelaksanaan_audit_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Dua",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_dua ?? "",
      catatan: field?.note_tgl_penyelesaian_capa_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Proses Review ST Dua",
      tanggalStatus: field?.tgl_proses_review_tahap_dua ?? "",
      catatan: field?.note_tgl_proses_review_tahap_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengambilan Keputusan ST Dua",
      tanggalStatus: field?.tgl_pengambilan_keputusan_tahap_dua ?? "",
      catatan: field?.note_tgl_pengambilan_keputusan_tahap_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Draft Sertifikat",
      tanggalStatus: field?.tgl_pengiriman_draft_sertifikat ?? "",
      catatan: field?.note_tgl_pengiriman_draft_sertifikat ?? "",
      leadTime:
        field?.lead_time_tgl_pengajuan_to_tgl_pengiriman_draft_sertifikat ?? "",
    },
    {
      tahapan: "Tanggal Persetujuan Draft Sertifikat",
      tanggalStatus: field?.tgl_persetujuan_draft_sertifikat ?? "",
      catatan: field?.note_tgl_persetujuan_draft_sertifikat ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Kirim Sertifikat",
      tanggalStatus: field?.tgl_kirim_sertifikat ?? "",
      catatan: field?.note_tgl_kirim_sertifikat ?? "",
      leadTime: "",
    },
  ];
}

export function getFieldAuditISO(field: AllProject) {
  return [
    {
      tahapan: "Tanggal Aplication Form or Request",
      tanggalStatus: field?.tgl_aplication_form ?? "",
      catatan: field?.note_tgl_aplication_form ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Review Penugasan ST Satu",
      tanggalStatus: field?.tgl_review_penugasan_st_satu ?? "",
      catatan: field?.note_tgl_review_penugasan_st_satu ?? "",
      leadTime:
        field?.lead_time_tgl_aplication_form_to_tgl_review_penugasan_st_satu ??
        "",
    },
    {
      tahapan: "Tanggal Kontrak",
      tanggalStatus: field?.tgl_kontrak ?? "",
      catatan: field?.note_tgl_kontrak ?? "",
      leadTime: field?.lead_time_tgl_kontrak ?? "",
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi ST Satu",
      tanggalStatus: field?.tgl_pengiriman_notif_st_satu ?? "",
      catatan: field?.note_tgl_pengiriman_notif_st_satu ?? "",
      leadTime:
        field?.lead_time_tgl_review_penugasan_st_satu_to_tgl_pengiriman_notif_st_satu ??
        "",
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Satu",
      tanggalStatus: field?.tgl_persetujuan_notif_st_satu ?? "",
      catatan: field?.note_tgl_persetujuan_notif_st_satu ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Satu",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_satu ?? "",
      catatan: field?.note_tgl_pengiriman_audit_plan_st_satu ?? "",
      leadTime: field?.lead_time_tgl_pengiriman_audit_plan_st_satu ?? "",
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Satu",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_satu ?? "",
      catatan: field?.note_tgl_pelaksanaan_audit_st_satu ?? "",
      leadTime:
        field?.lead_time_tgl_pengiriman_audit_plan_st_satu_to_tgl_pelaksanaan_audit_st_satu ??
        "",
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Satu",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_satu ?? "",
      catatan: field?.note_tgl_penyelesaian_capa_st_satu ?? "",
      leadTime:
        field?.lead_time_tgl_pelaksanaan_audit_st_satu_to_tgl_penyelesaian_capa_st_satu ??
        "",
    },
    {
      tahapan: "Tanggal Review Penugasan ST Dua",
      tanggalStatus: field?.tgl_review_penugasan_st_dua ?? "",
      catatan: field?.note_tgl_review_penugasan_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi ST Dua",
      tanggalStatus: field?.tgl_pengiriman_notif_st_dua ?? "",
      catatan: field?.note_tgl_pengiriman_notif_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Dua",
      tanggalStatus: field?.tgl_persetujuan_notif_st_dua ?? "",
      catatan: field?.note_tgl_persetujuan_notif_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Dua",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_dua ?? "",
      catatan: field?.note_tgl_pengiriman_audit_plan_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Dua",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_dua ?? "",
      catatan: field?.note_tgl_pelaksanaan_audit_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Dua",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_dua ?? "",
      catatan: field?.note_tgl_penyelesaian_capa_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Draft Sertifikat",
      tanggalStatus: field?.tgl_pengiriman_draft_sertifikat ?? "",
      catatan: field?.note_tgl_pengiriman_draft_sertifikat ?? "",
      leadTime:
        field?.lead_time_tgl_pengajuan_to_tgl_pengiriman_draft_sertifikat ?? "",
    },
    {
      tahapan: "Tanggal Persetujuan Draft Sertifikat",
      tanggalStatus: field?.tgl_persetujuan_draft_sertifikat ?? "",
      catatan: field?.note_tgl_persetujuan_draft_sertifikat ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengajuan ke " + field?.accreditation?.[0],
      tanggalStatus: field?.tgl_pengajuan_ke_kan ?? "",
      catatan: field?.note_tgl_pengajuan_ke_kan ?? "",
      leadTime: field?.lead_time_tgl_pengajuan_ke_kan ?? "",
    },
    {
      tahapan: "Tanggal Persetujuan ke " + field?.accreditation?.[0],
      tanggalStatus: field?.tgl_persetujuan_kan ?? "",
      catatan: field?.note_tgl_persetujuan_kan ?? "",
      leadTime: field?.lead_time_tgl_persetujuan_kan ?? "",
    },
    {
      tahapan: "Tanggal Kirim Sertifikat",
      tanggalStatus: field?.tgl_kirim_sertifikat ?? "",
      catatan: field?.note_tgl_kirim_sertifikat ?? "",
      leadTime: "",
    },
  ];
}

export function getFieldISPO(field: AllProject) {
  return [
    {
      tahapan: "Tanggal Aplication Form or Request",
      tanggalStatus: field?.tgl_aplication_form ?? "",
      catatan: field?.note_tgl_aplication_form ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Review Penugasan",
      tanggalStatus: field?.tgl_review_penugasan_st_dua ?? "",
      catatan: field?.note_tgl_review_penugasan_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi",
      tanggalStatus: field?.tgl_pengiriman_notif_st_dua ?? "",
      catatan: field?.note_tgl_pengiriman_notif_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi",
      tanggalStatus: field?.tgl_persetujuan_notif_st_dua ?? "",
      catatan: field?.note_tgl_persetujuan_notif_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_dua ?? "",
      catatan: field?.note_tgl_pengiriman_audit_plan_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_dua ?? "",
      catatan: field?.note_tgl_pelaksanaan_audit_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_dua ?? "",
      catatan: field?.note_tgl_penyelesaian_capa_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Proses Review",
      tanggalStatus: field?.tgl_proses_review_tahap_dua ?? "",
      catatan: field?.note_tgl_proses_review_tahap_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengambilan Keputusan",
      tanggalStatus: field?.tgl_pengambilan_keputusan_tahap_dua ?? "",
      catatan: field?.note_tgl_pengambilan_keputusan_tahap_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Draft Sertifikat",
      tanggalStatus: field?.tgl_pengiriman_draft_sertifikat ?? "",
      catatan: field?.note_tgl_pengiriman_draft_sertifikat ?? "",
      leadTime:
        field?.lead_time_tgl_pengajuan_to_tgl_pengiriman_draft_sertifikat ?? "",
    },
    {
      tahapan: "Tanggal Persetujuan Draft Sertifikat",
      tanggalStatus: field?.tgl_persetujuan_draft_sertifikat ?? "",
      catatan: field?.note_tgl_persetujuan_draft_sertifikat ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Kirim Sertifikat",
      tanggalStatus: field?.tgl_kirim_sertifikat ?? "",
      catatan: field?.note_tgl_kirim_sertifikat ?? "",
      leadTime: "",
    },
  ];
}

export function getFieldISO(field: AllProject) {
  return [
    {
      tahapan: "Tanggal Aplication Form or Request",
      tanggalStatus: field?.tgl_aplication_form ?? "",
      catatan: field?.note_aplication_form ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Review Penugasan",
      tanggalStatus: field?.tgl_review_penugasan_st_dua ?? "",
      catatan: field?.note_tgl_review_penugasan_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi",
      tanggalStatus: field?.tgl_pengiriman_notif_st_dua ?? "",
      catatan: field?.note_tgl_pengiriman_notif_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi",
      tanggalStatus: field?.tgl_persetujuan_notif_st_dua ?? "",
      catatan: field?.note_tgl_persetujuan_notif_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_dua ?? "",
      catatan: field?.note_tgl_pengiriman_audit_plan_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_dua ?? "",
      catatan: field?.note_tgl_pelaksanaan_audit_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_dua ?? "",
      catatan: field?.note_tgl_penyelesaian_capa_st_dua ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengiriman Draft Sertifikat",
      tanggalStatus: field?.tgl_pengiriman_draft_sertifikat ?? "",
      catatan: field?.note_tgl_pengiriman_draft_sertifikat ?? "",
      leadTime:
        field?.lead_time_tgl_pengajuan_to_tgl_pengiriman_draft_sertifikat ?? "",
    },
    {
      tahapan: "Tanggal Persetujuan Draft Sertifikat",
      tanggalStatus: field?.tgl_persetujuan_draft_sertifikat ?? "",
      catatan: field?.note_tgl_persetujuan_draft_sertifikat ?? "",
      leadTime: "",
    },
    {
      tahapan: "Tanggal Pengajuan ke " + field?.accreditation?.[0],
      tanggalStatus: field?.tgl_pengajuan_ke_kan ?? "",
      catatan: field?.note_tgl_pengajuan_ke_kan ?? "",
      leadTime: field?.lead_time_tgl_pengajuan_ke_kan ?? "",
    },
    {
      tahapan: "Tanggal Persetujuan ke " + field?.accreditation?.[0],
      tanggalStatus: field?.tgl_persetujuan_kan ?? "",
      catatan: field?.note_tgl_persetujuan_kan ?? "",
      leadTime: field?.lead_time_tgl_persetujuan_kan ?? "",
    },
    {
      tahapan: "Tanggal Kirim Sertifikat",
      tanggalStatus: field?.tgl_kirim_sertifikat ?? "",
      catatan: field?.note_tgl_kirim_sertifikat ?? "",
      leadTime: "",
    },
  ];
}
