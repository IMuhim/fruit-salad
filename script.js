const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

let calories = 0
const apiKey = "51562102-f072248cc445aebb6bd753c4c"

fruitForm.addEventListener("submit", extractFruit)

function extractFruit (e) {
    e.preventDefault()
    fetchFruitData(e.target[0].value)
    e.target[0].value = ""
}


function addFruit(fruit){
    console.log(fruit);
    const li = document.createElement("li")
    li.textContent = fruit.name
    li.addEventListener("click", removeFruit, {once: true})
    fruitList.appendChild(li);

    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
}

function fetchFruitData(fruit){
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then(processResponse)
        .then((data) => addFruit(data))
        .catch((err) => console.log(err))
}

// async function fetchFruitData(fruit){
//     try {
//         const response = fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
//         const data = await response.json()
//         addFruit(data)
//     } catch (err) {
//         console.log(err)
//     }
// }

function processResponse(response){
    if (response.ok){
        return response.json()
    }else {
        throw "Error: http status code = 404"
    }
}

function removeFruit(e) {
    console.log(e.target.remove())
}