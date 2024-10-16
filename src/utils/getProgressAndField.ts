import { AllProject } from "@/types/Project";

function getFieldAuditISPO(field: AllProject) {
  return [
    {
      tahapan: "Tanggal Aplication Form or Request",
      tanggalStatus: field?.tgl_apl_form_or_request,
      catatan: field?.note_tgl_apl_form_or_request,
      leadTime: field?.lead_time_tgl_apl_form_or_request,
    },
    {
      tahapan: "Tanggal Review Penugasan ST Satu",
      tanggalStatus: field?.tgl_review_penugasan_st_satu,
      catatan: field?.note_tgl_review_penugasan_st_satu,
      leadTime: field?.lead_time_tgl_review_penugasan_st_satu,
    },
    {
      tahapan: "Tanggal Kontrak",
      tanggalStatus: field?.tgl_kontrak,
      catatan: field?.note_tgl_kontrak,
      leadTime: field?.lead_time_tgl_kontrak,
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi ST Satu",
      tanggalStatus: field?.tgl_pengiriman_notif_st_satu,
      catatan: field?.note_tgl_pengiriman_notif_st_satu,
      leadTime: field?.lead_time_tgl_pengiriman_notif_st_satu,
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Satu",
      tanggalStatus: field?.tgl_persetujuan_notif_st_satu,
      catatan: field?.note_tgl_persetujuan_notif_st_satu,
      leadTime: field?.lead_time_tgl_persetujuan_notif_st_satu,
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Satu",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_satu,
      catatan: field?.note_tgl_pengiriman_audit_plan_st_satu,
      leadTime: field?.lead_time_tgl_pengiriman_audit_plan_st_satu,
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Satu",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_satu,
      catatan: field?.note_tgl_pelaksanaan_audit_st_satu,
      leadTime: field?.lead_time_tgl_pelaksanaan_audit_st_satu,
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Satu",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_satu,
      catatan: field?.note_tgl_penyelesaian_capa_st_satu,
      leadTime: field?.lead_time_tgl_penyelesaian_capa_st_satu,
    },
    {
      tahapan: "Tanggal Proses Review ST Satu",
      tanggalStatus: field?.tgl_proses_review_tahap_satu,
      catatan: field?.note_tgl_proses_review_tahap_satu,
      leadTime: field?.lead_time_tgl_proses_review_tahap_satu,
    },
    {
      tahapan: "Tanggal Pengambilan Keputusan ST Satu",
      tanggalStatus: field?.tgl_pengambilan_keputusan_tahap_satu,
      catatan: field?.note_tgl_pengambilan_keputusan_tahap_satu,
      leadTime: field?.lead_time_tgl_pengambilan_keputusan_tahap_satu,
    },
    {
      tahapan: "Tanggal Review Penugasan ST Dua",
      tanggalStatus: field?.tgl_review_penugasan_st_dua,
      catatan: field?.note_tgl_review_penugasan_st_dua,
      leadTime: field?.lead_time_tgl_review_penugasan_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi ST Dua",
      tanggalStatus: field?.tgl_pengiriman_notif_st_dua,
      catatan: field?.note_tgl_pengiriman_notif_st_dua,
      leadTime: field?.lead_time_tgl_pengiriman_notif_st_dua,
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Dua",
      tanggalStatus: field?.tgl_persetujuan_notif_st_dua,
      catatan: field?.note_tgl_persetujuan_notif_st_dua,
      leadTime: field?.lead_time_tgl_persetujuan_notif_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Dua",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_dua,
      catatan: field?.note_tgl_pengiriman_audit_plan_st_dua,
      leadTime: field?.lead_time_tgl_pengiriman_audit_plan_st_dua,
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Dua",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_dua,
      catatan: field?.note_tgl_pelaksanaan_audit_st_dua,
      leadTime: field?.lead_time_tgl_pelaksanaan_audit_st_dua,
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Dua",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_dua,
      catatan: field?.note_tgl_penyelesaian_capa_st_dua,
      leadTime: field?.lead_time_tgl_penyelesaian_capa_st_dua,
    },
    {
      tahapan: "Tanggal Proses Review ST Dua",
      tanggalStatus: field?.tgl_proses_review_tahap_dua,
      catatan: field?.note_tgl_proses_review_tahap_dua,
      leadTime: field?.lead_time_tgl_proses_review_tahap_dua,
    },
    {
      tahapan: "Tanggal Pengambilan Keputusan ST Dua",
      tanggalStatus: field?.tgl_pengambilan_keputusan_tahap_dua,
      catatan: field?.note_tgl_pengambilan_keputusan_tahap_dua,
      leadTime: field?.lead_time_tgl_pengambilan_keputusan_tahap_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Draft Sertifikat",
      tanggalStatus: field?.tgl_pengiriman_draft_sertifikat,
      catatan: field?.note_tgl_pengiriman_draft_sertifikat,
      leadTime: field?.lead_time_tgl_pengiriman_draft_sertifikat,
    },
    {
      tahapan: "Tanggal Persetujuan Draft Sertifikat",
      tanggalStatus: field?.tgl_persetujuan_draft_sertifikat,
      catatan: field?.note_tgl_persetujuan_draft_sertifikat,
      leadTime: field?.lead_time_tgl_persetujuan_draft_sertifikat,
    },
    {
      tahapan: "Tanggal Kirim Sertifikat",
      tanggalStatus: field?.tgl_kirim_sertifikat,
      catatan: field?.note_tgl_kirim_sertifikat,
      leadTime: field?.lead_time_tgl_kirim_sertifikat,
    },
  ];
}

