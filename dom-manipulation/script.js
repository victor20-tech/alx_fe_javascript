// Access the elements
const displayQuote = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteButton = document.getElementById("addQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const importFileInput = document.getElementById("importFile");
const exportQuotesButton = document.getElementById("exportQuotes");
const categoryFilter = document.getElementById("categoryFilter");

// Array of quotes objects
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to great work is to love what you do.", category: "Inspirational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivational" },
    { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", category: "Self-help" },
    { text: "Believe you can and you are halfway there.", category: "Encouragement" },
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

// Function to add a new quote
const addQuote = () => {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();
    if (text && category) {
        quotes.push({ text, category });
        saveQuotes();
        newQuoteText.value = "";
        newQuoteCategory.value = "";
        populateCategoryFilter(); // Update categories
        filterQuotes(); // Update the display based on the current filter
    }
};

// Function to populate category filter dropdown
const populateCategoryFilter = () => {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
    }
};

// Function to filter quotes based on selected category
const filterQuotes = () => {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('lastSelectedCategory', selectedCategory);
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        displayQuote.innerHTML = `<p>"${randomQuote.text}"</p><p><em>- ${randomQuote.category}</em></p>`;
    } else {
        displayQuote.innerHTML = '<p>No quotes available for this category.</p>';
    }
};

// Function to export quotes to a JSON file
const exportToJsonFile = () => {
    const dataStr = JSON.stringify(quotes, null, 2); // Indented JSON
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', 'quotes.json');
    linkElement.click();
    URL.revokeObjectURL(url); // Clean up
};

// Function to import quotes from a JSON file
const importFromJsonFile = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategoryFilter(); // Update categories
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
};

window.onload = function () {
    populateCategoryFilter();
    filterQuotes();
    newQuoteButton.addEventListener("click", showRandomQuote);
    addQuoteButton.addEventListener("click", addQuote);
    importFileInput.addEventListener("change", importFromJsonFile);
    exportQuotesButton.addEventListener("click", exportToJsonFile);
};