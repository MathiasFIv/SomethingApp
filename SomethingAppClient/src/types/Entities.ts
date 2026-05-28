// =====================
// Warehouse System Types
// =====================

export type Warehouse = {
    warehouseId: string;
    name: string;
    warehouseItems?: WarehouseItem[];
};

export type Item = {
    itemId: string;
    name: string;
    warehouseItems?: WarehouseItem[];
    itemCategories?: ItemCategory[];
};

export type Category = {
    categoryId: string;
    name: string;
    itemCategories?: ItemCategory[];
};

export type WarehouseItem = {
    warehouseId: string;
    itemId: string;
    quantity: number;

    warehouse?: Warehouse;
    item?: Item;
};

export type ItemCategory = {
    itemId: string;
    categoryId: string;

    item?: Item;
    category?: Category;
};