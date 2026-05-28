import { useState } from 'react';
import type {Product, StockTransferPayload, Warehouse} from '../types/inventory';
import { toast } from 'react-hot-toast';

const INITIAL_PRODUCTS: Product[] = [
    { id: '1', name: 'Heavy Duty Wrench', price: 149.5, categories: ['Tools'], stock: { esbjerg: 12, kolding: 4 } },
    { id: '2', name: 'Eco Bubble Wrap', price: 89.0, categories: [], stock: { esbjerg: 3, kolding: 15 } }
];

export const useInventory = () => {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

    const checkStockAlerts = (product: Product) => {
        const locations: Warehouse[] = ['esbjerg', 'kolding'];
        locations.forEach(loc => {
            if (product.stock[loc] <= 5) {
                const city = loc.charAt(0).toUpperCase() + loc.slice(1);
                toast.error(`${product.name} is low in ${city}: (${product.stock[loc]} left!)`, { id: `${product.id}-${loc}` });
            }
        });
    };

    const transferStock = (payload: StockTransferPayload) => {
        const { productId, from, to, amount } = payload;
        setProducts(prev => prev.map(p => {
            if (p.id !== productId) return p;
            if (p.stock[from] < amount) {
                toast.error(`Not enough stock in ${from}`);
                return p;
            }
            const updated = {
                ...p,
                stock: { ...p.stock, [from]: p.stock[from] - amount, [to]: p.stock[to] + amount }
            };
            checkStockAlerts(updated);
            return updated;
        }));
    };

    const addOrUpdateProduct = (product: Product) => {
        setProducts(prev => {
            const exists = prev.some(p => p.id === product.id);
            const nextProducts = exists ? prev.map(p => p.id === product.id ? product : p) : [...prev, product];
            checkStockAlerts(product);
            return nextProducts;
        });
    };

    return { products, transferStock, addOrUpdateProduct };
};