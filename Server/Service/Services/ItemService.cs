using Microsoft.EntityFrameworkCore;
using Repository.DbContext;
using Repository.DTOS;
using Repository.Entities;

namespace Repository.Services;

public class ItemService
{
    private readonly AppDbContext _context;

    public ItemService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ItemDTOs.ItemDto> CreateAsync(ItemDTOs.CreateItemDto dto)
    {
        var item = new Item
        {
            Id = Guid.NewGuid(),
            Name = dto.Name
        };

        _context.Items.Add(item);
        await _context.SaveChangesAsync();

        return new ItemDTOs.ItemDto(item.Id, item.Name);
    }

    public async Task<List<ItemDTOs.ItemDto>> GetAllAsync()
    {
        return await _context.Items
            .Select(i => new ItemDTOs.ItemDto(i.Id, i.Name))
            .ToListAsync();
    }

    public async Task<bool> UpdateAsync(Guid id, ItemDTOs.UpdateItemDto dto)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return false;

        item.Name = dto.Name;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return false;

        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }
}