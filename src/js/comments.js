const commentsWrap = document.querySelector("#comments");
const commentBox = document.querySelector(".write-comment-wrap");
const commentForm = document.querySelector(".write-comment-form");
const commentAddBtn = document.querySelector(".comments-add");
let commentCreated = document.querySelector("comment-time")

let commentText;
let commentUpdateForm;
let commentTextUpdated;
let commentOwner;
let commentEditBtn;
let commentDeleteBtn;

let commentAuthor = document.getElementById('commentAuthor');
let commentContent = document.getElementById('myComment');

let commentsURL = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${news_id}/comments`;


const generateCommentUI = (articles) => {
  for (let item of articles) {
    let commentRow = document.createElement("div");
    commentRow.classList.add("comment-row");

    commentRow.innerHTML = `<p class="comment-text ${item.id}">${item.comment}</p>
    <form class="comment-update-form ${item.id}">
        <textarea class="comment-text-update ${item.id}" name="commentUpdate">${item.comment}</textarea>
        <div class="error"></div>
        <button class="comment-update-btn ${item.id}">Update</button>
    </form>
    <div class="comment-details">
        <p class="comment-author ${item.id}">Commented by <span>${item.name}</span></p>
        <p class="comment-time ${item.id}">${commentTime(item.createdAt)}
        <div class="comment-button">
            <button class="comments-edit ${item.id}">Edit</button>
            <button class="comments-delete ${item.id}">Delete</button>
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

const commentErrorContent = {
    fullname: false,
    comment: false,
    commentUpdate: false
}

commentsWrap.addEventListener('click', async (e) => {
    let targetClass = `${(e.target.classList[1])}`
    commentId = e.target.classList[1];
    if (e.target.classList.contains('comments-edit')) {
        commentUpdateForm = document.getElementsByClassName(`comment-update-form ${targetClass}`)[0];

        commentUpdateForm.style.display="flex";
        commentText = document.getElementsByClassName(`comment-text ${targetClass}`)[0];
        commentText.style.display="none";
        commentEditBtn = document.getElementsByClassName(`comments-edit ${targetClass}`)[0];
        commentEditBtn.style.display="none";
        commentDeleteBtn = document.getElementsByClassName(`comments-delete ${targetClass}`)[0];
        commentDeleteBtn.style.display="none";

        commentUpdateForm.addEventListener('submit', submitFunc)
        commentTextUpdated = document.getElementsByClassName(`comment-text-update ${targetClass}`)[0];
        commentOwner = document.getElementsByClassName(`comment-author ${targetClass}`)[0];
    }

    if (e.target.classList.contains('comments-delete')) {
        let response = await deleteComment(commentId);
        if (response.ok) {
            alert('Comment deleted successfully');
            commentsWrap.lastChild.remove();
            commentInit()
        }
    }})


commentAddBtn.addEventListener('click', async (e) => {
    commentBox.style.display="flex";
    commentForm.addEventListener('submit', commentAddFunc)
})


const deleteComment = async (id) => {
    let response = await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${news_id}/comments/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return false;
        }
    return response;
}

const submitFunc = e => {
    e.preventDefault();
    let commentId = e.target.classList[1];
    let commentURL = `https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${news_id}/comments/${commentId}`;
    console.log(commentURL)

    validateCommentUpdate();
    if (errorContent.commentUpdate) {
        return;
    }else {    
    fetch(commentURL, {
        method: 'PUT',
        body: JSON.stringify({"name": commentOwner.firstChild.nextSibling.innerText, "comment": commentTextUpdated.value, "newsId": news_id}),
        headers: {
            'Content-Type': 'application/json'
          }
    }).then(response => {
        if(response.ok) {
            alert('Comment created successfully');
            form.reset();
            commentUpdateForm.style.display="none";
            commentText.style.display="block";
            commentEditBtn.style.display="block";
            commentDeleteBtn.style.display="block";
            commentsWrap.lastChild.remove();
            commentInit()
        } else {
            console.log("comment form data: ", commentFormUpdateData)
            alert('Error creating news');
            console.log(response);
        }
    }).catch(error => {
        console.log(error);
    })}
};

const commentAddFunc = (e) => {
    e.preventDefault();
    validateCommentInputs();
    if (errorContent.fullname || errorContent.comment) {
        return;
    }else {
    const commentFormData = {"name": commentAuthor.value, "comment": commentContent.value, "newsId": news_id};

    fetch(commentsURL, {
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
            commentsWrap.lastChild.remove();
            commentInit()
        } else {
            console.log("comment form data: ", commentFormData)
            alert('Error creating news');
            console.log(response);
        }
    }).catch(error => {
        console.log(error);
    })
    }
};


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
    const commentUpdateValue = commentTextUpdated.value

    if(commentUpdateValue === '') {
        setCommentError(commentTextUpdated, "You can't post an empty comment");
        commentErrorContent.commentUpdate = true;
    } else {
        setCommentSuccess(commentTextUpdated);
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
