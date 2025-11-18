import React, { useState } from "react";
import axios from "axios";
import './App.css';

function CardsGenerico({ itens, tipo, atualizarLista }) {
  const [itemEdit, setItemEdit] = useState(null);
  const [modal, setModal] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar?")) return;
    try {
      await axios.delete(`${apiUrl}/${tipo}/${id}`);
      atualizarLista();
    } catch (err) {
      console.error(`Erro ao deletar ${tipo}:`, err);
    }
  };

  // 🔥 AGORA O PUT ENVIA IMAGEM E TEXTO CORRETAMENTE
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("nome", itemEdit.nome);
      formData.append("descricao", itemEdit.descricao);
      formData.append("tags", itemEdit.tags);
      formData.append("categoria", itemEdit.categoria || ""); // se tiver
      if (itemEdit.imagem_url instanceof File) {
        formData.append("imagem_url", itemEdit.imagem_url);
      }

      await axios.put(`${apiUrl}/${tipo}/${itemEdit.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setModal(false);
      setItemEdit(null);
      atualizarLista();
    } catch (err) {
      console.error(`Erro ao atualizar ${tipo}:`, err);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {tipo === "produtos" ? "Produtos Cadastrados" : "Itens Avulsos Cadastrados"}
      </h2>

      <div className="lista-container">
        {itens.map((i) => (
          <div key={i.id} className="produto-card">
            {i.imagem_url && <img src={i.imagem_url} alt={i.nome} />}
            <h3>{i.nome}</h3>
            <p>{i.descricao}</p>
            <span>Tags: {Array.isArray(i.tags) ? i.tags.join(", ") : i.tags}</span>
            <div className="botoes-acao">
              <button onClick={() => { setItemEdit(i); setModal(true); }}>Editar</button>
              <button onClick={() => handleDelete(i.id)}>Deletar</button>
            </div>
          </div>
        ))}
      </div>

      {modal && itemEdit && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar {tipo === "produtos" ? "Produto" : "Item Avulso"}</h3>

            <input
              value={itemEdit.nome}
              onChange={(e) => setItemEdit({ ...itemEdit, nome: e.target.value })}
              placeholder="Nome"
            />
            <textarea
              value={itemEdit.descricao}
              onChange={(e) => setItemEdit({ ...itemEdit, descricao: e.target.value })}
              placeholder="Descrição"
            />
            <input
              value={itemEdit.tags}
              onChange={(e) => setItemEdit({ ...itemEdit, tags: e.target.value })}
              placeholder="Tags (vírgula)"
            />

            {/* 🔥 CAMPO PARA MUDAR A IMAGEM */}
            <input
              type="file"
              onChange={(e) => setItemEdit({ ...itemEdit, imagem_url: e.target.files[0] })}
            />

            <button onClick={handleSave}>Salvar</button>
            <button onClick={() => { setModal(false); setItemEdit(null); }}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardsGenerico;
