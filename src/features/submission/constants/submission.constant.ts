import type { SubmissionStatus } from "@prisma/client"

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  PENDING_REVIEW: "Menunggu Review",
  WAITING_DP: "Menunggu DP",
  DP_PAID: "DP Diterima",
  PAID: "Lunas",
  ON_SESSION: "Sesi Berlangsung",
  EDITING: "Proses Editing",
  DELIVERED: "Hasil Dikirim",
  COMPLETED: "Selesai",
  REJECTED: "Ditolak",
  RESCHEDULE: "Perlu Penjadwalan Ulang",
  CANCELLED: "Dibatalkan",
}

export const SUBMISSION_STATUS_COLORS: Record<SubmissionStatus, string> = {
  PENDING_REVIEW: "bg-status-review text-white",
  WAITING_DP: "bg-status-dp text-white",
  DP_PAID: "bg-status-dp-paid text-white",
  PAID: "bg-status-paid text-white",
  ON_SESSION: "bg-info text-white",
  EDITING: "bg-status-editing text-white",
  DELIVERED: "bg-status-delivered text-white",
  COMPLETED: "bg-status-completed text-white",
  REJECTED: "bg-status-rejected text-white",
  RESCHEDULE: "bg-warning text-white",
  CANCELLED: "bg-gray-400 text-white",
}

export const SUBMISSION_GENERATOR_PREFIX = "LVR"

export const NEXT_ALLOWED_STATUSES: Record<SubmissionStatus, SubmissionStatus[]> = {
  PENDING_REVIEW: ["WAITING_DP", "REJECTED", "RESCHEDULE"],
  WAITING_DP: ["DP_PAID", "CANCELLED"],
  DP_PAID: ["PAID", "CANCELLED"],
  PAID: ["ON_SESSION", "CANCELLED"],
  ON_SESSION: ["EDITING"],
  EDITING: ["DELIVERED"],
  DELIVERED: ["COMPLETED"],
  COMPLETED: [],
  REJECTED: [],
  RESCHEDULE: ["WAITING_DP"],
  CANCELLED: [],
}
