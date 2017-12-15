namespace ProductAdmin.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using ProductAdmin.Models;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ProductAdmin.Models.ProductServiceContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ProductAdmin.Models.ProductServiceContext context)
        {
            context.TypeProducts.AddOrUpdate(x => x.Id,
                new TypeProduct() { Id = 1, Name = "Hardware" },
                new TypeProduct() { Id = 2, Name = "Juguetes" },
                new TypeProduct() { Id = 3, Name = "Software" }
                );

            context.Products.AddOrUpdate(x => x.Id,
                new Product()
                {
                    Id = 1,
                    Name = "Producto 1",
                    Description = "Un producto comun",
                    TypeProductId = 1,
                    Price = 9.99M
                },
                new Product()
                {
                    Id = 1,
                    Name = "Producto 4",
                    Description = "Un producto comun",
                    TypeProductId = 2,
                    Price = 9.99M
                },
                new Product()
                {
                    Id = 1,
                    Name = "Producto 2",
                    Description = "Un producto comun",
                    TypeProductId = 3,
                    Price = 9.99M
                },
                new Product()
                {
                    Id = 1,
                    Name = "Producto 3",
                    Description = "Un producto comun",
                    TypeProductId = 1,
                    Price = 9.99M
                }
                );
        }
    }
}
