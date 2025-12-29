// GLOBAL SETTINGS
const API_BASE_URL = 'http://localhost:5000/api'; // Ensure this matches your backend port

// ---------------------------------------------------------
// 1. FORM SUBMISSION LOGIC (Runs on hotels.html / guides.html)
// ---------------------------------------------------------

// Helper to update price displays (keep your existing logic)
function updateDisplay(id, val, suffix = " BDT") {
    const el = document.getElementById(id);
    if (el) el.innerText = Number(val).toLocaleString() + suffix;
}

// Function called by the Hotel Form onsubmit
function handleHotelSearch(e) {
    e.preventDefault();
    const destination = document.getElementById('destination').value;
    const budget = document.getElementById('priceRange').value;
    
    // Redirect to results page with query params
    window.location.href = `results.html?type=hotel&destination=${destination}&budget=${budget}`;
}

// Function called by the Guide Form onsubmit
function handleGuideSearch(e) {
    e.preventDefault();
    const destination = document.getElementById('destination').value;
    const price = document.getElementById('guidePrice').value;
    const experience = document.getElementById('guideExperience').value;

    // Redirect to results page with query params
    window.location.href = `results.html?type=guide&destination=${destination}&price=${price}&experience=${experience}`;
}

// ---------------------------------------------------------
// 2. RESULTS PAGE LOGIC (Runs on results.html)
// ---------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the results page by looking for the results container
    const resultsContainer = document.getElementById('resultsList');
    if (!resultsContainer) return; // Stop if we are not on results.html

    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const destination = params.get('destination');

    // Update Page Title
    document.getElementById('pageTitle').innerText = 
        `Available ${type === 'hotel' ? 'Hotels' : 'Guides'} in ${destination}`;

    if (type === 'hotel') {
        const budget = params.get('budget');
        fetchHotels(destination, budget);
    } else if (type === 'guide') {
        const price = params.get('price');
        const experience = params.get('experience');
        fetchGuides(destination, price, experience);
    }
});

// ---------------------------------------------------------
// 3. FETCH FUNCTIONS
// ---------------------------------------------------------

function fetchHotels(destination, maxPrice) {
    const container = document.getElementById('resultsList');
    
    // Example: GET /api/hotels?location=Cox's Bazar&maxPrice=5000
    fetch(`${API_BASE_URL}/hotels?location=${destination}&maxPrice=${maxPrice}`)
        .then(res => res.json())
        .then(data => {
            container.innerHTML = ''; // Clear loading text

            if (data.length === 0) {
                container.innerHTML = '<p>No hotels found matching your criteria.</p>';
                return;
            }

            data.forEach(hotel => {
                // NOTE: Adjust 'hotel.name', 'hotel.price', etc. to match your DB Schema
                const html = `
                    <div class="card">
                        <img src="${hotel.image || 'https://via.placeholder.com/400x200'}" class="card-img" alt="${hotel.name}">
                        <div class="card-body">
                            <h3 class="card-title">${hotel.name}</h3>
                            <p class="card-info">📍 ${hotel.location || destination}</p>
                            <span class="card-price">${hotel.price} BDT / Night</span>
                            <a href="#" class="btn-book">Book Now</a>
                        </div>
                    </div>
                `;
                container.innerHTML += html;
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<p>Error loading data. Is the backend running?</p>';
        });
}

function fetchGuides(destination, maxPrice, minExperience) {
    const container = document.getElementById('resultsList');

    // Example: GET /api/guides?location=Bandarban&maxPrice=3000&experience=5
    fetch(`${API_BASE_URL}/guides?location=${destination}&maxPrice=${maxPrice}&experience=${minExperience}`)
        .then(res => res.json())
        .then(data => {
            container.innerHTML = '';

            if (data.length === 0) {
                container.innerHTML = '<p>No guides found matching your criteria.</p>';
                return;
            }

            data.forEach(guide => {
                const html = `
                    <div class="card">
                        <img src="${guide.image || 'https://via.placeholder.com/400x200'}" class="card-img" alt="${guide.name}">
                        <div class="card-body">
                            <h3 class="card-title">${guide.name}</h3>
                            <p class="card-info">📍 ${guide.location || destination}</p>
                            <p class="card-info">⭐ ${guide.experience} Years Experience</p>
                            <span class="card-price">${guide.dailyRate} BDT / Day</span>
                            <a href="#" class="btn-book">Hire Guide</a>
                        </div>
                    </div>
                `;
                container.innerHTML += html;
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<p>Error loading data. Is the backend running?</p>';
        });
}