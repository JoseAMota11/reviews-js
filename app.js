const btn = document.querySelector("#btn")
const arrowIcons = document.querySelectorAll(".arrow")
const pic = document.querySelector("#pic")
let index = 0

async function fetchData(index){
  try {
    const res = await fetch("./data.json")
    const json = await res.json()
    const { data } = json
    return createElements(data[index])
  } catch (error) {
    console.error(error)
  }
}

arrowIcons.forEach(icon => {
  icon.addEventListener("click", (e) => {
    let iconClass = e.currentTarget.classList
    if (iconClass.contains("right")) {
      if (index === 3) {
        index = 0
      } else {
        index++
      }
    } else if (iconClass.contains("left")) {
      if (index === 0) {
        index = 3
      } else {
        index--
      }
    }
    fetchData(index)
  })
})

const img = document.createElement("img")
img.className = "img-person"
const imgShadow = document.createElement("div")
imgShadow.className = "img-shadow"
const iconContainer = document.createElement("span")
iconContainer.className = "icon-container"
const quote = document.createElement("i")
quote.className = "fa-solid fa-quote-right"
const h2 = document.createElement("h2")
h2.className = "person-name"
const h3 = document.createElement("h3")
h3.className = "person-ocupation"
const p = document.createElement("p")
p.className = "person-description"

function createElements(data) {
  img.src = data.image
  h2.textContent = data.name
  h3.textContent = data.ocupation
  p.textContent = data.description
  pic.prepend(img)
  pic.after(h2, h3, p)
}

btn.addEventListener("click", () => {
  const { floor, random } = Math
  let randomNum = floor(random() * 4)
  fetchData(randomNum)
})

window.addEventListener("DOMContentLoaded", () => {
  fetchData(index)
})