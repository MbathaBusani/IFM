using Microsoft.AspNetCore.Mvc;
using Uncoded.Data;
using Uncoded.Models;

namespace Uncoded.Controllers
{
    [Route("[Controller]")] // Example of route /users
    public class UsersController : Controller
    {

        //This gives us access to the database. 
        private readonly DBContext db;

        public UsersController(DBContext db)
        {
            this.db = db;
        }

        [HttpGet] // Example of route http://localo/users
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return db.User.ToList();
        }


        [HttpGet]
        [Route("{id}")] // Example of route /users/5
        public ActionResult<User> GetUser(int id)
        {
            return db.User.Find(id);
        }


        [HttpPost("add")]
        public IActionResult AddUser(User user)
        {

            db.User.Add(user);
            db.SaveChangesAsync();
            return Ok();
        }

        //[HttpPut("edit")]
        //public async Task<ActionResult<string>> EditUser(User user)
        //{

        //    //Used to check if the user exists in the database. 
        //    var currentUser = GetUser(user.Id);

        //    if (currentUser.Value != null)
        //    {
        //        currentUser.Value.Name = user.Name;
        //        currentUser.Value.Surname = user.Surname;
        //        currentUser.Value.Institution = user.Institution;
        //        currentUser.Value.Email = user.Email;
        //        currentUser.Value.Password = user.Password;

        //        db.SaveChanges();

        //        return Ok("User updated successfully");
        //    }
        //    else
        //        return NotFound();

        //}

        [HttpPut("edit")]
        public IActionResult Edit(User user)
        {
          
                 db.User.Update(user);
                db.SaveChangesAsync();
                return Ok();  

        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeactivateUser(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid Id provided");

            //Used to check if the user exists in the database. 
            var currentUser = db.User.Find(id);

            if (currentUser != null)
            {
                // db.Entry(currentUser).State = Microsoft.EntityFrameworkCore.EntityState.Deleted; 
                db.User.Remove(currentUser);
                db.SaveChanges();

                return Ok("User's account deactivated successfully");
            }
            else
                return NotFound();
        }

        [HttpGet("login")]

        public async Task<IActionResult> Login(string username, string password)
        {

            var user = db.User.FirstOrDefault<User>(u => u.Email.Equals(username) && u.Password.Equals(password));

            if (user.Equals(null))
                return NotFound();
            else
                return Ok(user);
        }


    }


}