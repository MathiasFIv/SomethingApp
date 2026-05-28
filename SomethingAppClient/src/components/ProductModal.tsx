import { useState } from 'react';
import type {Product} from '../types/inventory';

interface ProductModalProps {
    product?: Product | null;
    onClose: () => void;
    onSave: (product: Product) => void;
    existingCategories: string[];
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave, existingCategories }) => {
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price || 0);
    const [categories, setCategories] = useState<string[]>(product?.categories || []);
    const [esbjergStock, setEsbjergStock] = useState(product?.stock.esbjerg || 0);
    const [koldingStock, setKoldingStock] = useState(product?.stock.kolding || 0);
    const [customCat, setCustomCat] = useState('');

    const handleAddCategory = (cat: string) => {
        if (cat && !categories.includes(cat)) {
            setCategories([...categories, cat]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: product?.id || Date.now().toString(),
            name,
            price,
            categories,
            stock: { esbjerg: esbjergStock, kolding: koldingStock }
        });
        onClose();
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-md">
                <h3 className="font-bold text-lg mb-4">{product ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} className="input input-bordered w-full" required />
                    <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} className="input input-bordered w-full" required />

                    <div className="bg-base-200 p-3 rounded-lg space-y-2">
                        <label className="text-xs font-semibold uppercase opacity-60 block">Selected Categories</label>
                        <div className="flex flex-wrap gap-1 min-h-[24px]">
                            {categories.map(c => <span key={c} className="badge badge-secondary">{c}</span>)}
                        </div>
                        <div className="flex gap-2 mt-2">
                            <select className="select select-bordered select-sm flex-1" onChange={(e) => { handleAddCategory(e.target.value); e.target.value = ""; }} defaultValue="">
                                <option value="" disabled>Choose existing...</option>
                                {existingCategories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <input placeholder="Or type custom category" value={customCat} onChange={e => setCustomCat(e.target.value)} className="input input-bordered input-sm flex-1" />
                            <button type="button" className="btn btn-sm btn-primary" onClick={() => { handleAddCategory(customCat); setCustomCat(''); }}>Add</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Esbjerg Stock</span></label>
                            <input type="number" value={esbjergStock} onChange={e => setEsbjergStock(Number(e.target.value))} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Kolding Stock</span></label>
                            <input type="number" value={koldingStock} onChange={e => setKoldingStock(Number(e.target.value))} className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-success">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};