import type {
  SubmissionStatus,
  Submission,
  Client,
  Package,
  AddOn,
  Timeline,
  Invoice,
} from "@prisma/client"

export type SubmissionListItem = Submission & {
  client: Pick<Client, "id" | "name" | "phone">
  package: Pick<Package, "id" | "name" | "category">
}

export type SubmissionDetail = Submission & {
  client: Client
  package: Package
  submissionAddOns: (SubmissionAddOnWithAddOn & {
    addOn: AddOn
  })[]
  timelines: Timeline[]
  invoices: Invoice[]
}

export type SubmissionAddOnWithAddOn = {
  submissionId: string
  addonId: string
  priceSnapshot: number
  addOn: AddOn
}

export type CreateSubmissionInput = {
  name: string
  phone: string
  instagram?: string
  packageId: string
  addonIds: string[]
  eventName: string
  eventDate: Date
  eventTime: string
  location: string
  specialRequest?: string
  allowPublish: boolean
}

export type UpdateStatusInput = {
  submissionId: string
  status: SubmissionStatus
  adminNote?: string
}

export type SubmissionFilters = {
  status?: SubmissionStatus
  search?: string
  page?: number
  limit?: number
}
