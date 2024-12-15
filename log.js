const form = document.getElementById('registrationForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const successMessage = document.getElementById('successMessage');

// Attach input listeners to each field for real-time validation
email.addEventListener('input', () => validateInput(email));
password.addEventListener('input', () => validateInput(password));

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    if (checkInputs()) { // If all inputs are valid
        successMessage.classList.remove('hidden'); // Show the success notification
        successMessage.innerText = 'Log In Successful!';

        // Hide the notification after 3 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
            window.location.href = 'body.html'; // Redirect to terms.html
        }, 3000);
    } else {
        successMessage.classList.add('hidden'); // Hide the notification if invalid
        alert('Please fill out all required fields correctly.');
    }
});

// Validate all inputs on form submission
function checkInputs() {
    let isValid = true;

    // Validate each input field on submission
    if (!validateInput(email)) isValid = false;
    if (!validateInput(password)) isValid = false;

    return isValid;
}

// Validate a single input
function validateInput(input) {
    const value = input.value.trim();
    const formControl = input.parentElement;
    let isValid = true;

    // Define validation rules for each field
    if (input === email) {
        if (value === '') {
            setErrorFor(input, 'Email cannot be blank');
            isValid = false;
        } else if (!isEmailValid(value)) {
            setErrorFor(input, 'Not a valid email');
            isValid = false;
        } else {
            setSuccessFor(input);
        }
    } else if (input === password && value === '') {
        setErrorFor(input, 'Password cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(input);
    }

    return isValid;
}

// Show error message
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
    input.classList.add('error');
    input.classList.remove('success');
    formControl.querySelector('.fa-exclamation-circle').style.visibility = 'visible';
    formControl.querySelector('.fa-check-circle').style.visibility = 'hidden';
}

// Show success state
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    input.classList.remove('error');
    input.classList.add('success');
    formControl.querySelector('.fa-exclamation-circle').style.visibility = 'hidden';
    formControl.querySelector('.fa-check-circle').style.visibility = 'visible';
}

// Email validation regex
function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

