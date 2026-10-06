export type PublishingBook = {
  number: number;
  slug: string;
  title: string;
  pages: number;
  cover: string;
  pdf: string;
  downloadName: string;
  description: string;
};

export const publishingBooks: PublishingBook[] = [
  {
    number: 1,
    slug: "tobias-tangle",
    title: "The Clock That Lost Tuesday",
    pages: 48,
    cover: "/books/tobias-tangle/cover.png",
    pdf: "/books/tobias-tangle/the-clock-that-lost-tuesday.pdf",
    downloadName: "01_Tobias_Tangle_and_the_Clock_That_Lost_Tuesday_Premium_A5_Print.pdf",
    description: "When every clock in Hushcombe begins repeating Monday, Tobias Tangle follows a mysterious brass compass to the town’s abandoned railway station. Beneath Platform Two, a missing day is trapped inside an enormous clock — and Tobias and his friends have only six seconds to put it back.",
  },
  {
    number: 2,
    slug: "tobias-tangle-door-beneath-the-river",
    title: "The Door Beneath the River",
    pages: 52,
    cover: "/books/tobias-tangle-door-beneath-the-river/cover.webp",
    pdf: "/books/tobias-tangle-door-beneath-the-river/the-door-beneath-the-river.pdf",
    downloadName: "02_Tobias_Tangle_and_the_Door_Beneath_the_River_Premium_A5_Print.pdf",
    description: "When Pru Puddlefoot arrives carrying a River Keeper’s key, Tobias’s compass points towards a green door beneath the bridge. Beyond it lies the River House — an underground maze of sluices, maps and forgotten waterways. Pru’s grandfather is missing, the river has been sent down its ancient course, and pressure is building beneath the market square. To bring the water home, Pru must tell her new friends what she has done — and all four must trust one another inside a house that is rapidly filling with water.",
  },
  {
    number: 3,
    slug: "tobias-tangle-theatre-of-borrowed-shadows",
    title: "The Theatre of Borrowed Shadows",
    pages: 52,
    cover: "/books/tobias-tangle-theatre-of-borrowed-shadows/cover.webp",
    pdf: "/books/tobias-tangle-theatre-of-borrowed-shadows/the-theatre-of-borrowed-shadows.pdf",
    downloadName: "03_Tobias_Tangle_and_the_Theatre_of_Borrowed_Shadows_Premium_A5_Print.pdf",
    description: "The old Pavilion Theatre has been closed for twenty years — but tonight its lights are on. When Tobias, Mina, Wilf and Pru follow a mysterious fifth shadow inside, the theatre casts them in an unfinished play and borrows their shadows for the performance. Soon shadows are slipping away from everyone in Hushcombe. To bring down the curtain, the friends must find the actor who walked out on closing night — and persuade him to perform the ending he has spent twenty years avoiding.",
  },
  {
    number: 4,
    slug: "tobias-tangle-lighthouse-in-the-orchard",
    title: "The Lighthouse in the Orchard",
    pages: 52,
    cover: "/books/tobias-tangle-lighthouse-in-the-orchard/cover.webp",
    pdf: "/books/tobias-tangle-lighthouse-in-the-orchard/the-lighthouse-in-the-orchard.pdf",
    downloadName: "04_Tobias_Tangle_and_the_Lighthouse_in_the_Orchard_Premium_A5_Print.pdf",
    description: "A lighthouse has appeared in Bellweather Orchard — forty miles from the nearest sea. Its beam is searching the apple trees, an inland tide is rising, and a ship missing for eighty-six years is sailing through the fog. With the orchard rapidly becoming an ocean, Tobias, Mina, Wilf and Pru must build a harbour, free the ship and help Keeper Nell finish a voyage she has spent a lifetime trying to forget.",
  },
{
  "number": 5,
  "slug": "tobias-tangle-midnight-market",
  "title": "The Midnight Market",
  "pages": 48,
  "cover": "/books/tobias-tangle-midnight-market/cover.webp",
  "pdf": "/books/tobias-tangle-midnight-market/the-midnight-market.pdf",
  "downloadName": "05_Tobias_Tangle_and_the_Midnight_Market_Premium_A5_Print.pdf",
  "description": "At midnight, a magical market takes over Hushcombe Square — and Tobias and his friends have already bought something they cannot afford. The price of admission is their way home. Unless they can settle the bill before dawn, the market will keep Hushcombe too: every shop, street and doorstep. With a basket that buys anything they want and a black-cat clerk who fixes every bargain, Tobias, Mina, Wilf and Pru must discover what happened to the Fair Bell — and prove that home is worth more than anything the market can sell."
},
];
