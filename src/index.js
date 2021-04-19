let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  let toyCollectionDiv = document.getElementById("toy-collection")
  // <div class="card">
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(response => response.forEach(toy => addToyToDom(toy)))
  


  function addToyToDom(toy) {
    // id, name, likes, image
    let div = document.createElement("div")
    div.classList = "card"
    let h2 = `<h2>${toy.name}</h2>`
    let imageTag = `<img src="${toy.image}" alt="ToyTale Toy" class="toy-avatar" />`
    let p = `<p>${toy.likes}</p>`
    let button = `<button class="like-btn" id="${toy.id}">Like</button>`
    div.innerHTML = `${h2}${imageTag}${p}${button}`
    // div.innerHTML(h2,imageTag, p, button)
    toyCollectionDiv.append(div)
  }

  let addToyForm = document.querySelector("form.add-toy-form")
  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    // let name = event.target[0].value
    // let image = event.target[1].value
    createNewToy(event.target)
  })


  function createNewToy(toy) {

    let reqBody = {
      name: toy[0].value, 
      image: toy[1].value
    }
    fetch("http://localhost:3000/toys", {
      method: "POST", 
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      }, 
      body: JSON.stringify(reqBody)
      
    })
    .then(response => response.json())
    .then(response => addToyToDom(response))
  }


});