var
    books,//js books array;
    SyncMinute = 3, //sync with server side;
    intervalId;//id for stoping setInterval;
var storName = "booksList"; //Local storage const;
$(document).ready(function () {
    GetBooks();
    intervalId = setInterval(Sync, SyncMinute * 60 * 1000);// min*sec*milisec;
});


//Synchronization with server;
function Sync() {
    //console.log("Start synchronization...");
    var url = "/Home/SyncBooks?jbooks=" + JSON.stringify(books);
    $.ajax({
        type: 'GET',
        url: url,
        error: function (error) {
            console.log(error);
        }
    })
}

//Client side CRUD without update
function GetBooks() {
    books = JSON.parse(localStorage.getItem(storName));
    if (books === null) {
    $.ajax({
        type: 'GET',
        url: '/Home/GetBooksList',
        async: false,
        success: function (data) {
            books = data;
            
        },
        error: function (error) {
            console.log(error);
        }
        })
    }
    ReloadList();
}

function ReloadList() {
    $("#BooksList").empty();
    if (books != undefined) {
    for (i = 0; i < books.length; i++) {
        var ListElement =
            "<div class = 'card'>" +
            "<div class= 'card-header'>" +
            "<div class='row ml-2'>" +
            "<h5 class='col-11'>" + books[i].Title.toString() + " - " + books[i].Author + "</h5>" +
            "<input class='form-control deleteButton' type='button' value='X' onclick='DeleteBook(" + books[i].ID + ")'/>" +
            "</div>"+
            "</div>" +
            "<div class='card-body'>" +
            books[i].Description +
            "</div>" +
            "<div>";
        $("#BooksList").append(ListElement);
    }
    if (books.length === 0) {//error: No elements in array
        var ErrorElement =
            "<div class='row justify-content-center'>" +
            "<h5 class='alert alert-warning col-5 rounded'> No books in the list. Please add new one...</h5>"+
            "</div>";
        $("#BooksList").append(ErrorElement);
        }
    }
}
function CreateBook() {
    var
        _id = (books.length < 1) ? 0 : books[books.length - 1].ID + 1,
        _title = document.getElementById('title').value,
        _author = document.getElementById('author').value,
        _description = document.getElementById('description').value;
  
    var book = {
        ID: _id,
        Title: _title,
        Author: _author,
        Description: _description
    };
    books.push(book);
    localStorage.setItem(storName, JSON.stringify(books));
    ReloadList();
}

function DeleteBook(_id) {
    
    for (i = 0; i < books.length; i++) {
        if (books[i].ID === _id) {
            books.splice(i, 1);
            localStorage.setItem(storName, JSON.stringify(books));
            ReloadList();
            return;
        }
    }
}
