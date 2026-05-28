import type {Product} from '../types/inventory';

interface ProductTableProps {
    products: Product[];
    onOpenTransfer: (p: Product) => void;
    onOpenEdit: (p: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onOpenTransfer, onOpenEdit }) => {
    return (
        <div className="overflow-x-auto w-full border border-base-200 rounded-xl bg-base-100">
            <table className="table table-lg table-zebra w-full">
                <thead>
                <tr className="text-base-content/70 border-b border-base-200 bg-base-200/50">
                    <th className="py-4">Product Name</th>
                    <th className="py-4">Price</th>
                    <th className="py-4">Categories</th>
                    <th className="py-4 text-center">Esbjerg</th>
                    <th className="py-4 text-center">Kolding</th>
                    <th className="py-4 text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center py-8 opacity-40 italic">No products found...</td>
                    </tr>
                ) : (
                    products.map(p => (
                        <tr key={p.id} className="border-b border-base-200/60 last:border-none hover:bg-base-200/30 transition-colors">
                            <td className="font-bold text-base max-w-[200px] truncate">{p.name}</td>
                            <td className="font-mono text-success font-semibold">${p.price.toFixed(2)}</td>
                            <td>
                                <div className="flex flex-wrap gap-1 max-w-[250px]">
                                    {p.categories.length > 0 ? (
                                        p.categories.map(c => <span key={c} className="badge badge-sm badge-outline border-base-content/30 text-xs py-2 px-2">{c}</span>)
                                    ) : (
                                        <span className="text-base-content/30 text-xs italic">none</span>
                                    )}
                                </div>
                            </td>

                            {/* Esbjerg Stock Column */}
                            <td className="text-center">
                                <div className={`inline-flex items-center justify-center min-w-[50px] py-1.5 px-3 rounded-lg font-mono font-bold ${
                                    p.stock.esbjerg <= 5 ? "bg-error/15 text-error ring-1 ring-error/30" : "bg-base-200"
                                }`}>
                                    {p.stock.esbjerg}
                                    {p.stock.esbjerg <= 5 && <span className="ml-1 text-xs">⚠️</span>}
                                </div>
                            </td>

                            {/* Kolding Stock Column */}
                            <td className="text-center">
                                <div className={`inline-flex items-center justify-center min-w-[50px] py-1.5 px-3 rounded-lg font-mono font-bold ${
                                    p.stock.kolding <= 5 ? "bg-error/15 text-error ring-1 ring-error/30" : "bg-base-200"
                                }`}>
                                    {p.stock.kolding}
                                    {p.stock.kolding <= 5 && <span className="ml-1 text-xs">⚠️</span>}
                                </div>
                            </td>

                            {/* Actions Column */}
                            <td className="text-right">
                                <div className="flex gap-2 justify-end">
                                    <button className="btn btn-sm btn-outline btn-info font-medium" onClick={() => onOpenEdit(p)}>Edit</button>
                                    <button className="btn btn-sm btn-outline btn-warning font-medium" onClick={() => onOpenTransfer(p)}>Transfer</button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};