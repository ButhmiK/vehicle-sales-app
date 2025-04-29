export interface Sale {
    _id: string;
    vehicleId: string | { _id: string; make: string; model: string };
    customerId: string | { _id: string; name: string };
    saleDate: string;
    price: number;
    status: string;
  }