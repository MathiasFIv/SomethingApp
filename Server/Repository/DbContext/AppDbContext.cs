using Microsoft.EntityFrameworkCore;
using Repository.Entities;

namespace Repository.DbContext;

public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            // Primary Key
            entity.HasKey(u => u.UserId);

            // Properties
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

            // Unique constraint on Email
            entity.HasIndex(u => u.Email)
                .IsUnique();
        });
    }
}