const spinner = document.getElementById('spinner');
// search book
const searchBook = () => {
    const searchField = document.getElementById('input-field');
    const searchFieldText = searchField.value;
    // clear data
    searchField.value = '';
    //Empty massage
     if (searchFieldText == '') {
       alert(' please write something to display!!'); 
    }
    else{
         // load data
        const url = `https://openlibrary.org/search.json?q=${searchFieldText}`;
            spinner.classList.remove('d-none');
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    displaySearchResult(data)
                    // data found Result
                    document.getElementById('searchResultFoundNum').innerHTML = `<h4 class="text-warning mt-5">${data.numFound} Data found & Showing ${data.start} - ${data.start + data.docs.length} </h4>`
                    spinner.classList.add('d-none');
                })
    }
     
}
//display search result
const displaySearchResult = (books) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.docs.forEach((book) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick="loadDetail(${book})" class="col">
            <div class="card">
                <div class="card-body">  
                    <img height="300px" width="100px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Cover Image">                 
                    <h4 class="card-title">${book.title}</h3>
                    <p class="card-title">Author : ${book.author_name}</p>
                    <p class="card-title">Publisher : ${book.publisher}</p>
                    <p class="card-title">Published Date: ${book.publish_date}</p>
                    <button class="btn btn-outline-success">Order Now</button>
                </div>
            </div>
        </div>
     
        `;
        searchResult.appendChild(div);
    });
}