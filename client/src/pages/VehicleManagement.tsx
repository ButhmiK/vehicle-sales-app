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
    setForm({ make: vehicle.make, model: vehicle.model, year: vehicle.year, price: vehicle.price, type: vehicle.type, image: vehicle.image });
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Make"
          value={form.make}
          onChange={(e) => setForm({ ...form, make: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="border p-2 mr-2"
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 mr-2"
          required
        >
          <option value="">Select Type</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editId ? 'Update' : 'Add'} Vehicle
        </button>
      </form>
      <table className="w-full border">
        <thead>
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
            <tr key={vehicle._id}>
              <td className="border p-2">
                <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="w-16 h-16 object-cover" />
              </td>
              <td className="border p-2">{vehicle.make}</td>
              <td className="border p-2">{vehicle.model}</td>
              <td className="border p-2">{vehicle.year}</td>
              <td className="border p-2">{vehicle.price}</td>
              <td className="border p-2">{vehicle.type}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(vehicle)} className="bg-yellow-500 text-white p-1 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(vehicle._id)} className="bg-red-500 text-white p-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleManagement;