document.addEventListener('DOMContentLoaded', () => {
  const locationLinks = document.querySelectorAll('.locations a');
  const movieItems = document.querySelectorAll('.movie-item');
  
  // Function to apply the selected location filter
  function applyLocationFilter(location) {
    movieItems.forEach(item => {
      if (item.dataset.location === location) {
        item.style.visibility = 'visible';
        item.style.position = 'relative';
      } else {
        item.style.visibility = 'hidden';
        item.style.position = 'absolute';
      }
    });
  }

  // Apply the filter when a location is clicked
  locationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLocation = e.target.textContent.trim();
      locationLinks.forEach(link => link.classList.remove('active'));
      e.target.classList.add('active');
      
      // Apply the location filter
      applyLocationFilter(selectedLocation);
    });
  });

  // Optionally, you can apply a default location filter on page load
  if (locationLinks.length > 0) {
    locationLinks[0].click(); // Simulate a click on the first location
  }



 // 3. Account functionality
const accountButton = document.querySelector('#Account');
const logoutModal = document.querySelector('#logoutModal');
const yesButton = document.querySelector('#yesButton');
const noButton = document.querySelector('#noButton');

accountButton.addEventListener('click', () => {
  // Show the modal asking for logout confirmation
  logoutModal.style.display = 'block';
});

// When "Yes" is clicked, log out and redirect to main.html
yesButton.addEventListener('click', () => {
  // Display a message and then redirect
  logoutModal.innerHTML = '<p>You have logged out.</p>';
  setTimeout(() => {
    window.location.href = 'main.html'; // Redirect to main.html after logging out
  }, 2000);
});

// When "No" is clicked, close the modal
noButton.addEventListener('click', () => {
  logoutModal.style.display = 'none';
});

// Close the modal if the user clicks outside of it
window.addEventListener('click', (e) => {
  if (e.target === logoutModal) {
    logoutModal.style.display = 'none';
  }
});



  // 4. Movie item click functionality
  const modal = document.getElementById('movieModal');
  const closeBtn = modal.querySelector('.close');

  movieItems.forEach(item => {
    item.addEventListener('click', () => {
      // Retrieve the movie data
      const movieTitle = item.querySelector('.title').innerText;
      const movieYear = item.querySelector('.year').innerText;
      const movieDescription = item.querySelector('.desc').innerText;
      const movieImage = item.querySelector('.movie-img').style.backgroundImage;
      const imageUrl = movieImage.replace(/url\(["']?|["']?\)$/g, '');

      // Apply to the modal
      const modalImage = modal.querySelector('.movie-img');
      modalImage.style.backgroundImage = `url('${imageUrl}')`;

      // Get the genre(s)
      const genres = Array.from(item.querySelectorAll('.genre p')).map(genre => genre.innerText).join(', ');

      // Get the location(s)
      const locations = item.dataset.location.split(','); // Assuming multiple locations are comma-separated

      // Set the movie details in the modal
      document.querySelector('.movie-detail-title').innerText = movieTitle;
      document.querySelector('.movie-detail-year').innerText = movieYear;
      document.querySelector('.movie-detail-description').innerText = movieDescription;
      document.querySelector('.movie-img').style.backgroundImage = `url('${imageUrl}')`;
      document.querySelector('.movie-detail-genre').innerText = `Genres: ${genres}`;

      // Create the location-specific links
      const locationLinksContainer = document.querySelector('.movie-location-links');
      locationLinksContainer.innerHTML = ''; // Clear previous links

      locations.forEach(location => {
        const link = document.createElement('a');
        link.href = `#${location.trim().toLowerCase().replace(/\s+/g, '-')}`;
        link.innerText = `Go to ${location}`;
        locationLinksContainer.appendChild(link);
        locationLinksContainer.appendChild(document.createElement('br')); // Add a line break after each link
      });

      // Open the modal
      modal.style.display = 'block';
    });
  });

  // Close the modal when the "X" is clicked
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal
  });

  // Close the modal if the user clicks outside of it
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none'; // Hide the modal if clicked outside
    }
  });
});
