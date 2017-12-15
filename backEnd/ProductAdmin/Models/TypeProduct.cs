using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProductAdmin.Models
{
    public class TypeProduct
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}