type HeroSectionProps = {
  siteTitle?: string;
  tagline?: string;
};

export function HeroSection({ siteTitle, tagline }: HeroSectionProps) {
  return (
    <section aria-labelledby="home-hero-heading">
      <h1 id="home-hero-heading">{siteTitle}</h1>
      <div>{tagline && <p>{tagline}</p>}</div>
    </section>
  );
}
