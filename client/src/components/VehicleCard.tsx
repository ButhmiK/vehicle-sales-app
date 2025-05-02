import React from 'react';
import { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div
      className="max-w-xs border border-green-3 bg-green-500 p-2 rounded-lg shadow-md 
                 hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:bg-orange-400"
    >
      <img
        src={vehicle.image}
        alt={`${vehicle.make} ${vehicle.model}`}
        className="w-full h-28 object-cover rounded-md mb-2"
      />
      <h2 className="text-lg font-semibold text-white mb-1">
        {vehicle.make} {vehicle.model}
      </h2>
      <p className="text-sm text-gray-800"><span className="font-medium">Year:</span> {vehicle.year}</p>
      <p className="text-sm text-gray-800"><span className="font-medium">Price:</span> LKR {vehicle.price}</p>
      <p className="text-sm text-gray-800"><span className="font-medium">Type:</span> {vehicle.type}</p>
    </div>
  );
};

export default VehicleCard;
