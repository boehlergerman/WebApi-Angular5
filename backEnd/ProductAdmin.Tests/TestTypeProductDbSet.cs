using ProductAdmin.Models;
using System.Linq;

namespace ProductAdmin.Tests
{
    class TestTypeProductDbSet : TestDbSet<TypeProduct>
    {
        public override TypeProduct Find(params object[] keyValues)
        {
            return this.SingleOrDefault(type => type.Id == (int)keyValues.Single());
        }
    }
}
