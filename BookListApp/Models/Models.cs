using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Caching;
namespace BookListApp.Models
{
    public class BookModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
    }


    public class BooksCache
    {
        private string CacheId = "BookList";
        public List<BookModel> GetBooks()
        {
            MemoryCache memCache = MemoryCache.Default;
            List<BookModel> books = memCache.Get(CacheId) as List<BookModel>;
            return books;
        }
        public bool UpdateCache(List<BookModel> books)
        {
            MemoryCache memCache = MemoryCache.Default;
            try
            {
                if (books == null)
                    books = new List<BookModel>();
                memCache.Set(CacheId, books, DateTime.Now.AddMonths(1));
                return true;
            }
            catch
            {
                return false;
            }

        }
        
    }

}