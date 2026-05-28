import type {Product} from '../types/inventory';

interface ProductTableProps {
    products: Product[];
    onOpenTransfer: (p: Product) => void;
    onOpenEdit: (p: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onOpenTransfer, onOpenEdit }) => {
    return (
        <div className="overflow-x-auto border border-base-300 rounded-box">
            <table className="table table-zebra w-full">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Categories</th>
                    <th>Esbjerg Stock</th>
                    <th>Kolding Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map(p => (
                    <tr key={p.id}>
                        <td className="font-semibold">{p.name}</td>
                        <td>${p.price.toFixed(2)}</td>
                        <td>
                            <div className="flex flex-wrap gap-1">
                                {p.categories.length > 0 ? (
                                    p.categories.map(c => <span key={c} className="badge badge-outline">{c}</span>)
                                ) : (
                                    <span className="text-base-content/40 text-sm">—</span>
                                )}
                            </div>
                        </td>
                        <td className={p.stock.esbjerg <= 5 ? "bg-error/20 text-error font-bold" : ""}>
                            {p.stock.esbjerg} {p.stock.esbjerg <= 5 && <span className="badge badge-error badge-sm ml-1">LOW</span>}
                        </td>
                        <td className={p.stock.kolding <= 5 ? "bg-error/20 text-error font-bold" : ""}>
                            {p.stock.kolding} {p.stock.kolding <= 5 && <span className="badge badge-error badge-sm ml-1">LOW</span>}
                        </td>
                        <td>
                            <div className="flex gap-2">
                                <button className="btn btn-sm btn-square btn-outline btn-info" onClick={() => onOpenEdit(p)}>Edit</button>
                                <button className="btn btn-sm btn-outline btn-warning" onClick={() => onOpenTransfer(p)}>Transfer</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};