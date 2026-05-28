namespace Repository.Entities;

public sealed class WarehouseItem
{
    public Guid WarehouseId { get; set; }
    public Warehouse Warehouse { get; set; } = null!;

    public Guid ItemId { get; set; }
    public Item Item { get; set; } = null!;

    public int Quantity { get; set; }
}