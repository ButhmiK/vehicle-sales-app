import React from 'react';
import { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-48 object-cover mb-2" />
      <h2 className="text-xl font-bold">{vehicle.make} {vehicle.model}</h2>
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Type: {vehicle.type}</p>
    </div>
  );
};

export default VehicleCard;