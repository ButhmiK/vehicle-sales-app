import React, { useState, useEffect } from 'react';
import { fetchPayments, createPayment, updatePayment, deletePayment, fetchVehicles } from '../services/api';
import { Payment } from '../types/payment';
import { Vehicle } from '../types/vehicle';

const AdvancePayment: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [form, setForm] = useState({ vehicleId: '', amount: 0, date: '', method: '' });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [paymentData, vehicleData] = await Promise.all([fetchPayments(), fetchVehicles({})]);
        setPayments(paymentData);
        setVehicles(vehicleData);
      } catch (err) {
        setError('Failed to load data');
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updatePayment(editId, form);
      } else {
        await createPayment(form);
      }
      setForm({ vehicleId: '', amount: 0, date: '', method: '' });
      setEditId(null);
      setPayments(await fetchPayments());
    } catch (err) {
      setError('Failed to save payment');
    }
  };

  const handleEdit = (payment: Payment) => {
    setForm({ vehicleId: payment.vehicleId as string, amount: payment.amount, date: payment.date.split('T')[0], method: payment.method });
    setEditId(payment._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePayment(id);
      setPayments(await fetchPayments());
    } catch (err) {
      setError('Failed to delete payment');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Advance Payment</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          value={form.vehicleId}
          onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
          className="border p-2 mr-2"
          required
        >
          <option value="" disabled>Select Vehicle</option>
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>{vehicle.make} {vehicle.model}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="date"
          placeholder="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <select
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
          className="border p-2 mr-2"
          required
        >
          <option value="">Select Method</option>
          <option value="Card">Card</option>
          <option value="Cash">Cash</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editId ? 'Update' : 'Add'} Payment
        </button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Vehicle</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Method</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="border p-2">
                {(payment.vehicleId as any).make} {(payment.vehicleId as any).model}
              </td>
              <td className="border p-2">{payment.amount}</td>
              <td className="border p-2">{new Date(payment.date).toLocaleDateString()}</td>
              <td className="border p-2">{payment.method}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(payment)} className="bg-yellow-500 text-white p-1 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(payment._id)} className="bg-red-500 text-white p-1">
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

export default AdvancePayment;