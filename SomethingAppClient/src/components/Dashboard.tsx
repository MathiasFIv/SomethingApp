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
        <div style={{ minHeight: '100vh', width: '100vw', display: 'block' }} className="bg-base-300 text-base-content p-6 sm:p-10">
            {/* Container forced to take up wide screen space */}
            <div style={{ maxWidth: '1400px', margin: '0 auto' }} className="bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200 w-full space-y-8">

                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }} className="border-b border-base-200 pb-6">
                    <div>
                        <h1 style={{ fontSize: '2.25rem', fontWeight: 900 }} className="tracking-tight text-primary">
                            Lager Management System
                        </h1>
                        <p style={{ fontSize: '0.875rem' }} className="opacity-60 mt-1 font-medium">Global Hub Matrix: Esbjerg & Kolding</p>
                    </div>
                    <button
                        onClick={() => { setSelectedProduct(null); setActiveModal('edit'); }}
                        className="btn btn-primary btn-md font-bold px-6 shadow-md"
                    >
                        + Add Product
                    </button>
                </div>

                {/* Controls Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }} className="bg-base-200 p-4 rounded-xl">
                    <input
                        placeholder="Search products or categories..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ width: '100%', maxWidth: '350px' }}
                        className="input input-bordered bg-base-100 input-md"
                    />

                    <div className="join">
                        <button className={`join-item btn btn-md ${filterWarehouse === 'all' ? 'btn-primary' : 'btn-ghost bg-base-100'}`} onClick={() => setFilterWarehouse('all')}>All Hubs</button>
                        <button className={`join-item btn btn-md ${filterWarehouse === 'esbjerg' ? 'btn-primary' : 'btn-ghost bg-base-100'}`} onClick={() => setFilterWarehouse('esbjerg')}>Esbjerg</button>
                        <button className={`join-item btn btn-md ${filterWarehouse === 'kolding' ? 'btn-primary' : 'btn-ghost bg-base-100'}`} onClick={() => setFilterWarehouse('kolding')}>Kolding</button>
                    </div>
                </div>

                {/* Content Table Area */}
                <div style={{ width: '100%', display: 'block' }}>
                    <ProductTable
                        products={filteredProducts}
                        onOpenTransfer={(p) => { setSelectedProduct(p); setActiveModal('transfer'); }}
                        onOpenEdit={(p) => { setSelectedProduct(p); setActiveModal('edit'); }}
                    />
                </div>
            </div>

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