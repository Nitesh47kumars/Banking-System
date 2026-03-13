import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const user = useSelector((state)=>state);
  console.log(user)

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bank Dashboard</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>

      {/* Welcome Card */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold">
          Welcome, {user.name}
        </h2>
        <p className="text-gray-500">
          Manage your account and transactions
        </p>
      </div>

      {/* Account Info */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Account Holder</h3>
          <p className="text-lg font-semibold">{user.name}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Email</h3>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Account ID</h3>
          <p className="text-sm font-mono">{user._id}</p>
        </div>

      </div>

      {/* Account Created */}
      <div className="max-w-6xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500 text-sm">Account Created</h3>
        <p className="text-lg">
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

    </section>
  );
};

export default Dashboard;