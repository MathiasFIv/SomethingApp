namespace Repository.Entities;

public sealed class ItemCategory
{
    public Guid ItemId { get; set; }
    public Item Item { get; set; } = null!;

    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}