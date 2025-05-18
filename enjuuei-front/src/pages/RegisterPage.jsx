import { useState } from "react";
import { registerUser } from "../services/api";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", lastName: "", email: "", password: "", phone: "", document: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Usuário cadastrado!");
    } catch {
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {Object.keys(form).map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            onChange={handleChange}
            required
            style={styles.input}
          />
        ))}
        <button type="submit" style={styles.button}>Cadastrar</button>
      </form>
      <p>Já tem conta? <Link to="/login">Voltar para login</Link></p>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "500px", width: "100%", margin: "auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.75rem", fontSize: "1rem", width: "100%" },
  button: { padding: "0.75rem", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px" }
};
