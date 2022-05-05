using Client.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Net.Http.Headers;

namespace Client.Controllers
{
    public class UserController : Controller
    {
        private string baseURL = "https://localhost:44303/";
        HttpClient client;
        public UserController()
        {

            client = new();
            client.BaseAddress = new Uri(baseURL);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<IActionResult> Index()
        {
            IList<User> users = new List<User>(); //List to hold the list of users. 
            HttpResponseMessage getData = await client.GetAsync("Users"); //This is the name of the api call. 

            //Checking if we have received the data 
            if (getData.IsSuccessStatusCode)
            {
                users = await getData.Content.ReadFromJsonAsync<List<User>>();
            }
            else
            {
                Console.WriteLine("Error");
            }

            ViewData.Model = users; //Passing the list of users to the other page. 

            return View();
        }

        //This method simply returns a register form to the user,
        // Also used for updating user. 
        public async Task<ActionResult> Edit(int? id) {


            User user = null;
            HttpResponseMessage getData = await client.GetAsync("Users/" + id); //

            //Checking if we have received the data 
            if (getData.IsSuccessStatusCode)
            {
                user = await getData.Content.ReadFromJsonAsync<User>();
            }
            else
            {
                Console.WriteLine("Error");
            }

            ViewData.Model = user; //Passing the user to the other page. 


            return View(user);
        }

        public async Task<IActionResult> EditUser(User user)
        {
      
            HttpResponseMessage putData = await client.PutAsJsonAsync("Users/edit", user); //This is the name of the api call. 

            //Checking if we have successfully inserted the data 
            if (putData.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            else
                return BadRequest();

            ViewData.Model = user;
        }

        public async Task<IActionResult> Login(string username, string password)
        {
            HttpResponseMessage getData = await client.GetAsync("Users"); //


            return View();
        }

        public async Task<IActionResult> DeleteUser(int id) {

            HttpResponseMessage deleteData = await client.DeleteAsync("Users/" + id); //This is the api route 

            //Checking if we have successfully inserted the data 
            if (deleteData.IsSuccessStatusCode)
            {

                return RedirectToAction("Index");
            }
            else
                Console.WriteLine("Error encounted while deleting");

            return View("Index");
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {

            HttpResponseMessage postData = await client.PostAsJsonAsync("Users/add", user); //This is the name of the api call. 

            //Checking if we have successfully inserted the data 
            if (postData.IsSuccessStatusCode)
            {
                ViewData.Model = user;
                return RedirectToAction("Index");
            }
            else
                return BadRequest();
        }

    }
}
