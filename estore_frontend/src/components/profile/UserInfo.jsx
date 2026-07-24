import React from "react";

const UserInfo = ({ customer, onUpdate, onDelete }) => (
  <div className="user-info">
    <h3>Informations personnelles</h3>
    <p><strong>Nom:</strong> {customer.name}</p>
    <p><strong>Email:</strong> {customer.email}</p>
    <p><strong>Téléphone:</strong> {customer.phone}</p>
    <p><strong>Adresse:</strong> {customer.address}</p>
    <button onClick={onUpdate}>Modifier</button>
    <button onClick={onDelete}>Supprimer</button>
  </div>
);

export default UserInfo;