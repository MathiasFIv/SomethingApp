import { useState } from 'react';
import type {Product, Warehouse, StockTransferPayload} from '../types/inventory';

interface TransferModalProps {
    product: Product;
    onClose: () => void;
    onTransfer: (payload: StockTransferPayload) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({ product, onClose, onTransfer }) => {
    const [from, setFrom] = useState<Warehouse>('esbjerg');
    const [to, setTo] = useState<Warehouse>('kolding');
    const [amount, setAmount] = useState<number>(1);

    const handleFromChange = (val: Warehouse) => {
        setFrom(val);
        setTo(val === 'esbjerg' ? 'kolding' : 'esbjerg');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onTransfer({ productId: product.id, from, to, amount });
        onClose();
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Transfer: {product.name}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">From Warehouse</span></label>
                        <select className="select select-bordered w-full" value={from} onChange={(e) => handleFromChange(e.target.value as Warehouse)}>
                            <option value="esbjerg">Esbjerg ({product.stock.esbjerg} left)</option>
                            <option value="kolding">Kolding ({product.stock.kolding} left)</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">To Warehouse</span></label>
                        <select className="select select-bordered w-full" value={to} disabled>
                            <option value="esbjerg">Esbjerg</option>
                            <option value="kolding">Kolding</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text">Amount to Move</span></label>
                        <input type="number" min="1" max={product.stock[from]} value={amount} onChange={e => setAmount(Number(e.target.value))} className="input input-bordered w-full" />
                    </div>

                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-warning" disabled={amount > product.stock[from] || amount <= 0}>Confirm Transfer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};