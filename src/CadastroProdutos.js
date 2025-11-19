import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CadastroProdutos({ onProdutoCadastrado }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState('');        // tag selecionada
  const [novaTag, setNovaTag] = useState('');  // tag digitada
  const [todasTags, setTodasTags] = useState([]);
  const [imagem, setImagem] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`${apiUrl}/produtos/tags`);
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

    // Usa a novaTag se houver, senão a tag selecionada
    const tagFinal = novaTag.trim() !== '' ? novaTag.trim() : tags;
    fd.append("tags", tagFinal);

    if (imagem) fd.append("imagem", imagem);

    try {
      const res = await axios.post(`${apiUrl}/produtos`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onProdutoCadastrado(res.data);

      // Resetar campos
      setNome('');
      setDescricao('');
      setTags('');
      setNovaTag('');
      setImagem(null);

      // Adiciona a nova tag na lista se não existir
      if (tagFinal && !todasTags.includes(tagFinal)) {
        setTodasTags(prev => [...prev, tagFinal]);
      }

    } catch (err) {
      console.error("Erro ao cadastrar produto:", err);
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <div>
      <h2>Cadastrar Produto</h2>
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

        {/* Seleção de tag existente */}
        <select value={tags} onChange={e => setTags(e.target.value)}>
          <option value="">Selecione uma tag existente</option>
          {todasTags.map((t, i) => <option key={i} value={t}>{t}</option>)}
        </select>

        {/* Input para criar nova tag */}
        <input 
          type="text" 
          placeholder="Ou digite uma nova tag" 
          value={novaTag} 
          onChange={e => setNovaTag(e.target.value)} 
        />

        <input type="file" onChange={e => setImagem(e.target.files[0])} />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroProdutos;