function getFieldAuditISO(field: AllProject) {
  return [
    {
      tahapan: "Tanggal Aplication Form or Request",
      tanggalStatus: field?.tgl_apl_form_or_request,
      catatan: field?.note_tgl_apl_form_or_request,
      leadTime: field?.lead_time_tgl_apl_form_or_request,
    },
    {
      tahapan: "Tanggal Review Penugasan ST Satu",
      tanggalStatus: field?.tgl_review_penugasan_st_satu,
      catatan: field?.note_tgl_review_penugasan_st_satu,
      leadTime: field?.lead_time_tgl_review_penugasan_st_satu,
    },
    {
      tahapan: "Tanggal Kontrak",
      tanggalStatus: field?.tgl_kontrak,
      catatan: field?.note_tgl_kontrak,
      leadTime: field?.lead_time_tgl_kontrak,
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi ST Satu",
      tanggalStatus: field?.tgl_pengiriman_notif_st_satu,
      catatan: field?.note_tgl_pengiriman_notif_st_satu,
      leadTime: field?.lead_time_tgl_pengiriman_notif_st_satu,
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Satu",
      tanggalStatus: field?.tgl_persetujuan_notif_st_satu,
      catatan: field?.note_tgl_persetujuan_notif_st_satu,
      leadTime: field?.lead_time_tgl_persetujuan_notif_st_satu,
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Satu",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_satu,
      catatan: field?.note_tgl_pengiriman_audit_plan_st_satu,
      leadTime: field?.lead_time_tgl_pengiriman_audit_plan_st_satu,
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Satu",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_satu,
      catatan: field?.note_tgl_pelaksanaan_audit_st_satu,
      leadTime: field?.lead_time_tgl_pelaksanaan_audit_st_satu,
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Satu",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_satu,
      catatan: field?.note_tgl_penyelesaian_capa_st_satu,
      leadTime: field?.lead_time_tgl_penyelesaian_capa_st_satu,
    },
    {
      tahapan: "Tanggal Review Penugasan ST Dua",
      tanggalStatus: field?.tgl_review_penugasan_st_dua,
      catatan: field?.note_tgl_review_penugasan_st_dua,
      leadTime: field?.lead_time_tgl_review_penugasan_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi ST Dua",
      tanggalStatus: field?.tgl_pengiriman_notif_st_dua,
      catatan: field?.note_tgl_pengiriman_notif_st_dua,
      leadTime: field?.lead_time_tgl_pengiriman_notif_st_dua,
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi ST Dua",
      tanggalStatus: field?.tgl_persetujuan_notif_st_dua,
      catatan: field?.note_tgl_persetujuan_notif_st_dua,
      leadTime: field?.lead_time_tgl_persetujuan_notif_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan ST Dua",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_dua,
      catatan: field?.note_tgl_pengiriman_audit_plan_st_dua,
      leadTime: field?.lead_time_tgl_pengiriman_audit_plan_st_dua,
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit ST Dua",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_dua,
      catatan: field?.note_tgl_pelaksanaan_audit_st_dua,
      leadTime: field?.lead_time_tgl_pelaksanaan_audit_st_dua,
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA ST Dua",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_dua,
      catatan: field?.note_tgl_penyelesaian_capa_st_dua,
      leadTime: field?.lead_time_tgl_penyelesaian_capa_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Draft Sertifikat",
      tanggalStatus: field?.tgl_pengiriman_draft_sertifikat,
      catatan: field?.note_tgl_pengiriman_draft_sertifikat,
      leadTime: field?.lead_time_tgl_pengiriman_draft_sertifikat,
    },
    {
      tahapan: "Tanggal Persetujuan Draft Sertifikat",
      tanggalStatus: field?.tgl_persetujuan_draft_sertifikat,
      catatan: field?.note_tgl_persetujuan_draft_sertifikat,
      leadTime: field?.lead_time_tgl_persetujuan_draft_sertifikat,
    },
    {
      tahapan: "Tanggal Pengajuan ke " + field?.nama_akreditasi,
      tanggalStatus: field?.tgl_pengajuan_ke_kan,
      catatan: field?.note_tgl_pengajuan_ke_kan,
      leadTime: field?.lead_time_tgl_pengajuan_ke_kan,
    },
    {
      tahapan: "Tanggal Persetujuan ke " + field?.nama_akreditasi,
      tanggalStatus: field?.tgl_persetujuan_kan,
      catatan: field?.note_tgl_persetujuan_kan,
      leadTime: field?.lead_time_tgl_persetujuan_kan,
    },
    {
      tahapan: "Tanggal Kirim Sertifikat",
      tanggalStatus: field?.tgl_kirim_sertifikat,
      catatan: field?.note_tgl_kirim_sertifikat,
      leadTime: field?.lead_time_tgl_kirim_sertifikat,
    },
  ];
}

