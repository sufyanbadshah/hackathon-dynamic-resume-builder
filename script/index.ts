document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form') as HTMLFormElement;
    const editBtn = document.getElementById('edit-btn') as HTMLButtonElement;
    const downloadBtn = document.getElementById('download-pdf') as HTMLButtonElement;
    const generateUrlBtn = document.getElementById('generate-url') as HTMLButtonElement;
    const resumeSection = document.getElementById('resume-content');
    const resumeUrlElement = document.getElementById('resume-url');
    let isEditing = false;
    let resumeURL: string | null = null;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get data from form
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

        // Generate resume
        if (resumeSection) {
            resumeSection.innerHTML = `
                <h2 id="resume-name">${name}'s Resume</h2>
                <p id="resume-email" class="editable" contenteditable="false">Email: ${email}</p>
                <h3>Education</h3>
                <p id="resume-education" class="editable" contenteditable="false">${education}</p>
                <h3>Work Experience</h3>
                <p id="resume-experience" class="editable" contenteditable="false">${experience}</p>
                <h3>Skills</h3>
                <ul id="resume-skills">
                    ${skills.map(skill => `<li class="editable" contenteditable="false">${skill.trim()}</li>`).join('')}
                </ul>
            `;

            // Generate unique URL
            const username = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
            resumeURL = `${window.location.origin}/resume/${username}`;
        }
    });

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            const editableElements = document.querySelectorAll('.editable');
            if (isEditing) {
                // Save changes
                editableElements.forEach(element => {
                    element.setAttribute('contenteditable', 'false');
                });
                editBtn.textContent = 'Edit';
            } else {
                // Enable editing
                editableElements.forEach(element => {
                    element.setAttribute('contenteditable', 'true');
                });
                editBtn.textContent = 'Save';
            }
            isEditing = !isEditing;
        });
    }
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (resumeSection) {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                doc.text(resumeSection.innerText, 10, 10);
                doc.save('resume.pdf');
            }
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (resumeSection && resumeURL) {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                // Add resume content
                doc.text(resumeSection.innerText, 10, 10);
                
                doc.text(`Resume URL: ${resumeURL}`, 10, 20 + doc.internal.getTextDimensions(resumeSection.innerText).h);
                
                doc.save('resume.pdf');
            }
        });
    }

    if (generateUrlBtn) {
        generateUrlBtn.addEventListener('click', () => {
            if (resumeURL && resumeUrlElement) {
                resumeUrlElement.textContent = `Your resume URL: ${resumeURL}`;
            } 
        });
    }
});
