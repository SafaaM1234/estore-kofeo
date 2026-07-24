import React from "react";

const Orders = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <p>Aucune commande trouvée.</p>;
  }

  return (
    <div className="orders">
      <h3>Liste des commandes</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>Commande #{order.id}</strong> - {order.status} - {order.total} MAD
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;