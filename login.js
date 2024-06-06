// Function to generate a random alphanumeric captcha
function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=';
    const captchaLength = 8;
    let captcha = '';

    for (let i = 0; i < captchaLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        captcha += characters.charAt(randomIndex);
        // console.log(captcha)
    }

    // Display the captcha
    document.getElementById('captcha').innerText = captcha;

    // Clear any previous error messages after 9 seconds
    setTimeout(function () {
        document.getElementById('error-message-2').innerText = '';
        document.getElementById('error-message-2').style.display = 'none';
    }, 9999); // 9000 milliseconds (9 seconds) delay

    // Error No-2 For Captcha
    setTimeout(function () {
        document.getElementById('error-message-1').innerText = '';
        document.getElementById('error-message-1').style.display = 'none';
    }, 9999); // 9000 milliseconds (9 seconds) delay

    // Clear input field
    document.getElementById('captchaInput').value = '';

    // Clear countdown
    document.getElementById('countdown').innerText = '';
}

// Function to verify the entered captcha
function verifyCaptcha() {
    const userName = document.getElementById('userName').value;
    const enteredCaptcha = document.getElementById('captchaInput').value;
    const displayedCaptcha = document.getElementById('captcha').innerText;

    // Function to verify userName entered
    if (userName.trim() === '') {

        // Display error message
        document.getElementById('error-message-1').innerText = '*Please enter Your Name';
        document.getElementById('error-message-1').style.display = 'block';
        return;
    }
    // Clear input field immediately after verification
    document.getElementById('captchaInput').value = '';

    if (enteredCaptcha === displayedCaptcha) {

        // Store the user's name in localStorage
        localStorage.setItem('userName', userName);
        
        // Display countdown for 3 seconds
        let countdown = 3;

        function updateCountdown() {
            document.getElementById('countdown').innerText = 'Redirecting in ' + countdown + ' seconds...';

            if (countdown > 0) {
                countdown--;
                setTimeout(updateCountdown, 1000);
            } else {
                redirectHomePage();
            }
        }
        updateCountdown();
        
        // Redirect to the home page
    } else {
        // Display error message
        document.getElementById('error-message-2').innerText = '*Captcha verification failed. Please enter the correct code.';
        document.getElementById('error-message-2').style.display = 'block';

        // Generate a new captcha immediately
        generateCaptcha();
    }
}

// Function to redirect to home page
function redirectHomePage() {
    // Redirect to the home page
    window.location.href = 'public/html/home.html';
}

// Initial captcha generation when the page loads
generateCaptcha();
