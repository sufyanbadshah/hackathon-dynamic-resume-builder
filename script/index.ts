document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form') as HTMLFormElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Getinf Data From Form
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

        // Dynamic Resume 
        const resumeSection = document.getElementById('resume');
        if (resumeSection) {
            resumeSection.innerHTML = `
                <h2>${name}'s Resume</h2>
                <p>Email: ${email}</p>
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Work Experience</h3>
                <p>${experience}</p>
                <h3>Skills</h3>
                <ul>
                    ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
                </ul>
            `;
        }
    });
});
