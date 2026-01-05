// import styles from "./HeroSection.module.scss";
type HeroSectionProps = {
  siteTitle?: string;
  tagline?: string;
};

export function HeroSection({ siteTitle, tagline }: HeroSectionProps) {
  return (
    <div className="u-stack-sm">
      <h1 id="home-hero-heading">{siteTitle}</h1>
      {tagline && <p>{tagline}</p>}
    </div>
  );
}
