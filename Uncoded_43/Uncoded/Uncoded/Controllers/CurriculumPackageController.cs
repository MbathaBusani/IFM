using Microsoft.AspNetCore.Mvc;
using Uncoded.Data;
using Uncoded.Models;

namespace Uncoded.Controllers
{
    [Route("[Controller]")] // Example of route /users
    public class CurriculumPackageController : Controller
    {

        //This gives us access to the database. 
        private readonly DBContext db;

        public CurriculumPackageController(DBContext db)
        {
            this.db = db;
        }

        [HttpGet] // Example of route http://localo/users
        public ActionResult<IEnumerable<CurriculumPackage>> GetCurriculumPackage()
        {
            return db.CurriculumPackage.ToList();
        }


        [HttpGet]
        [Route("{id}")] // Example of route /users/5
        public ActionResult<CurriculumPackage> GetCurriculumPackage(int id)
        {
            return db.CurriculumPackage.Find(id);
        }


        [HttpPost("add")]

        public async Task<ActionResult<string>> AddCurriculumPackage(CurriculumPackage curriculumpackage)
        {
            if (ModelState.IsValid)
            {
                db.Add(curriculumpackage);
                await db.SaveChangesAsync();

                return Ok("CurriculumPackage  Added");

            }
            else
                return "Provided CurriculumPackage is not valid";

        }

        [HttpPut("edit")]
        public async Task<ActionResult<string>> EditCurriculumPackage(CurriculumPackage curriculumPackage)
        {

            //Used to check if the user exists in the database. 
            var currentPackage = GetCurriculumPackage(curriculumPackage.Id);

            if (currentPackage.Value != null)
            {
                currentPackage.Value.Id = curriculumPackage.Id;
                currentPackage.Value.C_Price = curriculumPackage.C_Price;
                currentPackage.Value.C_Grade = curriculumPackage.C_Grade;
                currentPackage.Value.C_Description = curriculumPackage.C_Description;
                currentPackage.Value.MaxSubjectLimit = curriculumPackage.MaxSubjectLimit;



                db.SaveChanges();

                return Ok("CurriculumPackage updated successfully");
            }
            else
                return NotFound();

        }



    }
}