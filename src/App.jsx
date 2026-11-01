import { useEffect, useState } from "react";
import "./App.css";

const moods = [
  { name: "Cozy", emoji: "☕", note: "A warm little story and a blanket kind of day." },
  { name: "Melancholic", emoji: "🌧️", note: "For feelings that need a quiet place to land." },
  { name: "Hopeful", emoji: "🌱", note: "A reminder that beautiful things can begin again." },
  { name: "Dreamy", emoji: "🌙", note: "For when your mind wants to wander somewhere magical." },
];

const sampleBooks = [
  {
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    description:
      "A gentle, philosophical journey about friendship, love, and seeing what truly matters.",
    mood: "Dreamy",
    color: "#E8DDF6",
    spine: "#8F79B8",
    emoji: "⭐",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A witty romance about first impressions, family, and learning to understand one another.",
    mood: "Cozy",
    color: "#F5DCE5",
    spine: "#C47F9B",
    emoji: "🌸",
  },
  {
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    description:
      "A lonely garden and the children who bring it back to life, discovering healing along the way.",
    mood: "Hopeful",
    color: "#DDEBDD",
    spine: "#7E9F83",
    emoji: "🌿",
  },
  {
    title: "Little Women",
    author: "Louisa May Alcott",
    description:
      "Four sisters grow up, make mistakes, and find their own ways through love, ambition, and life.",
    mood: "Cozy",
    color: "#F7E5C9",
    spine: "#C79A5B",
    emoji: "🕯️",
  },
  {
    title: "Anne of Green Gables",
    author: "L. M. Montgomery",
    description:
      "An imaginative, spirited orphan finds a home and fills ordinary days with wonder.",
    mood: "Hopeful",
    color: "#F4D9C9",
    spine: "#C98568",
    emoji: "🌼",
  },
];

function App() {
  const [selectedMood, setSelectedMood] = useState("Cozy");
  const [selectedBook, setSelectedBook] = useState(null);
  const [savedBooks, setSavedBooks] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("bookshelf-saved-books")) || [];
  } catch {
    return [];
  }
});
  const [activeTab, setActiveTab] = useState("Home");
