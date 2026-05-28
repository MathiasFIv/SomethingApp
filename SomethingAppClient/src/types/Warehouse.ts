import type {WarehouseItem} from "./Entities.ts";

export type Warehouse = {
    warehouseId: string;
    name: string;
    warehouseItems?: WarehouseItem[];
};