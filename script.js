/* =========================================================
   NOVELNEST - SCRIPT.JS
   Read + Publish Novel Website
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

const publishModal = document.getElementById("publishModal");
const openPublishBtn = document.getElementById("openPublishBtn");
const heroPublishBtn = document.getElementById("heroPublishBtn");
const authorPublishBtn = document.getElementById("authorPublishBtn");

const closePublish = document.getElementById("closePublish");
const cancelPublish = document.getElementById("cancelPublish");

const publishForm = document.getElementById("publishForm");

const readingModal = document.getElementById("readingModal");
const closeReading = document.getElementById("closeReading");

const bookGrid = document.getElementById("bookGrid");

const novelTitle = document.getElementById("novelTitle");
const authorName = document.getElementById("authorName");
const novelGenre = document.getElementById("novelGenre");
const novelDescription = document.getElementById("novelDescription");
const novelContent = document.getElementById("novelContent");

const readingTitle = document.getElementById("readingTitle");
const readingAuthor = document.getElementById("readingAuthor");
const readingGenre = document.getElementById("readingGenre");
const readingText = document.getElementById("readingText");


/* =========================================================
   DEFAULT NOVELS
========================================================= */

const defaultNovels = [
    {
        id: 1,
        title: "The Last Summer",
        author: "Emma Rose",
        genre: "Romance",
        description: "A beautiful story about love, memories and one unforgettable summer.",
        content: `
            <p>The sun was slowly disappearing behind the horizon, painting the sky in shades of orange and gold.</p>

            <p>Emma stood by the old wooden window, watching the waves crash against the shore. She had always loved this place, but tonight everything felt different.</p>

            <p>Perhaps it was because she knew this would be her last summer here.</p>
        `,
        rating: 4.8,
        cover: "cover-one"
    },

    {
        id: 2,
        title: "Echoes of Tomorrow",
        author: "Daniel Hart",
        genre: "Science Fiction",
        description: "A mysterious journey through time, technology and the future of humanity.",
        content: `
            <p>The machine had been silent for three hundred years.</p>

            <p>Daniel placed his hand against the cold metal surface. Somewhere beneath the laboratory floor, something began to wake.</p>

            <p>The future was not waiting for humanity. It was calling them.</p>
        `,
        rating: 4.7,
        cover: "cover-two"
    },

    {
        id: 3,
        title: "The Silent Garden",
        author: "Maya Wilson",
        genre: "Mystery",
        description: "A forgotten garden hides a secret that someone desperately wants to remain buried.",
        content: `
            <p>No one had entered the garden for twenty years.</p>

            <p>Maya pushed the rusty iron gate open and stepped inside. The flowers were still blooming, even though nobody had cared for them.</p>

            <p>Then she noticed the footprints.</p>
        `,
        rating: 4.9,
        cover: "cover-three"
    },

    {
        id: 4,
        title: "Beneath the Stars",
        author: "Lena Brooks",
        genre: "Fantasy",
        description: "A young traveler discovers a magical world hidden beneath the night sky.",
        content: `
            <p>The stars had never looked this close before.</p>

            <p>Lena looked up from the mountain path and saw a silver doorway floating between the clouds.</p>

            <p>She knew she should turn back.</p>

            <p>Instead, she took another step forward.</p>
        `,
        rating: 4.6,
        cover: "cover-four"
    }
];


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getNovels() {

    const savedNovels = localStorage.getItem("novelnest_novels");

    if (savedNovels) {
        return JSON.parse(savedNovels);
    }

    localStorage.setItem(
        "novelnest_novels",
        JSON.stringify(defaultNovels)
    );

    return defaultNovels;
}


function saveNovels(novels) {

    localStorage.setItem(
        "novelnest_novels",
        JSON.stringify(novels)
    );
}


/* =========================================================
   MODAL HELPERS
========================================================= */

function openModal(modal) {

    modal.classList.add("active");

    document.body.classList.add("modal-open");
}


function closeModal(modal) {

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");
}


/* =========================================================
   PUBLISH MODAL
========================================================= */

function openPublishModal() {

    closeModal(readingModal);

    openModal(publishModal);

    setTimeout(() => {
        novelTitle.focus();
    }, 200);
}


openPublishBtn.addEventListener(
    "click",
    openPublishModal
);

heroPublishBtn.addEventListener(
    "click",
    openPublishModal
);

authorPublishBtn.addEventListener(
    "click",
    openPublishModal
);


closePublish.addEventListener(
    "click",
    () => closeModal(publishModal)
);


cancelPublish.addEventListener(
    "click",
    () => closeModal(publishModal)
);


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

publishModal.addEventListener(
    "click",
    function (event) {

        if (event.target === publishModal) {
            closeModal(publishModal);
        }

    }
);


