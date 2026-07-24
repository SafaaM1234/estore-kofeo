// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [profileUser, setProfileUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(
          `http://localhost:8080/api/customers/${userId}`
        );
        setProfileUser(userRes.data);

        const ordersRes = await axios.get(
          `http://localhost:8080/api/orders/user/${userId}`
        );
        setOrders(ordersRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
    else setLoading(false);
  }, [userId]);

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!profileUser) return <div className="p-6">Utilisateur introuvable</div>;

  return (
    <div className="min-h-screen bg-[#f6efe7] mt-20 pb-20 p-6">
      <div className="max-w-6xl mx-auto flex gap-6">

        {/* LEFT SIDE - PROFILE */}
        <div className="w-1/3 bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col items-center text-center">

            <div className="w-20 h-20 rounded-full bg-[#1A0F0A] text-white flex items-center justify-center text-2xl mb-3">
              {profileUser.firstName?.charAt(0)}
            </div>

            <h2 className="text-xl font-bold">
              {profileUser.firstName} {profileUser.lastName}
            </h2>

            <p className="text-gray-500 text-sm mb-4">
              Client Premium
            </p>

            <div className="text-left w-full space-y-2 text-sm">
              <p>📧 {profileUser.email}</p>
              <p>📞 {profileUser.profile?.phone || "-"}</p>
              <p>📍 {profileUser.profile?.address || "-"}</p>
              <p>🏙️ {profileUser.profile?.city || "-"}</p>
              <p>🌍 {profileUser.profile?.country || "-"}</p>
            </div>

            <button className="mt-5 w-full bg-[#1A0F0A] text-white py-2 rounded-lg">
              Modifier le profil
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - ORDERS */}
        <div className="w-2/3 bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold mb-4">Commandes</h3>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p>Aucune commande</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="border rounded-xl p-4 flex justify-between">
                  <div>
                    <p className="font-bold">#{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">{order.status}</p>
                  </div>
                  <p className="font-bold text-[#1A0F0A]">
                    {order.totalAmount} MAD
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;