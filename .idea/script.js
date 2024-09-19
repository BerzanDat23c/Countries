// script.js

// Funktion til at hente data om et land baseret på landekode
function fetchCountryData(countryCode) {
    const url = `https://countries.plaul.dk/api/countries/${countryCode}`; // API-URL med landekode

    fetch(url) // Udfører et HTTP GET-request til URL'en
        .then(response => response.json()) // Konverterer responsen til JSON-format
        .then(data => updateInfoPanel(data)) // Kalder funktionen til at opdatere informationspanelet med data
        .catch(error => console.error('Fejl ved hentning af landdata:', error)); // Logger fejl, hvis der opstår problemer
}

// Funktion til at opdatere informationspanelet med data om et land
function updateInfoPanel(data) {
    const infoPanel = document.getElementById('info');
    infoPanel.innerHTML = `
        <h3>${data.name.common}</h3>
        <p><strong>Capital:</strong> ${data.capital[0]}</p>
        <p><strong>Region:</strong> ${data.region}</p>
        <p><strong>Subregion:</strong> ${data.subregion}</p>
        <p><strong>Population:</strong> ${data.population}</p>
        <p><strong>Languages:</strong> ${Object.values(data.languages).join(', ')}</p>
        <img src="${data.flag}" alt="Flag of ${data.name.common}">
    `;
}

// Event handler for klik på et land
document.querySelector('.map').addEventListener('click', function(event) {
    // Tjek om klikket var på et land (SVG-element med et ID)
    if (event.target.tagName === 'path') {
        const countryCode = event.target.id; // Henter landekode fra ID-attributten

        // Fjern tidligere fremhævning
        document.querySelectorAll('.highlight').forEach(function(element) {
            element.classList.remove('highlight');
        });

        // Fremhæv det valgte land
        event.target.classList.add('highlight');

        // Hent data for det valgte land
        fetchCountryData(countryCode);
    }
});