function getFieldISPO(field: AllProject) {
  return [
    {
      tahapan: "Tanggal Aplication Form or Request",
      tanggalStatus: field?.tgl_apl_form_or_request,
      catatan: field?.note_tgl_apl_form_or_request,
      leadTime: field?.lead_time_tgl_apl_form_or_request,
    },
    {
      tahapan: "Tanggal Review Penugasan",
      tanggalStatus: field?.tgl_review_penugasan_st_dua,
      catatan: field?.note_tgl_review_penugasan_st_dua,
      leadTime: field?.lead_time_tgl_review_penugasan_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi",
      tanggalStatus: field?.tgl_pengiriman_notif_st_dua,
      catatan: field?.note_tgl_pengiriman_notif_st_dua,
      leadTime: field?.lead_time_tgl_pengiriman_notif_st_dua,
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi",
      tanggalStatus: field?.tgl_persetujuan_notif_st_dua,
      catatan: field?.note_tgl_persetujuan_notif_st_dua,
      leadTime: field?.lead_time_tgl_persetujuan_notif_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_dua,
      catatan: field?.note_tgl_pengiriman_audit_plan_st_dua,
      leadTime: field?.lead_time_tgl_pengiriman_audit_plan_st_dua,
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_dua,
      catatan: field?.note_tgl_pelaksanaan_audit_st_dua,
      leadTime: field?.lead_time_tgl_pelaksanaan_audit_st_dua,
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_dua,
      catatan: field?.note_tgl_penyelesaian_capa_st_dua,
      leadTime: field?.lead_time_tgl_penyelesaian_capa_st_dua,
    },
    {
      tahapan: "Tanggal Proses Review",
      tanggalStatus: field?.tgl_proses_review_tahap_dua,
      catatan: field?.note_tgl_proses_review_tahap_dua,
      leadTime: field?.lead_time_tgl_proses_review_tahap_dua,
    },
    {
      tahapan: "Tanggal Pengambilan Keputusan",
      tanggalStatus: field?.tgl_pengambilan_keputusan_tahap_dua,
      catatan: field?.note_tgl_pengambilan_keputusan_tahap_dua,
      leadTime: field?.lead_time_tgl_pengambilan_keputusan_tahap_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Draft Sertifikat",
      tanggalStatus: field?.tgl_pengiriman_draft_sertifikat,
      catatan: field?.note_tgl_pengiriman_draft_sertifikat,
      leadTime: field?.lead_time_tgl_pengiriman_draft_sertifikat,
    },
    {
      tahapan: "Tanggal Persetujuan Draft Sertifikat",
      tanggalStatus: field?.tgl_persetujuan_draft_sertifikat,
      catatan: field?.note_tgl_persetujuan_draft_sertifikat,
      leadTime: field?.lead_time_tgl_persetujuan_draft_sertifikat,
    },
    {
      tahapan: "Tanggal Kirim Sertifikat",
      tanggalStatus: field?.tgl_kirim_sertifikat,
      catatan: field?.note_tgl_kirim_sertifikat,
      leadTime: field?.lead_time_tgl_kirim_sertifikat,
    },
  ];
}

