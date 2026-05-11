import { useState, type FormEvent } from "react";
import type React from "react";
import type { ConnectionsLeadFormBlock } from "@herramientas/content/types";
import { api } from "@herramientas/convex/api";
import { convex } from "@herramientas/convex/client";
import { buildLeadPayload, createEmptyLeadForm, getUnitOptions, validateLeadForm, type LeadFormValues } from "@herramientas/leads/lead-form";
import "./lead-form/ConnectionsLeadForm.css";

type Props = ConnectionsLeadFormBlock["props"];
type FormStatus = "idle" | "sending" | "success" | "error";

export function ConnectionsLeadForm(props: Props) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<LeadFormValues>(createEmptyLeadForm());
  const unitOptions = getUnitOptions(props.unitOptions);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLeadForm(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      await convex.mutation(api.leads.captureLead, buildLeadPayload(form));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="connections-lead section" id="lead-form">
        <div className="container">
          <div className="connections-lead__success">
            <span aria-hidden="true">✓</span>
            <h2>{props.successTitle}</h2>
            <p>{props.successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="connections-lead section" id="lead-form">
      <div className="container">
        <div className="connections-lead__head fade-in">
          <p className="section-kicker">{props.sectionLabel}</p>
          <h2>{props.title}</h2>
          <p>{props.subtitle}</p>
        </div>
        <form className="connections-lead__card fade-in" onSubmit={handleSubmit} noValidate>
          <div className="connections-lead__grid">
            <Field label={props.firstNameLabel} error={errors.firstName} required>
              <input type="text" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} autoComplete="given-name" />
            </Field>
            <Field label={props.lastNameLabel}>
              <input type="text" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} autoComplete="family-name" />
            </Field>
            <Field label={props.emailLabel} error={errors.email} required>
              <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" />
            </Field>
            <Field label={props.phoneLabel}>
              <input type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} autoComplete="tel" />
            </Field>
            <Field label={props.unitLabel} wide>
              <select value={form.unit} onChange={(event) => setForm({ ...form, unit: event.target.value })}>
                <option value="">Select an option</option>
                {unitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={props.messageLabel} wide>
              <textarea rows={4} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
            </Field>
          </div>
          {status === "error" && <p className="connections-lead__error">We could not send your request. Please try again or schedule a call.</p>}
          <div className="connections-lead__actions">
            <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : props.submitLabel}
            </button>
            <a className="btn connections-lead__secondary" href={props.secondaryCTAHref}>
              {props.secondaryCTALabel}
            </a>
          </div>
          <p className="connections-lead__privacy">{props.privacyNote}</p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, error, required, wide, children }: { label: string; error?: string; required?: boolean; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={wide ? "connections-lead__field connections-lead__field--wide" : "connections-lead__field"}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      {children}
      {error && <small>{error}</small>}
    </label>
  );
}