useEffect(() => {
  localStorage.setItem(
    "bookshelf-saved-books",
    JSON.stringify(savedBooks)
  );
}, [savedBooks]);
  const currentMood = moods.find((mood) => mood.name === selectedMood);

  const toggleSavedBook = (book) => {
    setSavedBooks((current) =>
      current.some((savedBook) => savedBook.title === book.title)
        ? current.filter((savedBook) => savedBook.title !== book.title)
        : [...current, book]
    );
  };

  const isSaved = selectedBook
    ? savedBooks.some((book) => book.title === selectedBook.title)
    : false;

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => setActiveTab("Home")}>
          <span className="brand-mark">b.</span>
          <span>bookshelf</span>
        </a>
        <button
          className="saved-counter"
          onClick={() => setActiveTab("My Library")}
          aria-label={`Open saved books, ${savedBooks.length} saved`}
        >
          ♡ <span>{savedBooks.length}</span>
        </button>
      </header>

      {activeTab === "Home" ? (
        <>
          <section className="welcome-section" id="home">
            <p className="eyebrow">YOUR LITTLE CORNER OF THE WORLD</p>
            <h1>A story for every <em>version</em> of you.</h1>
            <p className="welcome-copy">
              Find a book that feels right for the way you feel today.
            </p>
          </section>

          <section className="mood-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">FIRST, A LITTLE CHECK-IN</p>
                <h2>How's your heart today?</h2>
              </div>
              <span className="tiny-flower">✿</span>
            </div>
            <div className="mood-list">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  className={`mood-pill ${selectedMood === mood.name ? "selected" : ""}`}
                  onClick={() => setSelectedMood(mood.name)}
                  aria-pressed={selectedMood === mood.name}
                >
                  <span>{mood.emoji}</span>
                  {mood.name}
                </button>
              ))}
            </div>
            <p className="mood-note">{currentMood.note}</p>
          </section>

          <section className="shelf-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">A FEW LITTLE POSSIBILITIES</p>
                <h2>Your reading nook</h2>
              </div>
              <span className="shelf-count">{sampleBooks.length} books</span>
            </div>

            <div className="shelf-scene">
              <div className="shelf-decor plant" aria-hidden="true">🌿</div>
              <div className="shelf-decor candle" aria-hidden="true">🕯️</div>
              <div className="books-row">
                {sampleBooks.map((book, index) => (
                  <button
                    key={book.title}
                    className={`book-spine book-${index + 1}`}
                    style={{
                      "--book-color": book.color,
                      "--book-spine": book.spine,
                    }}
                    onClick={() => setSelectedBook(book)}
                    aria-label={`View ${book.title} by ${book.author}`}
                    title={`${book.title} · ${book.author}`}
                  >
                    <span className="book-spine-emoji">{book.emoji}</span>
                    <span className="book-spine-title">{book.title}</span>
                  </button>
                ))}
              </div>
              <div className="wooden-shelf" />
            </div>
            <p className="tap-hint">Tap a book to peek inside <span>↗</span></p>
          </section>

          <section className="recommendation-card">
            <div className="recommendation-art" aria-hidden="true">
              <span className="art-star">✦</span>
              <span className="art-book">📖</span>
              <span className="art-sparkle">✧</span>
            </div>
            <div className="recommendation-content">
              <p className="eyebrow">A LITTLE NOTE FOR YOU</p>
              <h2>{selectedMood === "Cozy" ? "Stay for one more chapter." : `A little ${selectedMood.toLowerCase()} magic.`}</h2>
              <p>{currentMood.note}</p>
              <button
                className="text-button"
                onClick={() => {
                  const match = sampleBooks.find((book) => book.mood === selectedMood) || sampleBooks[0];
                  setSelectedBook(match);
                }}
              >
                Find my book <span>↗</span>
              </button>
            </div>
          </section>
        </>
      ) : (
        <section className="library-section">
          <p className="eyebrow">YOUR OWN LITTLE COLLECTION</p>
          <h1>My <em>library.</em></h1>
          <p className="welcome-copy">Books you want to keep close.</p>
          {savedBooks.length === 0 ? (
            <div className="empty-library">
              <span>📚</span>
              <h2>Your shelf is waiting.</h2>
              <p>Open a book and tap “Save to my library” to keep it here.</p>
              <button className="primary-button" onClick={() => setActiveTab("Home")}>
                Explore books
              </button>
            </div>
          ) : (
            <div className="saved-book-list">
              {savedBooks.map((book) => (
                <button
                  className="saved-book"
                  key={book.title}
                  onClick={() => setSelectedBook(book)}
                >
                  <span className="saved-book-icon" style={{ background: book.color }}>
                    {book.emoji}
                  </span>
                  <span className="saved-book-text">
                    <strong>{book.title}</strong>
                    <small>{book.author}</small>
                  </span>
                  <span className="saved-book-arrow">↗</span>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          className={activeTab === "Home" ? "nav-item active" : "nav-item"}
          onClick={() => setActiveTab("Home")}
        >
          <span>⌂</span>Home
        </button>
        <button
          className={activeTab === "My Library" ? "nav-item active" : "nav-item"}
          onClick={() => setActiveTab("My Library")}
        >
          <span>♡</span>My Library
        </button>
      </nav>

      {selectedBook && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedBook(null)}
          role="presentation"
        >
          <section
            className="book-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-book-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedBook(null)}
              aria-label="Close book details"
            >
              ×
            </button>
            <div
              className="modal-book-art"
              style={{ background: selectedBook.color, "--book-spine": selectedBook.spine }}
            >
              <span className="modal-book-emoji">{selectedBook.emoji}</span>
              <span className="modal-book-title">{selectedBook.title}</span>
              <span className="modal-book-decoration">✧ · ✦ · ✧</span>
            </div>
            <div className="modal-book-info">
              <p className="eyebrow">{selectedBook.mood.toUpperCase()} MOOD</p>
              <h2 id="modal-book-title">{selectedBook.title}</h2>
              <p className="modal-author">by {selectedBook.author}</p>
              <p className="modal-description">{selectedBook.description}</p>
              <button
                className={isSaved ? "primary-button saved" : "primary-button"}
                onClick={() => toggleSavedBook(selectedBook)}
              >
                {isSaved ? "♥ Saved to my library" : "♡ Save to my library"}
              </button>
              <p className="modal-footnote">A little book to meet you where you are.</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
