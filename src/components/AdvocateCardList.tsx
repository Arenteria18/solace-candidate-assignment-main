import { Advocate } from "../types/advocate";
import { SpecialtiesList } from "./SpecialtiesList";

interface Props {
  data: Advocate[];
}

export function AdvocateCardList({ data }: Props) {
  return (
    <ul aria-label="Advocates list" className="grid gap-4">
      {data.map((a) => (
        <li key={`${a.firstName}-${a.lastName}`} className="card list-none">
          <h3 className="m-0">
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
                <SpecialtiesList items={a.specialties} />
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
