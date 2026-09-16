/* ================================================================= *
 * Handwriting Style Keyboard (fontyou) - Main JavaScript File
 * ================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const uploadArea = document.getElementById('uploadArea');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const noPreviewText = document.getElementById('noPreviewText');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const permissionBtn = document.getElementById('permissionBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const installBtn = document.getElementById('installBtn');
    const keyboardTest = document.getElementById('keyboardTest');
    
    // Analysis result elements
    const fontStyleEl = document.getElementById('fontStyle');
    const consistencyEl = document.getElementById('consistency');
    const slantAngleEl = document.getElementById('slantAngle');
    const spacingEl = document.getElementById('spacing');
    const charactersEl = document.getElementById('characters');
    
    // Initialize button states
    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = '0.6';
    downloadBtn.disabled = true;
    downloadBtn.style.opacity = '0.6';
    installBtn.disabled = true;
    installBtn.style.opacity = '0.6';

    // Upload area click handler
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    uploadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });
    
    // File input change handler
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                noPreviewText.style.display = 'none';
                
                // Enable analyze button
                analyzeBtn.disabled = false;
                analyzeBtn.style.opacity = '1';
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    // Analyze handwriting button
    analyzeBtn.addEventListener('click', function() {
        if (!fileInput.files[0]) {
            showNotification('Please upload a handwriting sample first.', 'warning');
            return;
        }
        
        // Show loading state
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        analyzeBtn.disabled = true;
        
        // Simulate analysis process
        setTimeout(() => {
            // Update analysis results with mock data
            fontStyleEl.textContent = "Cursive, Moderate Slant";
            consistencyEl.textContent = "85% Consistent";
            slantAngleEl.textContent = "12° Right Slant";
            spacingEl.textContent = "Medium";
            charactersEl.textContent = "42/52 extracted";
            
            // Reset button
            analyzeBtn.innerHTML = '<i class="fas fa-check"></i> Analysis Complete';
            
            // Enable download and install buttons
            downloadBtn.disabled = false;
            downloadBtn.style.opacity = '1';
            installBtn.disabled = false;
            installBtn.style.opacity = '1';
            
            // Change keyboard preview to handwriting style
            const keys = document.querySelectorAll('.key');
            keys.forEach(key => {
                key.style.fontFamily = "'Lucida Handwriting', cursive";
                key.style.fontSize = '1.1rem';
            });
            
            // Update test area font
            keyboardTest.style.fontFamily = "'Lucida Handwriting', cursive";
            keyboardTest.placeholder = "Try typing with your custom handwriting font...";
            
            showNotification('Handwriting analysis complete! Your custom font has been generated.', 'success');
        }, 2000);
    });
    
    // Permission button
    permissionBtn.addEventListener('click', function() {
        permissionBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Requesting Permission...';
        permissionBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Permission granted successfully! You can now install your custom keyboard.', 'success');
            
            permissionBtn.innerHTML = '<i class="fas fa-check"></i> Permission Granted';
            permissionBtn.style.background = 'linear-gradient(to right, #27ae60, #2ecc71)';
            
            // Enable install button
            installBtn.disabled = false;
            installBtn.style.opacity = '1';
        }, 1500);
    });
    
    // Download font button
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'data:application/x-font-ttf;base64,' + btoa('Mock font data for demonstration');
        link.download = 'my-handwriting-font.ttf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Your custom handwriting font has been downloaded!', 'success');
    });
    
    // Install keyboard button
    installBtn.addEventListener('click', function() {
        installBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Installing...';
        installBtn.disabled = true;
        
        setTimeout(() => {
            installBtn.innerHTML = '<i class="fas fa-check"></i> Keyboard Installed';
            installBtn.style.background = '#27ae60';
            
            showNotification('Your custom handwriting keyboard has been installed successfully!', 'success');
        }, 2000);
    });
    
    // Keyboard test area interaction
    keyboardTest.addEventListener('focus', function() {
        this.style.fontFamily = "'Lucida Handwriting', cursive";
    });
    
    keyboardTest.addEventListener('click', function() {
        if (this.value === '') {
            this.value = "This is how your custom handwriting font will look when typing!";
        }
    });

    // Custom non-blocking notification modal helper
    function showNotification(message, type = 'success') {
        const existingBanner = document.querySelector('.notification-banner');
        if (existingBanner) existingBanner.remove();

        const banner = document.createElement('div');
        banner.className = `notification-banner notification-${type}`;
        banner.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e67e22'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        `;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
        banner.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        
        document.body.appendChild(banner);

        setTimeout(() => {
            banner.style.opacity = '0';
            banner.style.transition = 'opacity 0.5s ease';
            setTimeout(() => banner.remove(), 500);
        }, 3500);
    }
});
