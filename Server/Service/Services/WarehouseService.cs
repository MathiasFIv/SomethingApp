using Microsoft.EntityFrameworkCore;
using Repository.DbContext;
using Repository.DTOS;
using Repository.Entities;

namespace Repository.Services;

public class WarehouseService
{
    private readonly AppDbContext _context;

    public WarehouseService(AppDbContext context)
    {
        _context = context;
    }

    // =========================
    // CREATE
    // =========================
    public async Task<WarehouseDTOs.WarehouseDto> CreateAsync(WarehouseDTOs.CreateWarehouseDto dto)
    {
        var warehouse = new Warehouse
        {
            Id = Guid.NewGuid(),
            Name = dto.Name
        };

        _context.Warehouses.Add(warehouse);
        await _context.SaveChangesAsync();

        return new WarehouseDTOs.WarehouseDto(warehouse.Id, warehouse.Name);
    }

    // =========================
    // READ ALL
    // =========================
    public async Task<List<WarehouseDTOs.WarehouseDto>> GetAllAsync()
    {
        return await _context.Warehouses
            .Select(w => new WarehouseDTOs.WarehouseDto(w.Id, w.Name))
            .ToListAsync();
    }

    // =========================
    // READ ONE
    // =========================
    public async Task<WarehouseDTOs.WarehouseDto?> GetByIdAsync(Guid id)
    {
        return await _context.Warehouses
            .Where(w => w.Id == id)
            .Select(w => new WarehouseDTOs.WarehouseDto(w.Id, w.Name))
            .FirstOrDefaultAsync();
    }

    // =========================
    // UPDATE
    // =========================
    public async Task<bool> UpdateAsync(Guid id, WarehouseDTOs.UpdateWarehouseDto dto)
    {
        var warehouse = await _context.Warehouses.FindAsync(id);
        if (warehouse == null) return false;

        warehouse.Name = dto.Name;

        await _context.SaveChangesAsync();
        return true;
    }

    // =========================
    // DELETE
    // =========================
    public async Task<bool> DeleteAsync(Guid id)
    {
        var warehouse = await _context.Warehouses.FindAsync(id);
        if (warehouse == null) return false;

        _context.Warehouses.Remove(warehouse);
        await _context.SaveChangesAsync();
        return true;
    }

    // =========================
    // STOCK OPERATIONS
    // =========================

    public async Task AddStock(Guid warehouseId, Guid itemId, int quantity)
    {
        var existing = await _context.WarehouseItems
            .FindAsync(warehouseId, itemId);

        if (existing != null)
        {
            existing.Quantity += quantity;
        }
        else
        {
            _context.WarehouseItems.Add(new WarehouseItem
            {
                WarehouseId = warehouseId,
                ItemId = itemId,
                Quantity = quantity
            });
        }

        await _context.SaveChangesAsync();
    }

    public async Task RemoveStock(Guid warehouseId, Guid itemId, int quantity)
    {
        var existing = await _context.WarehouseItems
            .FindAsync(warehouseId, itemId);

        if (existing == null) return;

        existing.Quantity -= quantity;

        if (existing.Quantity <= 0)
        {
            _context.WarehouseItems.Remove(existing);
        }

        await _context.SaveChangesAsync();
    }
}