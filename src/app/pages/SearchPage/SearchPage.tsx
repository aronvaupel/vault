import React from 'react';

export default function SearchPage(): JSX.Element {
  return (
    <main>
      <h1>Search</h1>
      <form className="addCredentialForm">
        <h4>Search</h4>
        <input type="text" placeholder="Search" />
        <h4>Masterpassword</h4>
        <input type="text" placeholder="Masterpassword" />

        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </main>
  );
}
