document.addEventListener("DOMContentLoaded", function () {
    const encryptionKeyInput = document.getElementById("encryptionKey");
    const enterButton = document.getElementById("enterButton");
    const notesSection = document.getElementById("notesSection");
    const noteText = document.getElementById("noteText");
    const saveButton = document.getElementById("saveButton");
    const clearButton = document.getElementById("clearButton");
    const message = document.getElementById("message");

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
                noteText.value = ""; // Clear the note textarea if no note found
            } else {
                noteText.value = data; // Populate the note textarea with the retrieved note
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Call retrieveNoteByKey when the page loads to check for existing notes
    retrieveNoteByKey(encryptionKeyInput.value);

    enterButton.addEventListener("click", function () {
        const key = encryptionKeyInput.value;
        if (key.trim() !== "") {
            // If a key is provided, show the notes section
            notesSection.style.display = "block";
            message.textContent = ""; // Clear any previous messages

            // Call the function to retrieve and display the note based on the key
            retrieveNoteByKey(key);
        } else {
            // Display an error message if no key is provided
            message.textContent = "Please enter a valid Encryption Key.";
        }
    });

    saveButton.addEventListener("click", function () {
        const key = encryptionKeyInput.value;
        const note = noteText.value;
        if (note.trim() !== "") {
            // Send the encryption key and note to the PHP script for saving
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
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            // Display an error message if the note is empty
            message.textContent = "Please enter a note.";
        }
    });

    clearButton.addEventListener("click", function () {
        // Clear the note textarea and any previous messages
        noteText.value = "";
        message.textContent = "";
    });

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
                noteText.value = ""; // Clear the note textarea if no note found
            } else {
                noteText.value = data; // Populate the note textarea with the retrieved note
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
