export type PublishingBook = {
  number: number;
  slug: string;
  title: string;
  pages: number;
  cover: string;
  pdf: string;
  assets?: string;
  downloadName: string;
  description: string;
};

export const publishingBooks: PublishingBook[] = [
  {
    number: 1,
    slug: "tobias-tangle",
    title: "The Clock That Lost Tuesday",
    pages: 46,
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
  {
    number: 6,
    slug: "tobias-tangle-library-beneath-the-lake",
    title: "The Library Beneath the Lake",
    pages: 40,
    cover: "/books/tobias-tangle-library-beneath-the-lake/cover.webp",
    pdf: "/books/tobias-tangle-library-beneath-the-lake/the-library-beneath-the-lake.pdf",
    downloadName: "06_Tobias_Tangle_and_the_Library_Beneath_the_Lake_Premium_A5_CMYK_Print.pdf",
    description: "A library hidden beneath Mere Glass sends out four red slips. Tobias, Mina, Wilf and Pru have never borrowed its books — yet the Catalogue is already coming to collect them. To save the sinking library, they must find the missing pages of the Book of Everywhere, face a century-old secret and repair a calendar that has left the whole library one day behind. A warm, funny and beautifully illustrated adventure about curiosity, courage and returning what does not belong to you.",
  },
{
  "number": 7,
  "slug": "tobias-tangle-winter-that-would-not-leave",
  "title": "The Winter That Would Not Leave",
  "pages": 32,
  "cover": "https://audio.penrec.co.uk/books/tobias-tangle-winter-that-would-not-leave/cover.webp",
  "assets": "https://audio.penrec.co.uk/books/tobias-tangle-winter-that-would-not-leave/back-cover-v2",
  "pdf": "/books/tobias-tangle-winter-that-would-not-leave/winter-that-would-not-leave-back-cover-v2.pdf",
  "downloadName": "07_Tobias_Tangle_and_the_Winter_That_Would_Not_Leave_Premium_A5_CMYK_Print.pdf",
  "description": "Snow falls on Hushcombe in July, and a page from the Book of Seasons freezes everything it touches. Tobias, Mina, Wilf and Pru must discover why winter has arrived early — and find a way to put the seasons back where they belong."
},
{
  "number": 8,
  "slug": "tobias-tangle-map-of-impossible-doors",
  "title": "The Map of Impossible Doors",
  "pages": 36,
  "cover": "https://audio.penrec.co.uk/books/tobias-tangle-map-of-impossible-doors/cover.webp",
  "assets": "https://audio.penrec.co.uk/books/tobias-tangle-map-of-impossible-doors/back-cover-v2",
  "pdf": "/books/tobias-tangle-map-of-impossible-doors/map-of-impossible-doors-back-cover-v2.pdf",
  "downloadName": "08_Tobias_Tangle_and_the_Map_of_Impossible_Doors_Premium_A5_CMYK_Print.pdf",
  "description": "A pantry door opens onto the roof of Hushcombe Town Hall, and a mysterious map shows eight roads ending in red doors. With street signs turning and ordinary doorways leading somewhere impossible, Tobias and his friends follow the map into a new adventure."
},
{
  "number": 9,
  "slug": "tobias-tangle-clockwork-rooks",
  "title": "The Clockwork Rooks",
  "pages": 32,
  "cover": "https://audio.penrec.co.uk/books/tobias-tangle-clockwork-rooks/cover.webp",
  "assets": "https://audio.penrec.co.uk/books/tobias-tangle-clockwork-rooks/back-cover-v2",
  "pdf": "/books/tobias-tangle-clockwork-rooks/clockwork-rooks-back-cover-v2.pdf",
  "downloadName": "09_Tobias_Tangle_and_the_Clockwork_Rooks_Premium_A5_CMYK_Print.pdf",
  "description": "A little clockwork rook counts backwards from twelve, stopping Hushcombe’s clocks as it goes. Its message says the Master Route is open and the rooks are coming home. Tobias and his friends must follow the remaining black road on the Map of Impossible Doors to discover what is coming."
},
{
  "number": 10,
  "slug": "tobias-tangle-last-road-home",
  "title": "The Last Road Home",
  "pages": 28,
  "cover": "https://audio.penrec.co.uk/books/tobias-tangle-last-road-home/cover.webp",
  "assets": "https://audio.penrec.co.uk/books/tobias-tangle-last-road-home/back-cover-v2",
  "pdf": "/books/tobias-tangle-last-road-home/last-road-home-back-cover-v2.pdf",
  "downloadName": "10_Tobias_Tangle_and_the_Last_Road_Home_Premium_A5_CMYK_Print.pdf",
  "description": "The Last Road carries Tobias and his friends away from Hushcombe towards the mysterious First House. Every adventure they have shared lies along the route, but the road disappears behind them. Together with Tick, the clockwork rook, they face the final journey home."
},
];
