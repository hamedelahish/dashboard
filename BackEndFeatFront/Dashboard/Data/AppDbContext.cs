namespace Dashboard.Data
{
  using Dashboard.Models;
  using Microsoft.EntityFrameworkCore;
  using System.Collections.Generic;
  using System.Reflection.Emit;
 

  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Gallery> Galleries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Define relationships if necessary
      modelBuilder.Entity<Product>()
          .HasOne(p => p.Category)
          .WithMany(c => c.Products)
          .HasForeignKey(p => p.CategoryId);

   
    }
  }

}
