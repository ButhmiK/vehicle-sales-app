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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl"><br/>
      <h1 className="text-3xl font-bold text-green-700 mb-6">Find Available Vehicles</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 shadow-sm"
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 shadow-sm"
          onChange={handleFilterChange}
        />
        <select
          name="type"
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 shadow-sm"
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Home;
