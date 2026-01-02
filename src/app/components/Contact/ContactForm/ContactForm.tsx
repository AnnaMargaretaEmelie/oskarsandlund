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

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const result = await response.json();
    console.log(result);
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

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
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
        <input
          name="email"
          placeholder="your@email.here"
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
        <textarea
          name="message"
          id="message"
          placeholder="Write your message here"
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
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
