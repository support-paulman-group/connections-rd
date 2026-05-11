import type { ConnectionsLeadFormBlock } from "@herramientas/content/types";
import { type CaptureLeadArgs } from "@herramientas/convex/api";
import { readUtmParams } from "@herramientas/utm";

export type LeadFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unit: string;
  message: string;
};

export function createEmptyLeadForm(): LeadFormValues {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    unit: "",
    message: "",
  };
}

export function getUnitOptions(unitOptions: ConnectionsLeadFormBlock["props"]["unitOptions"]) {
  return unitOptions.map((option) => (typeof option === "string" ? option : option.value));
}

export function validateLeadForm(form: LeadFormValues) {
  const errors: Record<string, string> = {};

  if (!form.firstName.trim()) errors.firstName = "This field is required.";
  if (!form.email.trim()) {
    errors.email = "This field is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

export function buildLeadPayload(form: LeadFormValues): CaptureLeadArgs {
  const fullName = [form.firstName.trim(), form.lastName.trim()].filter(Boolean).join(" ");
  const message = [form.unit ? `[${form.unit}]` : "", form.message.trim()].filter(Boolean).join(" ");

  return {
    dominio_origen: "connectionsrd.com",
    nombre: fullName || form.firstName.trim(),
    email: form.email.trim(),
    telefono: form.phone.trim() || undefined,
    mensaje: message || undefined,
    ...readUtmParams(),
  };
}
