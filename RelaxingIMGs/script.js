const btnNature=document.getElementById('nature')
const btnAnimals=document.getElementById('wildlife')
const btnLandscapes = document.getElementById('landscapes')
const IMG = document.getElementById('image')
const buttonList = [btnNature, btnAnimals, btnLandscapes];
const APIurl = "https://api.api-ninjas.com/v1/randomimage?category=";
const authorEl = document.getElementById("author");
const linkToWebsite = document.getElementById("web-link");


async function changeIMG(e) {
    
    //console.log(e);
    let category = e.id;
    if (category == "wildlife") {
        category = "animals";
    }
    if (category == "landscapes") {
        category = "places";
    }
    let randomNumber = Math.floor(Math.random() * 199);
    //console.log(randomNumber);

    const response = await fetch(
        `https://pixabay.com/api/?key=31325646-e901f8cea6bd58f7226abcd2d&category=${category}&image_type=photo&per_page=200`
    );
    const JSON = await response.json();
  
    //console.log(JSON);
    let imgURL = JSON.hits[randomNumber].largeImageURL;
    //console.log(imgURL);
    
    IMG.src = imgURL;
    let author = JSON.hits[randomNumber].user;
    //console.log(author);
    let authorId = JSON.hits[randomNumber].user_id;
    //console.log(authorId);
    let webpage = JSON.hits[randomNumber].pageURL;
    //console.log(webpage);
    authorEl.innerText = author;
    let newHREF = `https://pixabay.com/users/${author}-${authorId}`;
    authorEl.href = newHREF;
    linkToWebsite.href = webpage;
    linkToWebsite.innerText = "Pixabay";
    try {
        const response2 = await fetch(imgURL)
        let status = response2.status
        console.log(status)
        IMG.alt = `${category} image`
        
    }
    catch {
        console.log('problem')
    
        IMG.alt = 'There is problem with API, check internet connection or try later'
    
    }
}



		
    
    
    
    

      



buttonList.forEach(function (button) {
    button.addEventListener('click', function () { changeIMG(button) })
})
