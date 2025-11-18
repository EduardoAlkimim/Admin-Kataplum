import React from 'react';

function EscolherCadastro({ tipo, setTipo }) {
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <button
        onClick={() => setTipo('produto')}
        style={{ marginRight: '10px', padding: '10px', background: tipo === 'produto' ? 'purple' : '#eee', color: tipo === 'produto' ? 'white' : 'black' }}
      >
        Produto
      </button>
      <button
        onClick={() => setTipo('item')}
        style={{ padding: '10px', background: tipo === 'item' ? 'purple' : '#eee', color: tipo === 'item' ? 'white' : 'black' }}
      >
        Item Avulso
      </button>
    </div>
  );
}

export default EscolherCadastro;
