var i=0;
const text=document.getElementById("text");
const button=document.getElementById("button");
const newregistereds=document.getElementById("newregistereds");
const allregistereds=document.getElementById("allregistereds");
var deletebuttons=[];
const addingbook=document.querySelector("#addingbook");

class NewBook{
    constructor(BookId,BookName){
        this.BookId=BookId;
        this.BookName=BookName;
    }
}

class Interface {
    static AddNewBook(x){
        const book=new NewBook(i,x);
        const newbook=document.createElement("div");
        newbook.setAttribute("class", "book");
        newbook.setAttribute("data-id", book.BookId);
        const bookname = document.createTextNode(book.BookName);
        const context=document.createElement("div");
        context.setAttribute("class", "context");
        context.appendChild(bookname);
        newbook.appendChild(context);
        newregistereds.appendChild(newbook);
        newregistereds.appendChild(newbook);
    }
    static AddNewRecord(x){
        const book=new NewBook(i,x);
        const newbook=document.createElement("div");
        newbook.setAttribute("class", "book");
        newbook.setAttribute("data-id", book.BookId);
        const bookname = document.createTextNode(book.BookName);
        const context=document.createElement("div");
        context.setAttribute("class", "context");
            context.appendChild(bookname);
            newbook.appendChild(context);
            newregistereds.appendChild(newbook);
            const deletebutton=document.createElement("button");
            deletebutton.setAttribute("class", "btn-danger");
            const deletesign = document.createTextNode("×");
            deletebutton.appendChild(deletesign);
            newbook.appendChild(deletebutton);
            allregistereds.appendChild(newbook);
            deletebuttons.push(deletebutton);
            this.settingEventToDeleteButtons();
            Storage.addBookRecord(book);
            i++;
    }
    static DeleteBook(button){
        console.log(button.parentElement);
        button.parentNode.remove();
    }
    static DisplayErrorMessage(){
        const errordiv=document.createElement("div");
        errordiv.setAttribute("class","alert alert-danger alert-dismissible fade show my-3");
        const errormessage=document.createTextNode("Lütfen bir kitap ismi giriniz.");
        errordiv.appendChild(errormessage);
        const closebutton=document.createElement("div");
        closebutton.setAttribute("type","button");
        closebutton.setAttribute("data-dismiss","alert");
        closebutton.setAttribute("class","close");
        const closesign=document.createTextNode("×");
        closebutton.appendChild(closesign);
        errordiv.appendChild(closebutton);
        addingbook.appendChild(errordiv);
        setTimeout(()=>{
            errordiv.remove();
        },2000);
    }
    static setCounterValue(){
        const books=Storage.getBookRecords();
        i=books[books.length-1].BookId+1;
    }
    static settingEventToDeleteButtons(){
        deletebuttons.forEach(element => {
            element.addEventListener("click",(e)=>{
                Interface.DeleteBook(e.target);
                Storage.removeBookRecord(e.target.parentNode.getAttribute("data-id"));
            });
        });
    }
}

class Storage{
    static getBookRecords(){
        let books;
        if(localStorage.getItem("books")==null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static addBookRecord(book){
        let books=this.getBookRecords();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }
    static removeBookRecord(id){
        console.log(id);
        let books=this.getBookRecords();
        books.forEach(book=>{
            if (book.BookId==id){
                let index=books.indexOf(book);
                books.splice(index,1);
            }
        });
        localStorage.setItem("books",JSON.stringify(books));
        Interface.setCounterValue();
    }
    static displayBookRecords(){
        let books=this.getBookRecords();
        books.forEach(book => {
            const newbook=document.createElement("div");
            newbook.setAttribute("class", "book");
            newbook.setAttribute("data-id", book.BookId);
            const bookname = document.createTextNode(book.BookName);
            const context=document.createElement("div");
            context.setAttribute("class", "context");
                context.appendChild(bookname);
                newbook.appendChild(context);
                newregistereds.appendChild(newbook);
                const deletebutton=document.createElement("button");
                deletebutton.setAttribute("class", "btn-danger");
                const deletesign = document.createTextNode("×");
                deletebutton.appendChild(deletesign);
                newbook.appendChild(deletebutton);
                allregistereds.appendChild(newbook);
                deletebuttons.push(deletebutton);
        });
        Interface.setCounterValue();
        if (deletebuttons!==[]) {
            Interface.settingEventToDeleteButtons();
        }
    }
}

button.addEventListener("click",()=>{
    if (text.value!=="") {
        Interface.AddNewBook(text.value);
        Interface.AddNewRecord(text.value);
    }
    else{
        Interface.DisplayErrorMessage();
    }
});

document.addEventListener("DOMContentLoaded",Storage.displayBookRecords());