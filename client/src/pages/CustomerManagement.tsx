import React, { useState, useEffect } from 'react';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/api';
import { Customer } from '../types/customer'

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', type: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers({ name: search });
        setCustomers(data);
      } catch (err) {
        setError('Failed to load customers');
      }
    };
    loadCustomers();
  }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateCustomer(editId, form);
      } else {
        await createCustomer(form);
      }
      setForm({ name: '', email: '', phone: '', address: '', type: '' });
      setEditId(null);
      setCustomers(await fetchCustomers({ name: search }));
    } catch (err) {
      setError('Failed to save customer');
    }
  };

  const handleEdit = (customer: Customer) => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone, address: customer.address, type: customer.type });
    setEditId(customer._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers(await fetchCustomers({ name: search }));
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-8">Customer Management</h1>
      {error && <p className="text-green-500">{error}</p>}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
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
          <option value="Individual">Individual</option>
          <option value="Business">Business</option>
        </select>
        <button type="submit"  className="bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold px-6 py-2 rounded shadow hover:brightness-110 transition w-full md:w-auto">
          {editId ? 'Update' : 'Add'} Customer
        </button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.phone}</td>
              <td className="border p-2">{customer.address}</td>
              <td className="border p-2">{customer.type}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(customer)} className="bg-yellow-500 text-white p-1 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(customer._id)} className="bg-red-500 text-white p-1">
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

export default CustomerManagement;