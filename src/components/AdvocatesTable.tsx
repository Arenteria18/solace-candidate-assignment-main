import { Advocate } from "../types/advocate";

interface Props {
  data: Advocate[];
}

export function AdvocatesTable({ data }: Props) {
  return (
    <div role="region" aria-label="Advocates table" style={{ overflowX: "auto" }}>
      <table>
        <caption id="adv-table-caption">Available advocates</caption>
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">City</th>
            <th scope="col">Degree</th>
            <th scope="col">Specialties</th>
            <th scope="col">Years of Experience</th>
          </tr>
        </thead>
        <tbody>
          {data.map((advocate) => (
            <tr key={`${advocate.firstName}-${advocate.lastName}`}>
              <th scope="row">{advocate.firstName}</th>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                <ul>
                  {advocate.specialties.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </td>
              <td>{advocate.yearsOfExperience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
