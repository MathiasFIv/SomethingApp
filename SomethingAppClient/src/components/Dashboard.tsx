import { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { ProductTable } from './ProductTable';
import { TransferModal } from './TransferModal';
import { ProductModal } from './ProductModal';
import type {Product} from '../types/inventory';

export const Dashboard: React.FC = () => {
    const { products, transferStock, addOrUpdateProduct } = useInventory();
    const [filterWarehouse, setFilterWarehouse] = useState<'all' | 'esbjerg' | 'kolding'>('all');
    const [search, setSearch] = useState('');

    const [activeModal, setActiveModal] = useState<'edit' | 'transfer' | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const allCategories = Array.from(new Set(products.flatMap(p => p.categories)));

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.categories.some(c => c.toLowerCase().includes(search.toLowerCase()));
        if (filterWarehouse === 'all') return matchesSearch;
        return matchesSearch && p.stock[filterWarehouse] > 0;
    });

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-300 pb-5">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Inventory Management</h1>
                    <p className="text-sm opacity-60">Esbjerg & Kolding Hubs</p>
                </div>
                <button onClick={() => { setSelectedProduct(null); setActiveModal('edit'); }} className="btn btn-primary">+ Add Product</button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <input placeholder="Search products or categories..." value={search} onChange={e => setSearch(e.target.value)} className="input input-bordered w-full sm:max-w-xs" />

                <div className="join">
                    <button className={`join-item btn ${filterWarehouse === 'all' ? 'btn-active btn-primary' : ''}`} onClick={() => setFilterWarehouse('all')}>All Hubs</button>
                    <button className={`join-item btn ${filterWarehouse === 'esbjerg' ? 'btn-active btn-primary' : ''}`} onClick={() => setFilterWarehouse('esbjerg')}>Esbjerg</button>
                    <button className={`join-item btn ${filterWarehouse === 'kolding' ? 'btn-active btn-primary' : ''}`} onClick={() => setFilterWarehouse('kolding')}>Kolding</button>
                </div>
            </div>

            <ProductTable
                products={filteredProducts}
                onOpenTransfer={(p) => { setSelectedProduct(p); setActiveModal('transfer'); }}
                onOpenEdit={(p) => { setSelectedProduct(p); setActiveModal('edit'); }}
            />

            {activeModal === 'transfer' && selectedProduct && (
                <TransferModal product={selectedProduct} onClose={() => setActiveModal(null)} onTransfer={transferStock} />
            )}

            {activeModal === 'edit' && (
                <ProductModal
                    product={selectedProduct}
                    existingCategories={allCategories}
                    onClose={() => setActiveModal(null)}
                    onSave={addOrUpdateProduct}
                />
            )}
        </div>
    );
};