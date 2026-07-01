import type { Invoice, Payment } from "@prisma/client"

export type InvoiceDetail = Invoice & {
  submission: {
    id: string
    submissionNumber: string
    eventName: string
    eventDate: Date
    eventTime: string
    location: string
    client: {
      id: string
      name: string
      phone: string
      instagram: string | null
    }
    package: {
      id: string
      name: string
      category: string
      price: number
    }
    submissionAddOns: {
      addonId: string
      priceSnapshot: number
      addOn: {
        id: string
        name: string
        price: number
      }
    }[]
  }
  payments: Payment[]
}

export type InvoiceListItem = Invoice & {
  submission: {
    submissionNumber: string
    client: {
      name: string
      phone: string
    }
    package: {
      name: string
    }
  }
}
