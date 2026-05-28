using Microsoft.EntityFrameworkCore;
using Repository.Entities;

namespace Repository.DbContext;

public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // Existing
    public DbSet<User> Users { get; set; } = null!;

    // New
    public DbSet<Warehouse> Warehouses { get; set; } = null!;
    public DbSet<Item> Items { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<WarehouseItem> WarehouseItems { get; set; } = null!;
    public DbSet<ItemCategory> ItemCategories { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // =========================
        // USER
        // =========================
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.UserId);

            entity.Property(u => u.UserId)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(u => u.FirstName)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(u => u.LastName)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(u => u.HashedPassword)
                .IsRequired()
                .HasMaxLength(500);

            entity.HasIndex(u => u.Email)
                .IsUnique();
        });

        // =========================
        // WAREHOUSE
        // =========================
        modelBuilder.Entity<Warehouse>(entity =>
        {
            entity.HasKey(w => w.Id);

            entity.Property(w => w.Id)
                .IsRequired();

            entity.Property(w => w.Name)
                .IsRequired()
                .HasMaxLength(200);
        });

        // =========================
        // ITEM
        // =========================
        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(i => i.Id);

            entity.Property(i => i.Id)
                .IsRequired();

            entity.Property(i => i.Name)
                .IsRequired()
                .HasMaxLength(200);
        });

        // =========================
        // CATEGORY
        // =========================
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.Id);

            entity.Property(c => c.Id)
                .IsRequired();

            entity.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasIndex(c => c.Name)
                .IsUnique();
        });

        // =========================
        // WAREHOUSE ITEM
        // =========================
        modelBuilder.Entity<WarehouseItem>(entity =>
        {
            // Composite Key
            entity.HasKey(wi => new { wi.WarehouseId, wi.ItemId });

            entity.Property(wi => wi.Quantity)
                .IsRequired();

            // Relationships
            entity.HasOne(wi => wi.Warehouse)
                .WithMany(w => w.WarehouseItems)
                .HasForeignKey(wi => wi.WarehouseId);

            entity.HasOne(wi => wi.Item)
                .WithMany(i => i.WarehouseItems)
                .HasForeignKey(wi => wi.ItemId);
        });

        // =========================
        // ITEM CATEGORY
        // =========================
        modelBuilder.Entity<ItemCategory>(entity =>
        {
            // Composite Key
            entity.HasKey(ic => new { ic.ItemId, ic.CategoryId });

            // Relationships
            entity.HasOne(ic => ic.Item)
                .WithMany(i => i.ItemCategories)
                .HasForeignKey(ic => ic.ItemId);

            entity.HasOne(ic => ic.Category)
                .WithMany(c => c.ItemCategories)
                .HasForeignKey(ic => ic.CategoryId);
        });
    }
}