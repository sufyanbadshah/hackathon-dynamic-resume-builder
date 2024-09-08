document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Getinf Data From Form
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value.split(',');
        // Dynamic Resume 
        var resumeSection = document.getElementById('resume');
        if (resumeSection) {
            resumeSection.innerHTML = "\n                <h2>".concat(name, "'s Resume</h2>\n                <p>Email: ").concat(email, "</p>\n                <h3>Education</h3>\n                <p>").concat(education, "</p>\n                <h3>Work Experience</h3>\n                <p>").concat(experience, "</p>\n                <h3>Skills</h3>\n                <ul>\n                    ").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "\n                </ul>\n            ");
        }
    });
});
