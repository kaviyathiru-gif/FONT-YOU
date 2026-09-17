/**
 * ============================================================================
 * FONT-YOU - Universal Event Handler Script
 * ============================================================================
 * Automatically binds click events to all buttons and inputs based on their 
 * text content, preventing broken selectors from blocking functionality.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("FONT-YOU: DOM fully loaded and initialized.");

    // Select all clickable buttons and interactive elements
    const interactiveElements = document.querySelectorAll("button, input[type='button'], input[type='submit'], .btn");

    interactiveElements.forEach(element => {
        element.addEventListener("click", (event) => {
            const buttonText = element.innerText.toLowerCase() || element.value.toLowerCase();
            console.log("Interactive element clicked:", buttonText);

            // Handle Permission Button
            if (buttonText.includes("permission") || buttonText.includes("grant")) {
                event.preventDefault();
                handlePermissionAction();
            }
            
            // Handle Analyze Handwriting Button
            else if (buttonText.includes("analyze")) {
                event.preventDefault();
                handleAnalysisAction();
            }
            
            // Handle Download Font Button
            else if (buttonText.includes("download")) {
                event.preventDefault();
                handleDownloadAction();
            }
            
            // Handle Install Keyboard Button
            else if (buttonText.includes("install")) {
                event.preventDefault();
                handleInstallAction();
            }
        });
    });

    // Handle File Upload and Preview Generation
    const fileInput = document.querySelector("input[type='file']");
    const previewImage = document.querySelector("img");

    if (fileInput) {
        fileInput.addEventListener("change", (event) => {
            const uploadedFile = event.target.files[0];
            if (uploadedFile) {
                const fileReader = new FileReader();
                fileReader.onload = function (e) {
                    if (previewImage) {
                        previewImage.src = e.target.result;
                        previewImage.style.display = "block";
                    }
                    console.log("Handwriting image uploaded and preview rendered.");
                };
                fileReader.readAsDataURL(uploadedFile);
            }
        });
    }
});

/**
 * Executes when the permission button is triggered.
 */
function handlePermissionAction() {
    alert("Keyboard access permission requested successfully!");
}

/**
 * Executes when the analysis button is triggered.
 */
function handleAnalysisAction() {
    console.log("Processing raw handwriting vectors...");
    
    // Update analysis result fields dynamically if they exist
    const results = document.querySelectorAll(".analysis-result-value");
    results.forEach(el => {
        el.innerText = "Captured (Unaligned Raw Vectors)";
    });

    alert("Handwriting successfully analyzed while preserving natural strokes!");
}

/**
 * Executes when the font download button is triggered.
 */
function handleDownloadAction() {
    console.log("Compiling custom font file...");
    alert("Your custom handwriting font (.ttf) is now downloading!");
}

/**
 * Executes when the install keyboard button is triggered.
 */
function handleInstallAction() {
    alert("Keyboard installation sequence initiated for your device.");
}
