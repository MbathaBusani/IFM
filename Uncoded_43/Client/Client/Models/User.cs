using System.ComponentModel.DataAnnotations;

namespace Client.Models
{
    public class User
    {

        /*
         * This class is used as a container that holds the user model that comes from the 
         * api, we'll use it to store the data, It must look exactly the same to the user in the api. 
         */

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }
        [Required]
        public string Institution { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }


    }
}
