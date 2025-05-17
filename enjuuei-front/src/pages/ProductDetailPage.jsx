import { useEffect, useState } from "react";
import { getProductById } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then(res => setProduct(res.data))
      .catch(() => alert("Erro ao buscar produto"));
  }, [id]);

  if (!product) return <p style={{ padding: "2rem" }}>Carregando...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <button onClick={() => navigate("/produtos")} style={styles.buttonVoltar}>
        ← Voltar para a lista
      </button>

      <h2>{product.title}</h2>

      {product.images?.map(img => (
        <img
          key={img.id}
          src={`http://localhost:3000/${img.source}`}
          alt={product.title}
          style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
        />
      ))}

      <div>
        <p><strong>Descrição:</strong> {product.description}</p>
        <p><strong>Preço:</strong> R$ {product.price}</p>
        <p><strong>Categoria:</strong> {product.category?.title}</p>
        <p><strong>Vendedor:</strong> {product.ownerUser?.name} {product.ownerUser?.lastName}</p>
      </div>
    </div>
  );
}

const styles = {
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
