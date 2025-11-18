import React from 'react';

function ListaProdutos({ produtos, onProdutoAtualizado }) {
  if (!produtos) return null;

  return (
    <div>
      <h2>Produtos Cadastrados</h2>
      <div className="lista-container">
        {produtos.map(p => (
          <div key={p.id} className="produto-card">
            <img src={p.imagem_url} alt={p.nome} />
            <h3>{p.nome}</h3>
            <p>{p.descricao}</p>
            <span>Tags: {Array.isArray(p.tags) ? p.tags.join(', ') : p.tags}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos;
