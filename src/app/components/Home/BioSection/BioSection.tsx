type BioSectionProps = {
  name?: string;
  profession?: string;
  shortBio?: string;
};

export function BioSection({ name, profession, shortBio }: BioSectionProps) {
  return (
    <section aria-labelledby="home-bio-heading">
      <h2 id="home-bio-heading">About</h2>
      <div>
        {name && (
          <p>
            <strong>{name}</strong>
          </p>
        )}
        {profession && <p>{profession}</p>}
      </div>
      {shortBio && <p>{shortBio}</p>}
    </section>
  );
}
