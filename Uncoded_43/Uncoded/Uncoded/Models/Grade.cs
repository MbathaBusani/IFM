using System.ComponentModel.DataAnnotations;

namespace Uncoded.Models
{
    public class Grade
    {
        [Key]
        public int Id { get; set;}  //be derived id
        
        [Required]
        public int gradeNum{ get; set; }

        [Required]
        public DateTime Year { get; set; }
        
        


    }
}