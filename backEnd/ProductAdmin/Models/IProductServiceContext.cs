using System;
using System.Data.Entity;

namespace ProductAdmin.Models
{
    public interface IProductServiceContext : IDisposable
    {
        DbSet<TypeProduct> TypeProducts { get; }
        int SaveChanges();
        void MarkAsModified(TypeProduct item);
    }
}
