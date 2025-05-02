import React, { useState, useEffect } from 'react';
import { fetchSales, createSale, updateSale, deleteSale, fetchVehicles, fetchCustomers } from '../services/api';
import { Sale } from '../types/sale';
import { Vehicle } from '../types/vehicle';
import { Customer } from '../types/customer';

const SalesRecords: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({ vehicleId: '', customerId: '', saleDate: '', price: 0, status: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [saleData, vehicleData, customerData] = await Promise.all([
          fetchSales(filters),
          fetchVehicles({}),
          fetchCustomers({})
        ]);
        setSales(saleData);
        setVehicles(vehicleData);
        setCustomers(customerData);
      } catch (err) {
        setError('Failed to load data');
      }
    };
    loadData();
  }, [filters]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateSale(editId, form);
      } else {
        await createSale(form);
      }
      setForm({ vehicleId: '', customerId: '', saleDate: '', price: 0, status: '' });
      setEditId(null);
      setSales(await fetchSales(filters));
    } catch (err) {
      setError('Failed to save sale');
    }
  };

  const handleEdit = (sale: Sale) => {
    setForm({
      vehicleId: (sale.vehicleId as any)?._id || '',
      customerId: (sale.customerId as any)?._id || '',
      saleDate: sale.saleDate.split('T')[0],
      price: sale.price,
      status: sale.status
    });
    setEditId(sale._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSale(id);
      setSales(await fetchSales(filters));
    } catch (err) {
      setError('Failed to delete sale');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Records</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
      </div>
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          value={form.vehicleId}
          onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
          className="border p-2 mr-2"
          required
        >
          <option value="" disabled>Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>{vehicle.make} {vehicle.model}</option>
          ))}
        </select>
        <select
          value={form.customerId}
          onChange={(e) => setForm({ ...form, customerId: e.target.value })}
          className="border p-2 mr-2"
          required
        >
          <option value="" disabled>Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>{customer.name}</option>
          ))}
        </select>
        <input
          type="date"
          placeholder="Sale Date"
          value={form.saleDate}
          onChange={(e) => setForm({ ...form, saleDate: e.target.value })}
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
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 mr-2"
          required
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold px-6 py-2 rounded shadow hover:brightness-110 transition w-full md:w-auto">
          {editId ? 'Update' : 'Add'} Sale
        </button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Vehicle</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Sale Date</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td className="border p-2">
                {(sale.vehicleId as any) ? `${(sale.vehicleId as any).make} ${(sale.vehicleId as any).model}` : 'Vehicle Not Found'}
              </td>
              <td className="border p-2">
                {(sale.customerId as any) ? (sale.customerId as any).name : 'Customer Not Found'}
              </td>
              <td className="border p-2">{new Date(sale.saleDate).toLocaleDateString()}</td>
              <td className="border p-2">{sale.price}</td>
              <td className="border p-2">{sale.status}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(sale)} className="bg-yellow-500 text-white p-1 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(sale._id)} className="bg-red-500 text-white p-1">
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

export default SalesRecords;