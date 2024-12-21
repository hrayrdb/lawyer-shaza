const attachhButton = document.getElementById('attachh-btn');
const fileInput = document.getElementById('file-input');
const fileNameElement = document.getElementById('file-name');
const fileError = document.getElementById('file-error');
const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
const allowedExtensions = ['pdf', 'docx', 'wav', 'mp3']; // Allowed file extensions

// Backend URL where the file will be uploaded
const uploadURL = 'https://your-server-url.com/upload';  // Replace with your backend API URL

// Handle attach file button (triggers the hidden file input)
attachhButton.addEventListener('click', () => {
  fileInput.click(); // Programmatically click the hidden file input
});

// Handle file input change
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];

  // Extract the file extension
  const fileExtension = file.name.split('.').pop().toLowerCase();

  // Check if the file exceeds the 5MB limit or has an invalid extension
  if (file.size > maxFileSize || !allowedExtensions.includes(fileExtension)) {
    fileError.classList.remove('hidden');
    fileNameElement.classList.add('hidden');
    fileInput.value = ''; // Clear the file input
  } else {
    fileError.classList.add('hidden');

    // Display the file name
    fileNameElement.textContent = `Attached file: ${file.name}`;
    fileNameElement.classList.remove('hidden');

    // Upload the file to the server
    uploadFile(file);
  }
});

function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
  
    fetch(uploadURL, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then((text) => { throw new Error(text); });
      }
      return response.json();
    })
    .then(data => {
      console.log('File uploaded successfully:', data);
      alert('File uploaded successfully!');
    })
    .catch(error => {
      console.error('Error uploading file:', error.message);
      alert('Error uploading file: ' + error.message);
    });
  }
  
