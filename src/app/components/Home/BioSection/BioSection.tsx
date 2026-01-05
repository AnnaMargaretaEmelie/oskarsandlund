// import styles from "./BioSection.module.scss";

type BioSectionProps = {
  name?: string;
  profession?: string;
  shortBio?: string;
};

export function BioSection({ name, profession, shortBio }: BioSectionProps) {
  return (
    <div className="u-stack-sm">
      <h2 id="home-bio-heading">About</h2>

      {name && (
        <p>
          <strong>{name}</strong>
        </p>
      )}
      {profession && <p>{profession}</p>}

      {shortBio && <p>{shortBio}</p>}
    </div>
  );
}
