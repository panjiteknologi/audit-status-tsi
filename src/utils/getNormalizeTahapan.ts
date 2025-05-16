import { Tahapan } from "@/constant/tahapan";
import { AllProject } from "@/types/Project";

export function findTahapan(namaTahapan: string) {
  if (!namaTahapan) return null;
  return Tahapan?.find((item) => item.kode === namaTahapan);
}

export function normalizeFieldTahapan(field: AllProject) {
  const tahapanData = findTahapan(field.tahapan);

  return {
    ...field,
    tahapan: tahapanData?.id_tahapan ?? null,
    nama_tahapan: tahapanData?.nama_tahapan ?? undefined,
  };
}
