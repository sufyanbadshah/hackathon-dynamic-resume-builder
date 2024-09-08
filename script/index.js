document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form');
    var editBtn = document.getElementById('edit-btn');
    var downloadBtn = document.getElementById('download-pdf');
    var generateUrlBtn = document.getElementById('generate-url');
    var resumeSection = document.getElementById('resume-content');
    var resumeUrlElement = document.getElementById('resume-url');
    var isEditing = false;
    var resumeURL = null;
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Get data from form
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value.split(',');
        // Generate resume
        if (resumeSection) {
            resumeSection.innerHTML = "\n                <h2 id=\"resume-name\">".concat(name, "'s Resume</h2>\n                <p id=\"resume-email\" class=\"editable\" contenteditable=\"false\">Email: ").concat(email, "</p>\n                <h3>Education</h3>\n                <p id=\"resume-education\" class=\"editable\" contenteditable=\"false\">").concat(education, "</p>\n                <h3>Work Experience</h3>\n                <p id=\"resume-experience\" class=\"editable\" contenteditable=\"false\">").concat(experience, "</p>\n                <h3>Skills</h3>\n                <ul id=\"resume-skills\">\n                    ").concat(skills.map(function (skill) { return "<li class=\"editable\" contenteditable=\"false\">".concat(skill.trim(), "</li>"); }).join(''), "\n                </ul>\n            ");
            // Generate unique URL
            var username = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
            resumeURL = "".concat(window.location.origin, "/resume/").concat(username);
        }
    });
    if (editBtn) {
        editBtn.addEventListener('click', function () {
            var editableElements = document.querySelectorAll('.editable');
            if (isEditing) {
                // Save changes
                editableElements.forEach(function (element) {
                    element.setAttribute('contenteditable', 'false');
                });
                editBtn.textContent = 'Edit';
            }
            else {
                // Enable editing
                editableElements.forEach(function (element) {
                    element.setAttribute('contenteditable', 'true');
                });
                editBtn.textContent = 'Save';
            }
            isEditing = !isEditing;
        });
    }
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            if (resumeSection) {
                var jsPDF = window.jspdf.jsPDF;
                var doc = new jsPDF();
                doc.text(resumeSection.innerText, 10, 10);
                doc.save('resume.pdf');
            }
        });
    }
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            if (resumeSection && resumeURL) {
                var jsPDF = window.jspdf.jsPDF;
                var doc = new jsPDF();
                // Add resume content
                doc.text(resumeSection.innerText, 10, 10);
                doc.text("Resume URL: ".concat(resumeURL), 10, 20 + doc.internal.getTextDimensions(resumeSection.innerText).h);
                doc.save('resume.pdf');
            }
        });
    }
    if (generateUrlBtn) {
        generateUrlBtn.addEventListener('click', function () {
            if (resumeURL && resumeUrlElement) {
                resumeUrlElement.textContent = "Your resume URL: ".concat(resumeURL);
            }
        });
    }
});
