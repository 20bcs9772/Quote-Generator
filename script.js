let quote = document.querySelector("#quote");
let athr = document.querySelector("#author");
let newBtn = document.querySelector("#new-quote");
let twittweBtn = document.querySelector("#twitter");
let quoteCont = document.querySelector("#quote-container");
let loader = document.querySelector(".loader");
let apiQuotes = [];

newQuote = () =>{
    let {text,author} = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    quote.textContent=text;
    athr.textContent=author || "NA";
    text.length>100?quote.classList.add('long-quote'):quote.classList.remove('long-quote');
}

loading = () =>{
    loader.hidden=false;
    quoteCont.hidden=true;
}

complete = () =>{
    loader.hidden=true;
    quoteCont.hidden=false;
}

tweetQuote = () =>{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${athr.textContent}`;
    window.open(twitterUrl,'_blank');
}

async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        complete();
    } catch (e){
        alert(e);
        getQuotes();
    }
}

loading();
getQuotes();

newBtn.addEventListener('click',()=> newQuote());
twittweBtn.addEventListener('click',()=> tweetQuote());