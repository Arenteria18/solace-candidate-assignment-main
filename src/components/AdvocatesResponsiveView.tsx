"use client";

import React from "react";
import { Advocate } from "../types/advocate";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";
import { AdvocatesTable } from "./AdvocatesTable";
import { AdvocateCardList } from "./AdvocateCardList";

interface Props {
  data: Advocate[];
}

function AdvocatesResponsiveViewInner({ data }: Props) {
  const { isNarrow } = useResponsiveLayout(768);

  return (
    <section aria-labelledby="adv-section-title">
      <h2 id="adv-section-title" style={{ position: "absolute", left: -10000 }}>
        Advocates results
      </h2>
      <div aria-live="polite" aria-atomic="true" style={{ marginBottom: 8 }}>
        {data.length} results
      </div>
      {isNarrow ? <AdvocateCardList data={data} /> : <AdvocatesTable data={data} />}
    </section>
  );
}

export const AdvocatesResponsiveView = React.memo(AdvocatesResponsiveViewInner);
