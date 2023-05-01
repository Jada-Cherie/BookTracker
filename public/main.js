// const form = document.querySelector('form')
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const genreInput = document.querySelector('#genre')
const ratingInput = document.querySelector('#rating')
const statusInput = document.querySelector('#status')
const btn = document.querySelector('button')
var trash = document.getElementsByClassName("fa-trash")

// Add event listener to form for submitting new books
btn.addEventListener('click', (event) => {
  event.preventDefault()

  // Create a new book object from the form data
  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    genre: genreInput.value,
    rating: ratingInput.value,
    status: statusInput.value
  }
  // Send a POST request to the server to add the new book to the database
  fetch('messages', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newBook)
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    // const messagesList = document.querySelector('.messages');
    // const newBookItem = document.createElement('li')
    // newBookItem.className = 'message'
    // newBookItem.innerHTML = `
    // <span>${book.title}</span>
    // <span>${book.author}</span>
    // <span>${book.genre}</span>
    // <span>${book.rating}</span>
    // <span>${book.status}</span>
    // <span><i class="fa fa-trash" aria-hidden="true"></i></span>`
    // messagesList.appendChild(newBookItem)
    window.location.reload(true)
  })

})




// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(e){
        const _id = e.target.dataset.id
        console.log(_id)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
