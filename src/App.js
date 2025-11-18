import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EscolherCadastro from './EscolherCadastro';
import CadastroProdutos from './CadastroProdutos';
import CadastroItensAvulsos from './CadastroItensAvulsos';
import CardsGenerico from './CardsGenerico'; // <-- Usar apenas este

function App() {
  const [tipoSelecionado, setTipoSelecionado] = useState('produto'); // 'produto' ou 'item'
  const [produtos, setProdutos] = useState([]);
  const [itensAvulsos, setItensAvulsos] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  // GET Produtos
  const fetchProdutos = async () => {
    try {
      const res = await axios.get(`${apiUrl}/produtos`);
      setProdutos(res.data.produtos || res.data || []);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  // GET Itens Avulsos
  const fetchItensAvulsos = async () => {
    try {
      const res = await axios.get(`${apiUrl}/itens-avulsos`);
      setItensAvulsos(res.data.itens || res.data || []);
    } catch (err) {
      console.error("Erro ao buscar itens avulsos:", err);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchItensAvulsos();
  }, []);

  return (
    <div className="container">
      <EscolherCadastro tipo={tipoSelecionado} setTipo={setTipoSelecionado} />

      {tipoSelecionado === 'produto' ? (
        <CadastroProdutos onProdutoCadastrado={(novo) => setProdutos([...produtos, novo])} />
      ) : (
        <CadastroItensAvulsos onItemCadastrado={(novo) => setItensAvulsos([...itensAvulsos, novo])} />
      )}

      <hr style={{ margin: '40px 0', border: '1px solid #eee' }} />

      {tipoSelecionado === 'produto' ? (
        <CardsGenerico
          itens={produtos}
          tipo="produtos"
          atualizarLista={fetchProdutos}
        />
      ) : (
        <CardsGenerico
          itens={itensAvulsos}
          tipo="itens-avulsos"
          atualizarLista={fetchItensAvulsos}
        />
      )}
    </div>
  );
}

export default App;