function getFieldISO(field: AllProject) {
  return [
    {
      tahapan: "Tanggal Aplication Form or Request",
      tanggalStatus: field?.tgl_apl_form_or_request,
      catatan: field?.note_tgl_apl_form_or_request,
      leadTime: field?.lead_time_tgl_apl_form_or_request,
    },
    {
      tahapan: "Tanggal Review Penugasan",
      tanggalStatus: field?.tgl_review_penugasan_st_dua,
      catatan: field?.note_tgl_review_penugasan_st_dua,
      leadTime: field?.lead_time_tgl_review_penugasan_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Notifikasi",
      tanggalStatus: field?.tgl_pengiriman_notif_st_dua,
      catatan: field?.note_tgl_pengiriman_notif_st_dua,
      leadTime: field?.lead_time_tgl_pengiriman_notif_st_dua,
    },
    {
      tahapan: "Tanggal Persetujuan Notifikasi",
      tanggalStatus: field?.tgl_persetujuan_notif_st_dua,
      catatan: field?.note_tgl_persetujuan_notif_st_dua,
      leadTime: field?.lead_time_tgl_persetujuan_notif_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Audit Plan",
      tanggalStatus: field?.tgl_pengiriman_audit_plan_st_dua,
      catatan: field?.note_tgl_pengiriman_audit_plan_st_dua,
      leadTime: field?.lead_time_tgl_pengiriman_audit_plan_st_dua,
    },
    {
      tahapan: "Tanggal Pelaksanaan Audit",
      tanggalStatus: field?.tgl_pelaksanaan_audit_st_dua,
      catatan: field?.note_tgl_pelaksanaan_audit_st_dua,
      leadTime: field?.lead_time_tgl_pelaksanaan_audit_st_dua,
    },
    {
      tahapan: "Tanggal Penyelesaian CAPA",
      tanggalStatus: field?.tgl_penyelesaian_capa_st_dua,
      catatan: field?.note_tgl_penyelesaian_capa_st_dua,
      leadTime: field?.lead_time_tgl_penyelesaian_capa_st_dua,
    },
    {
      tahapan: "Tanggal Pengiriman Draft Sertifikat",
      tanggalStatus: field?.tgl_pengiriman_draft_sertifikat,
      catatan: field?.note_tgl_pengiriman_draft_sertifikat,
      leadTime: field?.lead_time_tgl_pengiriman_draft_sertifikat,
    },
    {
      tahapan: "Tanggal Persetujuan Draft Sertifikat",
      tanggalStatus: field?.tgl_persetujuan_draft_sertifikat,
      catatan: field?.note_tgl_persetujuan_draft_sertifikat,
      leadTime: field?.lead_time_tgl_persetujuan_draft_sertifikat,
    },
    {
      tahapan: "Tanggal Pengajuan ke " + field?.nama_akreditasi,
      tanggalStatus: field?.tgl_pengajuan_ke_kan,
      catatan: field?.note_tgl_pengajuan_ke_kan,
      leadTime: field?.lead_time_tgl_pengajuan_ke_kan,
    },
    {
      tahapan: "Tanggal Persetujuan ke " + field?.nama_akreditasi,
      tanggalStatus: field?.tgl_persetujuan_kan,
      catatan: field?.note_tgl_persetujuan_kan,
      leadTime: field?.lead_time_tgl_persetujuan_kan,
    },
    {
      tahapan: "Tanggal Kirim Sertifikat",
      tanggalStatus: field?.tgl_kirim_sertifikat,
      catatan: field?.note_tgl_kirim_sertifikat,
      leadTime: field?.lead_time_tgl_kirim_sertifikat,
    },
  ];
}

