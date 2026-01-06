"use client";
import { createContext, useContext, useId, useState } from "react";
import { NavLink } from "./NavLink";
import styles from "./Header.module.scss";

const MobileNavContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  panelId: string;
} | null>(null);

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <MobileNavContext.Provider
      value={{
        isOpen,
        toggle: () => setIsOpen((v) => !v),
        close: () => setIsOpen(false),
        panelId,
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
}

function useMobileNav() {
  const ctx = useContext(MobileNavContext);
  if (!ctx) throw new Error("MobileNav used outside provider");
  return ctx;
}

export function MobileNavButton() {
  const { isOpen, toggle, panelId } = useMobileNav();

  return (
    <button
      type="button"
      className={styles.menuButton}
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={toggle}
    >
      <span className={styles.hamburger} aria-hidden />
      <span className={styles.menuLed} aria-hidden />
    </button>
  );
}

export function MobileNavPanel() {
  const { isOpen, close, panelId } = useMobileNav();
  if (!isOpen) return null;

  return (
    <nav
      id={panelId}
      className={styles.mobilePanel}
      aria-label="Mobile navigation"
    >
      <ul className={styles.navList}>
        <li>
          <NavLink href="/" onClick={close}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink href="/about" onClick={close}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink href="/credits" onClick={close}>
            Credits
          </NavLink>
        </li>
        <li>
          <NavLink href="/contact" onClick={close}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
