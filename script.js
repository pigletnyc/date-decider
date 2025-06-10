document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const ideaInput = document.getElementById('ideaInput');
    const addIdeaButton = document.getElementById('addIdeaButton');
    const ideasUList = document.getElementById('ideasUList');
    const pickIdeaButton = document.getElementById('pickIdeaButton');
    const chosenIdeaP = document.getElementById('chosenIdea');

    // Array to store our date ideas
    let ideas = [];

    // Function to render the list of ideas on the page
    function renderIdeas() {
        ideasUList.innerHTML = ''; // Clear the current list

        ideas.forEach((ideaText, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = ideaText;

            // Create a delete button for each idea
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = () => {
                removeIdea(index);
            };

            listItem.appendChild(deleteButton);
            ideasUList.appendChild(listItem);
        });
    }

    // Function to add a new idea
    function addIdea() {
        const newIdeaText = ideaInput.value.trim(); // .trim() removes whitespace from start/end

        if (newIdeaText === '') {
            alert('Please enter a date idea!');
            return; // Exit if the input is empty
        }

        if (ideas.includes(newIdeaText)) {
            alert('This idea is already on the list!');
            return;
        }

        ideas.push(newIdeaText); // Add to our array
        renderIdeas(); // Re-render the list
        ideaInput.value = ''; // Clear the input field
        ideaInput.focus(); // Put cursor back in input field
    }

    // Function to remove an idea
    function removeIdea(indexToRemove) {
        ideas.splice(indexToRemove, 1); // Remove idea from array by index
        renderIdeas(); // Re-render the list
        // If the removed idea was the currently chosen one, clear the result
        if (chosenIdeaP.textContent === ideas[indexToRemove] || ideas.length === 0) {
             // This check is a bit tricky after splice. A better way is to check if chosenIdeaP.textContent is still in the ideas array.
            if (!ideas.includes(chosenIdeaP.textContent)) {
                chosenIdeaP.textContent = '?';
                clearPreviousHighlight();
            }
        }
    }

    // Function to clear previous highlighting from list items
    function clearPreviousHighlight() {
        const listItems = ideasUList.getElementsByTagName('li');
        for (let item of listItems) {
            item.classList.remove('selected-idea');
        }
    }

    // Function to pick a random idea
    function pickRandomIdea() {
        if (ideas.length === 0) {
            alert('No ideas to choose from! Please add some first.');
            chosenIdeaP.textContent = '?';
            return;
        }

        clearPreviousHighlight(); // Clear any old highlights

        const randomIndex = Math.floor(Math.random() * ideas.length);
        const selectedIdea = ideas[randomIndex];
        chosenIdeaP.textContent = selectedIdea;

        // Highlight the selected idea in the list
        const listItems = ideasUList.getElementsByTagName('li');
        if (listItems[randomIndex]) {
            listItems[randomIndex].classList.add('selected-idea');
        }
    }

    // Event Listeners
    addIdeaButton.addEventListener('click', addIdea);

    // Allow adding idea by pressing "Enter" in the input field
    ideaInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addIdea();
        }
    });

    pickIdeaButton.addEventListener('click', pickRandomIdea);

    // Initial render (in case you want to pre-populate ideas later or load from localStorage)
    renderIdeas();
});
