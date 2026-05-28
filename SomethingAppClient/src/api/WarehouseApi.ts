// @ts-ignore
import type { Warehouse } from "../types/entities";

const BASE_URL = "https://localhost:5042/api"; // change if needed

async function handleResponse(res: Response) {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "API Error");
    }
    return res.json();
}

// =====================
// Warehouse API
// =====================

export async function getWarehouses(): Promise<Warehouse[]> {
    const res = await fetch(`${BASE_URL}/warehouse`);
    return handleResponse(res);
}

export async function getWarehouse(id: string): Promise<Warehouse> {
    const res = await fetch(`${BASE_URL}/warehouse/${id}`);
    return handleResponse(res);
}

export async function createWarehouse(name: string): Promise<Warehouse> {
    const res = await fetch(`${BASE_URL}/warehouse`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    return handleResponse(res);
}

export async function addStock(
    warehouseId: string,
    itemId: string,
    quantity: number
) {
    const res = await fetch(
        `${BASE_URL}/warehouse/${warehouseId}/stock/add?itemId=${itemId}&quantity=${quantity}`,
        { method: "POST" }
    );

    return handleResponse(res);
}

export async function removeStock(
    warehouseId: string,
    itemId: string,
    quantity: number
) {
    const res = await fetch(
        `${BASE_URL}/warehouse/${warehouseId}/stock/remove?itemId=${itemId}&quantity=${quantity}`,
        { method: "POST" }
    );

    return handleResponse(res);
}