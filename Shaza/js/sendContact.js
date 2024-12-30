// Initialize EmailJS
(function () {
    emailjs.init("uRyoF3BOf46rKTEe2"); // Use your actual EmailJS User ID
})();

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('user_name').value.trim();
        const email = document.getElementById('user_email').value.trim();
        const subject = document.getElementById('email_subject').value.trim();
        const message = document.getElementById('email_message').value.trim();

        // Validate required fields
        if (!name || !email || !subject || !message) {
            alert('Please fill out all required fields.');
            return;
        }

        // Disable the submit button to prevent multiple submissions
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Prepare the data to send with EmailJS
        const formData = {
            user_name: name,
            user_email: email,
            email_subject: subject,
            email_message: message,
        };

        // Send the email with EmailJS
        emailjs.send('service_c58q9od', 'template_84pvkou', formData)
            .then(() => {
                alert('Your message has been sent successfully!');
                contactForm.reset(); // Clear the form
            })
            .catch((error) => {
                alert('Failed to send your message. Please try again later.');
                console.error(error);
            })
            .finally(() => {
                // Re-enable the submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Now';
            });
    });
});