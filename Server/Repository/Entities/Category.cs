namespace Repository.Entities;


public sealed class Category
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public ICollection<ItemCategory> ItemCategories { get; set; }
        = new List<ItemCategory>();
}