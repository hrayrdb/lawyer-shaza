// Initialize EmailJS
(function () {
    emailjs.init("uRyoF3BOf46rKTEe2"); // Use your actual EmailJS User ID
})();

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const btnContinue = document.getElementById('btn_continue');

    btnContinue.addEventListener('click', function () {
        const fileInput = document.getElementById('file-input');
        const file = fileInput.files[0];

        const name = document.getElementById('your_name').value.trim();
        const phone = document.getElementById('your_phone').value.trim();
        const dropdown = document.querySelector('.dropdown');
        const consultationType = dropdown.getAttribute('data-selected');

        if (!consultationType) {
            alert('Please select a consultation type.');
            return;
        } const message = document.getElementById('textarea_message').value.trim();

        // Validate required fields
        if (!name || !phone || !message) {
            alert('Please fill out all required fields.');
            return;
        }

        if (!file) {
            alert('Please attach a file.');
            return;
        }

        const maxFileSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxFileSize) {
            alert('The attached file exceeds the 5MB limit.');
            return;
        }

        // Disable button and show loading indicator
        btnContinue.disabled = true;
        btnContinue.textContent = 'Sending...';
        btnContinue.classList.add('disabled');

        const reader = new FileReader();
        reader.onload = function () {
            const base64String = reader.result.split(',')[1];

            const formData = {
                name,
                phone,
                consultation_type: consultationType,
                message,
                file: base64String,
                fileName: file.name,
            };

            // Send the email with EmailJS
            emailjs.send('service_n63bd07', 'template_o8g820s', formData)
                .then(function () {
                    alert('Your consultation request has been sent successfully!');

                    // Clear form fields
                    document.getElementById('your_name').value = '';
                    document.getElementById('your_phone').value = '';
                    document.getElementById('textarea_message').value = '';
                    fileInput.value = '';
                })
                .catch(function (error) {
                    alert('Failed to send your request. Please try again later.');
                    console.error(error);
                })
                .finally(function () {
                    // Re-enable button and reset its appearance
                    btnContinue.disabled = false;
                    btnContinue.textContent = 'Send';
                    btnContinue.classList.remove('disabled');
                });
        };

        reader.readAsDataURL(file);
    });
});