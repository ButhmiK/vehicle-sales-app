import React, { useState, useEffect } from 'react';
import { fetchVehicles, createVehicle, updateVehicle, deleteVehicle } from '../services/api';
import { Vehicle } from '../types/vehicle';

const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [form, setForm] = useState({ make: '', model: '', year: 0, price: 0, type: '', image: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles({});
        setVehicles(data);
      } catch (err) {
        setError('Failed to load vehicles');
      }
    };
    loadVehicles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateVehicle(editId, form);
      } else {
        await createVehicle(form);
      }
      setForm({ make: '', model: '', year: 0, price: 0, type: '', image: '' });
      setEditId(null);
      setVehicles(await fetchVehicles({}));
    } catch (err) {
      setError('Failed to save vehicle');
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setForm({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      type: vehicle.type,
      image: vehicle.image,
    });
    setEditId(vehicle._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVehicle(id);
      setVehicles(await fetchVehicles({}));
    } catch (err) {
      setError('Failed to delete vehicle');
    }
  };

  return (
    <div className="bg-gradient-to-br p-8">
      <div className="bg-white mx-auto rounded-2xl shadow-xl p-12">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">Vehicle Management</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Make"
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
            className="border border-orange-300 p-3 rounded-lg focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className="flex-1 border border-orange-300 p-3 rounded-lg focus:ring-green-500"
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            className="w-32 border border-orange-300 p-3 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="w-40 border border-orange-300 p-3 rounded-lg"
            required
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-48 border border-orange-300 p-3 rounded-lg"
            required
          >
            <option value="">Select Type</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Convertible">Convertible</option>
            <option value="Van">Van</option>
            <option value="Wagon">Wagon</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="flex-1 border border-orange-300 p-3 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-lg"
          >
            {editId ? 'Update' : 'Add'} Vehicle
          </button>
        </form>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => window.print()}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Print
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-green-100">
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Make</th>
                <th className="border p-2">Model</th>
                <th className="border p-2">Year</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id} className="hover:bg-orange-50">
                  <td className="border p-2 text-center">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="border p-2 text-center">{vehicle.make}</td>
                  <td className="border p-2 text-center">{vehicle.model}</td>
                  <td className="border p-2 text-center">{vehicle.year}</td>
                  <td className="border p-2 text-center">{vehicle.price}</td>
                  <td className="border p-2 text-center">{vehicle.type}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagement;