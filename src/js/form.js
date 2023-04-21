let btnOpen = document.querySelector(".btnOpen");

let box = document.querySelector(".box");
let optionsContainer = document.querySelector(".options-container");
let body = document.querySelector("body");
let firstSection = document.querySelectorAll(".first-section");
let close = document.querySelector(".close");

let registerHead = document.querySelector(".register-head");
let registerBody = document.querySelector(".register-body");
let last_name = document.querySelector(".last_name");
let bodyText = document.querySelector(".body-text");
let btnClose = document.querySelector(".btnClose");

let registrationBox = document.querySelector(".registration-box");
let confirmationBox = document.querySelector(".confirmation-box");
let btnSubmit = document.querySelector(".btnSubmit");

btnOpen.addEventListener("click", ()=>{
    btnOpen.style.display="none";
    confirmationBox.style.display="none";
    registrationBox.style.display="block";
    box.style.display="block";
    container.style.display = "none";
    optionsContainer.style.display = "none";
    body.style.backgroundColor="#222";
});

close.addEventListener("click", ()=>{
    btnOpen.style.display="block";
    box.style.display="none";
    container.style.display = "grid";
    optionsContainer.style.display = "flex";
    body.style.backgroundColor="#f3f3f3";
});
btnClose.addEventListener("click", ()=>{
    btnOpen.style.display="block";
    box.style.display="none";
    container.style.display = "grid";
    optionsContainer.style.display = "flex";
    body.style.backgroundColor="#f3f3f3";
});


const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const title = document.getElementById('title');
const newsLink = document.getElementById('newsLink');

const url = "https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/"

const errorContent = {
    fullname: false,
    email: false,
    title: false,
    newsLink: false,
}

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
    if (errorContent.fullname || errorContent.email || errorContent.title || errorContent.newsLink) {
        return;
    }else {
    const formData = {"author": fullname.value, "email": email.value, "title": title.value, "url": newsLink.value}

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
          }
    }).then(response => {
        if(response.status === 201) {
            alert('News created successfully');
            form.reset();
            registrationBox.style.display="none";
            confirmationBox.style.display="block";
        } else {
            alert('Error creating news');
        }
    }).catch(error => {
        console.log(error);
    })
    }
});


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const titleValue = title.value.trim();
    const newsLinkValue = newsLink.value.trim();

    if(fullnameValue === '') {
        setError(fullname, "Name is required. Fill in author's first and last name");
        errorContent.fullname = true;
    } else {
        setSuccess(fullname);
        errorContent.fullname = false;
    }

    if(newsLinkValue === '') {
        setError(newsLink, "News URL is required.");
        errorContent.newsLink = true;
    } else {
        setSuccess(newsLink);
        errorContent.newsLink = false;
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        errorContent.email = true;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        errorContent.email = true;
    } else {
        setSuccess(email);
        errorContent.email = false;
    }

    if(titleValue === '') {
        setError(title, 'Title of news is required');
        errorContent.title = true;
    } else {
        setSuccess(title);
        errorContent.title = false;
    }

};

