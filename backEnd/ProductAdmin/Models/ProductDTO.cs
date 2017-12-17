namespace ProductAdmin.Models
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int TypeProductId { get; set; }
        public string TypeProductName { get; set; }
        public string Description { get; set; }
    }
}