export function getlatestProgress(field: AllProject) {
  const latestProgressAuditISPO = getFieldAuditISPO(field)
    .filter((item) => item.tanggalStatus)
    .sort((a, b) =>
      new Date(a.tanggalStatus as string) > new Date(b.tanggalStatus as string)
        ? -1
        : 1
    )[0];
  const latestProgressAuditISO = getFieldAuditISO(field)
    .filter((item) => item.tanggalStatus)
    .sort((a, b) =>
      new Date(a.tanggalStatus as string) > new Date(b.tanggalStatus as string)
        ? -1
        : 1
    )[0];

  const latestProgressISPO = getFieldISPO(field)
    .filter((item) => item.tanggalStatus)
    .sort((a, b) =>
      new Date(a.tanggalStatus as string) > new Date(b.tanggalStatus as string)
        ? -1
        : 1
    )[0];
  const latestProgressISO = getFieldISO(field)
    .filter((item) => item.tanggalStatus)
    .sort((a, b) =>
      new Date(a.tanggalStatus as string) > new Date(b.tanggalStatus as string)
        ? -1
        : 1
    )[0];

  if (location?.pathname === "/ispo") {
    if (
      latestProgressAuditISPO &&
      (field?.tahapan === 1 || field?.tahapan === 7)
    ) {
      return `${latestProgressAuditISPO.tahapan?.replace("Tanggal ", "")}`;
    }
    if (latestProgressISPO && field?.tahapan > 1) {
      return `${latestProgressISPO.tahapan?.replace("Tanggal ", "")}`;
    }
  } else {
    if (latestProgressAuditISO && field?.tahapan === 1) {
      return `${latestProgressAuditISO.tahapan?.replace("Tanggal ", "")}`;
    }
    if (latestProgressISO && field?.tahapan > 1) {
      return `${latestProgressISO.tahapan?.replace("Tanggal ", "")}`;
    }
  }

  return "-";
}

export function getDataTable(field: AllProject) {
  if (location?.pathname === "/ispo") {
    if (field?.tahapan === 1 || field?.tahapan === 7) {
      return getFieldAuditISPO(field);
    }
    if (field?.tahapan > 1 && field.tahapan <= 6) {
      return getFieldISPO(field);
    }
  } else {
    if (field?.tahapan === 1) {
      return getFieldAuditISO(field);
    }
    if (field?.tahapan > 1) {
      return getFieldISO(field);
    }
  }

  return null;
}

export function getNextStep(field: AllProject) {
  const latest = `Tanggal ${getlatestProgress(field)}`;

  if (location?.pathname === "/ispo") {
    if (field?.tahapan === 1 || field?.tahapan === 7) {
      const indexInitialAudit =
        getFieldAuditISPO(field).findIndex((item) => item.tahapan === latest) +
        1;
      const isDone = indexInitialAudit > getFieldAuditISPO(field).length - 1;

      return isDone
        ? "DONE"
        : getFieldAuditISPO(field)[indexInitialAudit]?.tahapan?.replace(
          "Tanggal ",
          ""
        );
    }
    if (field?.tahapan > 1) {
      const indexSurveillance =
        getFieldISPO(field).findIndex((item) => item.tahapan === latest) + 1;
      const isDone = indexSurveillance > getFieldISPO(field).length - 1;

      return isDone
        ? "DONE"
        : getFieldISPO(field)[indexSurveillance]?.tahapan?.replace(
          "Tanggal ",
          ""
        );
    }
  } else {
    if (field?.tahapan === 1) {
      const indexInitialAudit =
        getFieldAuditISO(field).findIndex((item) => item.tahapan === latest) +
        1;
      const isDone = indexInitialAudit > getFieldAuditISO(field).length - 1;

      return isDone
        ? "DONE"
        : getFieldAuditISO(field)[indexInitialAudit]?.tahapan?.replace(
          "Tanggal ",
          ""
        );
    }
    if (field?.tahapan > 1) {
      const indexSurveillance =
        getFieldISO(field).findIndex((item) => item.tahapan === latest) + 1;
      const isDone = indexSurveillance > getFieldISO(field).length - 1;

      return isDone
        ? "DONE"
        : getFieldISO(field)[indexSurveillance]?.tahapan?.replace(
          "Tanggal ",
          ""
        );
    }
  }

  return "-";
}
