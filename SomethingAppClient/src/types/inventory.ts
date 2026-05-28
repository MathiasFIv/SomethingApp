export type Warehouse = 'esbjerg' | 'kolding';

export interface WarehouseStock {
    esbjerg: number;
    kolding: number;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    categories: string[];
    stock: WarehouseStock;
}

export interface StockTransferPayload {
    productId: string;
    from: Warehouse;
    to: Warehouse;
    amount: number;
}