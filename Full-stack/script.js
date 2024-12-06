// script.js
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const propertyTypeSelect = document.getElementById('propertyType');
const priceRangeSelect = document.getElementById('priceRange');
const resultsDiv = document.getElementById('results');

// Mock property data
const properties = [
  { title: 'Modern House in LA', location: 'Los Angeles', price: 450000, type: 'house' },
  { title: 'Luxury Apartment in NYC', location: 'New York', price: 850000, type: 'apartment' },
  { title: 'Cozy Apartment in Austin', location: 'Austin', price: 190000, type: 'apartment' },
  { title: 'Spacious Commercial Space in SF', location: 'San Francisco', price: 1200000, type: 'commercial' },
  { title: 'Affordable House in Dallas', location: 'Dallas', price: 150000, type: 'house' },
];

// Function to format price
function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

// Filter and display results
function displayResults() {
  const query = searchInput.value.toLowerCase();
  const propertyType = propertyTypeSelect.value;
  const priceRange = priceRangeSelect.value;

  const filteredProperties = properties.filter(property => {
    const matchesType = propertyType === 'all' || property.type === propertyType;
    const matchesQuery =
      property.title.toLowerCase().includes(query) || property.location.toLowerCase().includes(query);
    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'low' && property.price < 200000) ||
      (priceRange === 'mid' && property.price >= 200000 && property.price <= 500000) ||
      (priceRange === 'high' && property.price > 500000);

    return matchesType && matchesQuery && matchesPrice;
  });

  resultsDiv.innerHTML = filteredProperties.length
    ? filteredProperties
        .map(
          property => `
        <div>
          <h3>${property.title}</h3>
          <p>Location: ${property.location}</p>
          <p>Price: ${formatPrice(property.price)}</p>
          <p>Type: ${property.type}</p>
        </div>
      `
        )
        .join('')
    : '<div>No properties found</div>';
}

// Event Listeners
searchBtn.addEventListener('click', displayResults);
searchInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') displayResults();
});
