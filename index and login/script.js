// Clear uploaded images from local storage on page load
window.onload = function() {
    localStorage.removeItem('uploadedImages');
};

// Check if there are previously uploaded images in local storage
let uploadedImages = [];

function login() {
    // Here you would handle login logic
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('uploadForm').style.display = 'block';
}

function uploadImage() {
    const fileInput = document.getElementById('imageFile');
    const captionInput = document.getElementById('caption');

    const file = fileInput.files[0];
    const caption = captionInput.value;

    // Check if a caption is provided or a file is selected
    if (caption || file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;

                // Add the uploaded image URL and caption to the array
                uploadedImages.push({ src: imageUrl, caption: caption });

                // Save the updated array to local storage
                localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));

                // Display the uploaded image in the gallery
                displayImages();
            };
            // Read the file as a data URL
            reader.readAsDataURL(file);
        } else {
            // If only caption is provided without image, add caption to the array
            uploadedImages.push({ src: null, caption: caption });

            // Save the updated array to local storage
            localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));

            // Display the uploaded image in the gallery
            displayImages();
        }
    } else {
        alert('Please select an image or enter a caption.');
    }
}

// Function to display uploaded images in the gallery
function displayImages() {
    const container = document.getElementById('images');
    container.innerHTML = ''; // Clear existing images

    uploadedImages.forEach(function(image) {
        const imageElement = document.createElement('img');
        imageElement.src = image.src;

        const captionElement = document.createElement('p');
        captionElement.textContent = image.caption;

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.appendChild(imageElement);
        imageContainer.appendChild(captionElement);

        container.appendChild(imageContainer);
    });

    // Show the image container
    document.getElementById('imageContainer').style.display = 'block';
}
