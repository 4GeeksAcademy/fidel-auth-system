import React, { useState } from "react";

export default function Signup() {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSignup = async () => {
    try {
      if (inputValues.email && inputValues.password) {
        const rawResponse = await fetch(
          `${process.env.BACKEND_URL}/api/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputValues),
          }
        );

        const response = await rawResponse.json();

        if (rawResponse.ok) {
          // Almacenamos el token en el localStorage
          sessionStorage.setItem("token", response.access_token);
          localStorage.setItem("token", response.access_token);
          // Redirigir o hacer algo después del registro exitoso
          alert("Signup successful!");
        } else {
          setError(response.message); // Mostrar error si lo hay
        }
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        onChange={(event) => {
          const { value } = event.target;
          setInputValues((prevState) => ({
            ...prevState,
            email: value,
          }));
        }}
        value={inputValues.email}
        placeholder="email"
      />
      <input
        type="password"
        onChange={(event) => {
          const { value } = event.target;
          setInputValues((prevState) => ({
            ...prevState,
            password: value,
          }));
        }}
        value={inputValues.password}
        placeholder="password"
      />
      <button onClick={onSignup}>Sign Up</button>
    </div>
  );
}
