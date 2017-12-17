using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProductAdmin.Models;
using ProductAdmin.Controllers;
using System.Web.Http.Results;
using System.Net;

namespace ProductAdmin.Tests
{
    [TestClass]
    public class TestTypeProductController
    {
        [TestMethod]
        public void PostTypeProduct_ShouldReturnSameProduct()
        {
            var controller = new TypeProductsController(new TestProductServiceContext());

            var item = GetDemoTypeProduct();

            var result =
                controller.PostTypeProduct(item) as CreatedAtRouteNegotiatedContentResult<TypeProduct>;

            Assert.IsNotNull(result);
            Assert.AreEqual(result.RouteName, "DefaultApi");
            Assert.AreEqual(result.RouteValues["id"], result.Content.Id);
            Assert.AreEqual(result.Content.Name, item.Name);
        }

        [TestMethod]
        public void PutProduct_ShouldReturnStatusCode()
        {
            var controller = new TypeProductsController(new TestProductServiceContext());

            var item = GetDemoTypeProduct();

            var result = controller.PutTypeProduct(item.Id, item) as StatusCodeResult;
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(StatusCodeResult));
            Assert.AreEqual(HttpStatusCode.NoContent, result.StatusCode);
        }

        [TestMethod]
        public void PutProduct_ShouldFail_WhenDifferentID()
        {
            var controller = new TypeProductsController(new TestProductServiceContext());

            var badresult = controller.PutTypeProduct(999, GetDemoTypeProduct());
            Assert.IsInstanceOfType(badresult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void GetProduct_ShouldReturnProductWithSameID()
        {
            var context = new TestProductServiceContext();
            context.TypeProducts.Add(GetDemoTypeProduct());

            var controller = new TypeProductsController(context);
            var result = controller.GetTypeProduct(3) as OkNegotiatedContentResult<TypeProduct>;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Id);
        }

        [TestMethod]
        public void GetProducts_ShouldReturnAllProducts()
        {
            var context = new TestProductServiceContext();
            context.TypeProducts.Add(new TypeProduct { Id = 1, Name = "Demo1" });
            context.TypeProducts.Add(new TypeProduct { Id = 2, Name = "Demo2" });
            context.TypeProducts.Add(new TypeProduct { Id = 3, Name = "Demo3" });

            var controller = new TypeProductsController(context);
            var result = controller.GetTypeProducts() as TestTypeProductDbSet;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Local.Count);
        }

        [TestMethod]
        public void DeleteProduct_ShouldReturnOK()
        {
            var context = new TestProductServiceContext();
            var item = GetDemoTypeProduct();
            context.TypeProducts.Add(item);

            var controller = new TypeProductsController(context);
            var result = controller.DeleteTypeProduct(3) as OkNegotiatedContentResult<TypeProduct>;

            Assert.IsNotNull(result);
            Assert.AreEqual(item.Id, result.Content.Id);
        }

        TypeProduct GetDemoTypeProduct()
        {
            return new TypeProduct() { Id = 3, Name = "Demo name" };
        }
    }
}
