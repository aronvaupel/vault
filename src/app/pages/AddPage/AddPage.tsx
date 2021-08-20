import React from 'react';

export default function AddPage(): JSX.Element {
  return (
    <main>
      <h1>Add new Credential</h1>
      <form className="addCredentialForm">
        <h4>Service</h4>
        <input type="text" placeholder="Service" />
        <h4>Username</h4>
        <input type="text" placeholder="Username" />
        <h4>Password</h4>
        <input type="text" placeholder="Password" />
        <h4>Masterpassword</h4>
        <input type="text" placeholder="Masterpassword" />

        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </main>
  );
}
