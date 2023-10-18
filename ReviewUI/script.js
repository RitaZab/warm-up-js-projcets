const ratingElements = document.querySelectorAll(".single-review")
const button = document.getElementById('button')
const mainContainer=document.getElementById('main-container')
let selectedReview=''



function removeActiveClass() {
    ratingElements.forEach((element => {
        element.classList.remove("active")
    }))
}

ratingElements.forEach((element) => {
    element.addEventListener('click', (event) => {
        // console.log(event.target.innerText || event.target.parentNode.innerText)
        removeActiveClass()
        event.target.classList.add('active')
        event.target.parentNode.classList.add("active");
        selectedReview = event.target.innerText || event.target.parentNode.innerText;
        console.log(selectedReview)
    })
})

button.addEventListener("click", () => {
    if (selectedReview !== "") {
        console.log(mainContainer)
		mainContainer.innerHTML = `
            <h1>Thanks for your review!</h1>
                        <br>
            <strong id='opinion'>Your opinion: ${selectedReview} </strong>
            <br>
            <p>Your feedback will help us improve our services</p>
            <br>
            <img src="Imgs\\thanks.png" alt="thank you face" class="icon" id='thankyou'>`;
    }
    else{alert("Choose review first!")}
});