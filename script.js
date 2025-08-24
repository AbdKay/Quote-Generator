// ---- Minimal in-memory quotes (you can add more) ----
const QUOTES = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  {
    text: "Whether you think you can or you think you can’t, you’re right.",
    author: "Henry Ford",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  {
    text: "If you’re going through hell, keep going.",
    author: "Winston Churchill",
  },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
];

const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const tweetA = document.getElementById("tweet-quote");
const toast = document.getElementById("toast");

function randomQuote() {
  const i = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[i];
}

function renderQuote(q) {
  quoteEl.textContent = q.text;
  authorEl.textContent = q.author ? `— ${q.author}` : "— Unknown";
  updateTweetLink(q);
}

function updateTweetLink(q) {
  const tweetText = `"${q.text}" ${q.author ? `— ${q.author}` : ""}`;
  const url = new URL("https://twitter.com/intent/tweet");
  url.searchParams.set("text", tweetText);
  tweetA.href = url.toString();
}

function showToast(text = "Copied!") {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1200);
}

async function copyCurrentQuote() {
  const text = `${quoteEl.textContent} ${authorEl.textContent}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied!");
  } catch {
    // Fallback for older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("Copied!");
  }
}

newBtn.addEventListener("click", () => renderQuote(randomQuote()));
copyBtn.addEventListener("click", copyCurrentQuote);

// First load
renderQuote(randomQuote());
