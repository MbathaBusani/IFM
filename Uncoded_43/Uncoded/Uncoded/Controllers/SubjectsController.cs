using Microsoft.AspNetCore.Mvc;
using Uncoded.Data;
using Uncoded.Models;

namespace Uncoded.Controllers
{
    [Route("[Controller]")] // Example of route /users
    public class SubjectsController : Controller
    {

        //This gives us access to the database. 
        private readonly DBContext db;

        public SubjectsController(DBContext db)
        {
            this.db = db;
        }

        [HttpGet] // Example of route http://localo/users
        public ActionResult<IEnumerable<Subject>> GetSubjects()
        {
            return db.Subject.ToList();
        }


        [HttpGet]
        [Route("{id}")] // Example of route /users/5
        public ActionResult<Subject> GetSubject(int id)
        {
            return db.Subject.Find(id);
        }


        [HttpPost("add")]

        public async Task<ActionResult<string>> AddSbject(Subject subject)
        {
            if (ModelState.IsValid)
            {
                db.Add(subject);
                await db.SaveChangesAsync();

                return Ok("Subject  Added");

            }
            else
                return "Provided subject is not valid";

        }

        [HttpPut("edit")]
        public async Task<ActionResult<string>> EditSubject(Subject subject)
        {

            //Used to check if the user exists in the database. 
            var currentSubject = GetSubject(subject.Id);

            if (currentSubject.Value != null)
            {
                currentSubject.Value.Name = subject.Name;
                currentSubject.Value.Description = subject.Description;


                db.SaveChanges();

                return Ok("User updated successfully");
            }
            else
                return NotFound();

        }

    }
}

       

