const attachButton = document.getElementById('attach-btn');
const fileInput = document.getElementById('file-input');
const fileNameElement = document.getElementById('file-name');
const fileError = document.getElementById('file-error');
const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
const allowedExtensions = ['pdf', 'docx', 'wav', 'mp3', 'jpg', 'png', 'jpeg'];

// Backend URL where the file will be uploaded
const uploadURL = 'https://lawyer-shaza.com/uploads/upload.php';

// Handle attach file button
attachButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent page refresh if inside a form
  fileInput.click(); // Programmatically trigger the file input
});

// Handle file input change
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  fileError.textContent = ''; // Clear previous errors
  fileError.classList.add('hidden');

  if (!file) return; // Ensure a file is selected

  const fileExtension = file.name.split('.').pop().toLowerCase();

  // Validate file size and type
  if (file.size > maxFileSize || !allowedExtensions.includes(fileExtension)) {
    fileError.textContent = 'File exceeds the 5MB limit or is of an invalid type.';
    fileError.classList.remove('hidden');
    fileNameElement.classList.add('hidden');
    fileInput.value = ''; // Clear the input
  } else {
    fileNameElement.textContent = `Attached file: ${file.name}`;
    fileNameElement.classList.remove('hidden');
    uploadFile(file);
  }
});

// Upload file function
function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file); // Key must match the PHP script key: $_FILES['file']

  fetch(uploadURL, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        fileNameElement.textContent = `File uploaded successfully: ${file.name}`;
        alert('File uploaded successfully!');
      } else {
        throw new Error(data.error || 'Unknown error during upload.');
      }
    })
    .catch(error => {
      fileError.textContent = `Error: ${error.message}`;
      fileError.classList.remove('hidden');
      console.error('Error uploading file:', error.message);
    });
}