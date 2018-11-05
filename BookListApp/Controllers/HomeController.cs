using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using BookListApp.Models;

namespace BookListApp.Controllers
{

    public class HomeController : Controller
    {
        public BooksCache booksCache = new BooksCache();
        

        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetBooksList()
        {
            List<BookModel> books = booksCache.GetBooks();
            if (books == null)
                books = new List<BookModel>();

            return Json(books, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public void SyncBooks(string jbooks)
        {
            List<BookModel> books = new JavaScriptSerializer().Deserialize <List<BookModel>> (jbooks);
            booksCache.UpdateCache(books);
            
        }
        
    }
}