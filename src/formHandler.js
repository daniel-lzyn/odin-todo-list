const observer = [];

function submitForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const formObject = {};

        for(const [key, value] of formData.entries()) {
            formObject[key] = value;
        };

        notify(observer, formObject);
    });
};

function notify(observer, data) {
    if(observer.length !== 0) {
        observer.forEach(observer => {
            observer(data);
        });
    };
}

function observe(newObserver) {
    observer.push(newObserver);
}

export { submitForm, observe };