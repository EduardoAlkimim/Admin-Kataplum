import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import CadastroProduto from './CadastroProdutos';
import Produtos from './Produtos';

function PaginaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchProdutos = useCallback(async () => {
    setError(null);
    try {
      const res = await axios.get(`${apiUrl}/produtos`);
      setProdutos(res.data.produtos || []);
    } catch (err) {
      setError("Não foi possível carregar os produtos.");
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  return (
    <div>
      <CadastroProduto />
      <Produtos produtos={produtos} />
    </div>
  );
}

export default PaginaProdutos;
