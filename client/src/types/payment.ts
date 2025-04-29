// client/src/types/payment.ts
export interface Payment {
    _id: string;
    vehicleId: string | { _id: string; make: string; model: string };
    amount: number;
    date: string;
    method: string;
  }