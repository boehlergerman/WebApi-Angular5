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

namespace ProductAdmin.Controllers
{
    public class TypeProductsController : ApiController
    {
        // private ProductServiceContext db = new ProductServiceContext();

        // modify the type of the db field
        private IProductServiceContext db = new ProductServiceContext();

        // add these contructors
        public TypeProductsController() { }

        public TypeProductsController(IProductServiceContext context)
        {
            db = context;
        }

        // GET: api/TypeProducts
        [Authorize]
        public IQueryable<TypeProduct> GetTypeProducts()
        {
            return db.TypeProducts;
        }

        // GET: api/TypeProducts/5
        [Authorize]
        [ResponseType(typeof(TypeProduct))]
        public IHttpActionResult GetTypeProduct(int id)
        {
            TypeProduct typeProduct = db.TypeProducts.Find(id);
            if (typeProduct == null)
            {
                return NotFound();
            }

            return Ok(typeProduct);
        }

        // PUT: api/TypeProducts/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTypeProduct(int id, TypeProduct typeProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != typeProduct.Id)
            {
                return BadRequest();
            }

            // db.Entry(typeProduct).State = EntityState.Modified;
            db.MarkAsModified(typeProduct);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeProductExists(id))
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

        // POST: api/TypeProducts
        [Authorize]
        [ResponseType(typeof(TypeProduct))]
        public IHttpActionResult PostTypeProduct(TypeProduct typeProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TypeProducts.Add(typeProduct);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = typeProduct.Id }, typeProduct);
        }

        // DELETE: api/TypeProducts/5
        [Authorize]
        [ResponseType(typeof(TypeProduct))]
        public IHttpActionResult DeleteTypeProduct(int id)
        {
            TypeProduct typeProduct = db.TypeProducts.Find(id);
            if (typeProduct == null)
            {
                return NotFound();
            }

            db.TypeProducts.Remove(typeProduct);
            db.SaveChanges();

            return Ok(typeProduct);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TypeProductExists(int id)
        {
            return db.TypeProducts.Count(e => e.Id == id) > 0;
        }
    }
}