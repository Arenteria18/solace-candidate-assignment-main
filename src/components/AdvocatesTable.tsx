import React from "react";
import { Advocate } from "../types/advocate";
import { SpecialtiesList } from "./SpecialtiesList";

interface Props {
  data: Advocate[];
}

function AdvocatesTableInner({ data }: Props) {
  return (
    <div role="region" aria-label="Advocates table" className="overflow-x-auto surface">
      <table className="table-base">
        <caption id="adv-table-caption" className="caption">
          Available advocates
        </caption>
        <thead className="thead-base">
          <tr>
            <th scope="col" className="th-base">
              First Name
            </th>
            <th scope="col" className="th-base">
              Last Name
            </th>
            <th scope="col" className="th-base">
              City
            </th>
            <th scope="col" className="th-base">
              Degree
            </th>
            <th scope="col" className="th-base">
              Specialties
            </th>
            <th scope="col" className="th-base">
              Years of Experience
            </th>
          </tr>
        </thead>
        <tbody className="tbody-base">
          {data.map((advocate) => (
            <tr key={`${advocate.firstName}-${advocate.lastName}`} className="tr-hover">
              <th scope="row" className="th-row">
                {advocate.firstName}
              </th>
              <td className="td-base">{advocate.lastName}</td>
              <td className="td-base">{advocate.city}</td>
              <td className="td-base">{advocate.degree}</td>
              <td className="td-base align-top">
                <SpecialtiesList items={advocate.specialties} />
              </td>
              <td className="td-base">{advocate.yearsOfExperience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const AdvocatesTable = React.memo(AdvocatesTableInner);
