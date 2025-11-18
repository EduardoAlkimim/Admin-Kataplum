import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CadastroItensAvulsos({ onItemCadastrado }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState('');
  const [todasTags, setTodasTags] = useState([]);
  const [imagem, setImagem] = useState(null); // 🔑 imagem ativada!

  const apiUrl = process.env.REACT_APP_API_URL;

  // Buscar tags ao carregar
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`${apiUrl}/itens-avulsos/tags`);
        setTodasTags(res.data.tags || []);
      } catch (err) {
        console.error("Erro ao buscar tags:", err);
      }
    };
    fetchTags();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("nome", nome);
    fd.append("descricao", descricao);
    fd.append("tags", tags); // agora é string igual ao produto
    if (imagem) fd.append("imagem_url", imagem); // 🔑 nome exato do multer

    try {
      const res = await axios.post(`${apiUrl}/itens-avulsos`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onItemCadastrado(res.data);

      // Resetar formulário
      setNome('');
      setDescricao('');
      setTags('');
      setImagem(null);
    } catch (err) {
      console.error("Erro ao cadastrar item:", err);
      alert("Erro ao cadastrar item avulso");
    }
  };

  return (
    <div>
      <h2>Cadastrar Item Avulso</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <select value={tags} onChange={e => setTags(e.target.value)}>
          <option value="">Selecione uma tag</option>
          {todasTags.map((t, i) => <option key={i} value={t}>{t}</option>)}
        </select>

        {/* 🔑 campo file */}
        <input
          type="file"
          onChange={e => setImagem(e.target.files[0])}
          accept="image/*"
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroItensAvulsos;
