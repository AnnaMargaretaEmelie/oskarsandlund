"use client";

import { useState } from "react";
import styles from "./ContactForm.module.scss";
import {
  validateName,
  validateEmail,
  validateMessage,
} from "@/lib/contact/validation";

type FieldName = "name" | "email" | "message";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    sanityId?: string;
    resendId?: string;
  } | null>(null);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  function handleBlur(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const error =
      field === "name"
        ? validateName(name)
        : field === "email"
          ? validateEmail(email)
          : validateMessage(message);

    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message),
    };

    setErrors(newErrors);

    const hasErrors = Boolean(
      newErrors.name || newErrors.email || newErrors.message
    );
    if (hasErrors) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();
      if (result.ok) {
        setIsSubmitted(true);
        setReceipt({
          sanityId: result.sanityId,
          resendId: result.resendId,
        });
      } else {
        setSubmitError("Something went wrong, please try again");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Network error, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setMessage("");
    setTouched({ name: false, email: false, message: false });
    setErrors({});
    setSubmitError(null);
    setReceipt(null);
    setIsSubmitted(false);
  }
  if (isSubmitted) {
    return (
      <div className={styles.success}>
        <h3>Thanks!</h3>
        <p>Your message has been sent.</p>
        {receipt?.sanityId && (
          <p className={styles.meta}>Reference: {receipt.sanityId}</p>
        )}
        <button
          type="button"
          className={`u-cta ${styles.button}`}
          onClick={resetForm}
        >
          Send me another one!
        </button>
      </div>
    );
  }

  return (
    <div className="u-stack-sm">
      <form onSubmit={handleSubmit} className={styles.form}>
        {submitError && <p className={styles.error}>{submitError}</p>}
        <div className={styles.field}>
          <input
            name="name"
            placeholder="Your name"
            className={styles.input}
            value={name}
            onChange={handleNameChange}
            onBlur={() => handleBlur("name")}
            type="text"
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={
              touched.name && errors.name ? "name-error" : undefined
            }
          />
          {touched.name && errors.name && (
            <p className={styles.error} id="name-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <input
            name="email"
            placeholder="your@email.here"
            className={styles.input}
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur("email")}
            type="email"
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={
              touched.email && errors.email ? "email-error" : undefined
            }
          />
          {touched.email && errors.email && (
            <p className={styles.error} id="email-error">
              {errors.email}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <textarea
            name="message"
            id="message"
            placeholder="Write your message here"
            className={styles.textarea}
            value={message}
            onChange={handleMessageChange}
            onBlur={() => handleBlur("message")}
            aria-invalid={Boolean(touched.message && errors.message)}
            aria-describedby={
              touched.message && errors.message ? "message-error" : undefined
            }
          ></textarea>
          {touched.message && errors.message && (
            <p className={styles.error} id="message-error">
              {errors.message}
            </p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
