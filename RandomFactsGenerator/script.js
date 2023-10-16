const button = document.getElementById('button')
const fact=document.getElementById('fact')
const apiToken = 'YhC9kbkXBOmnilqcAIR8KQ==L2BoHM3R9bjPRfco';
const apiOptions = {
    method: 'GET',
        headers: { 'X-Api-Key': apiToken },
}
const apiURL= 'https://api.api-ninjas.com/v1/facts?limit=1' 
async function giveFact() {
    try {
        fact.innerText = 'Please, wait a second ...';
        button.disabled = true;
        button.innerText = "...Loading..."
        const response = await fetch(apiURL, apiOptions)
        const data = await response.json()
        //console.log(data[0].fact)
        fact.innerText = data[0].fact;
        button.disabled = false;
        button.innerText = "Give me new fact!";
    }
    catch (error) {
        alert(error)
        fact.innerText = 'Error occured - check your internet connection or try later'
        button.disabled = false,
        button.innerText = "Give me new fact!";
    }}
button.addEventListener('click',giveFact)