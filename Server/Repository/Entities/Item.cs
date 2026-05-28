namespace Repository.Entities;

public sealed class Item
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public ICollection<WarehouseItem> WarehouseItems { get; set; }
        = new List<WarehouseItem>();

    public ICollection<ItemCategory> ItemCategories { get; set; }
        = new List<ItemCategory>();
}