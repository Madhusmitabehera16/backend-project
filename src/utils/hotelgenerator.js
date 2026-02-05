const hotelNames = [
  "Grand Palace",
  "Urban Stay",
  "Royal Residency",
  "City View Inn",
  "Comfort Suites",
  "Elite Residency",
  "Prime Hotel",
  "Heritage Palace",
  "Luxury Inn",
  "Skyline Suites"
];

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
];

const randomFromArray = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

module.exports = {
  randomHotelName: () => randomFromArray(hotelNames),
  randomImages: () => [randomFromArray(hotelImages)],
  randomPrice: () => Math.floor(Math.random() * 4000) + 1500,
  randomRating: () => (Math.random() * 2 + 3).toFixed(1),
};
