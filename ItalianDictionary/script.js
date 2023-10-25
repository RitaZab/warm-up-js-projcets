const enWord = document.getElementById('word')
const textInfo = document.getElementById("user-info")
const resultArea = document.getElementById('translation-div')
const insertedWord = document.getElementById('inserted-word')
const meaningLine = document.getElementById("meaning");
const audio = document.getElementById('audio')
const translation = document.getElementById("translation");
const meaningButtons = document.getElementsByClassName('buttons')[0]
const itButton = document.getElementById("italian");
const enButton = document.getElementById("english");
let englishMeaning;
let italianMeaning

let meaningRaw; 

async function translateMeaning(englishMeaning) { //In this function we translate english meaning to the italian language
    enButton.disabled = true;
    
const data = JSON.stringify({
					text: englishMeaning,
					target: "it",
				});
					//There were problem with fetchin so we'll use older method
				const xhr = new XMLHttpRequest();
				xhr.withCredentials = true;

				xhr.addEventListener("readystatechange", function () {
					if (this.readyState === this.DONE) {
                        console.log(this.responseText);
                        let json = JSON.parse(this.responseText)
                        //console.log(json[0].result.text)
                        italianMeaning = json[0].result.text;
                        // meaningLine.innerText = italianMeaning
                        enButton.disabled = false;
                        
					}
				});

				xhr.open("POST", "https://opentranslator.p.rapidapi.com/translate");
				xhr.setRequestHeader("content-type", "application/json");
				xhr.setRequestHeader(
					"X-RapidAPI-Key",
					"5fe3ef2fdemsh52e47f9fe023d99p1a8a44jsn11b8ebfac531"
				);
				xhr.setRequestHeader(
					"X-RapidAPI-Host",
					"opentranslator.p.rapidapi.com"
				);

        xhr.send(data);
}

async function apiMeaningConnection(searchWord) {  //here we will take english meaning for the searched word
    const meaningURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
    italianMeaning = 'Please wait...'
    itButton.disabled=true

    console.log(meaningURL)
    try {
        
        textInfo.style.display = 'block'
        textInfo.innerText = `Please wait ...`
        resultArea.style.display = "none";
        const response = await fetch(meaningURL)
         meaningRaw = await response.json()
        let meaning = meaningRaw[0].meanings[0].definitions[0].definition
        englishMeaning = meaningRaw[0].meanings[0].definitions[0].definition;
        
        
        //console.log(meaning)
        insertedWord.innerText=meaningRaw[0].word
        meaningLine.innerText=meaning
        textInfo.style.display = 'none';
        resultArea.style.display = 'block'
        audio.src = meaningRaw[0].phonetics[0].audio
        console.log(typeof (audio.src))
        let check = audio.src.includes('https')
        console.log(check)
        if (await check == false ) {
            //If the first meaning is empty, we will take second meaning on the list
            audio.src = meaningRaw[0].phonetics[1].audio;
        }
        translateMeaning(englishMeaning);//here we translate meaning from EN to IT
        
        translation.innerText = 'please wait ...'; //In this part we will get italian translation for the word not the meaning
        const data = JSON.stringify({
					text: searchWord,
					target: "it",
				});

				const xhr = new XMLHttpRequest();
				xhr.withCredentials = true;

				xhr.addEventListener("readystatechange", function () {
					if (this.readyState === this.DONE) {
                        console.log(this.responseText);
                        let json = JSON.parse(this.responseText)
                        //console.log(json[0].result.text)
                        translation.innerText = json[0].result.text;
                        itButton.disabled = false;
                        
					}
				});

				xhr.open("POST", "https://opentranslator.p.rapidapi.com/translate");
				xhr.setRequestHeader("content-type", "application/json");
				xhr.setRequestHeader(
					"X-RapidAPI-Key",
					"5fe3ef2fdemsh52e47f9fe023d99p1a8a44jsn11b8ebfac531"
				);
				xhr.setRequestHeader(
					"X-RapidAPI-Host",
					"opentranslator.p.rapidapi.com"
        );
        

        xhr.send(data);
        //Another Api if there will be problem with prevoius one, fetch method doesn't work
					// try {
					// 	const url = "https://text-translator2.p.rapidapi.com/translate";
					// 	const options = {
					// 		method: "POST",
					// 		headers: {
					// 			"content-type": "application/x-www-form-urlencoded",
					// 			"X-RapidAPI-Key":
					// 				"5fe3ef2fdemsh52e47f9fe023d99p1a8a44jsn11b8ebfac531",
					// 			"X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
					// 		},
					// 		body: new URLSearchParams({
					// 			source_language: "en",
					// 			target_language: "it",
					// 			text: `${searchWord}`,
					// 		}),
					// 	};

					// 	const response = await fetch(url, options);
					// 	const result = await response.text();
					// 	console.log(result);
					// } catch (error) {
					// 	console.error(error);
					// }
				
        
        
        
    }
    catch (error) {
        console.log('problem occured')
        try {
            if (await meaningRaw.title == "No Definitions Found") {
                textInfo.style.display = "none";
                resultArea.style.display = "block";
                meaningLine.innerText = 'No definition was found'
                audio.style.display = 'none'
                insertedWord.innerText = searchWord
                meaningButtons.style.display='none'
            }
        }
        catch {
            //console.log('Api website is offline')
        textInfo.innerText = `Meaning API is probably offline - try again later`;}
        
        
    }
    

}


enWord.addEventListener('keyup', (event) => {
    if (event.target.value &&  event.key === "Enter")
    {
        const searchWord = event.target.value
        apiMeaningConnection(searchWord)
         ;
    }
})

itButton.addEventListener("click", (event) => {
    
    meaningLine.innerText = "Please wait ...";
    
    
    meaningLine.innerText = italianMeaning;
    
    
});

enButton.addEventListener("click", (event) => {
	 meaningLine.innerText=englishMeaning
});
