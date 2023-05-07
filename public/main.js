//var for form
const titleInput = document.querySelectorAll('#title')
const authorInput = document.querySelectorAll('#author')
const genreInput = document.querySelectorAll('#genre')
const ratingInput = document.querySelectorAll('#rating')
const statusInput = document.querySelectorAll('#status')
//var for edits
const titleEdit = document.querySelectorAll('.edittitle')
const authorEdit = document.querySelectorAll('.editauthor')
const genreEdit = document.querySelectorAll('.editgenre')
const ratingEdit = document.querySelectorAll('.editrating')
const statusEdit = document.querySelectorAll('.editstatus')
//btns for edits/trash/save
var editBtn = document.querySelectorAll(".fa-pencil");
var saveBtn = document.querySelectorAll(".ph-upload-simple")
const btn = document.querySelector('button')
var trash = document.getElementsByClassName("fa-trash")

// Add event listener to form for submitting new books
btn.addEventListener('click', () => {
})

Array.from(saveBtn).forEach(function (element) {
  element.addEventListener('click', function () {
    const title = this.parentNode.parentNode.childNodes[11]
    const author = this.parentNode.parentNode.childNodes[13]
    const genre = this.parentNode.parentNode.childNodes[15]
    const rating = this.parentNode.parentNode.childNodes[17]
    const status = this.parentNode.parentNode.childNodes[19]
    console.log(title, author,genre, rating, status)
    console.log(this.dataset.id)
    fetch('/bookUpdated', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        author,
        genre,
        rating,
        status,
        id: this.dataset.id
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        
        // window.location.reload(true)
        const title = this.parentNode.parentNode.childNodes[1]
        const author = this.parentNode.parentNode.childNodes[3]
        const genre = this.parentNode.parentNode.childNodes[5]
        const rating = this.parentNode.parentNode.childNodes[7]
        const status = this.parentNode.parentNode.childNodes[9]
        title.innerText = data.value.title
        author.innerText = data.value.astatus
        genre.innerText = data.value.rating
        rating.innerText = data.value.rating
        status.innerText = data.value.status
        const cloud = this.parentNode
        const pencil = this.parentNode.parentNode.childNodes[21]
        const titleEdit = this.parentNode.parentNode.childNodes[11]
        const authorEdit = this.parentNode.parentNode.childNodes[13]
        const genreEdit = this.parentNode.parentNode.childNodes[15]
        const ratingEdit = this.parentNode.parentNode.childNodes[17]
        const statusEdit = this.parentNode.parentNode.childNodes[19]
        pencil.classList.remove('hide')
        title.classList.remove('hide')
        author.classList.remove('hide')
        genre.classList.remove('hide')
        rating.classList.remove('hide')
        status.classList.remove('hide')
        cloud.classList.add('hide')
        titleEdit.classList.add('hide')
        authorEdit.classList.add('hide')
        genreEdit.classList.add('hide')
        ratingEdit.classList.add('hide')
        statusEdit.classList.add('hide')
      })
  });
});


Array.from(editBtn).forEach(function (element) {
  element.addEventListener('click', function () {
    const title = this.parentNode.parentNode.childNodes[1]
    const author = this.parentNode.parentNode.childNodes[3]
    const genre = this.parentNode.parentNode.childNodes[5]
    const rating = this.parentNode.parentNode.childNodes[7]
    const status = this.parentNode.parentNode.childNodes[9]
    const pencil = this.parentNode
    const cloud = this.parentNode.parentNode.childNodes[23]
    const titleEdit = this.parentNode.parentNode.childNodes[11]
    const authorEdit = this.parentNode.parentNode.childNodes[13]
    const genreEdit = this.parentNode.parentNode.childNodes[15]
    const ratingEdit = this.parentNode.parentNode.childNodes[17]
    const statusEdit = this.parentNode.parentNode.childNodes[19]
    pencil.classList.add('hide')
    title.classList.add('hide')
    author.classList.add('hide')
    genre.classList.add('hide')
    rating.classList.add('hide')
    status.classList.add('hide')
    cloud.classList.remove('hide')
    titleEdit.classList.remove('hide')
    authorEdit.classList.remove('hide')
    genreEdit.classList.remove('hide')
    ratingEdit.classList.remove('hide')
    statusEdit.classList.remove('hide')
    console.log(this.dataset)
  });
});



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(e){
        const _id = e.target.dataset.id
        console.log(_id)
        fetch('/bookDeleted', {
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
