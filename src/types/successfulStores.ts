export interface Store {
  id: number;
  sales: string;
  units: string;
  current: string;
  productSales: string;
  period: string;
  increase: string;
  previousIncrease: string;
  time: string;
}

export interface SuccessfulStoresData {
  stores: Store[];
}

