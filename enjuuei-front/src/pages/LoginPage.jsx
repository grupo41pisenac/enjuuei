import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const token = res.data.token || res.data.access_token;
      localStorage.setItem("token", token);
      navigate("/produtos");
    } catch {
      alert("Erro no login.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="username" placeholder="Usuário" onChange={handleChange} required style={styles.input} />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.button}>Entrar</button>
      </form>
      <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "500px", width: "100%", margin: "auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.75rem", fontSize: "1rem", width: "100%" },
  button: { padding: "0.75rem", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }
};
