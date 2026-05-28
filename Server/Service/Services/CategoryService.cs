using Microsoft.EntityFrameworkCore;
using Repository.DbContext;
using Repository.DTOS;
using Repository.Entities;

namespace Repository.Services;

public class CategoryService
{
    private readonly AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<CategoryDTOs.CategoryDto> CreateAsync(CategoryDTOs.CreateCategoryDto dto)
    {
        var category = new Category
        {
            Id = Guid.NewGuid(),
            Name = dto.Name
        };

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return new CategoryDTOs.CategoryDto(category.Id, category.Name);
    }

    public async Task<List<CategoryDTOs.CategoryDto>> GetAllAsync()
    {
        return await _context.Categories
            .Select(c => new CategoryDTOs.CategoryDto(c.Id, c.Name))
            .ToListAsync();
    }
}