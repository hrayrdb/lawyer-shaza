// Get references to the textarea and the char count display
const textarea = document.getElementById('textarea_message');
const charCount = document.getElementById('charCount');

// Event listener to track changes in the textarea and update the character count
textarea.addEventListener('input', () => {
    const currentLength = textarea.value.length;
    const maxLength = textarea.getAttribute('maxlength');
    
    // Update the character count text
    charCount.innerText = `${currentLength}/${maxLength}`;
});
