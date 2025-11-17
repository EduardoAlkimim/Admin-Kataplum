import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CadastroProduto({ onProdutoCadastrado }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState('');
  const [todasTags, setTodasTags] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novaTag, setNovaTag] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  // 🔹 Puxa produtos pra descobrir as tags existentes
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`${apiUrl}/produtos`);
        const tagsExtraidas = [
          ...new Set(
            res.data.produtos
              ?.flatMap(p => p.tags)
              .filter(Boolean)
          ),
        ];
        setTodasTags(tagsExtraidas);
      } catch (err) {
        console.error('Erro ao buscar tags:', err);
      }
    };
    fetchTags();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('tags', tags);
    formData.append('imagem', imagem);

    try {
      const res = await axios.post(`${apiUrl}/produtos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onProdutoCadastrado(res.data);
      setNome('');
      setDescricao('');
      setTags('');
      setImagem(null);
      e.target.reset();
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      alert('Falha ao cadastrar produto.');
    }
  };

  // 🔹 Adiciona nova tag no modal
  const adicionarTag = () => {
    if (novaTag && !todasTags.includes(novaTag)) {
      setTodasTags([...todasTags, novaTag]);
      setTags(novaTag);
    }
    setNovaTag('');
    setMostrarModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-cadastro">
        <h2 className="titulo">Cadastrar Novo Produto</h2>

        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição do Produto"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
        />

        <label>Tag:</label>
        <select value={tags} onChange={e => setTags(e.target.value)} required>
          <option value="">Selecione uma tag</option>
          {todasTags.map((tag, i) => (
            <option key={i} value={tag}>{tag}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setMostrarModal(true)}
          style={{ marginLeft: 10 }}
        >
          + Nova Tag
        </button>

        <input
          type="file"
          name="imagem"
          onChange={e => setImagem(e.target.files[0])}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      {/* 🔹 Modal para criar nova tag */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Criar nova tag</h3>
            <input
              type="text"
              placeholder="Nome da nova tag"
              value={novaTag}
              onChange={(e) => setNovaTag(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={adicionarTag}>Salvar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroProduto;
