/**
 * ============================================================================
 * FONT-YOU - Robust File Upload & Device Sync Fix
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("FONT-YOU File Upload Handler Initialized.");

    // Find the file input and the trigger button/container
    const fileInput = document.querySelector("input[type='file']");
    const previewImage = document.querySelector("#handwriting-preview, img");

    if (fileInput) {
        // Handle button clicks or custom styling if "Choose File" is wrapped
        const uploadContainers = document.querySelectorAll(".upload-container, button, label");
        uploadContainers.forEach(container => {
            if (container.innerText.toLowerCase().includes("choose file") || container.htmlFor === fileInput.id) {
                container.addEventListener("click", (e) => {
                    // Prevent default behavior and trigger the file picker dialog directly
                    e.preventDefault();
                    fileInput.click();
                });
            }
        });

        // Listen for when a file is chosen from the device storage
        fileInput.addEventListener("change", (event) => {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                console.log("File selected from device:", selectedFile.name);

                const reader = new FileReader();
                reader.onload = function (e) {
                    if (previewImage) {
                        previewImage.src = e.target.result;
                        previewImage.style.display = "block";
                        previewImage.style.maxWidth = "100%";
                    }
                    console.log("Handwriting preview successfully rendered.");
                };
                reader.readAsDataURL(selectedFile);
            }
        });
    }
});
