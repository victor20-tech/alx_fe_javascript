// Access the elements
const displayQuote = document.getElementById("quoteDisplay");
const showNewQuoteButton = document.getElementById("newQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// Array of quotes objects
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspirational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivational" },
    { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", category: "Self-help" },
    { text: "Believe you can and you are halfway there.", category: "Encouragement" },
];

// Function to show a random quote
const showRandomQuote = () => {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // Get the quote at the random index
    const randomQuote = quotes[randomIndex];

    // Display the quote in the quoteDisplay div
    displayQuote.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
}


// Function to add a new quote
const addQuote = () => {
    // Get input values
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text && category) {
        // Add new quote to the quotes array
        quotes.push({ text, category });

        // Log the new quote and the updated array
        console.log("New Quote Added:", { text, category });
        console.log("Updated Quotes Array:", quotes);

        // Clear input fields
        newQuoteText.value = "";
        newQuoteCategory.value = "";
    }
}

// // Function to create add quote form
const createAddQuoteForm = () => {
    // Create form elements
    const form = document.createElement("form");
    form.id = "addQuoteForm";

    // Create container for form elements
    const container = document.createElement("div");
    container.classList.add("form-container");

    // Create and configure text input for the quote text
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "quoteText";
    textInput.placeholder = "Enter quote..";
    textInput.required = true;

    // Create and configure label for the category select
    const categoryLabel = document.createElement("label");
    categoryLabel.htmlFor = "quoteCategory";
    categoryLabel.textContent = "Quote category:";

    // Create and configure select element for categories
    const categorySelect = document.createElement("select");
    categorySelect.id = "quoteCategory";
    categorySelect.required = true;

    // Define categories
    const categories = ["Inspiration", "Motivational", "Self-help", "Encouragement", "Life"];

    // Using map to create and add options
    categories.map(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Create and configure submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Quote";
    submitButton.onclick = "addQuote()";

    // Append elements to the container
    container.appendChild(textInput);
    container.appendChild(categoryLabel);
    container.appendChild(categorySelect);
    container.appendChild(submitButton);

    // Append container to the form
    form.appendChild(container);

    // Append form to the body
    document.body.appendChild(form);

    // Add event listener to handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = textInput.value.trim();
        const category = categorySelect.value;

        if (text && category) {
            quotes.push({ text, category });

            textInput.value = "";
            categorySelect.value = "";
        }
    });
}

console.log(quotes);
// Initialize
window.onload = function () {
    showRandomQuote();
    createAddQuoteForm();
    showNewQuoteButton.addEventListener("click", showRandomQuote);
}