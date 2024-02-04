document.addEventListener("DOMContentLoaded", function () {
    const encryptionKeyInput = document.getElementById("encryptionKey");
    const enterButton = document.getElementById("enterButton");
    const refreshButton = document.getElementById("refreshButton"); // New Refresh Button
    const closeButton = document.getElementById("closeButton");     // New Close Button
    const notesSection = document.getElementById("notesSection");
    const noteText = document.getElementById("noteText");
    const saveButton = document.getElementById("saveButton");
    const clearButton = document.getElementById("clearButton");
    const message = document.getElementById("message");

    function showNotesSection() {
        notesSection.style.display = "block";
        message.textContent = "";
    }

    function updateNoteTextAndLocalStorage(note) {
        noteText.value = note;
        localStorage.setItem('note', note);
    }

    function retrieveNoteFromLocalStorage() {
        return localStorage.getItem('note') || '';
    }

    // Function to retrieve and display the note based on the key
    function retrieveNoteByKey(key) {
        const formData = new FormData();
        formData.append('key', key);

        fetch('retrieve_note.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'not_found') {
                updateNoteTextAndLocalStorage(""); // Clear the note text if no note found
            } else {
                updateNoteTextAndLocalStorage(data); // Update the note text with the retrieved note
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Check for stored notes when the page loads
    noteText.value = retrieveNoteFromLocalStorage();

    enterButton.addEventListener("click", function () {
        const key = encryptionKeyInput.value;
        if (key.trim() !== "") {
            showNotesSection();
            retrieveNoteByKey(key);
        } else {
            message.textContent = "Please enter a valid Encryption Key.";
        }
    });

    noteText.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent Enter from adding a new line
            enterButton.click(); // Trigger the Enter button click
        }
    });

    refreshButton.addEventListener("click", function () {
        // Instead of clearing the note text, retrieve the note based on the current key
        retrieveNoteByKey(encryptionKeyInput.value);
    });

    closeButton.addEventListener("click", function () {
        const defaultKey = prompt("Enter the default key to reopen the page:");
        if (defaultKey === "your_default_key") {
            showNotesSection();
        } else {
            message.textContent = "Invalid default key. Page not reopened.";
        }
    });

    saveButton.addEventListener("click", function () {
        const key = encryptionKeyInput.value;
        const note = noteText.value;
        if (note.trim() !== "") {
            const formData = new FormData();
            formData.append('key', key);
            formData.append('note', note);

            fetch('save_note.php', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'success') {
                    message.textContent = "Note saved successfully!";
                } else {
                    message.textContent = "Error saving note.";
                }
                // After saving, retrieve the note again to ensure real-time updates
                retrieveNoteByKey(key);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            message.textContent = "Please enter a note.";
        }
    });

    clearButton.addEventListener("click", function () {
        noteText.value = "";
        message.textContent = "";
    })

    // Function to retrieve and display the note based on the key
    function retrieveNoteByKey(key) {
        const formData = new FormData();
        formData.append('key', key);

        fetch('retrieve_note.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'not_found') {
                updateNoteTextAndLocalStorage(""); // Clear the note text if no note found
            } else {
                updateNoteTextAndLocalStorage(data); // Update the note text with the retrieved note
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
