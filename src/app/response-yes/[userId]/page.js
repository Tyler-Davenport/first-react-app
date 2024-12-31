/* eslint-disable react/self-closing-comp */
import React from 'react';

export default async function responseYesPage({ params }) {
  const response = await fetch(`https://uselessfacts.jsph.pl/api/v2/facts/random?
    language=en/responseyes.json?orderBy="userId"&equalTo=${params.userId}
    "`);
  const facts = await response.json();

  return <div>{Object.values(facts).map((fact) => fact.permaLink)}</div>;
}
