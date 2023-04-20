const commentsWrap = document.querySelector("#comments");
const commentBox = document.querySelector(".write-comment-wrap");
const commentForm = document.querySelector(".write-comment-form");
const commentAddBtn = document.querySelector(".comments-add");
const commentTextUpdated = document.querySelector(".comment-text-update");
const commentUpdateForm = document.querySelector(".comment-update-form");
let commentEditBtn;
let commentTextNow;

const commentAuthor = document.getElementById('commentAuthor');
const commentContent = document.getElementById('myComment');

let commentsURL = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${news_id}/comments`;
let commentURL = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${news_id}/comments`;

const generateCommentUI = (articles) => {
  for (let item of articles) {
    let commentRow = document.createElement("div");
    commentRow.classList.add("comment-row");
    commentRow.innerHTML = `<p class="comment-text">${item.comment}</p>
    <form class="comment-update-form">
        <textarea class="comment-text-update" name="commentUpdate" id="commentUpdate">${item.comment}</textarea>
        <div class="error"></div>
        <button class="comment-update-btn">Update</button>
    </form>
    <div class="comment-details">
        <p class="comment-author">Commented by <span>${item.name}</span></p>
        <p class="comment-time">${commentTime(item.createdAt)}
        <div class="comment-button">
            <button class="comments-edit">Edit</button>
            <button class="comments-delete">Delete</button>
        </div>
    </div>`;
    commentsWrap.appendChild(commentRow);
  }
};



const getComments = async () => {
  let response = await fetch(commentsURL);
 
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  return data;
};

commentAddBtn.addEventListener("click", () => {

});

const getComment = async () => {
    let response = await fetch(commentURL);
    if (!response.ok) {
      alert("Data unavailable at the moment. Please try again later");
      return false;
    }
    let data = await response.json();
    return data;
  };



const commentErrorContent = {
    fullname: false,
    comment: false,
    commentUpdate: false
}

commentAddBtn.addEventListener('click', async () => {
    commentBox.style.display="flex";
    elm = await waitForElm('.comment-update-form');
    elm.addEventListener('click', submitFunc)
    console.log(elm)
    commentEditBtn = await waitForElm('.comments-edit');
    console.log(commentEditBtn)
    commentTextNow = await waitForElm('.comment-text');
    commentEditBtn.addEventListener("click", () => {
        elm.style.display="flex";
    });
})


let elm;

const deleteComment = async (id) => {
    let response = await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${news_id}/comments/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return false;
        }
    let data = await response.json();
    return data;
}

const submitFunc = e => {
    e.preventDefault();

    validateCommentUpdate();
    if (errorContent.commentUpdate) {
        return;
    }else {
    const commentFormUpdateData = {"name": commentAuthor.value, "comment": commentContent.value, "newsId": news_id};

    fetch(commentURL, {
        method: 'PUT',
        body: JSON.stringify(commentFormUpdateData),
        headers: {
            'Content-Type': 'application/json'
          }
    }).then(response => {
        if(response.status === 201) {
            alert('Comment created successfully');
            form.reset();
            commentForm.style.display="none";
        } else {
            console.log("comment form data: ", commentFormUpdateData)
            alert('Error creating news');
            console.log(response);
        }
    }).catch(error => {
        console.log(error);
    })
    }
};

commentForm.addEventListener('submit', e => {
    e.preventDefault();

    validateCommentInputs();
    if (errorContent.fullname || errorContent.comment) {
        return;
    }else {
    const commentFormData = {"name": commentAuthor.value, "comment": commentContent.value, "newsId": news_id};

    fetch(commentURL, {
        method: 'POST',
        body: JSON.stringify(commentFormData),
        headers: {
            'Content-Type': 'application/json'
          }
    }).then(response => {
        if(response.status === 201) {
            alert('Comment created successfully');
            form.reset();
            commentBox.style.display="none";
        } else {
            console.log("comment form data: ", commentFormData)
            alert('Error creating news');
            console.log(response);
        }
    }).catch(error => {
        console.log(error);
    })
    }
});


const setCommentError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setCommentSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateCommentUpdate = () => {
    console.log("here", commentTextNow)
    const commentUpdateValue = commentTextNow.value

    if(commentUpdateValue === '') {
        setCommentError(commentTextNow, "You can't post an empty comment");
        commentErrorContent.commentUpdate = true;
    } else {
        setCommentSuccess(commentTextNow);
        commentErrorContent.commentUpdate = false;
    }
};


const validateCommentInputs = () => {
    const fullnameValue = commentAuthor.value.trim();
    const commentValue = commentContent.value.trim();

    if(fullnameValue === '') {
        setCommentError(commentAuthor, "Name is required. Fill in author's first and last name");
        commentErrorContent.fullname = true;
    } else {
        setCommentSuccess(commentAuthor);
        commentErrorContent.fullname = false;
    }

    if(commentValue === '') {
        setCommentError(commentContent, "You can't post an empty comment");
        commentErrorContent.comment = true;
    } else {
        setCommentSuccess(commentContent);
        commentErrorContent.comment = false;
    }

};



const commentTime = (timeIn) => {
  const now = new Date();
  const timestamp = new Date(timeIn);
  const seconds = Math.floor((now - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds <= 1 ? "just now" : `${seconds} seconds ago`;
  }
};

const commentInit = async () => {
  let comments = await getComments();
  generateCommentUI(comments);
};

const waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
