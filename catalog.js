const tours = [
    {
        id: 1,
        name: "Alpine Lake Trail",
        category: "Mountain",
        price: 420,
        duration: "3 days",
        rating: 4.9,
        level: "Medium",
        image: "images/mountain1.jpg",
        description: "A guided mountain route with lake views, sunrise stops and quiet forest paths.",
        tags: ["guided", "lake", "photo"]
    },
    {
        id: 2,
        name: "Cloud Forest Weekend",
        category: "Forest",
        price: 280,
        duration: "2 days",
        rating: 4.7,
        level: "Easy",
        image: "images/mountain2.jpg",
        description: "A calm weekend for travelers who want soft hills, fresh air and a slower pace.",
        tags: ["weekend", "family", "guided"]
    },
    {
        id: 3,
        name: "Waterfall Discovery",
        category: "Waterfall",
        price: 360,
        duration: "2 days",
        rating: 4.8,
        level: "Medium",
        image: "images/waterfall.jpg",
        description: "A route to hidden waterfalls with viewpoints, campfire dinners and photo breaks.",
        tags: ["waterfall", "weekend", "photo"]
    },
    {
        id: 4,
        name: "Wildflower Valley",
        category: "Field",
        price: 190,
        duration: "1 day",
        rating: 4.5,
        level: "Easy",
        image: "images/field.jpg",
        description: "A bright field escape with picnic stops, easy walking and open landscapes.",
        tags: ["family", "picnic", "easy"]
    },
    {
        id: 5,
        name: "Ridge Sunrise",
        category: "Mountain",
        price: 510,
        duration: "4 days",
        rating: 5.0,
        level: "Hard",
        image: "images/mountain1.jpg",
        description: "A higher mountain tour for travelers who want dramatic views before breakfast.",
        tags: ["guided", "sunrise", "hard"]
    },
    {
        id: 6,
        name: "Family Forest Camp",
        category: "Forest",
        price: 250,
        duration: "2 days",
        rating: 4.6,
        level: "Easy",
        image: "images/mountain2.jpg",
        description: "A family-friendly camping trip with short trails and evening stories near the fire.",
        tags: ["family", "camp", "guided"]
    },
    {
        id: 7,
        name: "Canyon Water Route",
        category: "Waterfall",
        price: 440,
        duration: "3 days",
        rating: 4.9,
        level: "Hard",
        image: "images/waterfall.jpg",
        description: "A dynamic route through stone paths, river crossings and powerful waterfalls.",
        tags: ["waterfall", "hard", "guided"]
    },
    {
        id: 8,
        name: "Evening Meadow Walk",
        category: "Field",
        price: 120,
        duration: "1 day",
        rating: 4.4,
        level: "Easy",
        image: "images/field.jpg",
        description: "A simple sunset walk through meadows with warm light and relaxed pacing.",
        tags: ["easy", "sunset", "family"]
    },
    {
        id: 9,
        name: "Hidden Peak Expedition",
        category: "Mountain",
        price: 690,
        duration: "5 days",
        rating: 4.8,
        level: "Hard",
        image: "images/mountain1.jpg",
        description: "A long guided expedition to remote peaks, quiet lakes and panoramic ridges.",
        tags: ["guided", "expedition", "hard"]
    },
    {
        id: 10,
        name: "Pine Valley Reset",
        category: "Forest",
        price: 310,
        duration: "3 days",
        rating: 4.6,
        level: "Medium",
        image: "images/mountain2.jpg",
        description: "A forest reset with cabin nights, morning walks and peaceful valley views.",
        tags: ["guided", "cabin", "wellness"]
    },
    {
        id: 11,
        name: "Silver Falls Photo Tour",
        category: "Waterfall",
        price: 390,
        duration: "2 days",
        rating: 4.9,
        level: "Medium",
        image: "images/waterfall.jpg",
        description: "A photo-focused waterfall tour with timing planned around soft natural light.",
        tags: ["photo", "waterfall", "weekend"]
    },
    {
        id: 12,
        name: "Golden Fields Picnic",
        category: "Field",
        price: 160,
        duration: "1 day",
        rating: 4.3,
        level: "Easy",
        image: "images/field.jpg",
        description: "A relaxed field tour with picnic baskets, short walks and open-air rest stops.",
        tags: ["picnic", "family", "easy"]
    },
    {
        id: 13,
        name: "Lake Mirror Hiking",
        category: "Mountain",
        price: 470,
        duration: "3 days",
        rating: 4.7,
        level: "Medium",
        image: "images/mountain1.jpg",
        description: "A balanced hike to mirror-like lakes and forested viewpoints with local guides.",
        tags: ["guided", "lake", "weekend"]
    },
    {
        id: 14,
        name: "Misty Woodland Route",
        category: "Forest",
        price: 230,
        duration: "2 days",
        rating: 4.5,
        level: "Easy",
        image: "images/mountain2.jpg",
        description: "A quiet woodland route for beginners, with misty mornings and comfortable stops.",
        tags: ["easy", "guided", "family"]
    },
    {
        id: 15,
        name: "Twin Waterfall Trek",
        category: "Waterfall",
        price: 530,
        duration: "4 days",
        rating: 4.8,
        level: "Hard",
        image: "images/waterfall.jpg",
        description: "A challenging trek connecting two waterfall systems and several scenic camps.",
        tags: ["waterfall", "camp", "hard"]
    }
];

