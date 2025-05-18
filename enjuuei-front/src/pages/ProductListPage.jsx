import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data.products))
      .catch(() => alert("Erro ao carregar produtos"));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, {
        withCredentials: true
      });
    } catch {
      // mesmo com erro, seguimos limpando
    }
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Produtos</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Sair
        </button>
      </div>

      <Link to="/produtos/novo" style={{ display: "inline-block", margin: "1rem 0", color: "#007bff" }}>
        + Novo Produto
      </Link>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <Link to={`/produtos/${p.id}`} style={{ textDecoration: "none", color: "black" }}>
              {p.images?.length > 0 && (
                <img
                  src={`http://localhost:3000/${p.images[0].source}`}
                  alt={p.title}
                  style={{ width: "100%", height: "auto", borderRadius: "4px" }}
                />
              )}
              <h3>{p.title}</h3>
              <p><strong>R$ {p.price}</strong></p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    flex: "1 1 300px",
    maxWidth: "300px",
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "8px",
    background: "#fafafa"
  },
  logoutButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};
