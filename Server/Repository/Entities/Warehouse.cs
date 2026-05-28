namespace Repository.Entities;

public sealed class Warehouse
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public ICollection<WarehouseItem> WarehouseItems { get; set; }
        = new List<WarehouseItem>();
}