const catalogGrid = document.querySelector("#catalogGrid");
const catalogSummary = document.querySelector("#catalogSummary");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const categoryList = document.querySelector("#categoryList");
const actionButtons = document.querySelectorAll(".array-action");

let selectedCategory = "All";
let actionMode = "all";

const categories = ["All", ...new Set(tours.map((tour) => tour.category))];

function createCategoryButtons() {
    categoryList.innerHTML = "";

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "category-chip";
        button.textContent = category;
        button.dataset.category = category;
        if (category === selectedCategory) {
            button.classList.add("category-chip--active");
        }

        button.addEventListener("click", () => {
            selectedCategory = category;
            createCategoryButtons();
            renderCatalog();
        });

        categoryList.append(button);
    });
}

function getBaseItems() {
    const searchValue = searchInput.value.trim().toLowerCase();

    return tours.filter((tour) => {
        const matchesCategory = selectedCategory === "All" || tour.category === selectedCategory;
        const matchesSearch = !searchValue
            || tour.name.toLowerCase().includes(searchValue)
            || tour.description.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;
    });
}

function applySort(items) {
    const sortedItems = [...items];

    if (sortSelect.value === "price-asc") {
        return sortedItems.sort((a, b) => a.price - b.price);
    }

    if (sortSelect.value === "price-desc") {
        return sortedItems.sort((a, b) => b.price - a.price);
    }

    if (sortSelect.value === "name-asc") {
        return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortSelect.value === "rating-desc") {
        return sortedItems.sort((a, b) => b.rating - a.rating);
    }

    return sortedItems;
}

