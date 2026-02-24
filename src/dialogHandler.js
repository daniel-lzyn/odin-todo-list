// Function to display dialog
function displayDialog(btn, dialog) {
    btn.addEventListener('click', () => {
        dialog.showModal();
    });
};

// Function to close dialog
function closeDialog(btn, dialog) {
    btn.addEventListener('click', () => {
        dialog.close();
    });
};

export { displayDialog, closeDialog };