readingModal.addEventListener(
    "click",
    function (event) {

        if (event.target === readingModal) {
            closeModal(readingModal);
        }

    }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal(publishModal);
            closeModal(readingModal);

            searchPanel.classList.remove("active");
        }

    }
);


/* =========================================================
   SEARCH PANEL
========================================================= */

searchBtn.addEventListener(
    "click",
    function () {

        searchPanel.classList.toggle("active");

        if (searchPanel.classList.contains("active")) {

            setTimeout(() => {
                searchInput.focus();
            }, 100);

        }

    }
);


closeSearch.addEventListener(
    "click",
    function () {

        searchPanel.classList.remove("active");

        searchInput.value = "";

        renderNovels();

    }
);


/* =========================================================
   SEARCH FUNCTION
========================================================= */

searchInput.addEventListener(
    "input",
    function () {

        const searchValue =
            searchInput.value
                .trim()
                .toLowerCase();

        if (!searchValue) {

            renderNovels();

            return;
        }


        const novels = getNovels();


        const filteredNovels = novels.filter(
            novel => {

                const title =
                    novel.title.toLowerCase();

                const author =
                    novel.author.toLowerCase();

                const genre =
                    novel.genre.toLowerCase();

                return (
                    title.includes(searchValue) ||
                    author.includes(searchValue) ||
                    genre.includes(searchValue)
                );

            }
        );


        renderNovels(filteredNovels);
    }
);


/* =========================================================
   CREATE NOVEL CARD
========================================================= */

function createNovelCard(novel) {

    const article =
        document.createElement("article");

    article.className = "book-card";

    article.dataset.id = novel.id;


    article.innerHTML = `

        <div class="book-cover-card ${novel.cover}">

            <span>
                ${escapeHTML(novel.genre).toUpperCase()}
            </span>

            <h3>
                ${formatTitle(novel.title)}
            </h3>

            <small>
                ${escapeHTML(novel.author)}
            </small>

        </div>


        <div class="book-info">

            <div>

                <h3>
                    ${escapeHTML(novel.title)}
                </h3>

                <p>
                    ${escapeHTML(novel.author)}
                </p>

            </div>

            <span class="rating">
                ★ ${novel.rating || "New"}
            </span>

        </div>

    `;


    article.addEventListener(
        "click",
        function () {

            openReadingModal(novel);

        }
    );


    return article;
}


/* =========================================================
   FORMAT TITLE
========================================================= */

function formatTitle(title) {

    const words = title.split(" ");

    if (words.length <= 2) {

        return escapeHTML(title);

    }

    const middle =
        Math.ceil(words.length / 2);

    const firstLine =
        words.slice(0, middle).join(" ");

    const secondLine =
        words.slice(middle).join(" ");


    return `
        ${escapeHTML(firstLine)}
        <br>
        ${escapeHTML(secondLine)}
    `;
}


/* =========================================================
   RENDER NOVELS
========================================================= */

function renderNovels(novels = getNovels()) {

    bookGrid.innerHTML = "";


    if (novels.length === 0) {

        bookGrid.innerHTML = `

            <div class="no-results">

                <h3>
                    No stories found
                </h3>

                <p>
                    Try searching for another title,
                    author or genre.
                </p>

            </div>

        `;

        return;
    }


    novels.forEach(
        novel => {

            const card =
                createNovelCard(novel);

            bookGrid.appendChild(card);

        }
    );
}


/* =========================================================
   OPEN READING MODAL
========================================================= */

function openReadingModal(novel) {

    closeModal(publishModal);

    readingTitle.textContent =
        novel.title;

    readingAuthor.textContent =
        novel.author;

    readingGenre.textContent =
        novel.genre.toUpperCase();

    readingText.innerHTML =
        novel.content;


    openModal(readingModal);


    setTimeout(() => {

        const savedProgress =
            localStorage.getItem(
                `novelnest_progress_${novel.id}`
            );

        if (savedProgress) {

            console.log(
                "Reading progress:",
                savedProgress
            );

        }

    }, 100);
}


closeReading.addEventListener(
    "click",
    () => closeModal(readingModal)
);


/* =========================================================
   PUBLISH NOVEL
========================================================= */

publishForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            novelTitle.value.trim();

        const author =
            authorName.value.trim();

        const genre =
            novelGenre.value;

        const description =
            novelDescription.value.trim();

        const content =
            novelContent.value.trim();


        /* Validation */

        if (
            !title ||
            !author ||
            !genre ||
            !description ||
            !content
        ) {

            showNotification(
                "Please fill in all fields.",
                "error"
            );

            return;
        }


        /* Get current novels */

        const novels =
            getNovels();


        /* New novel */

        const newNovel = {

            id: Date.now(),

            title: title,

            author: author,

            genre: genre,

            description: description,

            content: convertTextToHTML(content),

            rating: "New",
