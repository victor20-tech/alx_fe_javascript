// Access the elements
const displayQuote = document.getElementById("quoteDisplay");
const showNewQuote = document.getElementById("newQuote");
const importFileInput = document.getElementById("importFile");
const exportQuotesButton = document.getElementById("exportQuotes");

// Array of quotes objects
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    {text: "The only way to great work is to love what you do.", category: "Inspirational"},
    {text: "Life is what happens when you're busy making other plans.", category: "Life"},
    {text: "Get busy living or get busy dying.", category: "Motivational"},
    {text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", category: "Self-help"},
    {text: "Believe you can and you are halfway there.", category: "Encouragement"},
];

// Function to save quotes to local storage
const saveQuotes = () => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
};

// Function to show a random quote
const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    displayQuote.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
};

// Function to create add quote form
const createAddQuoteForm = () => {
    const form = document.createElement("form");
    form.id = "addQuoteForm";
    const container = document.createElement("div");
    container.classList.add("form-container");
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "quoteText";
    textInput.placeholder = "Enter quote..";
    textInput.required = true;
    const categoryLabel = document.createElement("label");
    categoryLabel.htmlFor = "quoteCategory";
    categoryLabel.textContent = "Quote category:";
    const categorySelect = document.createElement("select");
    categorySelect.id = "quoteCategory";
    categorySelect.required = true;
    const categories = ["Inspirational", "Motivational", "Self-help", "Encouragement", "Life"];
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Quote";
    container.appendChild(textInput);
    container.appendChild(categoryLabel);
    container.appendChild(categorySelect);
    container.appendChild(submitButton);
    form.appendChild(container);
    document.body.appendChild(form);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = textInput.value.trim();
        const category = categorySelect.value;
        if (text && category) {
            quotes.push({text, category});
            saveQuotes();
            textInput.value = "";
            categorySelect.value = "";
            showRandomQuote();
        }
    });
};

// Function to export quotes to a JSON file
const exportToJsonFile = () => {
    const dataStr = JSON.stringify(quotes);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'quotes.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

// Function to import quotes from a JSON file
const importFromJsonFile = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
};

window.onload = function() {
    showRandomQuote();
    createAddQuoteForm();
    importFileInput.onchange = importFromJsonFile;
    exportQuotesButton.onclick = exportToJsonFile;
};
