const button = document.getElementById('button')
const affirmation = document.getElementById('affirmation')
const sunIcons = document.getElementsByClassName('fa-sun')
const randomIcon = document.getElementById('icon')
const iconsList = [
	"fa-star",
	"fa-heart",
	"fa-face-smile",
	"fa-award",
	"fa-seedling",
	"fa-trophy",
	"fa-road",
	"fa-otter",
	"fa-yin-yang",
	"fa-wand-sparkles",
	"fa-rainbow"
];
const gradientList = [
	"linear-gradient(to right, #8360c3, #2ebf91)",
	"linear-gradient(to right, #fffbd5, #b20a2c)",
	"linear-gradient(to right, #fc5c7d, #6a82fb);",
	"linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
	"linear-gradient(to right, #00b09b, #96c93d)",
	"radial-gradient(circle farthest-side, #fceabb, #f8b500);",
	"linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))",
	"linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% )",
	"linear-gradient(25deg,#d64c7f,#ee4758 50%)",
	"linear-gradient( 95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% )",
	"radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )",
];
 

async function getAffirmation() {
    try {
        Array.from(sunIcons).forEach((e) => {
            //console.log(e)
            e.style.display = 'inline'
        })
        //console.log(sunIcons)
        button.innerText = "Loading ..."
        button.disabled = true
        affirmation.innerText=' The affirmation is updating ... please wait '
        const response = await fetch('https://corsproxy.io/?' + encodeURIComponent("https://www.affirmations.dev/"));
        var data = await response.json();
        console.log(data.affirmation);
        affirmation.innerText = " " + data.affirmation + " "
        button.innerText = "Get new affirmation";
        button.disabled = false
        let iconNumber = Math.floor((Math.random() * 10) + 1)
        console.log(iconNumber)
        console.log(randomIcon.classList[1])
        randomIcon.classList.remove(randomIcon.classList[1]);
        console.log(randomIcon.classList)
        randomIcon.classList.add(iconsList[iconNumber]);
        let backgColorNr = Math.floor((Math.random() * 10) + 1)
        let newBackground=gradientList[backgColorNr]
        document.body.style.background=newBackground
        
    }
    catch {
        affirmation.innerText = 'API error ocurred - try program in other browser or try again later';
        Array.from(sunIcons).forEach((e)=> {
            console.log(e)
            e.style.display = 'none'
            
        })
        button.innerText = "Get new affirmation";
				button.disabled = false;
    randomIcon.style.display='none'}
    
}

button.addEventListener('click',getAffirmation)