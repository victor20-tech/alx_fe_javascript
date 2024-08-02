//Access the elements
const displayQuote = document.getElementById("quoteDisplay");
const  showNewQuote = document.getElementById("newQuote");
//  console.log(displayQuote, showNewQuote);

//Array of quotes objects
const quotes = [
    {text: "The only way to great work is to love what you do.", category: "Inspirational"},
    {text: "Life is what happens when you're busy making other plans.", category: "Life"},
    {text: "Get busy living or get busy dying.", category: "Motivational"},
    {text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", category: "Self-help"},
    {text: "Believe you can and you are halfway there.", category: "Encouragement"},
];

//Function to show a random quote
const showRandomQuote = () =>{
    //Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);

    //Get the quote at the random index
    const randomQoute = quotes[randomIndex];

    //Display the quote in the quoteDisplay div
    displayQuote.innerHTML = `<p>"${randomQoute.text}"</p><p><em>- ${randomQoute.category}</em></p>`;
}

//Function to create add quote form
const createAddQuoteForm = () => {
    //create form elements
    const form = document.createElement("form");
    form.id = "addQuoteForm";

    //create container for form elemeents
    const container = document.createElement("div");
    container.classList.add("form-container");

    //create and configure text input for the quote text
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "quoteText";
    textInput.placeholder = "Enter quote..";
    textInput.required = true;

    //create and configure label for the category select
    const categoryLabel = document.createElement("label");
    categoryLabel.htmlFor = "quoteCategory";
    categoryLabel.textContent = "Quote category:";

    //create and coonfigure select element for categories
    let categorySelect = document.createElement("select");
    categorySelect.id = "quoteCategory";
    categorySelect.required = true;

    //define categories
    const categories = ["Inspiration", "Motivational", "Self-help", "Encouragement", "Life"];

    //using map to create and add options
    categories.map(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // create and configure submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Quote";
    submitButton.onclick = "createAddQuoteForm()";

    //append elements to the container
    container.appendChild(textInput);
    container.appendChild(categoryLabel);
    container.appendChild(categorySelect);
    container.appendChild(submitButton);

    // append container to the form
    form.appendChild(container);

    //append form to the body
    document.body.appendChild(form);

    //Add event listener to handle form submission
    form.addEventListener("submit", (event) =>{
        event.preventDefault();
        const text = textInput.value.trim();
        const category = categorySelect.value;

        if (text && category) {
            quotes.push({text, category});
            textInput.value = "";
            categorySelect = "";
            //showRandomQuote(); 
        }
    });
    console.log(quotes);

}

window.onload = function() {
    showRandomQuote;
    createAddQuoteForm;
}