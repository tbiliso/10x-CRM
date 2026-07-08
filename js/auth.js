// Save "signUp" objects to variables
const signForm = document.querySelector('.login_form');

const nameInput = document.querySelector('.login_form input:nth-of-type(1)');
const emailInput = document.querySelector('.login_form input:nth-of-type(2)');
const companyInput = document.querySelector('.login_form input:nth-of-type(3)');
const passwordInput = document.querySelector('.login_form input:nth-of-type(4)'); // გასწორდა document.querySelector
const confirmPasswordInput = document.querySelector('.login_form input:nth-of-type(5)');

// When we work on signUp form
if (signForm) {
    signForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Stop page refresh

        // Take entered values (გადმოვიდა ივენთის შიგნით, რომ ღილაკზე დაჭერის მომენტში წაიკითხოს!)
        const fullName = nameInput.value.trim();
        const email = emailInput.value.trim();
        const company = companyInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Form validation: Check password length and mismatch.
        if (password.length < 8) {
            alert("Password must be at least 8 characters long!"); // გამოსწორდა last -> at least
            return; // Stop function working
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return; // Stop function working
        }

        // When password length and confirmation are valid
        console.log("Validation passed! Ready to save:", { fullName, email, company, password }); // გასწორდა console.log
    });
}