// ==========================================
// 1. GLOBAL CONFIGURATION
// ==========================================
const API_BASE_URL = 'http://localhost:5000/api';

// ==========================================
// 2. UI SLIDER LOGIC (Keeps your forms working)
// ==========================================

// Updates Hotel Budget text when slider moves
function updatePriceDisplay(val) {
    const display = document.getElementById('priceDisplay');
    if (display) display.innerText = Number(val).toLocaleString() + " BDT";
}

// Updates Guide Price text when slider moves
function updateGuidePrice(val) {
    const display = document.getElementById('guidePriceDisplay');
    if (display) display.innerText = Number(val).toLocaleString() + " BDT";
}

// Updates Guide Experience text when slider moves
function updateExpDisplay(val) {
    const display = document.getElementById('expDisplay');
    if (display) display.innerText = val;
}

// ==========================================
// 3. SEARCH FORM HANDLERS (Redirects to Results)
// ==========================================

// Attach this to hotels.html: <form onsubmit="handleHotelSearch(event)">
function handleHotelSearch(e) {
    e.preventDefault();

    // Get values from the form inputs
    const destination = document.getElementById('destination').value;
    const budget = document.getElementById('priceRange').value;

    // Redirect to results page with query parameters
    window.location.href = `results.html?type=hotel&location=${encodeURIComponent(destination)}&maxPrice=${budget}`;
}

// Attach this to guides.html: <form onsubmit="handleGuideSearch(event)">
function handleGuideSearch(e) {
    e.preventDefault();

    // Get values from the form inputs
    // Note: If guides.html doesn't have a destination dropdown, it defaults to 'Cox\'s Bazar'
    const destInput = document.getElementById('destination');
    const destination = destInput ? destInput.value : "Cox's Bazar";

    const price = document.getElementById('guidePrice').value;
    const experience = document.getElementById('guideExperience').value;

    // Redirect
    window.location.href = `results.html?type=guide&location=${encodeURIComponent(destination)}&maxPrice=${price}&experience=${experience}`;
}

// ==========================================
// 4. RESULTS PAGE LOGIC (Fetches & Displays Data)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if we are on the results page
    const resultsContainer = document.getElementById('resultsList');
    if (!resultsContainer) return; // Exit if we are on index/hotels/guides page

    // 2. Get Data from URL
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const location = params.get('location');
    const maxPrice = params.get('maxPrice');

    // 3. Update Title
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) {
        titleEl.innerText = `Showing ${type === 'hotel' ? 'Hotels' : 'Guides'} in ${location}`;
    }

    // 4. call the appropriate fetch function
    if (type === 'hotel') {
        fetchHotels(location, maxPrice);
    } else if (type === 'guide') {
        const experience = params.get('experience');
        fetchGuides(location, maxPrice, experience);
    }
});

// ==========================================
// 5. FETCH FUNCTIONS (API Calls)
// ==========================================

function fetchHotels(location, maxPrice) {
    const container = document.getElementById('resultsList');
    container.innerHTML = '<p class="loading">Searching for best hotels...</p>';

    fetch(`${API_BASE_URL}/hotels?location=${location}&maxPrice=${maxPrice}`)
        .then(res => res.json())
        .then(data => {
            container.innerHTML = ''; // Clear loading message

            if (!data || data.length === 0) {
                container.innerHTML = '<p class="no-results">No hotels found within this price range.</p>';
                return;
            }

            // Loop through hotels and create HTML
            data.forEach(hotel => {
                // Ensure field names match your MongoDB (hotel.pricePerNight)
                const html = `
                    <div class="card">
                        <img src="${hotel.image || 'https://via.placeholder.com/400x250'}" alt="${hotel.name}">
                        <div class="card-body">
                            <h3 class="card-title">${hotel.name}</h3>
                            <p class="card-detail">📍 ${hotel.city || hotel.location}</p>
                            <span class="price-tag">${hotel.pricePerNight} BDT / Night</span>
                            <a href="#" class="btn">Book Now</a>
                        </div>
                    </div>
                `;
                container.innerHTML += html;
            });
        })
        .catch(err => {
            console.error('Fetch Error:', err);
            container.innerHTML = '<p class="no-results">Error loading data. Check console.</p>';
        });
}

function fetchGuides(location, maxPrice, minExperience) {
    const container = document.getElementById('resultsList');
    container.innerHTML = '<p class="loading">Finding available guides...</p>';

    fetch(`${API_BASE_URL}/guides?location=${location}&maxPrice=${maxPrice}&experience=${minExperience}`)
        .then(res => res.json())
        .then(data => {
            container.innerHTML = '';

            if (!data || data.length === 0) {
                container.innerHTML = '<p class="no-results">No guides found matching your criteria.</p>';
                return;
            }

            data.forEach(guide => {
                // Ensure field names match your MongoDB (guide.pricePerDay)
                const html = `
                    <div class="card">
                        <img src="${guide.image || 'https://via.placeholder.com/400x250'}" alt="${guide.name}">
                        <div class="card-body">
                            <h3 class="card-title">${guide.name}</h3>
                            <p class="card-detail">📍 ${guide.city || guide.location}</p>
                            <p class="card-detail">⭐ ${guide.experience} Years Experience</p>
                            <span class="price-tag">${guide.pricePerDay} BDT / Day</span>
                            <a href="#" class="btn">Hire Guide</a>
                        </div>
                    </div>
                `;
                container.innerHTML += html;
            });
        })
        .catch(err => {
            console.error('Fetch Error:', err);
            container.innerHTML = '<p class="no-results">Error loading data. Check console.</p>';
        });
}