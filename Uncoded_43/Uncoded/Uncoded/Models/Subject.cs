using System.ComponentModel.DataAnnotations;

namespace Uncoded.Models
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Name { get; set; }
        
        [Required]
        public string Description { get; set; }

    }
}