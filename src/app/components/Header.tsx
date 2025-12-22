import Link from "next/link";

export function Header() {
  return (
    <header>
      <h1>Oskar Sandlund</h1>
      <nav aria-label="Primary navigation">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/credits">Credits</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
