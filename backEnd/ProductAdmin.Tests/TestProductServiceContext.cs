using ProductAdmin.Models;
using System.Data.Entity;

namespace ProductAdmin.Tests
{
    class TestProductServiceContext : IProductServiceContext
    {
        public TestProductServiceContext()
        {
            this.TypeProducts = new TestTypeProductDbSet();
        }

        public DbSet<TypeProduct> TypeProducts { get; set; }

        public int SaveChanges()
        {
            return 0;
        }

        public void MarkAsModified(TypeProduct item) { }
        public void Dispose() { }
    }
}
