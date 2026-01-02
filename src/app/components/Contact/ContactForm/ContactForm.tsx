"use client";

import { useState } from "react";
import styles from "./ContactForm.module.scss";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          value={name}
          onChange={handleNameChange}
          type="text"
        />
        <input
          name="email"
          placeholder="your@email.here"
          value={email}
          onChange={handleEmailChange}
          type="email"
        />
        <textarea
          name="message"
          id="message"
          placeholder="Write your message here"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
