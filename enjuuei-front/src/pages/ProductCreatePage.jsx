import { useState, useEffect } from "react";
import { getCategories } from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductCreatePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: ""
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(res => setCategories(res.data.categories))
      .catch(() => alert("Erro ao carregar categorias"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("categoryId", form.categoryId);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.post("http://localhost:3000/product", formData, {
        withCredentials: false,
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Produto cadastrado com sucesso!");
      navigate("/produtos");
    } catch {
      alert("Erro ao cadastrar produto.");
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/produtos")} style={styles.buttonVoltar}>
        ← Voltar para a lista
      </button>

      <h2>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="title" placeholder="Título" onChange={handleChange} required style={styles.input} />
        <input name="description" placeholder="Descrição" onChange={handleChange} required style={styles.input} />
        <input name="price" type="number" placeholder="Preço" onChange={handleChange} required style={styles.input} />
        <select name="categoryId" onChange={handleChange} required style={styles.input}>
          <option value="">Selecione uma Categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.title}</option>
          ))}
        </select>
        <input type="file" name="images" multiple accept="image/*" onChange={handleFileChange} style={styles.input} />
        <button type="submit" style={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "500px",
    width: "100%",
    margin: "auto",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box"
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  buttonVoltar: {
    marginBottom: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
