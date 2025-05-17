

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/produtos" element={<ProductListPage />} />
          <Route path="/produtos/:id" element={<ProductDetailPage />} />
          <Route path="/produtos/novo" element={<ProductCreatePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
