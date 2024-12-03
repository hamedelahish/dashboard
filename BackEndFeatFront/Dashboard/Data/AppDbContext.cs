namespace Dashboard.Data
{
    using Dashboard.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using System.Collections.Generic;
    using System.Reflection.Emit;


    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Gallery> Galleries { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>(ConfigureCustomer);
            modelBuilder.Entity<OrderStatus>(ConfigureOrderStatus);
            modelBuilder.Entity<Order>(ConfigureOrder);
            modelBuilder.Entity<Product>(ConfigureProduct);
            modelBuilder.Entity<OrderDetail>(ConfigureOrderDetail);

            //modelBuilder.Entity<Product>()
            //    .HasOne(p => p.Category)
            //    .WithMany(c => c.Products)
            //    .HasForeignKey(p => p.CategoryId);


        }

        private void ConfigureCustomer(EntityTypeBuilder<Customer> builder)
        {
            builder.HasKey(c => c.CustomerId);
        }

        private void ConfigureOrderStatus(EntityTypeBuilder<OrderStatus> builder)
        {
            builder.HasKey(s => s.StatusId);
        }

        private void ConfigureOrder(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(o => o.OrderId);
            builder.Property(o => o.OrderDate).IsRequired().HasDefaultValueSql("GETDATE()");
            builder.HasOne(o => o.Customer).WithMany().HasForeignKey(o => o.CustomerId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(o => o.Status).WithMany().HasForeignKey(o => o.StatusId).OnDelete(DeleteBehavior.Cascade);
        }

        private void ConfigureProduct(EntityTypeBuilder<Product> builder)
        {
            builder.HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId);
            builder.HasKey(p => p.Id);
        }

        private void ConfigureOrderDetail(EntityTypeBuilder<OrderDetail> builder)
        {
            builder.HasKey(od => od.OrderDetailId);
            builder.Property(od => od.TotalPrice).IsRequired().HasColumnType("decimal(18,2)");
            builder.HasOne(od => od.Order).WithMany().HasForeignKey(od => od.OrderId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(od => od.Product).WithMany().HasForeignKey(od => od.ProductId).OnDelete(DeleteBehavior.Cascade);
        }
    }

}
