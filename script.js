const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

const fallbackQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { content: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" }
];

function getRandomFallbackQuote() {
  const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
  return fallbackQuotes[randomIndex];
}

function displayQuote(content, author) {
  quoteText.style.opacity = '0';
  quoteAuthor.style.opacity = '0';
  
  setTimeout(() => {
    quoteText.textContent = content;
    quoteAuthor.textContent = `— ${author}`;
    quoteText.style.opacity = '1';
    quoteAuthor.style.opacity = '1';
  }, 300);
}

async function fetchQuote() {
  newQuoteBtn.disabled = true;
  newQuoteBtn.textContent = 'Loading...';
  
  try {
    const response = await fetch('https://api.quotable.io/random', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('API unavailable');
    }
    
    const data = await response.json();
    displayQuote(data.content, data.author);
    
  } catch (error) {
    console.log('Using fallback quotes:', error.message);
    const quote = getRandomFallbackQuote();
    displayQuote(quote.content, quote.author);
  } finally {
    newQuoteBtn.disabled = false;
    newQuoteBtn.textContent = 'New Quote';
  }
}

quoteText.style.transition = 'opacity 0.3s ease';
quoteAuthor.style.transition = 'opacity 0.3s ease';

newQuoteBtn.addEventListener('click', fetchQuote);

const initialQuote = getRandomFallbackQuote();
quoteText.textContent = initialQuote.content;
quoteAuthor.textContent = `— ${initialQuote.author}`;
