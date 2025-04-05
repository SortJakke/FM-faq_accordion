const loadingElement = document.getElementById("loading")
const list = document.querySelector(".faqs-question-list")

async function loadData() {
  try {
    loadingElement.classList.remove("hidden")

    const response = await fetch("./data.json")
    if (!response.ok) {
      throw new Error("Erro ao carregar o arquivo JSON")
    }
    let externalData = await response.json()
    externalData.forEach((item) => {
      appendItem(item)
    })
  } catch (error) {
    console.error("Erro:", error)
  } finally {
    loadingElement.classList.add("hidden")
  }
}

function appendItem(data) {
  const item = document.createElement("li")
  item.classList.add("faqs-question-item")

  item.innerHTML += `
      <div class="faqs-question-area">
        <h2 class="faqs-question" tabindex="0">
          ${data.question}
        </h2>
        <span class="is-open"></span>
      </div>
      <p class="faqs-answer">
        ${data.answer}
      </p>`

  list.appendChild(item)
}

list.addEventListener("click", displayAnswer)
list.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    displayAnswer(event)
  }
})

function displayAnswer(event) {
  let heading = event.target.classList.contains("faqs-question")
  let icon = event.target.classList.contains("is-open")
  let paragraph = event.target.classList.contains("faqs-answer")

  if (heading || icon || paragraph) {
    let listItem = event.target.closest("li")
    let answer = listItem.querySelector(".faqs-answer")
    let isOpen = listItem.querySelector(".is-open")

    answer.classList.toggle("active")
    isOpen.classList.toggle("open")
  }
}

loadData()
