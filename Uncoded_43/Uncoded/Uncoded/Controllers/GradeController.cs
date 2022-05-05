using Microsoft.AspNetCore.Mvc;
using Uncoded.Data;
using Uncoded.Models;

namespace Uncoded.Controllers
{
    [Route("[Controller]")] // Example of route /users
    public class GradeController : Controller
    {

        //This gives us access to the database. 
        private readonly DBContext db;

        public GradeController(DBContext db)
        {
            this.db = db;
        }

        [HttpGet] // Example of route http://localo/users
        public ActionResult<IEnumerable<Grade>> GetGrade()
        {
            return db.Grade.ToList();
        }


        [HttpGet]
        [Route("{id}")] // Example of route /users/5
        public ActionResult<Grade> GetGrade(int id)
        {
            return db.Grade.Find(id);
        }


        [HttpPost("add")]

        public async Task<ActionResult<string>> AddGrade(Grade grade)
        {
            if (ModelState.IsValid)
            {
                db.Add(grade);
                await db.SaveChangesAsync();

                return Ok("Grade  Added");

            }
            else
                return "Provided Grade is not valid";

        }

        [HttpPut("edit")]
        public async Task<ActionResult<string>> EditGrade(Grade grade)
        {

            //Used to check if the user exists in the database. 
            var currentGrade = GetGrade(grade.Id);

            if (currentGrade.Value != null)
            {
                currentGrade.Value.Id = grade.Id;
                currentGrade.Value.gradeNum = grade.gradeNum;
                currentGrade.Value.Year = grade.Year;


                db.SaveChanges();

                return Ok("Grade updated successfully");
            }
            else
                return NotFound();

        }



    }
}