//Variable Declaration
var book_name="Harry";
var url_start="https://www.googleapis.com/books/v1/volumes?q=";
var url;
var  book_list=document.getElementById("book-list");
var placeHldr = '<img src="https://via.placeholder.com/150">';
var book;



//Main Function
document.getElementById("button").onclick=main;
function main(){
    book_name=document.getElementById("input").value;
    // document.getElementById("input").value="";
    console.log(book_name);

    if(book_name==="" || book_name===null){
        console.log("No Book");
        alert("Enter a Book");
    }
    else{
        url=url_start+book_name;
        console.log(url);
        
        getData();
        
    }
}
function getData(){
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data.totalItems!==0){    //Check if no book found
            book_list.style.visibility="visible";
            printBook(data);
        }
        else{
            alert("No Matching Book! Try again!");
            console.log("No book found");
        }
        
    })
}

function printBook(data){
    jQuery("#book-list").html('');
    
    book_list.innerHTML+=partHTML();//Heading HTML
    for( var i=0;i<data.items.length;i++){
        book=data.items[i];
        title=book.volumeInfo.title;
        author=book.volumeInfo.authors;
        publisher=book.volumeInfo.publisher;
        bookImg=(book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail:placeHldr;
        catagory=book.volumeInfo.categories;
        bookLink=book.volumeInfo.previewLink;
        bookIsbn = (book.volumeInfo.industryIdentifiers[1])?book.volumeInfo.industryIdentifiers[1].identifier:null;
        // console.log(title,author,publisher,catagory,);
        console.log(bookIsbn);
        document.getElementById("yota").innerHTML+= bookHTML(title,author,publisher,catagory,bookImg,bookIsbn);
    
    }  
    headerMaker(); 
}
function partHTML(){
    var head=`<div class="list-head">
    <p>List of Books</p>
  </div>
  <div id="yota"></div>`
  return head;
}

function bookHTML(title,author,publisher,catagory,bookImg,bookIsbn){
    var viewUrl = (bookIsbn!==null)?'book.html?isbn='+bookIsbn :'no_book.html';
    var ans=`<div class="book-container">
            <img src="${bookImg}" alt="" class="book-image">
            <div class="book-doc">
                <h1 class="book--name">${title}</h1>
                <p class="book--author">${author}</p>
                <p class="book--publisher">${publisher}</p>
                <p class="book--category">${catagory}</p>
                <a class="book--read"href="${viewUrl}" target="_blank">Read Book</a>
            </div>
        </div>`

    // console.log(title,author, publisher);
    return ans;
}

function headerMaker(){
    document.getElementById("container").classList.add("header");
}