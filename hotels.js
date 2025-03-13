document.addEventListener("DOMContentLoaded", async function () {
  const apiUrl = "https://hotelbooking.stepprojects.ge/api/Hotels/GetAll";
  const parentDiv = document.querySelector(".parent");

  try {
    const response = await fetch(apiUrl);
    const hotels = await response.json();

    if (!Array.isArray(hotels)) {
      throw new Error("Invalid data format");
    }

    parentDiv.innerHTML = "";

    hotels.forEach((hotel) => {
      const hotelDiv = document.createElement("div");
      hotelDiv.classList.add("son");

      const imageUrl = hotel.featuredImage
        ? hotel.featuredImage
        : "https://via.placeholder.com/200";

      hotelDiv.innerHTML = `
            <h2 class="hotel-names">${hotel.name}</h2> 
                <img src="${imageUrl}" alt="${hotel.name}" width="400px" height="auto">
                <a href="./Rooms.html"><button class="room-button">View Hotel</button></a>
            `;

      parentDiv.appendChild(hotelDiv);
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    parentDiv.innerHTML = "<p>Failed to load hotels.</p>";
  }
});

document.querySelector(".fa-bars").addEventListener("click", function () {
  const menu = document.querySelector("ul");
  menu.style.display = menu.style.display === "none" ? "flex" : "none";
});
