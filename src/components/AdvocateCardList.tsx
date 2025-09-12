import { Advocate } from "../types/advocate";

interface Props {
  data: Advocate[];
}

export function AdvocateCardList({ data }: Props) {
  return (
    <ul aria-label="Advocates list" style={{ display: "grid", gap: 16 }}>
      {data.map((a) => (
        <li
          key={`${a.firstName}-${a.lastName}`}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 16,
            listStyle: "none",
          }}
        >
          <h3 style={{ margin: 0 }}>
            {a.firstName} {a.lastName}
          </h3>
          <dl>
            <div>
              <dt>City</dt>
              <dd>{a.city}</dd>
            </div>
            <div>
              <dt>Degree</dt>
              <dd>{a.degree}</dd>
            </div>
            <div>
              <dt>Specialties</dt>
              <dd>
                <ul>
                  {a.specialties.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Years of Experience</dt>
              <dd>{a.yearsOfExperience}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