function applyArrayAction(items) {
    const actionText = {
        all: "Full catalog is shown.",
        map: "map() added discount labels to every card.",
        filter: "filter() kept only tours with rating 4.8 and higher.",
        reduce: "reduce() calculated the total price of visible tours.",
        sort: "sort() arranged visible tours from cheaper to more expensive.",
        find: "find() returned the first weekend tour.",
        some: "some() checked whether family tours exist.",
        every: "every() checked whether all visible tours include a guide.",
        slice: "slice() displayed the first six visible tours.",
        reverse: "reverse() changed visible tours to newest-first order.",
        includes: "includes() kept tours that have the photo tag."
    };

    if (actionMode === "map") {
        return {
            items: items.map((tour) => ({ ...tour, badge: "10% off" })),
            note: actionText.map
        };
    }

    if (actionMode === "filter") {
        return {
            items: items.filter((tour) => tour.rating >= 4.8),
            note: actionText.filter
        };
    }

    if (actionMode === "reduce") {
        const total = items.reduce((sum, tour) => sum + tour.price, 0);
        return {
            items,
            note: `${actionText.reduce} Total: $${total}.`
        };
    }

    if (actionMode === "sort") {
        return {
            items: [...items].sort((a, b) => a.price - b.price),
            note: actionText.sort
        };
    }

    if (actionMode === "find") {
        const found = items.find((tour) => tour.tags.includes("weekend"));
        return {
            items: found ? [found] : [],
            note: actionText.find
        };
    }

    if (actionMode === "some") {
        const hasFamilyTours = items.some((tour) => tour.tags.includes("family"));
        return {
            items,
            note: `${actionText.some} Result: ${hasFamilyTours ? "yes" : "no"}.`
        };
    }

    if (actionMode === "every") {
        const allGuided = items.every((tour) => tour.tags.includes("guided"));
        return {
            items,
            note: `${actionText.every} Result: ${allGuided ? "yes" : "no"}.`
        };
    }

    if (actionMode === "slice") {
        return {
            items: items.slice(0, 6),
            note: actionText.slice
        };
    }

    if (actionMode === "reverse") {
        return {
            items: [...items].reverse(),
            note: actionText.reverse
        };
    }

    if (actionMode === "includes") {
        return {
            items: items.filter((tour) => tour.tags.includes("photo")),
            note: actionText.includes
        };
    }

    return {
        items,
        note: actionText.all
    };
}

function createTourCard(tour) {
    const card = document.createElement("article");
    card.className = "catalog-card";

    const image = document.createElement("img");
    image.className = "catalog-card__image";
    image.src = tour.image;
    image.alt = tour.name;

    const content = document.createElement("div");
    content.className = "catalog-card__content";

    const meta = document.createElement("div");
    meta.className = "catalog-card__meta";
    meta.textContent = `${tour.category} / ${tour.duration} / ${tour.level}`;

    const title = document.createElement("h2");
    title.className = "catalog-card__title";
    title.textContent = tour.name;

    const description = document.createElement("p");
    description.className = "catalog-card__description";
    description.textContent = tour.description;

    const details = document.createElement("div");
    details.className = "catalog-card__details";
    details.innerHTML = `<span>$${tour.price}</span><span>${tour.rating.toFixed(1)} rating</span>`;

    const tags = document.createElement("div");
    tags.className = "catalog-card__tags";
    tour.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tags.append(tagElement);
    });

    if (tour.badge) {
        const badge = document.createElement("span");
        badge.className = "catalog-card__badge";
        badge.textContent = tour.badge;
        card.append(badge);
    }

    content.append(meta, title, description, details, tags);
    card.append(image, content);

    return card;
}

function setActiveActionButton() {
    actionButtons.forEach((button) => {
        button.classList.toggle("array-action--active", button.dataset.action === actionMode);
    });
}

function renderEmptyState(note) {
    catalogGrid.innerHTML = "";
    const empty = document.createElement("div");
    empty.className = "catalog-empty";
    empty.textContent = "No tours found. Try another search, sort option or category.";
    catalogGrid.append(empty);
    catalogSummary.textContent = note;
}

function renderCatalog() {
    const baseItems = applySort(getBaseItems());
    const result = applyArrayAction(baseItems);

    setActiveActionButton();

    if (result.items.length === 0) {
        renderEmptyState(result.note);
        return;
    }

    catalogGrid.innerHTML = "";
    result.items.forEach((tour) => {
        catalogGrid.append(createTourCard(tour));
    });

    catalogSummary.textContent = `${result.items.length} tour(s). ${result.note}`;
}

searchInput.addEventListener("input", renderCatalog);
sortSelect.addEventListener("change", renderCatalog);

actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        actionMode = button.dataset.action;
        renderCatalog();
    });
});

createCategoryButtons();
renderCatalog();
