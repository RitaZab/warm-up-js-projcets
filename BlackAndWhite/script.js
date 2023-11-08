const img = document.getElementById('img')
const colorSwitch = document.getElementById('color')
const imgButton = document.getElementById('img-btn')
const author_info = document.getElementById('author')
const site_info = document.getElementById('site-address')
const infoLine=document.getElementById('infos')


async function changingIMG() {
    img.alt=''
    imgButton.disabled = "true"
    infoLine.style.display="none"
    imgButton.innerText="Loading ..."
    let randomNr = Math.floor(Math.random() * 499);
    console.log(randomNr);
    let pageNr = randomNr - 100
    console.log(pageNr)
   console.log(Math.floor(pageNr / 100));
    switch (Math.floor(pageNr / 100)) {
			case -1:
				pageNr = 1;
				console.log(`pageNr=${pageNr} and randomNr=${randomNr}`);
				break;
			case 0:
            pageNr = 2;
            randomNr=randomNr - 100;
				console.log(`pageNr=${pageNr} and randomNr=${randomNr}`);
				break;
			case 1:
            pageNr = 3;
            randomNr=randomNr - 200;
				console.log(`pageNr=${pageNr} and randomNr=${randomNr}`);
				break;
			case 2:
            pageNr = 4;
            randomNr=randomNr - 300;
				console.log(`pageNr=${pageNr} and randomNr=${randomNr}`);
				break;
        case 3:
            randomNr=randomNr - 400;
				pageNr = 5;
				console.log(`pageNr=${pageNr} and randomNr=${randomNr}`);
				break;
		}
    console.log(pageNr)
    try {
        const response = await fetch(
            `https://pixabay.com/api/?key=31325646-e901f8cea6bd58f7226abcd2d&category=people&image_type=photo&per_page=100&page=${pageNr}&safesearch=true`
        );
        let result = await response.json();
        console.log(result)
        console.log(randomNr)
        result = await result.hits[randomNr]
        console.log(result)
        let sourceURL = result.webformatURL
        img.src = sourceURL 
        try{const response = await fetch(sourceURL
					
				);}
        catch {
            console.log('Problem with IMG')
        img.alt = "There were some problem with API img - check internet connection ...";}
        let authorName = result.user
        author_info.innerText = authorName
        let authorID = result.user_id
        let authorSubpage = `https://pixabay.com/users/${authorName}-${authorID}`;
        author_info.href = authorSubpage
        let imgPage = result.pageURL
        console.log(imgPage)
        site_info.href = imgPage
        imgButton.disabled = false
        imgButton.innerText = "Get new Image";
        infoLine.style.display = "block";
    } catch {
        console.log('is offline?')
        img.alt = "API is offline, please try again later ...";
        alert('API is offline, please try again later ...')
    }
    //Lets do option where only img is not displaying 
    
 }


imgButton.addEventListener('click', () => {
    changingIMG();
})

colorSwitch.addEventListener('click',()=>{
    let isChecked = colorSwitch.checked
    if (isChecked == true) {
        console.log('b&w')
        img.style.filter='grayscale(100%)'
    }
    else {
        console.log('colorfull')
        img.style.filter = "grayscale(0%)";
    }
}
)