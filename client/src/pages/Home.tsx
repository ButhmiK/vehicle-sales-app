import React, { useState, useEffect } from 'react';
import VehicleCard from '../components/VehicleCard';
import { fetchVehicles } from '../services/api';
import { Vehicle } from '../types/vehicle';

const Home: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState({ price: '', year: '', type: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles(filters);
        setVehicles(data);
      } catch (err) {
        setError('Failed to load vehicles');
      }
    };
    loadVehicles();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Sales</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          className="border p-2 mr-2"
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          className="border p-2 mr-2"
          onChange={handleFilterChange}
        />
        <select name="type" className="border p-2" onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Home;