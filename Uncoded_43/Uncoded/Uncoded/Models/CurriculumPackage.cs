using System.ComponentModel.DataAnnotations;

namespace Uncoded.Models
{
    public class CurriculumPackage
    {
        [Key]
        public int Id { get; set;}  
        
        [Required]
        public int C_Grade{ get; set; }

        [Required]
        public string C_Description { get; set; }

        [Required]
        public double C_Price { get; set; }

        [Required]
        public int MaxSubjectLimit { get; set; } 

    }
}