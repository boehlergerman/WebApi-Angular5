using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ProductAdmin.Models
{
    public class ProductServiceContext : DbContext
    {
    
        public ProductServiceContext() : base("name=ProductServiceContext")
        {
        }

        public System.Data.Entity.DbSet<ProductAdmin.Models.TypeProduct> TypeProducts { get; set; }

        public System.Data.Entity.DbSet<ProductAdmin.Models.Product> Products { get; set; }
    }
}
