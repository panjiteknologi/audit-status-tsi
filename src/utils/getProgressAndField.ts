import { AllProject } from "@/types/Project";
import { normalizeFieldTahapan } from "./getNormalizeTahapan";
import {
  getFieldAuditISO,
  getFieldAuditISPO,
  getFieldISO,
  getFieldISPO,
} from "./getAllStep";

export function getlatestProgress(field: AllProject) {
  const normalizedField = normalizeFieldTahapan(field);

  const latestProgressAuditISPO = getFieldAuditISPO(field)
    .filter((item) => item.tanggalStatus)
    .sort(
      (a, b) =>
        new Date(b.tanggalStatus as string).getTime() -
        new Date(a.tanggalStatus as string).getTime()
    )[0];

  const latestProgressAuditISO = getFieldAuditISO(field)
    .filter((item) => item.tanggalStatus)
    .sort(
      (a, b) =>
        new Date(b.tanggalStatus as string).getTime() -
        new Date(a.tanggalStatus as string).getTime()
    )[0];

  const latestProgressISPO = getFieldISPO(field)
    .filter((item) => item.tanggalStatus)
    .sort(
      (a, b) =>
        new Date(b.tanggalStatus as string).getTime() -
        new Date(a.tanggalStatus as string).getTime()
    )[0];

  const latestProgressISO = getFieldISO(field)
    .filter((item) => item.tanggalStatus)
    .sort(
      (a, b) =>
        new Date(b.tanggalStatus as string).getTime() -
        new Date(a.tanggalStatus as string).getTime()
    )[0];

  if (location?.pathname === "/ispo") {
    if (
      latestProgressAuditISPO &&
      ((normalizedField.tahapan as any) === 1 ||
        (normalizedField.tahapan as any) === 7)
    ) {
      return latestProgressAuditISPO.tahapan?.replace("Tanggal ", "") ?? "";
    }
    if (latestProgressISPO && (normalizedField.tahapan as any) > 1) {
      return latestProgressISPO.tahapan?.replace("Tanggal ", "") ?? "";
    }
  } else {
    if (latestProgressAuditISO && (normalizedField.tahapan as any) === 1) {
      return latestProgressAuditISO.tahapan?.replace("Tanggal ", "") ?? "";
    }
    if (latestProgressISO && (normalizedField.tahapan as any) > 1) {
      return latestProgressISO.tahapan?.replace("Tanggal ", "") ?? "";
    }
  }

  return "";
}

export function getDataTable(field: AllProject) {
  const normalizedField = normalizeFieldTahapan(field);

  if (location?.pathname === "/ispo") {
    if (
      (normalizedField?.tahapan as any) === 1 ||
      (normalizedField?.tahapan as any) === 7
    ) {
      return getFieldAuditISPO(field);
    }
    if (
      (normalizedField?.tahapan as any) > 1 &&
      (normalizedField?.tahapan as any) <= 6
    ) {
      return getFieldISPO(field);
    }
  } else {
    if ((normalizedField?.tahapan as any) === 1) {
      return getFieldAuditISO(field);
    }
    if ((normalizedField?.tahapan as any) > 1) {
      return getFieldISO(field);
    }
  }

  return null;
}

export function getNextStep(field: AllProject) {
  const normalizedField = normalizeFieldTahapan(field);

  const latest = `Tanggal ${getlatestProgress(field)}`;

  if (location?.pathname === "/ispo") {
    if (
      (normalizedField?.tahapan as any) === 1 ||
      (normalizedField?.tahapan as any) === 7
    ) {
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

    if ((normalizedField?.tahapan as any) > 1) {
      const indexSurveillance =
        getFieldISPO(field).findIndex((item) => item.tahapan === latest) + 1;
      const isDone =
        indexSurveillance > getFieldISPO(normalizedField as any).length - 1;

      return isDone
        ? "DONE"
        : getFieldISPO(field)[indexSurveillance]?.tahapan?.replace(
            "Tanggal ",
            ""
          );
    }
  } else {
    if ((normalizedField?.tahapan as any) === 1) {
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
    if ((normalizedField?.tahapan as any as any) > 1) {
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

  return "";
}
