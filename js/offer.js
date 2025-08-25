const offers = [
  {
    title: "Up to 50% off on Clothing",
    discount: "50% OFF",
    image: "https://as1.ftcdn.net/v2/jpg/15/03/79/78/1000_F_1503797850_W7eEyMYWCZYoBr5MwuY9X0V04lPmVyMf.jpg"
  },
  {
    title: "Hot Deals on Electronics",
    discount: "Upto 40% OFF",
    image: "https://as2.ftcdn.net/v2/jpg/06/50/85/53/1000_F_650855371_BQjYihnFUpJadW7mHxdaJpUykOdhmY1h.jpg"
  },
  {
    title: "Home Essentials Sale",
    discount: "Upto 60% OFF",
    image: "https://as1.ftcdn.net/v2/jpg/12/70/09/86/1000_F_1270098633_lEe4TeXCLm6G018MAWowQRQXaXc3dCn9.jpg"
  },
  {
    title: "Fitness Gear Bonanza",
    discount: "30-60% OFF",
    image: "https://as2.ftcdn.net/v2/jpg/15/86/60/23/1000_F_1586602390_RCcRZdyRlbzg2a4knYI2TT0V1lngCjF0.jpg"
  },
  {
    title: "Smart Watches & Bands",
    discount: "Up to 35% OFF",
    image: "https://as2.ftcdn.net/v2/jpg/15/80/67/97/1000_F_1580679765_Y38SJwZR1snac8uYv9HXSxgWoFCRwtXj.jpg"
  }
];

// Duplicate the offers to create a seamless loop
const track = document.getElementById('carouselTrack');
const allOffers = [...offers, ...offers]; // Duplicate once

allOffers.forEach(offer => {
  const card = document.createElement('div');
  card.className = 'carousel-card';
  card.innerHTML = `
    <img src="${offer.image}" alt="${offer.title}">
    <div class="info">
      <h3>${offer.title}</h3>
      <div class="discount">${offer.discount}</div>
    </div>
  `;
  track.appendChild(card);
});
