let editNewsBtn = document.querySelector(".news-edit");
let cardContainer = document.querySelector(".container-wrap");

let box = document.querySelector(".box");
box.classList.remove("box");
box.classList.add("box-edit");
// let container = document.querySelector(".container");
let body = document.querySelector("body");
//Note: this is not a class but a tag name.
//That is why it is not referenced with the "." sign
let close = document.querySelector(".close");

let registerHead = document.querySelector(".register-head");
let registerBody = document.querySelector(".register-body");

// let first_name = document.querySelector(".first_name");
let bodyText = document.querySelector(".body-text");
let btnClose = document.querySelector(".btnClose");

let registrationBox = document.querySelector(".registration-box");
let confirmationBox = document.querySelector(".confirmation-box");
let btnSubmit = document.querySelector(".btnSubmit");

editNewsBtn.addEventListener("click", () => {
  confirmationBox.style.display = "none";
  registrationBox.style.display = "block";
  box.style.display = "block";
  cardContainer.style.display = "none";
  body.style.backgroundColor = "#222";
  form.reset()
  fetch(requestURL)
    .then((response) => {
      if (response.status === 200) {
        alert("News fetched successfully");
        return response.json();
      } else {
        alert("Error creating news");
      }
    }).then((data) => {
        const {author, title, url} = data;
        fullname.value = author;
        newsTitle.value = title;
        newsLink.value = url;

    })  
    .catch((error) => {
      console.log(error);
    });
});

close.addEventListener("click", () => {
  box.style.display = "none";
  cardContainer.style.display = "flex";
  body.style.backgroundColor = "#f3f3f3";
});
btnClose.addEventListener("click", () => {
  box.style.display = "none";
  cardContainer.style.display = "flex";
  body.style.backgroundColor = "#f3f3f3";
});

const form = document.getElementById("form");
const fullname = document.getElementById("fullname");
const newsTitle = document.getElementById("title");
// const imageFile = document.getElementById('imageFile');
const newsLink = document.getElementById("newsLink");

// const url = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}`

const errorContent = {
  fullname: false,
  newsTitle: false,
  newsLink: false,
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
  if (
    errorContent.fullname ||
    errorContent.newsTitle ||
    errorContent.newsLink
  ) {
    return;
  } else {
    const formData = {
      author: fullname.value,
      title: newsTitle.value,
      url: newsLink.value,
    };

    // formData.append('author', fullname.value);
    // formData.append('email', email.value);
    // formData.append('title', title.value);
    // formData.append('url', newsLink.value);
    // formData.append('avatar', imageFile.files[0]);
    // console.log(formData);
    fetch(requestURL, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("News updated successfully");
          form.reset();
          registrationBox.style.display = "none";
          confirmationBox.style.display = "block";
        } else {
          alert("Error updating news");
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};


const validateInputs = () => {
  const fullnameValue = fullname.value.trim();
  const titleValue = newsTitle.value.trim();
  const newsLinkValue = newsLink.value.trim();
  // const imageFileValue = imageFile.value;

  if (fullnameValue === "") {
    setError(
      fullname,
      "Name is required. Fill in author's first and last name"
    );
    errorContent.fullname = true;
  } else {
    setSuccess(fullname);
    errorContent.fullname = false;
  }

  if (newsLinkValue === "") {
    setError(newsLink, "News URL is required.");
    errorContent.newsLink = true;
  } else {
    setSuccess(newsLink);
    errorContent.newsLink = false;
  }

  if (titleValue === "") {
    setError(title, "Title of news is required");
    errorContent.newsTitle = true;
  } else {
    setSuccess(title);
    errorContent.newsTitle = false;
  }
  // if (!imageFileValue || imageFileValue === '') {
  //     setError(imageFile, 'Image is required');
  // } else {
  //     setSuccess(imageFile);
  // }
};
