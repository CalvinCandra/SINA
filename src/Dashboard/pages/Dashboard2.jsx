import React from "react";

function Dashboard2() {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold">Dashboard 2</h2>
      <p className="mt-2 text-lg">Selamat datang di Dashboard 2!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl">Card 1</h3>
          <p className="mt-2">Informasi card pertama di dashboard 2</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl">Card 2</h3>
          <p className="mt-2">Informasi card kedua di dashboard 2</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl">Card 3</h3>
          <p className="mt-2">Informasi card ketiga di dashboard 2</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard2;
