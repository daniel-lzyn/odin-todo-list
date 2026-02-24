export function submitForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const formObject = {};
        for(const pair of formData.entries()) {
            formObject[pair[0]] = pair[1];
        };

        return formObject;
    });
};