import React from 'react';

function ListaItensAvulsos({ itens, onItemAtualizado }) {
  if (!itens) return null;

  return (
    <div>
      <h2>Itens Avulsos Cadastrados</h2>
      <div className="lista-container">
        {itens.map(i => (
          <div key={i.id} className="produto-card">
            <img src={i.imagem_url} alt={i.nome} />
            <h3>{i.nome}</h3>
            <p>{i.descricao}</p>
            <span>Tags: {Array.isArray(i.tags) ? i.tags.join(', ') : i.tags}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaItensAvulsos;
