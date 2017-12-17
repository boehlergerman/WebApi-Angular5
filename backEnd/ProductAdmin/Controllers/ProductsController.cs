using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProductAdmin.Models;
using System.Threading.Tasks;

namespace ProductAdmin.Controllers
{
    public class ProductsController : ApiController
    {
        private ProductServiceContext db = new ProductServiceContext();

        // GET: api/Products
        [Authorize]
        public IQueryable<ProductDTO> GetProducts()
        {
            var products = from b in db.Products
                           select new ProductDTO()
                           {
                               Id = b.Id,
                               Name = b.Name,
                               Price = b.Price,
                               TypeProductId = b.TypeProductId,
                               TypeProductName = b.TypeProduct.Name,
                               Description = b.Description
                           };

            return products;
        }
        // TODO: German :)
        // we're converting to DTOs manually in code. Another option is to use a library like AutoMapper that handles the conversion automatically.
        // since the program is simple, it was chosen to use the quick way

        // GET: api/Products/5
        [Authorize]
        [ResponseType(typeof(ProductoDetailDTO))]
        public async Task<IHttpActionResult> GetProduct(int id)
        {
            var product = await db.Products.Include(b => b.TypeProduct).Select(b =>
            new ProductoDetailDTO()
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                Price = b.Price,
                TypeProductName = b.TypeProduct.Name
            }).SingleOrDefaultAsync(b => b.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.Id)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Products
        [Authorize]
        [ResponseType(typeof(Product))]
        public async Task<IHttpActionResult> PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Products.Add(product);
            await db.SaveChangesAsync();

            db.Entry(product).Reference(x => x.TypeProduct).Load();

            var dto = new ProductDTO()
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                TypeProductId = product.TypeProductId,
                TypeProductName = product.TypeProduct.Name,
                Description = product.Description
            };

            return CreatedAtRoute("DefaultApi", new { id = product.Id }, dto);
        }

        // DELETE: api/Products/5
        [Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.Id == id) > 0;
        }
    }
}