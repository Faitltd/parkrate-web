import type { ThemePark } from "./types";
import { validateThemeParks } from "./validate-data";

export const themeParks: ThemePark[] = [
  {
    id: "disneyland",
    name: "Disneyland",
    location: "Anaheim, CA",
    description: "The original Magic Kingdom and the happiest place on Earth. Features 8 iconic roller coasters and timeless Disney magic across multiple themed lands.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Sleeping_Beauty_Castle_-_February_2024.png",
    rating: 4.9,
    categoryRatings: {
      food: 4.8,
      rides: 4.9,
      parking: 4.3,
      cleanliness: 5.0,
      staff: 5.0,
      value: 4.4
    },
    reviewCount: 15847,
    priceRange: "$$$$",
    categories: ["Disney Resort", "Classic Theme Park", "Family Entertainment"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["FastPass System", "Character Meet & Greets", "Parades", "Fireworks", "Mobile App"],
    hours: "8:00 AM - 12:00 AM",
    phone: "(714) 781-4565",
    website: "disneyland.disney.go.com",
    reviews: [
      {
        id: "dl1",
        author: "Sarah Williams",
        authorInitials: "SW",
        rating: 5,
        date: "1 day ago",
        text: "Absolutely magical experience! The attention to detail is incredible. Matterhorn and Space Mountain are must-rides. Got to meet Mickey Mouse!",
        helpful: 156
      },
      {
        id: "dl2",
        author: "James Chen",
        authorInitials: "JC",
        rating: 5,
        date: "3 days ago",
        text: "Worth every penny. The park is immaculate, staff is wonderful, and the new Star Wars land is mind-blowing. Go early to beat the crowds!",
        helpful: 142
      },
      {
        id: "dl3",
        author: "Maria Garcia",
        authorInitials: "MG",
        rating: 4,
        date: "1 week ago",
        text: "Amazing park but very expensive. Food prices are high. However, the experience is unmatched. Make sure to get Genie+ to skip lines.",
        helpful: 98
      }
    ]
  },
  {
    id: "disney-california-adventure",
    name: "Disney California Adventure",
    location: "Anaheim, CA",
    description: "Celebrating the spirit of California with thrilling attractions, world-class entertainment, and unique Disney storytelling. Home to Guardians of the Galaxy and Incredicoaster.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/California_Adventure_July_4.jpg",
    rating: 4.7,
    categoryRatings: {
      food: 4.9,
      rides: 4.8,
      parking: 4.3,
      cleanliness: 4.9,
      staff: 4.8,
      value: 4.3
    },
    reviewCount: 12453,
    priceRange: "$$$$",
    categories: ["Disney Resort", "Modern Theme Park", "Adventure"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Marvel Land", "Pixar Pier", "World of Color Show", "Wine Country", "FastPass"],
    hours: "8:00 AM - 10:00 PM",
    phone: "(714) 781-4636",
    website: "disneyland.disney.go.com/destinations/disney-california-adventure",
    reviews: [
      {
        id: "dca1",
        author: "Tom Rodriguez",
        authorInitials: "TR",
        rating: 5,
        date: "2 days ago",
        text: "Guardians of the Galaxy ride is incredible! The food options here are way better than Disneyland. Love the Pixar Pier.",
        helpful: 87
      },
      {
        id: "dca2",
        author: "Lisa Thompson",
        authorInitials: "LT",
        rating: 5,
        date: "5 days ago",
        text: "World of Color at night is breathtaking. Incredicoaster is so much fun. Great park for adults and kids alike!",
        helpful: 73
      }
    ]
  },
  {
    id: "universal-studios-hollywood",
    name: "Universal Studios Hollywood",
    location: "Universal City, CA",
    description: "The entertainment capital of LA! Experience movie magic with the world-famous Studio Tour and thrilling attractions based on blockbuster films.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Universal_Studios_Hollywood.jpg",
    rating: 4.6,
    categoryRatings: {
      food: 4.5,
      rides: 4.7,
      parking: 4.0,
      cleanliness: 4.6,
      staff: 4.5,
      value: 4.3
    },
    reviewCount: 9876,
    priceRange: "$$$",
    categories: ["Universal Studios", "Movie Theme Park", "Studio Tour"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Studio Tour", "Wizarding World", "CityWalk", "VIP Experience", "Express Pass"],
    hours: "9:00 AM - 7:00 PM",
    phone: "(800) 864-8377",
    website: "universalstudioshollywood.com",
    reviews: [
      {
        id: "ush1",
        author: "Kevin Park",
        authorInitials: "KP",
        rating: 5,
        date: "1 day ago",
        text: "Studio Tour is amazing! You see real movie sets and the King Kong 360 experience is insane. Harry Potter land is perfect!",
        helpful: 134
      },
      {
        id: "ush2",
        author: "Amanda Foster",
        authorInitials: "AF",
        rating: 4,
        date: "4 days ago",
        text: "Great park but gets very crowded. The Jurassic World ride got us soaked! Worth getting Express Pass to skip lines.",
        helpful: 91
      }
    ]
  },
  {
    id: "six-flags-magic-mountain",
    name: "Six Flags Magic Mountain",
    location: "Valencia, CA",
    description: "The Thrill Capital of the World! Home to 20 world-class roller coasters including the legendary Twisted Colossus and record-breaking X2.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Six_Flags_Magic_Mountain_-_49256162901.jpg",
    rating: 4.5,
    categoryRatings: {
      food: 3.8,
      rides: 5.0,
      parking: 4.2,
      cleanliness: 4.1,
      staff: 4.0,
      value: 4.6
    },
    reviewCount: 8234,
    priceRange: "$$$",
    categories: ["Six Flags", "Extreme Rides", "Roller Coaster Paradise"],
    audienceType: "Adults",
    parkType: "Dry Park",
    features: ["20 Coasters", "Flash Pass", "DC Universe", "Fright Fest", "Holiday in the Park"],
    hours: "10:00 AM - 8:00 PM",
    phone: "(661) 255-4100",
    website: "sixflags.com/magicmountain",
    reviews: [
      {
        id: "sfmm1",
        author: "Jake Morrison",
        authorInitials: "JM",
        rating: 5,
        date: "2 days ago",
        text: "Coaster heaven! X2, Tatsu, and Twisted Colossus are absolutely insane. If you love thrill rides, this is your park!",
        helpful: 178
      },
      {
        id: "sfmm2",
        author: "Nicole Bennett",
        authorInitials: "NB",
        rating: 4,
        date: "1 week ago",
        text: "Amazing coasters but the park could be cleaner. Food is overpriced but acceptable. Bring refillable bottle for free water.",
        helpful: 112
      }
    ]
  },
  {
    id: "knotts-berry-farm",
    name: "Knott's Berry Farm",
    location: "Buena Park, CA",
    description: "California's first theme park! A perfect blend of Old West charm, family-friendly attractions, and world-class roller coasters including GhostRider.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Knott%27s_Berry_Farm_-_panoramio.jpg",
    rating: 4.4,
    categoryRatings: {
      food: 4.6,
      rides: 4.5,
      parking: 4.3,
      cleanliness: 4.4,
      staff: 4.4,
      value: 4.7
    },
    reviewCount: 6543,
    priceRange: "$$",
    categories: ["Regional Theme Park", "Family-Friendly", "Old West"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Boysenberry Festival", "Scary Farm", "Camp Snoopy", "Famous Fried Chicken", "Fast Lane"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(714) 220-5200",
    website: "knotts.com",
    reviews: [
      {
        id: "kbf1",
        author: "Rachel Kim",
        authorInitials: "RK",
        rating: 5,
        date: "3 days ago",
        text: "Best value theme park! GhostRider is an incredible wooden coaster. The fried chicken is legendary. Great for families!",
        helpful: 145
      },
      {
        id: "kbf2",
        author: "David Miller",
        authorInitials: "DM",
        rating: 4,
        date: "1 week ago",
        text: "Solid park with great coasters. Less crowded than Disney. Scary Farm during Halloween is a must-do!",
        helpful: 89
      }
    ]
  },
  {
    id: "magic-kingdom",
    name: "Magic Kingdom",
    location: "Orlando, FL",
    description: "The most magical place on Earth! Walt Disney World's flagship park featuring Cinderella Castle, classic attractions, and unforgettable Disney experiences.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Cinderella_Castle%2C_Magic_Kingdom_Walt_Disney_World_%282024%29.jpg",
    rating: 4.9,
    categoryRatings: {
      food: 4.7,
      rides: 4.9,
      parking: 4.5,
      cleanliness: 5.0,
      staff: 5.0,
      value: 4.4
    },
    reviewCount: 28934,
    priceRange: "$$$$",
    categories: ["Disney Resort", "Classic Theme Park", "Icon"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Cinderella Castle", "Seven Lands", "Fireworks", "Character Dining", "Genie+"],
    hours: "9:00 AM - 11:00 PM",
    phone: "(407) 939-5277",
    website: "disneyworld.disney.go.com/destinations/magic-kingdom",
    reviews: [
      {
        id: "mk1",
        author: "Jennifer Adams",
        authorInitials: "JA",
        rating: 5,
        date: "1 day ago",
        text: "Dream come true! Seven Dwarfs Mine Train and Space Mountain are amazing. The fireworks show made me cry. Pure magic!",
        helpful: 234
      },
      {
        id: "mk2",
        author: "Michael Chang",
        authorInitials: "MC",
        rating: 5,
        date: "2 days ago",
        text: "Perfect in every way. The attention to detail is unmatched. Cast members are wonderful. Book dining reservations early!",
        helpful: 198
      }
    ]
  },
  {
    id: "epcot",
    name: "EPCOT",
    location: "Orlando, FL",
    description: "Explore the world and the future! Experience international cuisine, culture, and cutting-edge attractions at Disney's most unique theme park.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Epcot.JPG",
    rating: 4.7,
    categoryRatings: {
      food: 5.0,
      rides: 4.5,
      parking: 4.6,
      cleanliness: 4.9,
      staff: 4.8,
      value: 4.5
    },
    reviewCount: 19876,
    priceRange: "$$$$",
    categories: ["Disney Resort", "World Showcase", "Edutainment"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["World Showcase", "Food & Wine Festival", "Guardians Coaster", "Test Track", "Festivals"],
    hours: "9:00 AM - 9:00 PM",
    phone: "(407) 939-5277",
    website: "disneyworld.disney.go.com/destinations/epcot",
    reviews: [
      {
        id: "ep1",
        author: "Sophia Martinez",
        authorInitials: "SM",
        rating: 5,
        date: "2 days ago",
        text: "Food paradise! Eating around the world is incredible. Guardians coaster is the best Disney ride ever built. Love this park!",
        helpful: 167
      },
      {
        id: "ep2",
        author: "Robert Taylor",
        authorInitials: "RT",
        rating: 5,
        date: "5 days ago",
        text: "Perfect for adults! The international pavilions are beautiful. Great dining options. Test Track and Soarin' are must-dos.",
        helpful: 143
      }
    ]
  },
  {
    id: "universal-islands-of-adventure",
    name: "Universal's Islands of Adventure",
    location: "Orlando, FL",
    description: "Adventure awaits across legendary islands! Home to The Wizarding World of Harry Potter - Hogsmeade and some of the world's most innovative attractions.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Universal_Islands_of_Adventure%2C_Orlando.jpg",
    rating: 4.8,
    categoryRatings: {
      food: 4.7,
      rides: 5.0,
      parking: 4.4,
      cleanliness: 4.7,
      staff: 4.7,
      value: 4.5
    },
    reviewCount: 16543,
    priceRange: "$$$$",
    categories: ["Universal Studios", "Thrill Rides", "Immersive"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Wizarding World", "Velocicoaster", "Express Pass", "Marvel Island", "Jurassic Park"],
    hours: "9:00 AM - 9:00 PM",
    phone: "(407) 363-8000",
    website: "universalorlando.com/islands-of-adventure",
    reviews: [
      {
        id: "ioa1",
        author: "Emma Wilson",
        authorInitials: "EW",
        rating: 5,
        date: "1 day ago",
        text: "Velocicoaster is the best roller coaster in the world! Harry Potter area is absolutely perfect. Butterbeer is delicious!",
        helpful: 289
      },
      {
        id: "ioa2",
        author: "Chris Anderson",
        authorInitials: "CA",
        rating: 5,
        date: "3 days ago",
        text: "Incredible park! Every themed area is immersive. The Incredible Hulk coaster is still amazing after all these years.",
        helpful: 221
      }
    ]
  },
  {
    id: "cedar-point",
    name: "Cedar Point",
    location: "Sandusky, OH",
    description: "The Roller Coaster Capital of the World! 18 world-class coasters on a beautiful Lake Erie peninsula. America's premier amusement park.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Cedar_point.jpg",
    rating: 4.8,
    categoryRatings: {
      food: 4.2,
      rides: 5.0,
      parking: 4.4,
      cleanliness: 4.6,
      staff: 4.5,
      value: 4.6
    },
    reviewCount: 14532,
    priceRange: "$$$",
    categories: ["Six Flags", "Roller Coasters", "Historic"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["18 Coasters", "Beach Location", "Fast Lane", "Cedar Point Shores", "Hotels On-Site"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(419) 627-2350",
    website: "cedarpoint.com",
    reviews: [
      {
        id: "cp1",
        author: "Brandon Mitchell",
        authorInitials: "BM",
        rating: 5,
        date: "1 day ago",
        text: "Coaster nirvana! Steel Vengeance, Millennium Force, and Maverick are all top 10 coasters. A must-visit for thrill seekers!",
        helpful: 312
      },
      {
        id: "cp2",
        author: "Ashley Roberts",
        authorInitials: "AR",
        rating: 5,
        date: "4 days ago",
        text: "Best amusement park in America! The lakefront setting is beautiful. So many world-class coasters. Plan multiple days!",
        helpful: 267
      }
    ]
  },
  {
    id: "dollywood",
    name: "Dollywood",
    location: "Pigeon Forge, TN",
    description: "Dolly Parton's mountain paradise! Experience Southern hospitality, award-winning rides, world-class entertainment, and the beauty of the Smoky Mountains.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Dollywood_from_the_Dollywood_Express_-_16.jpg",
    rating: 4.9,
    categoryRatings: {
      food: 4.9,
      rides: 4.8,
      parking: 4.7,
      cleanliness: 5.0,
      staff: 5.0,
      value: 4.8
    },
    reviewCount: 18234,
    priceRange: "$$$",
    categories: ["Regional Theme Park", "Family-Friendly", "Country Music"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Smoky Mountain Setting", "Live Shows", "Crafts", "Southern Food", "TimeSaver Pass"],
    hours: "10:00 AM - 9:00 PM",
    phone: "(865) 428-9488",
    website: "dollywood.com",
    reviews: [
      {
        id: "dw1",
        author: "Mary Johnson",
        authorInitials: "MJ",
        rating: 5,
        date: "2 days ago",
        text: "Most beautiful theme park! Lightning Rod is incredible. The food is amazing - try the cinnamon bread! Staff is so friendly!",
        helpful: 201
      },
      {
        id: "dw2",
        author: "John Davis",
        authorInitials: "JD",
        rating: 5,
        date: "1 week ago",
        text: "Exceeded all expectations! Clean, beautiful, great rides, amazing food. The craftsmen demonstrating skills are fascinating!",
        helpful: 176
      }
    ]
  },
  {
    id: "busch-gardens-tampa",
    name: "Busch Gardens Tampa Bay",
    location: "Tampa, FL",
    description: "African adventure meets world-class thrills! Experience exotic animals, top-tier roller coasters, and live entertainment in a beautifully themed environment.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Busch_Gardens_Tampa_sign.jpg",
    rating: 4.7,
    categoryRatings: {
      food: 4.6,
      rides: 4.9,
      parking: 4.5,
      cleanliness: 4.7,
      staff: 4.6,
      value: 4.6
    },
    reviewCount: 11234,
    priceRange: "$$$",
    categories: ["Busch Gardens", "Animal Park", "Thrill Rides"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Animal Encounters", "Iron Gwazi", "Quick Queue", "Safari", "Serengeti Plain"],
    hours: "9:00 AM - 8:00 PM",
    phone: "(813) 884-4386",
    website: "buschgardens.com/tampa",
    reviews: [
      {
        id: "bgt1",
        author: "Carlos Rivera",
        authorInitials: "CR",
        rating: 5,
        date: "3 days ago",
        text: "Iron Gwazi is absolutely insane! Best hybrid coaster ever. The animal exhibits are beautiful. Great combination of zoo and theme park!",
        helpful: 189
      },
      {
        id: "bgt2",
        author: "Diana Lopez",
        authorInitials: "DL",
        rating: 5,
        date: "5 days ago",
        text: "Love this park! SheiKra and Cheetah Hunt are amazing. Seeing the animals is a bonus. Great for the whole family!",
        helpful: 154
      }
    ]
  },
  {
    id: "kings-island",
    name: "Kings Island",
    location: "Mason, OH",
    description: "Ohio's premier amusement park featuring 15 roller coasters including the legendary Beast, Orion, and family-friendly Planet Snoopy.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/KI_SOB_Layout.JPG",
    rating: 4.6,
    categoryRatings: {
      food: 4.3,
      rides: 4.8,
      parking: 4.5,
      cleanliness: 4.5,
      staff: 4.4,
      value: 4.7
    },
    reviewCount: 9876,
    priceRange: "$$",
    categories: ["Six Flags", "Family Park", "Classic"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["15 Coasters", "Soak City Water Park", "Fast Lane", "Planet Snoopy", "Halloween Haunt"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(513) 754-5700",
    website: "visitkingsisland.com",
    reviews: [
      {
        id: "ki1",
        author: "Tyler Scott",
        authorInitials: "TS",
        rating: 5,
        date: "2 days ago",
        text: "The Beast at night is legendary! Orion is smooth and intense. Great park with something for everyone. Good value!",
        helpful: 167
      },
      {
        id: "ki2",
        author: "Lauren Wright",
        authorInitials: "LW",
        rating: 4,
        date: "1 week ago",
        text: "Really fun park! Mystic Timbers is awesome. Planet Snoopy is perfect for kids. Food could be better but overall great experience!",
        helpful: 134
      }
    ]
  },
  {
    id: "hersheypark",
    name: "Hersheypark",
    location: "Hershey, PA",
    description: "The Sweetest Place on Earth! 14 roller coasters, water attractions, and chocolate-themed fun in the heart of Pennsylvania Dutch Country.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Hersheypark_in_2021.jpg",
    rating: 4.7,
    categoryRatings: {
      food: 4.5,
      rides: 4.7,
      parking: 4.6,
      cleanliness: 4.8,
      staff: 4.7,
      value: 4.6
    },
    reviewCount: 10543,
    priceRange: "$$$",
    categories: ["Regional Theme Park", "Chocolate", "Family Fun"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["Chocolate World", "Boardwalk", "Fast Track", "Water Park Included", "Zoo America"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(717) 534-3900",
    website: "hersheypark.com",
    reviews: [
      {
        id: "hp1",
        author: "Michelle Baker",
        authorInitials: "MB",
        rating: 5,
        date: "3 days ago",
        text: "Amazing family park! Candymonium is a fantastic coaster. The water park is included which is great value. Don't miss Chocolate World!",
        helpful: 178
      },
      {
        id: "hp2",
        author: "Dan Murphy",
        authorInitials: "DM",
        rating: 5,
        date: "1 week ago",
        text: "Clean, well-maintained park with great coasters. Skyrush is intense! The chocolate theme is fun and unique.",
        helpful: 145
      }
    ]
  },
  {
    id: "silver-dollar-city",
    name: "Silver Dollar City",
    location: "Branson, MO",
    description: "1880s-themed park in the Ozark Mountains! World-class coasters, master craftsmen, and the friendliest atmosphere in the theme park industry.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Silver_Dollar_City.jpg",
    rating: 4.8,
    categoryRatings: {
      food: 4.9,
      rides: 4.7,
      parking: 4.6,
      cleanliness: 4.9,
      staff: 5.0,
      value: 4.7
    },
    reviewCount: 13456,
    priceRange: "$$",
    categories: ["Regional Theme Park", "1880s Theme", "Crafts"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Master Craftsmen", "Time Traveler", "Festivals", "Shows", "Trailblazer Pass"],
    hours: "9:30 AM - 10:00 PM",
    phone: "(417) 336-7100",
    website: "silverdollarcity.com",
    reviews: [
      {
        id: "sdc1",
        author: "Patricia Green",
        authorInitials: "PG",
        rating: 5,
        date: "1 day ago",
        text: "Charming park with amazing coasters! Time Traveler is unique and thrilling. The craftsmen are so talented. Food is delicious!",
        helpful: 201
      },
      {
        id: "sdc2",
        author: "Mark Peterson",
        authorInitials: "MP",
        rating: 5,
        date: "4 days ago",
        text: "One of America's best parks! Staff is incredibly friendly. The theming and atmosphere are perfect. Highly recommend!",
        helpful: 187
      }
    ]
  },
  {
    id: "canadas-wonderland",
    name: "Canada's Wonderland",
    location: "Vaughan, Ontario",
    description: "Canada's premier theme park! 17 world-class roller coasters including Yukon Striker, the world's fastest, tallest, and longest dive coaster.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Canada%27s_Wonderland.jpg",
    rating: 4.6,
    categoryRatings: {
      food: 4.4,
      rides: 4.8,
      parking: 4.3,
      cleanliness: 4.5,
      staff: 4.5,
      value: 4.6
    },
    reviewCount: 11876,
    priceRange: "$$",
    categories: ["Six Flags", "Canadian Icon", "Thrill Rides"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["17 Coasters", "Splash Works", "Fast Lane", "Halloween Haunt", "WinterFest"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(905) 832-8131",
    website: "canadaswonderland.com",
    reviews: [
      {
        id: "cw1",
        author: "Alex Thompson",
        authorInitials: "AT",
        rating: 5,
        date: "2 days ago",
        text: "Best park in Canada! Yukon Striker is incredible. Behemoth and Leviathan are amazing B&M coasters. So much fun!",
        helpful: 156
      },
      {
        id: "cw2",
        author: "Samantha Lee",
        authorInitials: "SL",
        rating: 4,
        date: "6 days ago",
        text: "Great selection of coasters! Can get crowded but Fast Lane is worth it. Splash Works is a nice bonus in summer.",
        helpful: 128
      }
    ]
  },
  {
    id: "six-flags-great-adventure",
    name: "Six Flags Great Adventure",
    location: "Jackson, NJ",
    description: "Home of the legendary Kingda Ka! 14 intense roller coasters including the world's tallest and fastest, plus a drive-through safari.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Six_Flags_Great_Adventure_view.jpg",
    rating: 4.5,
    categoryRatings: {
      food: 4.0,
      rides: 4.9,
      parking: 4.2,
      cleanliness: 4.3,
      staff: 4.2,
      value: 4.5
    },
    reviewCount: 10234,
    priceRange: "$$$",
    categories: ["Six Flags", "Extreme", "Safari"],
    audienceType: "Adults",
    parkType: "Dry Park",
    features: ["Kingda Ka", "El Toro", "Safari", "Flash Pass", "Fright Fest"],
    hours: "10:00 AM - 8:00 PM",
    phone: "(732) 928-1821",
    website: "sixflags.com/greatadventure",
    reviews: [
      {
        id: "sfga1",
        author: "Ryan Cooper",
        authorInitials: "RC",
        rating: 5,
        date: "1 day ago",
        text: "Kingda Ka launch is insane! El Toro is the best wooden coaster. Jersey Devil is smooth. Safari is a great bonus!",
        helpful: 198
      },
      {
        id: "sfga2",
        author: "Jessica Moore",
        authorInitials: "JM",
        rating: 4,
        date: "5 days ago",
        text: "Awesome coaster collection! Park could use some updates but the rides make up for it. Don't miss the safari!",
        helpful: 145
      }
    ]
  },
  {
    id: "carowinds",
    name: "Carowinds",
    location: "Charlotte, NC",
    description: "Straddling the North Carolina-South Carolina border! 14 thrilling coasters including Fury 325, one of the world's best giga coasters.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Carowinds.jpg",
    rating: 4.5,
    categoryRatings: {
      food: 4.2,
      rides: 4.7,
      parking: 4.4,
      cleanliness: 4.4,
      staff: 4.3,
      value: 4.6
    },
    reviewCount: 8765,
    priceRange: "$$",
    categories: ["Six Flags", "Giga Coaster", "Regional"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Fury 325", "Carolina Harbor", "Fast Lane", "Snoopy", "Scarowinds"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(704) 588-2600",
    website: "carowinds.com",
    reviews: [
      {
        id: "car1",
        author: "Nathan Brooks",
        authorInitials: "NB",
        rating: 5,
        date: "3 days ago",
        text: "Fury 325 is perfection! Afterburn and Intimidator are also excellent. Great park with good variety. Carolina Harbor is nice!",
        helpful: 167
      },
      {
        id: "car2",
        author: "Emily Carter",
        authorInitials: "EC",
        rating: 4,
        date: "1 week ago",
        text: "Really enjoyed this park! Copperhead Strike is unique and fun. Good food options. Cleaner than some other Six Flags parks.",
        helpful: 132
      }
    ]
  },
  {
    id: "busch-gardens-williamsburg",
    name: "Busch Gardens Williamsburg",
    location: "Williamsburg, VA",
    description: "The world's most beautiful theme park! European-themed villages, award-winning landscaping, and world-class roller coasters in Virginia.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Busch_Gardens_Williamsburg_Main_Gate.jpg",
    rating: 4.8,
    categoryRatings: {
      food: 4.8,
      rides: 4.8,
      parking: 4.6,
      cleanliness: 4.9,
      staff: 4.7,
      value: 4.6
    },
    reviewCount: 10987,
    priceRange: "$$$",
    categories: ["Busch Gardens", "European Theme", "Beautiful"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["European Villages", "Pantheon", "Quick Queue", "Gardens", "Howl-O-Scream"],
    hours: "10:00 AM - 9:00 PM",
    phone: "(757) 229-4386",
    website: "buschgardens.com/williamsburg",
    reviews: [
      {
        id: "bgw1",
        author: "Victoria Hayes",
        authorInitials: "VH",
        rating: 5,
        date: "2 days ago",
        text: "Absolutely stunning park! Pantheon is incredible - multiple launches and backwards section. The theming and gardens are gorgeous!",
        helpful: 189
      },
      {
        id: "bgw2",
        author: "Gregory Allen",
        authorInitials: "GA",
        rating: 5,
        date: "4 days ago",
        text: "Most beautiful theme park! Griffon, Alpengeist, and Verbolten are all fantastic. Great food in each country section!",
        helpful: 176
      }
    ]
  },
  {
    id: "elitch-gardens",
    name: "Elitch Gardens",
    location: "Denver, CO",
    description: "Denver's only world-class combination theme and water park! A Colorado icon for over 130 years, offering 6 thrilling coasters and 40+ attractions with stunning mountain and city views.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Elitch_gardens_from_Denver.jpg",
    rating: 5.0,
    categoryRatings: {
      food: 5.0,
      rides: 5.0,
      parking: 5.0,
      cleanliness: 5.0,
      staff: 5.0,
      value: 5.0
    },
    reviewCount: 7234,
    priceRange: "$",
    categories: ["Six Flags", "Downtown Location", "Historic"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["2 Parks in 1", "Downtown Location", "Light Rail Access", "Mountain Views", "KiddieLand"],
    hours: "10:00 AM - 9:00 PM (April-October)",
    phone: "(303) 595-4386",
    website: "elitchgardens.com",
    reviews: [
      {
        id: "eg1",
        author: "Rebecca Martinez",
        authorInitials: "RM",
        rating: 5,
        date: "2 days ago",
        text: "Love this park! Twister III is a fantastic wooden coaster and Mind Eraser is intense. The water park included in the price is a huge bonus! Great views of the Rockies!",
        helpful: 143
      },
      {
        id: "eg2",
        author: "Kevin Thompson",
        authorInitials: "KT",
        rating: 5,
        date: "1 week ago",
        text: "Perfect Denver summer destination! Easy to get to on the light rail. Six coasters is solid for a city park. The combination of theme and water park makes it unbeatable value!",
        helpful: 112
      },
      {
        id: "eg3",
        author: "Laura Henderson",
        authorInitials: "LH",
        rating: 5,
        date: "2 weeks ago",
        text: "Been coming here since I was a kid! The nostalgia is real. Fright Fest is amazing and the new Twister III is so much better than the old one. Great family park!",
        helpful: 98
      }
    ]
  },
  {
    id: "xplor-park",
    name: "Xplor Park",
    location: "Riviera Maya, Mexico",
    description: "Thrilling adventure park in the jungle! Experience ziplines, amphibious vehicles, underground rivers, and rafting through stalactite-filled caves in the heart of the Mayan Riviera.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Vista_Parque_Xplor_desde_torre_esc%C3%A9nica.JPG",
    rating: 4.6,
    categoryRatings: {
      food: 4.4,
      rides: 4.7,
      parking: 4.5,
      cleanliness: 4.8,
      staff: 4.9,
      value: 4.3
    },
    reviewCount: 5432,
    priceRange: "$$",
    categories: ["Adventure Park", "Eco-Tourism", "Jungle"],
    audienceType: "Adults",
    parkType: "Dry Park",
    features: ["Ziplines", "Underground Rivers", "Amphibious Vehicles", "Cave Rafting", "All-Inclusive"],
    hours: "9:00 AM - 5:00 PM",
    phone: "+52-984-803-4400",
    website: "xplor.travel",
    reviews: [
      {
        id: "xp1",
        author: "Carlos Mendez",
        authorInitials: "CM",
        rating: 5,
        date: "3 days ago",
        text: "Incredible adventure experience! The ziplines over the jungle are breathtaking. Swimming in underground rivers is magical. Best adventure park I've ever been to!",
        helpful: 124
      },
      {
        id: "xp2",
        author: "Sarah Williams",
        authorInitials: "SW",
        rating: 4,
        date: "1 week ago",
        text: "Amazing activities and beautiful natural setting. A bit pricey but the all-inclusive aspect makes it worth it. The amphibious vehicles are so fun!",
        helpful: 89
      }
    ]
  },
  {
    id: "xel-ha-park",
    name: "Xel-Ha Park",
    location: "Solidaridad, Mexico",
    description: "Natural aquatic paradise! Snorkel in crystal-clear waters, explore cenotes, and float down the lazy river in this stunning eco-park on the Caribbean coast.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Xel-H%C3%A1_Park%2C_Carretera_Chetumal_Puerto_Ju%C3%A1rez_(48698).jpg",
    rating: 4.5,
    categoryRatings: {
      food: 4.6,
      rides: 4.2,
      parking: 4.4,
      cleanliness: 4.7,
      staff: 4.8,
      value: 4.4
    },
    reviewCount: 6789,
    priceRange: "$$",
    categories: ["Eco-Park", "Snorkeling", "Water Activities"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["Natural Aquarium", "Cenotes", "Lazy River", "Cliff Jumping", "All-You-Can-Eat"],
    hours: "8:30 AM - 6:00 PM",
    phone: "+52-984-251-6500",
    website: "xelha.com",
    reviews: [
      {
        id: "xh1",
        author: "Jennifer Martinez",
        authorInitials: "JM",
        rating: 5,
        date: "2 days ago",
        text: "Paradise on Earth! The snorkeling is amazing - saw so many fish and sea turtles. The lazy river through the jungle is so relaxing. All-inclusive food is great!",
        helpful: 156
      },
      {
        id: "xh2",
        author: "Michael Chen",
        authorInitials: "MC",
        rating: 4,
        date: "5 days ago",
        text: "Beautiful natural setting with tons of activities. Can get crowded but still enjoyable. The cenotes are stunning. Perfect for families!",
        helpful: 102
      }
    ]
  },
  {
    id: "seaworld-san-diego",
    name: "SeaWorld San Diego",
    location: "San Diego, CA",
    description: "Marine life meets thrilling rides! Experience incredible animal encounters, world-class shows, and exciting roller coasters overlooking Mission Bay.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/SeaWorld%2C_San_Diego.JPG",
    rating: 4.4,
    categoryRatings: {
      food: 4.3,
      rides: 4.4,
      parking: 4.2,
      cleanliness: 4.6,
      staff: 4.5,
      value: 4.2
    },
    reviewCount: 8932,
    priceRange: "$$",
    categories: ["SeaWorld", "Marine Life", "Family-Friendly"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Animal Shows", "Electric Eel Coaster", "Aquariums", "Quick Queue", "Dolphins & Whales"],
    hours: "10:00 AM - 8:00 PM",
    phone: "(619) 222-4732",
    website: "seaworldsandiego.com",
    reviews: [
      {
        id: "sw1",
        author: "Amanda Rodriguez",
        authorInitials: "AR",
        rating: 5,
        date: "2 days ago",
        text: "Amazing experience with the marine animals! The dolphin show was breathtaking and Electric Eel coaster is intense. Great for families!",
        helpful: 134
      },
      {
        id: "sw2",
        author: "Jason Kim",
        authorInitials: "JK",
        rating: 4,
        date: "1 week ago",
        text: "Fun park with good mix of animals and rides. The penguin exhibit is fantastic. Can get crowded but worth visiting!",
        helpful: 89
      }
    ]
  },
  {
    id: "legoland-california",
    name: "Legoland California",
    location: "Carlsbad, CA",
    description: "Everything is awesome! Perfect for families with young children, featuring LEGO-themed rides, building workshops, and incredible LEGO sculptures.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Legoland_California.jpg",
    rating: 4.3,
    categoryRatings: {
      food: 4.2,
      rides: 4.2,
      parking: 4.4,
      cleanliness: 4.5,
      staff: 4.6,
      value: 4.1
    },
    reviewCount: 7234,
    priceRange: "$$",
    categories: ["Legoland", "Kids", "Interactive"],
    audienceType: "Kids",
    parkType: "Dry Park",
    features: ["LEGO Building Areas", "Miniland USA", "Water Park", "SEA LIFE Aquarium", "Reserve N Ride"],
    hours: "10:00 AM - 6:00 PM",
    phone: "(760) 918-5346",
    website: "legoland.com/california",
    reviews: [
      {
        id: "ll1",
        author: "Sarah Miller",
        authorInitials: "SM",
        rating: 5,
        date: "3 days ago",
        text: "Perfect for kids 2-12! My children had an absolute blast. The LEGO models are incredible and rides are perfect for younger kids.",
        helpful: 156
      },
      {
        id: "ll2",
        author: "David Chen",
        authorInitials: "DC",
        rating: 4,
        date: "1 week ago",
        text: "Great theme park for families. Miniland is amazing! A bit expensive but the kids love it. Water park is a nice bonus!",
        helpful: 112
      }
    ]
  },
  {
    id: "californias-great-america",
    name: "California's Great America",
    location: "Santa Clara, CA",
    description: "Silicon Valley's premier theme park! Features 7 thrilling coasters including Gold Striker and Flight Deck, plus Boomerang Bay water park.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/California%27s_Great_America_(14320203016).jpg",
    rating: 4.2,
    categoryRatings: {
      food: 3.9,
      rides: 4.4,
      parking: 4.1,
      cleanliness: 4.0,
      staff: 4.2,
      value: 4.5
    },
    reviewCount: 5678,
    priceRange: "$",
    categories: ["Six Flags", "Regional", "Water Park"],
    audienceType: "All Ages",
    parkType: "Mixed",
    features: ["Gold Striker Coaster", "Boomerang Bay", "Fast Lane", "Planet Snoopy", "Halloween Haunt"],
    hours: "10:30 AM - 8:00 PM",
    phone: "(408) 988-1776",
    website: "cagreatamerica.com",
    reviews: [
      {
        id: "cga1",
        author: "Mike Thompson",
        authorInitials: "MT",
        rating: 4,
        date: "4 days ago",
        text: "Solid park with good coasters! Gold Striker is an amazing wooden coaster. Great value compared to other Bay Area parks.",
        helpful: 98
      },
      {
        id: "cga2",
        author: "Lisa Wang",
        authorInitials: "LW",
        rating: 4,
        date: "2 weeks ago",
        text: "Fun day out! Flight Deck and Railblazer are great rides. Park could use some updates but overall enjoyable!",
        helpful: 76
      }
    ]
  },
  {
    id: "hollywoods-studios",
    name: "Hollywood Studios",
    location: "Orlando, FL",
    description: "Experience the magic of movies and television! Featuring Star Wars: Galaxy's Edge, Toy Story Land, and thrilling attractions based on blockbuster films.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Entrance_to_Disney%27s_Hollywood_Studios_%28May_2023%29.jpg",
    rating: 4.7,
    categoryRatings: {
      food: 4.8,
      rides: 4.7,
      parking: 4.5,
      cleanliness: 4.9,
      staff: 4.8,
      value: 4.4
    },
    reviewCount: 19234,
    priceRange: "$$",
    categories: ["Disney Resort", "Movies", "Star Wars"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Galaxy's Edge", "Toy Story Land", "Tower of Terror", "Rock 'n' Roller Coaster", "Genie+"],
    hours: "9:00 AM - 9:00 PM",
    phone: "(407) 939-5277",
    website: "disneyworld.disney.go.com/destinations/hollywood-studios",
    reviews: [
      {
        id: "hs1",
        author: "Rachel Adams",
        authorInitials: "RA",
        rating: 5,
        date: "1 day ago",
        text: "Galaxy's Edge is absolutely incredible! Rise of the Resistance is the best ride I've ever been on. Tower of Terror still holds up!",
        helpful: 187
      },
      {
        id: "hs2",
        author: "Kevin Brown",
        authorInitials: "KB",
        rating: 5,
        date: "5 days ago",
        text: "Amazing park! Toy Story Land is perfect for kids. The shows are top-notch. Star Wars land exceeded all expectations!",
        helpful: 154
      }
    ]
  },
  {
    id: "animal-kingdom",
    name: "Disney's Animal Kingdom",
    location: "Orlando, FL",
    description: "Disney's wild adventure park! Experience Pandora - The World of Avatar, African safaris, and Expedition Everest in the largest Disney theme park.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/AnimalKingdomEntrance.JPG",
    rating: 4.7,
    categoryRatings: {
      food: 4.7,
      rides: 4.6,
      parking: 4.6,
      cleanliness: 4.9,
      staff: 4.9,
      value: 4.5
    },
    reviewCount: 17456,
    priceRange: "$$",
    categories: ["Disney Resort", "Animals", "Avatar"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Pandora World", "Kilimanjaro Safari", "Expedition Everest", "Animal Encounters", "Genie+"],
    hours: "8:00 AM - 8:00 PM",
    phone: "(407) 939-5277",
    website: "disneyworld.disney.go.com/destinations/animal-kingdom",
    reviews: [
      {
        id: "ak1",
        author: "Michelle Garcia",
        authorInitials: "MG",
        rating: 5,
        date: "2 days ago",
        text: "Flight of Passage is mind-blowing! The safari is amazing - saw so many animals. Beautiful park with incredible theming!",
        helpful: 201
      },
      {
        id: "ak2",
        author: "Brian Lee",
        authorInitials: "BL",
        rating: 5,
        date: "1 week ago",
        text: "Best Disney park! Pandora at night is magical. Expedition Everest is a fantastic coaster. Love the conservation message!",
        helpful: 167
      }
    ]
  },
  {
    id: "universal-studios-florida",
    name: "Universal Studios Florida",
    location: "Orlando, FL",
    description: "Ride the movies at Universal's original Florida park! Featuring Diagon Alley, Transformers, and incredible attractions based on your favorite films.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Entrance_of_Universal_Studios_Florida_%28May_2023%29.jpg",
    rating: 4.7,
    categoryRatings: {
      food: 4.6,
      rides: 4.8,
      parking: 4.4,
      cleanliness: 4.7,
      staff: 4.7,
      value: 4.5
    },
    reviewCount: 14321,
    priceRange: "$$",
    categories: ["Universal Studios", "Movies", "Harry Potter"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Diagon Alley", "Minions", "Transformers", "Express Pass", "Hogwarts Express"],
    hours: "9:00 AM - 9:00 PM",
    phone: "(407) 363-8000",
    website: "universalorlando.com/universal-studios-florida",
    reviews: [
      {
        id: "usf1",
        author: "Daniel Martinez",
        authorInitials: "DM",
        rating: 5,
        date: "2 days ago",
        text: "Diagon Alley is perfection! Gringotts ride is amazing. Love taking the Hogwarts Express to Islands of Adventure!",
        helpful: 178
      },
      {
        id: "usf2",
        author: "Emily Wilson",
        authorInitials: "EW",
        rating: 4,
        date: "1 week ago",
        text: "Great park! Transformers ride is intense. The Simpsons area is fun. Can get very crowded, Express Pass helps!",
        helpful: 123
      }
    ]
  },
  {
    id: "universal-epic-universe",
    name: "Universal Epic Universe",
    location: "Orlando, FL",
    description: "Universal's newest and most ambitious park opening 2025! Features 12 state-of-the-art attractions including Nintendo World, How to Train Your Dragon, and more!",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Chronos_Tower_Front_Epic_Universe.jpg",
    rating: 4.8,
    categoryRatings: {
      food: 4.8,
      rides: 5.0,
      parking: 4.7,
      cleanliness: 5.0,
      staff: 4.8,
      value: 4.6
    },
    reviewCount: 3456,
    priceRange: "$$",
    categories: ["Universal Studios", "Brand New", "Nintendo"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Super Nintendo World", "How to Train Dragon Land", "Dark Universe", "Celestial Park", "Express Pass"],
    hours: "9:00 AM - 10:00 PM",
    phone: "(407) 363-8000",
    website: "universalorlando.com/epic-universe",
    reviews: [
      {
        id: "epic1",
        author: "Chris Anderson",
        authorInitials: "CA",
        rating: 5,
        date: "1 week ago",
        text: "Nintendo World is a dream come true! Mario Kart ride is innovative and fun. This park is next-level theme park design!",
        helpful: 289
      },
      {
        id: "epic2",
        author: "Samantha Park",
        authorInitials: "SP",
        rating: 5,
        date: "2 weeks ago",
        text: "Brand new and absolutely stunning! Every land is immersive. The technology in these rides is incredible. Worth the trip!",
        helpful: 234
      }
    ]
  },
  {
    id: "seaworld-orlando",
    name: "SeaWorld Orlando",
    location: "Orlando, FL",
    description: "Florida's premier marine life park! Features incredible animal experiences, thrilling coasters like Mako and Kraken, and world-class shows.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/SeaWorld_Orlando_lighthouse.jpg",
    rating: 4.5,
    categoryRatings: {
      food: 4.4,
      rides: 4.6,
      parking: 4.3,
      cleanliness: 4.7,
      staff: 4.6,
      value: 4.3
    },
    reviewCount: 11234,
    priceRange: "$$",
    categories: ["SeaWorld", "Marine Life", "Coasters"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Mako Hypercoaster", "Animal Encounters", "Antarctica", "Quick Queue", "Infinity Falls"],
    hours: "9:00 AM - 9:00 PM",
    phone: "(407) 545-5550",
    website: "seaworldorlando.com",
    reviews: [
      {
        id: "swo1",
        author: "Jennifer Lopez",
        authorInitials: "JL",
        rating: 5,
        date: "3 days ago",
        text: "Mako is an incredible hypercoaster! The animal exhibits are beautiful and educational. Great combination of thrills and animals!",
        helpful: 167
      },
      {
        id: "swo2",
        author: "Robert Taylor",
        authorInitials: "RT",
        rating: 4,
        date: "1 week ago",
        text: "Really enjoyed this park! Kraken and Manta are both excellent coasters. The dolphin experience was unforgettable!",
        helpful: 134
      }
    ]
  },
  {
    id: "six-flags-great-america-il",
    name: "Six Flags Great America",
    location: "Gurnee, IL",
    description: "Chicago's thrill capital! 16 world-class coasters including the iconic Goliath and Maxx Force, the fastest launch coaster in North America.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Six_Flags_Great_America%27s_Entrance.jpg",
    rating: 4.5,
    categoryRatings: {
      food: 4.1,
      rides: 4.8,
      parking: 4.3,
      cleanliness: 4.3,
      staff: 4.4,
      value: 4.6
    },
    reviewCount: 9876,
    priceRange: "$",
    categories: ["Six Flags", "Coasters", "Midwest"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["16 Coasters", "Maxx Force", "Flash Pass", "Hurricane Harbor", "Fright Fest"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(847) 249-1776",
    website: "sixflags.com/greatamerica",
    reviews: [
      {
        id: "sfga-il1",
        author: "Tyler Johnson",
        authorInitials: "TJ",
        rating: 5,
        date: "2 days ago",
        text: "Maxx Force launch is insane! Goliath is smooth and intense. Great coaster collection for the Midwest. Love this park!",
        helpful: 189
      },
      {
        id: "sfga-il2",
        author: "Ashley Martinez",
        authorInitials: "AM",
        rating: 4,
        date: "1 week ago",
        text: "Solid Six Flags park! Batman and Raging Bull are classics. Can get crowded but Flash Pass makes it manageable!",
        helpful: 143
      }
    ]
  },
  {
    id: "six-flags-over-texas",
    name: "Six Flags Over Texas",
    location: "Arlington, TX",
    description: "The original Six Flags! Texas-sized thrills with 13 coasters including the legendary Texas Giant and Mr. Freeze Reverse Blast.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Six_Flags_over_Texas_%28Entrance%29.JPG",
    rating: 4.4,
    categoryRatings: {
      food: 4.2,
      rides: 4.6,
      parking: 4.3,
      cleanliness: 4.2,
      staff: 4.3,
      value: 4.5
    },
    reviewCount: 8765,
    priceRange: "$",
    categories: ["Six Flags", "Historic", "Texas"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["13 Coasters", "Texas Giant", "Flash Pass", "DC Universe", "Holiday in the Park"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(817) 640-8900",
    website: "sixflags.com/overtexas",
    reviews: [
      {
        id: "sfot1",
        author: "Marcus Williams",
        authorInitials: "MW",
        rating: 5,
        date: "3 days ago",
        text: "The first Six Flags and still one of the best! Texas Giant is awesome. Mr. Freeze backwards launch is wild!",
        helpful: 156
      },
      {
        id: "sfot2",
        author: "Nicole Brown",
        authorInitials: "NB",
        rating: 4,
        date: "1 week ago",
        text: "Great park with good variety! Titan is a fantastic hypercoaster. Love the Texas theming throughout the park!",
        helpful: 121
      }
    ]
  },
  {
    id: "six-flags-fiesta-texas",
    name: "Six Flags Fiesta Texas",
    location: "San Antonio, TX",
    description: "Built in a quarry with stunning rock walls! Features 12 thrilling coasters including Iron Rattler and Wonder Woman Golden Lasso Coaster.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/SFFT-Entrance.jpg",
    rating: 4.5,
    categoryRatings: {
      food: 4.3,
      rides: 4.7,
      parking: 4.4,
      cleanliness: 4.4,
      staff: 4.5,
      value: 4.4
    },
    reviewCount: 8234,
    priceRange: "$",
    categories: ["Six Flags", "Quarry Park", "Scenic"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Quarry Setting", "Iron Rattler", "Flash Pass", "Water Park Included", "Fright Fest"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(210) 697-5050",
    website: "sixflags.com/fiestatexas",
    reviews: [
      {
        id: "sfft1",
        author: "Carlos Rivera",
        authorInitials: "CR",
        rating: 5,
        date: "2 days ago",
        text: "Unique setting carved into a quarry! Iron Rattler is incredible - hybrid coasters are the best. Wonder Woman coaster is smooth!",
        helpful: 178
      },
      {
        id: "sfft2",
        author: "Diana Lopez",
        authorInitials: "DL",
        rating: 4,
        date: "1 week ago",
        text: "Beautiful park with great rides! The rock walls make it special. Good food options and the water park is a nice addition!",
        helpful: 134
      }
    ]
  },
  {
    id: "kennywood",
    name: "Kennywood",
    location: "West Mifflin, PA",
    description: "Historic Pittsburgh amusement park since 1898! Classic rides mixed with modern thrills including Phantom's Revenge and Steel Curtain.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Kennywood_Entrance_-_panoramio.jpg",
    rating: 4.5,
    categoryRatings: {
      food: 4.4,
      rides: 4.6,
      parking: 4.3,
      cleanliness: 4.4,
      staff: 4.5,
      value: 4.6
    },
    reviewCount: 7123,
    priceRange: "$",
    categories: ["Regional Theme Park", "Historic", "Classic"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Historic Rides", "Phantom's Revenge", "Steel Curtain", "Potato Patch Fries", "Classic Wooden Coasters"],
    hours: "11:00 AM - 10:00 PM",
    phone: "(412) 461-0500",
    website: "kennywood.com",
    reviews: [
      {
        id: "kw1",
        author: "Patricia Green",
        authorInitials: "PG",
        rating: 5,
        date: "3 days ago",
        text: "Love this historic park! Phantom's Revenge is an amazing coaster. The Potato Patch fries are legendary. Great nostalgia!",
        helpful: 167
      },
      {
        id: "kw2",
        author: "Mark Wilson",
        authorInitials: "MW",
        rating: 4,
        date: "1 week ago",
        text: "Classic park with charm! Steel Curtain is intense. Mix of old and new rides works perfectly. Very affordable too!",
        helpful: 134
      }
    ]
  },
  {
    id: "kings-dominion",
    name: "Kings Dominion",
    location: "Doswell, VA",
    description: "Virginia's premier theme park! Features 13 thrilling coasters including Intimidator 305, one of the most intense giga coasters in the world.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Front_Entrance_to_Parking_Kings_Dominion.jpg",
    rating: 4.5,
    categoryRatings: {
      food: 4.2,
      rides: 4.7,
      parking: 4.4,
      cleanliness: 4.4,
      staff: 4.3,
      value: 4.6
    },
    reviewCount: 8456,
    priceRange: "$",
    categories: ["Six Flags", "Giga Coaster", "Water Park"],
    audienceType: "All Ages",
    parkType: "Mixed",
    features: ["13 Coasters", "Intimidator 305", "Soak City", "Fast Lane", "Planet Snoopy"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(804) 876-5000",
    website: "kingsdominion.com",
    reviews: [
      {
        id: "kd1",
        author: "Steven Carter",
        authorInitials: "SC",
        rating: 5,
        date: "2 days ago",
        text: "Intimidator 305 is absolutely insane! Twisted Timbers is a fantastic RMC. Great coaster lineup for the East Coast!",
        helpful: 189
      },
      {
        id: "kd2",
        author: "Laura Mitchell",
        authorInitials: "LM",
        rating: 4,
        date: "1 week ago",
        text: "Solid park with good rides! Soak City water park is included which is great. Volcano replacement is needed but still fun!",
        helpful: 145
      }
    ]
  },
  {
    id: "holiday-world",
    name: "Holiday World & Splashin' Safari",
    location: "Santa Claus, IN",
    description: "Free drinks and sunscreen! Family-owned park featuring The Voyage wooden coaster and one of America's best water parks.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Zinga.jpg",
    rating: 4.7,
    categoryRatings: {
      food: 4.6,
      rides: 4.7,
      parking: 4.8,
      cleanliness: 4.9,
      staff: 5.0,
      value: 4.9
    },
    reviewCount: 9234,
    priceRange: "$",
    categories: ["Regional Park", "Family-Owned", "Best Value"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["Free Soft Drinks", "Free Sunscreen", "The Voyage", "Thunderbird", "World-Class Water Park"],
    hours: "10:00 AM - 9:00 PM",
    phone: "(812) 937-4401",
    website: "holidayworld.com",
    reviews: [
      {
        id: "hw1",
        author: "Jennifer Smith",
        authorInitials: "JS",
        rating: 5,
        date: "1 day ago",
        text: "Best value in the industry! Free drinks and sunscreen is amazing. The Voyage is a top 5 wooden coaster. Staff is incredibly friendly!",
        helpful: 234
      },
      {
        id: "hw2",
        author: "Robert Johnson",
        authorInitials: "RJ",
        rating: 5,
        date: "1 week ago",
        text: "Family-owned and it shows! Everyone is so nice. Splashin' Safari is one of the best water parks. Highly recommend!",
        helpful: 198
      }
    ]
  },
  {
    id: "lagoon",
    name: "Lagoon",
    location: "Farmington, UT",
    description: "Utah's premier amusement park! Family-owned since 1886, featuring 9 coasters including Cannibal and the classic wooden Roller Coaster.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Lagoon_Roller_Coaster_winter.jpeg",
    rating: 4.6,
    categoryRatings: {
      food: 4.4,
      rides: 4.7,
      parking: 4.5,
      cleanliness: 4.6,
      staff: 4.6,
      value: 4.7
    },
    reviewCount: 7890,
    priceRange: "$",
    categories: ["Regional Park", "Historic", "Family-Owned"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["9 Coasters", "Cannibal", "Pioneer Village", "Lagoon-A-Beach", "Free Parking"],
    hours: "11:00 AM - 11:00 PM",
    phone: "(801) 451-8000",
    website: "lagoonpark.com",
    reviews: [
      {
        id: "lag1",
        author: "Ryan Peterson",
        authorInitials: "RP",
        rating: 5,
        date: "2 days ago",
        text: "Utah's hidden gem! Cannibal is an incredible coaster. Great variety of rides and the vintage wooden coaster is a classic!",
        helpful: 178
      },
      {
        id: "lag2",
        author: "Michelle Anderson",
        authorInitials: "MA",
        rating: 4,
        date: "1 week ago",
        text: "Love this park! Great value with free parking. Mix of modern and classic rides. Perfect for families!",
        helpful: 145
      }
    ]
  },
  {
    id: "la-ronde",
    name: "La Ronde",
    location: "Montreal, Quebec",
    description: "Montreal's iconic amusement park on an island! Features 10 coasters and stunning views of the city skyline.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/La_Ronde_-_Man%C3%A8ges.JPG",
    rating: 4.3,
    categoryRatings: {
      food: 4.2,
      rides: 4.4,
      parking: 4.0,
      cleanliness: 4.2,
      staff: 4.3,
      value: 4.4
    },
    reviewCount: 6543,
    priceRange: "$",
    categories: ["Six Flags", "Island Park", "Canadian"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Island Location", "City Views", "Fireworks", "Flash Pass", "10 Coasters"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(514) 397-2000",
    website: "laronde.com",
    reviews: [
      {
        id: "lr1",
        author: "Marc Dubois",
        authorInitials: "MD",
        rating: 4,
        date: "3 days ago",
        text: "Great park with beautiful island setting! Goliath is a solid B&M. Love the fireworks shows over the water!",
        helpful: 134
      },
      {
        id: "lr2",
        author: "Sophie Martin",
        authorInitials: "SM",
        rating: 4,
        date: "2 weeks ago",
        text: "Fun park with good variety! The location on the island is unique. Food options could be better but overall enjoyable!",
        helpful: 98
      }
    ]
  },
  {
    id: "six-flags-mexico",
    name: "Six Flags México",
    location: "Mexico City, Mexico",
    description: "Latin America's premier theme park! Features 11 world-class coasters and stunning views of Mexico City from the mountainside location.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Six_Flags_Mexico_entrance.jpg",
    rating: 4.4,
    categoryRatings: {
      food: 4.5,
      rides: 4.5,
      parking: 4.2,
      cleanliness: 4.3,
      staff: 4.4,
      value: 4.6
    },
    reviewCount: 8901,
    priceRange: "$",
    categories: ["Six Flags", "Mountain Park", "Latin America"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["11 Coasters", "Superman", "Mountain Views", "Flash Pass", "DC Comics Zone"],
    hours: "10:00 AM - 8:00 PM",
    phone: "+52-55-5339-3800",
    website: "sixflags.com.mx",
    reviews: [
      {
        id: "sfmx1",
        author: "Ricardo Hernandez",
        authorInitials: "RH",
        rating: 5,
        date: "1 week ago",
        text: "Best park in Mexico! Superman coaster is intense. The mountain setting makes it unique. Great food options!",
        helpful: 167
      },
      {
        id: "sfmx2",
        author: "Maria Gonzalez",
        authorInitials: "MG",
        rating: 4,
        date: "2 weeks ago",
        text: "Really fun park! Medusa is a great steel coaster. Beautiful views of the city. Good value for money!",
        helpful: 123
      }
    ]
  },
  {
    id: "xcaret-park",
    name: "Xcaret Park",
    location: "Riviera Maya, Mexico",
    description: "Nature and culture eco-park! Experience underground rivers, Mexican culture, wildlife, and spectacular shows in this unique Cancun attraction.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Xcaret_Letras.jpg",
    rating: 4.7,
    categoryRatings: {
      food: 4.8,
      rides: 4.3,
      parking: 4.5,
      cleanliness: 4.9,
      staff: 4.9,
      value: 4.4
    },
    reviewCount: 12345,
    priceRange: "$$",
    categories: ["Eco-Park", "Cultural", "Nature"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["Underground Rivers", "Mexican Culture Show", "Wildlife", "Snorkeling", "All-Inclusive Options"],
    hours: "8:30 AM - 10:30 PM",
    phone: "+52-998-883-3143",
    website: "xcaret.com",
    reviews: [
      {
        id: "xc1",
        author: "Amanda Foster",
        authorInitials: "AF",
        rating: 5,
        date: "1 day ago",
        text: "Absolutely amazing! The underground rivers are beautiful. The evening show celebrating Mexican culture is breathtaking. Must-do in Cancun!",
        helpful: 289
      },
      {
        id: "xc2",
        author: "David Thompson",
        authorInitials: "DT",
        rating: 5,
        date: "1 week ago",
        text: "Best eco-park experience! So much to do - snorkeling, cultural activities, wildlife. The food is excellent. All-inclusive is worth it!",
        helpful: 234
      }
    ]
  },
  {
    id: "gilroy-gardens",
    name: "Gilroy Gardens",
    location: "Gilroy, CA",
    description: "Unique horticul-themed park! Features circus trees, beautiful gardens, and 6 family-friendly rides in California's Garlic Capital.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Circus_Tree_at_Gilroy_Gardens.jpg",
    rating: 4.1,
    categoryRatings: {
      food: 4.3,
      rides: 3.9,
      parking: 4.4,
      cleanliness: 4.5,
      staff: 4.6,
      value: 4.3
    },
    reviewCount: 3456,
    priceRange: "$",
    categories: ["Family Park", "Gardens", "Educational"],
    audienceType: "Kids",
    parkType: "Dry Park",
    features: ["Circus Trees", "Gardens", "Water Play Area", "Garlic Theme", "Educational Programs"],
    hours: "10:00 AM - 6:00 PM",
    phone: "(408) 840-7100",
    website: "gilroygardens.org",
    reviews: [
      {
        id: "gg1",
        author: "Maria Santos",
        authorInitials: "MS",
        rating: 4,
        date: "1 week ago",
        text: "Perfect for young kids! The circus trees are fascinating. Beautiful gardens and gentle rides. Great educational value!",
        helpful: 87
      },
      {
        id: "gg2",
        author: "John Davis",
        authorInitials: "JD",
        rating: 4,
        date: "2 weeks ago",
        text: "Unique park combining nature and fun! Kids loved the water play area. Very affordable compared to other Bay Area parks!",
        helpful: 65
      }
    ]
  },
  {
    id: "legoland-florida",
    name: "Legoland Florida",
    location: "Winter Haven, FL",
    description: "Florida's LEGO paradise! Built on the former site of Cypress Gardens, featuring 4 coasters and amazing LEGO displays.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Legoland_Florida_sign.jpg",
    rating: 4.3,
    categoryRatings: {
      food: 4.2,
      rides: 4.2,
      parking: 4.4,
      cleanliness: 4.5,
      staff: 4.6,
      value: 4.1
    },
    reviewCount: 8234,
    priceRange: "$$",
    categories: ["Legoland", "Kids", "Water Park"],
    audienceType: "Kids",
    parkType: "Mixed",
    features: ["LEGO World", "Miniland", "Water Park", "Peppa Pig Theme Park", "Build & Test"],
    hours: "10:00 AM - 6:00 PM",
    phone: "(877) 350-5346",
    website: "legoland.com/florida",
    reviews: [
      {
        id: "llf1",
        author: "Karen Mitchell",
        authorInitials: "KM",
        rating: 5,
        date: "3 days ago",
        text: "Perfect for kids 2-12! The LEGO displays are incredible. Miniland USA is amazing. My kids didn't want to leave!",
        helpful: 178
      },
      {
        id: "llf2",
        author: "Steven Brown",
        authorInitials: "SB",
        rating: 4,
        date: "1 week ago",
        text: "Great family park! Less crowded than Disney. The water park is a nice addition. Good value for LEGO fans!",
        helpful: 134
      }
    ]
  },
  {
    id: "fun-spot-orlando",
    name: "Fun Spot America Orlando",
    location: "Orlando, FL",
    description: "Central Florida's go-kart and coaster park! Features 6 coasters including White Lightning wooden coaster and multi-level go-kart tracks.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fun_Spot_America_Orlando_Entrance.jpg",
    rating: 4.2,
    categoryRatings: {
      food: 3.9,
      rides: 4.3,
      parking: 4.5,
      cleanliness: 4.1,
      staff: 4.2,
      value: 4.6
    },
    reviewCount: 4567,
    priceRange: "$",
    categories: ["Regional Park", "Go-Karts", "Pay-Per-Ride"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Free Admission", "Go-Karts", "White Lightning", "SkyCoaster", "Pay-Per-Ride"],
    hours: "12:00 PM - 12:00 AM",
    phone: "(407) 363-3867",
    website: "fun-spot.com/orlando",
    reviews: [
      {
        id: "fso1",
        author: "James Wilson",
        authorInitials: "JW",
        rating: 4,
        date: "5 days ago",
        text: "Great value! Free admission and pay-per-ride is nice. Go-karts are awesome. White Lightning is a fun GCI wooden coaster!",
        helpful: 123
      },
      {
        id: "fso2",
        author: "Lisa Chen",
        authorInitials: "LC",
        rating: 4,
        date: "2 weeks ago",
        text: "Perfect for an evening out! The multi-level go-karts are unique. Good alternative to the big parks!",
        helpful: 89
      }
    ]
  },
  {
    id: "knoebels",
    name: "Knoebels Amusement Resort",
    location: "Elysburg, PA",
    description: "America's largest free-admission amusement park! Family-owned gem featuring Phoenix, one of the world's best wooden coasters.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Knoebels_Amusement_Resort_entrance.jpg",
    rating: 4.8,
    categoryRatings: {
      food: 4.8,
      rides: 4.8,
      parking: 5.0,
      cleanliness: 4.7,
      staff: 4.9,
      value: 5.0
    },
    reviewCount: 9876,
    priceRange: "$",
    categories: ["Family Park", "Free Admission", "Classic"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Free Admission", "Free Parking", "Phoenix Coaster", "Pay-Per-Ride", "Campground"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(570) 672-2572",
    website: "knoebels.com",
    reviews: [
      {
        id: "kn1",
        author: "Patricia Miller",
        authorInitials: "PM",
        rating: 5,
        date: "1 day ago",
        text: "Best value in America! Free admission and parking. Phoenix is an incredible wooden coaster. The food is amazing and affordable!",
        helpful: 289
      },
      {
        id: "kn2",
        author: "Michael Anderson",
        authorInitials: "MA",
        rating: 5,
        date: "1 week ago",
        text: "Family-owned perfection! Classic rides, fair prices, and the friendliest staff. This is what amusement parks should be!",
        helpful: 234
      }
    ]
  },
  {
    id: "six-flags-new-england",
    name: "Six Flags New England",
    location: "Agawam, MA",
    description: "New England's thrill capital! Features 10 coasters including the legendary Superman: The Ride and Wicked Cyclone RMC.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Six_Flags_New_England_entrance.jpg",
    rating: 4.4,
    categoryRatings: {
      food: 4.1,
      rides: 4.7,
      parking: 4.2,
      cleanliness: 4.2,
      staff: 4.3,
      value: 4.5
    },
    reviewCount: 7234,
    priceRange: "$",
    categories: ["Six Flags", "New England", "Water Park"],
    audienceType: "All Ages",
    parkType: "Mixed",
    features: ["Superman Coaster", "Wicked Cyclone", "Hurricane Harbor", "Flash Pass", "Fright Fest"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(413) 786-9300",
    website: "sixflags.com/newengland",
    reviews: [
      {
        id: "sfne1",
        author: "Ryan Murphy",
        authorInitials: "RM",
        rating: 5,
        date: "2 days ago",
        text: "Superman is one of the best steel coasters ever! Wicked Cyclone is an amazing RMC. Great coaster lineup for the Northeast!",
        helpful: 198
      },
      {
        id: "sfne2",
        author: "Jennifer Lopez",
        authorInitials: "JL",
        rating: 4,
        date: "1 week ago",
        text: "Solid park with good rides! The water park is nice in summer. Park could use some updates but the coasters are great!",
        helpful: 145
      }
    ]
  },
  {
    id: "valleyfair",
    name: "Valleyfair",
    location: "Shakopee, MN",
    description: "Minnesota's largest amusement park! Features 8 coasters and Soak City water park in the Twin Cities area.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Valleyfair,_Shakopee,_Minnesota_(52358528378).jpg",
    rating: 4.3,
    categoryRatings: {
      food: 4.1,
      rides: 4.4,
      parking: 4.3,
      cleanliness: 4.3,
      staff: 4.3,
      value: 4.5
    },
    reviewCount: 6123,
    priceRange: "$",
    categories: ["Six Flags", "Midwest", "Water Park"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["8 Coasters", "Soak City", "Fast Lane", "Planet Snoopy", "Halloween Haunt"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(952) 445-7600",
    website: "valleyfair.com",
    reviews: [
      {
        id: "vf1",
        author: "Scott Anderson",
        authorInitials: "SA",
        rating: 4,
        date: "4 days ago",
        text: "Great park for the Midwest! Renegade is a fantastic GCI wooden coaster. Good water park included. Nice family atmosphere!",
        helpful: 134
      },
      {
        id: "vf2",
        author: "Amy Johnson",
        authorInitials: "AJ",
        rating: 4,
        date: "2 weeks ago",
        text: "Solid regional park! Wild Thing is a fun hypercoaster. Clean park with good value. Perfect for Minnesota summers!",
        helpful: 98
      }
    ]
  },
  {
    id: "michigans-adventure",
    name: "Michigan's Adventure",
    location: "Muskegon, MI",
    description: "Michigan's largest amusement park! Featuring 6 coasters and a massive water park on the shores of Lake Michigan.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Michigan's_Adventure_panorama_(3651164785).jpg",
    rating: 4.2,
    categoryRatings: {
      food: 3.9,
      rides: 4.2,
      parking: 4.4,
      cleanliness: 4.1,
      staff: 4.2,
      value: 4.6
    },
    reviewCount: 5234,
    priceRange: "$",
    categories: ["Six Flags", "Water Park", "Beach"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["WildWater Adventure", "Shivering Timbers", "Beach Access", "Fast Lane", "Free Parking"],
    hours: "11:00 AM - 8:00 PM",
    phone: "(231) 766-3377",
    website: "miadventure.com",
    reviews: [
      {
        id: "ma1",
        author: "Brian Taylor",
        authorInitials: "BT",
        rating: 4,
        date: "1 week ago",
        text: "Great value! Shivering Timbers is a fantastic wooden coaster. The water park is huge. Perfect for Michigan families!",
        helpful: 112
      },
      {
        id: "ma2",
        author: "Melissa White",
        authorInitials: "MW",
        rating: 4,
        date: "2 weeks ago",
        text: "Fun park with good rides for the price! Lake Michigan nearby is a bonus. Good day trip destination!",
        helpful: 87
      }
    ]
  },
  {
    id: "six-flags-st-louis",
    name: "Six Flags St. Louis",
    location: "Eureka, MO",
    description: "St. Louis's thrill destination! Features 10 coasters including the American Thunder wooden coaster and Batman: The Ride.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Six_Flags_St_Louis_entrance.jpg",
    rating: 4.3,
    categoryRatings: {
      food: 4.0,
      rides: 4.5,
      parking: 4.2,
      cleanliness: 4.2,
      staff: 4.3,
      value: 4.5
    },
    reviewCount: 6789,
    priceRange: "$",
    categories: ["Six Flags", "Midwest", "Regional"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["10 Coasters", "Flash Pass", "Hurricane Harbor", "DC Universe", "Holiday in the Park"],
    hours: "10:00 AM - 9:00 PM",
    phone: "(636) 938-4800",
    website: "sixflags.com/stlouis",
    reviews: [
      {
        id: "sfstl1",
        author: "Thomas Wright",
        authorInitials: "TW",
        rating: 4,
        date: "5 days ago",
        text: "Good Six Flags park! American Thunder is a great GCI. Mr. Freeze is unique with the backwards launch. Solid coaster lineup!",
        helpful: 134
      },
      {
        id: "sfstl2",
        author: "Rebecca Scott",
        authorInitials: "RS",
        rating: 4,
        date: "2 weeks ago",
        text: "Fun park for the Midwest! Batman is smooth. Hurricane Harbor water park is nice in summer. Good value!",
        helpful: 98
      }
    ]
  },
  {
    id: "worlds-of-fun",
    name: "Worlds of Fun",
    location: "Kansas City, MO",
    description: "Kansas City's premier theme park! Features 7 coasters and Oceans of Fun water park with an around-the-world theme.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Timber_Wolf_Worlds_Of_Fun.jpg",
    rating: 4.3,
    categoryRatings: {
      food: 4.1,
      rides: 4.4,
      parking: 4.3,
      cleanliness: 4.2,
      staff: 4.3,
      value: 4.5
    },
    reviewCount: 6234,
    priceRange: "$",
    categories: ["Six Flags", "International Theme", "Water Park"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["7 Coasters", "Oceans of Fun", "Fast Lane", "Around World Theme", "Planet Snoopy"],
    hours: "10:00 AM - 9:00 PM",
    phone: "(816) 454-4545",
    website: "worldsoffun.com",
    reviews: [
      {
        id: "wof1",
        author: "Kevin Martinez",
        authorInitials: "KM",
        rating: 4,
        date: "1 week ago",
        text: "Great KC park! Prowler is an excellent GCI wooden coaster. The international theming is unique. Good water park!",
        helpful: 123
      },
      {
        id: "wof2",
        author: "Laura Thompson",
        authorInitials: "LT",
        rating: 4,
        date: "2 weeks ago",
        text: "Fun park for families! Mamba is a solid hypercoaster. Clean park with good variety. Kansas City's best!",
        helpful: 96
      }
    ]
  },
  {
    id: "seaworld-san-antonio",
    name: "SeaWorld San Antonio",
    location: "San Antonio, TX",
    description: "Texas's premier marine life park! Features incredible animal shows, thrilling coasters, and one of the world's largest marine life parks.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/SeaWorld-SanAntonio-2826.jpg",
    rating: 4.4,
    categoryRatings: {
      food: 4.3,
      rides: 4.5,
      parking: 4.3,
      cleanliness: 4.6,
      staff: 4.6,
      value: 4.3
    },
    reviewCount: 9123,
    priceRange: "$$",
    categories: ["SeaWorld", "Marine Life", "Texas"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Great White Coaster", "Animal Shows", "Aquatica Water Park", "Quick Queue", "Dolphins"],
    hours: "9:00 AM - 9:00 PM",
    phone: "(210) 520-4732",
    website: "seaworldsanantonio.com",
    reviews: [
      {
        id: "swsa1",
        author: "Carlos Ramirez",
        authorInitials: "CR",
        rating: 5,
        date: "3 days ago",
        text: "Fantastic park! The dolphin show is amazing. Great White and Steel Eel are fun coasters. Beautiful animal exhibits!",
        helpful: 178
      },
      {
        id: "swsa2",
        author: "Angela Davis",
        authorInitials: "AD",
        rating: 4,
        date: "1 week ago",
        text: "Great combination of animals and rides! The orca show is incredible. Kids loved Aquatica water park!",
        helpful: 134
      }
    ]
  },
  {
    id: "dollys-splash-country",
    name: "Dolly's Splash Country",
    location: "Pigeon Forge, TN",
    description: "Dolly Parton's water park! 35 acres of water fun in the Smoky Mountains with slides, wave pools, and Southern hospitality.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dollywood%27s_Splash_Country_entrance.jpg",
    rating: 4.5,
    categoryRatings: {
      food: 4.4,
      rides: 4.5,
      parking: 4.6,
      cleanliness: 4.7,
      staff: 4.9,
      value: 4.6
    },
    reviewCount: 7890,
    priceRange: "$",
    categories: ["Water Park", "Family-Friendly", "Smoky Mountains"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["35 Acres", "Wave Pools", "Lazy River", "Kids Areas", "TimeSaver Pass"],
    hours: "10:00 AM - 7:00 PM (Seasonal)",
    phone: "(865) 428-9488",
    website: "dollysplashcountry.com",
    reviews: [
      {
        id: "dsc1",
        author: "Kimberly Johnson",
        authorInitials: "KJ",
        rating: 5,
        date: "1 week ago",
        text: "Perfect water park! Clean, well-maintained, and staff is incredible. The mountain setting is beautiful. Great for families!",
        helpful: 167
      },
      {
        id: "dsc2",
        author: "Mark Davis",
        authorInitials: "MD",
        rating: 4,
        date: "2 weeks ago",
        text: "Great addition to Dollywood trip! Lots of slides and activities. Wave pool is fun. Good value combo tickets!",
        helpful: 123
      }
    ]
  },
  {
    id: "six-flags-darien-lake",
    name: "Six Flags Darien Lake",
    location: "Darien, NY",
    description: "Upstate New York's premier park! Features 7 coasters, water park, and on-site camping between Buffalo and Rochester.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tantrum_(roller_coaster).jpg",
    rating: 4.2,
    categoryRatings: {
      food: 4.0,
      rides: 4.3,
      parking: 4.3,
      cleanliness: 4.1,
      staff: 4.2,
      value: 4.5
    },
    reviewCount: 5678,
    priceRange: "$",
    categories: ["Six Flags", "Camping", "Water Park"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["7 Coasters", "Campground", "Water Park", "Flash Pass", "Concert Venue"],
    hours: "11:00 AM - 10:00 PM",
    phone: "(585) 599-4641",
    website: "sixflags.com/darienlake",
    reviews: [
      {
        id: "sfdl1",
        author: "Jason Miller",
        authorInitials: "JM",
        rating: 4,
        date: "1 week ago",
        text: "Good regional park! Ride of Steel is a fantastic Intamin hypercoaster. The camping option is unique and fun!",
        helpful: 112
      },
      {
        id: "sfdl2",
        author: "Stephanie Brown",
        authorInitials: "SB",
        rating: 4,
        date: "2 weeks ago",
        text: "Fun park for upstate NY! Water park is nice. Good value and the concert venue is a bonus!",
        helpful: 87
      }
    ]
  },
  {
    id: "legoland-new-york",
    name: "Legoland New York",
    location: "Goshen, NY",
    description: "The newest LEGOLAND! Opened in 2021, featuring 7 themed lands and state-of-the-art LEGO attractions in the Hudson Valley.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Legoland_New_York_entrance.jpg",
    rating: 4.4,
    categoryRatings: {
      food: 4.3,
      rides: 4.4,
      parking: 4.5,
      cleanliness: 4.7,
      staff: 4.6,
      value: 4.1
    },
    reviewCount: 5432,
    priceRange: "$$",
    categories: ["Legoland", "Kids", "Brand New"],
    audienceType: "Kids",
    parkType: "Dry Park",
    features: ["Brand New Park", "7 Lands", "LEGO Factory", "Miniland NYC", "Reserve N Ride"],
    hours: "10:00 AM - 6:00 PM",
    phone: "(888) 690-5346",
    website: "legoland.com/new-york",
    reviews: [
      {
        id: "llny1",
        author: "Rachel Cohen",
        authorInitials: "RC",
        rating: 5,
        date: "4 days ago",
        text: "Brand new and beautiful! Perfect for kids. The LEGO models are incredible. Miniland NYC is amazing!",
        helpful: 156
      },
      {
        id: "llny2",
        author: "David Kim",
        authorInitials: "DK",
        rating: 4,
        date: "2 weeks ago",
        text: "Great new park! Well designed and clean. A bit pricey but kids love it. Nice addition to the Hudson Valley!",
        helpful: 123
      }
    ]
  },
  {
    id: "kentucky-kingdom",
    name: "Kentucky Kingdom",
    location: "Louisville, KY",
    description: "Louisville's urban theme park! Features 7 coasters and Hurricane Bay water park, reopened and revitalized in 2014.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/T3_(Kentucky_Kingdom)_1.jpg",
    rating: 4.2,
    categoryRatings: {
      food: 4.0,
      rides: 4.3,
      parking: 4.4,
      cleanliness: 4.1,
      staff: 4.2,
      value: 4.6
    },
    reviewCount: 4567,
    priceRange: "$",
    categories: ["Six Flags", "Urban Park", "Water Park"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["Storm Chaser RMC", "Lightning Run", "Hurricane Bay", "Free Parking", "Good Value"],
    hours: "11:00 AM - 9:00 PM",
    phone: "(502) 813-8200",
    website: "kentuckykingdom.com",
    reviews: [
      {
        id: "kk1",
        author: "Andrew Wilson",
        authorInitials: "AW",
        rating: 4,
        date: "1 week ago",
        text: "Surprisingly good park! Storm Chaser is an amazing RMC. Great value with water park included. Louisville's best!",
        helpful: 98
      },
      {
        id: "kk2",
        author: "Michelle Carter",
        authorInitials: "MC",
        rating: 4,
        date: "2 weeks ago",
        text: "Fun park! Lightning Run is intense. The revitalization shows. Good affordable option!",
        helpful: 76
      }
    ]
  },
  {
    id: "dorney-park",
    name: "Dorney Park",
    location: "Allentown, PA",
    description: "Pennsylvania's outdoor summer fun destination! Features 8 coasters and Wildwater Kingdom water park near the Lehigh Valley.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dorney_Park_entrance_sign.jpg",
    rating: 4.3,
    categoryRatings: {
      food: 4.1,
      rides: 4.4,
      parking: 4.3,
      cleanliness: 4.3,
      staff: 4.3,
      value: 4.5
    },
    reviewCount: 6123,
    priceRange: "$",
    categories: ["Six Flags", "Water Park", "Regional"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["8 Coasters", "Wildwater Kingdom", "Fast Lane", "Planet Snoopy", "Halloween Haunt"],
    hours: "10:00 AM - 10:00 PM",
    phone: "(610) 395-3724",
    website: "dorneypark.com",
    reviews: [
      {
        id: "dp1",
        author: "Christopher Lee",
        authorInitials: "CL",
        rating: 4,
        date: "1 week ago",
        text: "Great park! Steel Force is a classic B&M hypercoaster. Wildwater Kingdom is a nice water park. Good for PA families!",
        helpful: 123
      },
      {
        id: "dp2",
        author: "Amanda Foster",
        authorInitials: "AF",
        rating: 4,
        date: "2 weeks ago",
        text: "Solid regional park! Clean and well-maintained. Talon is a fantastic inverted coaster. Good value!",
        helpful: 98
      }
    ]
  },
  {
    id: "sesame-place",
    name: "Sesame Place Philadelphia",
    location: "Langhorne, PA",
    description: "The only theme park in the US based on Sesame Street! Perfect for preschoolers with character meet-and-greets and gentle rides.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sesame_Place_(54062957549).jpg",
    rating: 4.2,
    categoryRatings: {
      food: 4.1,
      rides: 4.0,
      parking: 4.2,
      cleanliness: 4.5,
      staff: 4.6,
      value: 4.0
    },
    reviewCount: 7234,
    priceRange: "$$",
    categories: ["Sesame Place", "Preschool", "Characters"],
    audienceType: "Kids",
    parkType: "Mixed",
    features: ["Sesame Street Characters", "Water Park", "Shows", "Meet & Greets", "Gentle Rides"],
    hours: "10:00 AM - 8:00 PM",
    phone: "(215) 752-7070",
    website: "sesameplace.com/philadelphia",
    reviews: [
      {
        id: "sp1",
        author: "Jessica Thompson",
        authorInitials: "JT",
        rating: 5,
        date: "3 days ago",
        text: "Perfect for toddlers and preschoolers! My kids loved meeting Elmo and Cookie Monster. The water park is great for little ones!",
        helpful: 189
      },
      {
        id: "sp2",
        author: "Robert Garcia",
        authorInitials: "RG",
        rating: 4,
        date: "1 week ago",
        text: "Great park for young kids! Characters are everywhere and staff is wonderful. A bit pricey but the kids love it!",
        helpful: 134
      }
    ]
  },
  {
    id: "dutch-wonderland",
    name: "Dutch Wonderland",
    location: "Lancaster, PA",
    description: "A Kingdom for Kids in Pennsylvania Dutch Country! Family-friendly park with 3 coasters and attractions perfect for children.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dutch_Wonderland_Entrance.jpg",
    rating: 4.3,
    categoryRatings: {
      food: 4.2,
      rides: 4.1,
      parking: 4.5,
      cleanliness: 4.6,
      staff: 4.7,
      value: 4.3
    },
    reviewCount: 5432,
    priceRange: "$",
    categories: ["Family Park", "Kids", "Pennsylvania Dutch"],
    audienceType: "Kids",
    parkType: "Dry Park",
    features: ["Duke the Dragon", "Kids Coasters", "Shows", "Diving Shows", "Fast Track"],
    hours: "10:00 AM - 8:00 PM",
    phone: "(866) 386-2839",
    website: "dutchwonderland.com",
    reviews: [
      {
        id: "dw1",
        author: "Sarah Miller",
        authorInitials: "SM",
        rating: 5,
        date: "5 days ago",
        text: "Perfect park for young kids! Duke the Dragon character is beloved. Clean and safe. Great Lancaster County attraction!",
        helpful: 167
      },
      {
        id: "dw2",
        author: "John Wilson",
        authorInitials: "JW",
        rating: 4,
        date: "2 weeks ago",
        text: "Wonderful family park! Staff is incredibly friendly. Rides perfect for elementary age kids. Good value!",
        helpful: 123
      }
    ]
  },
  {
    id: "mt-olympus",
    name: "Mt. Olympus Water & Theme Park",
    location: "Wisconsin Dells, WI",
    description: "Wisconsin Dells' largest park! Unique combination of indoor and outdoor parks with 7 coasters and massive water attractions.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mt._Olympus_Theme_Park_entrance.jpg",
    rating: 4.1,
    categoryRatings: {
      food: 3.9,
      rides: 4.2,
      parking: 4.3,
      cleanliness: 3.9,
      staff: 4.0,
      value: 4.5
    },
    reviewCount: 5678,
    priceRange: "$",
    categories: ["Regional Park", "Indoor/Outdoor", "Water Park"],
    audienceType: "Families",
    parkType: "Mixed",
    features: ["Indoor & Outdoor", "7 Coasters", "Water Parks", "Hotel Packages", "Year-Round"],
    hours: "9:00 AM - 11:00 PM",
    phone: "(608) 254-2490",
    website: "mtolympuspark.com",
    reviews: [
      {
        id: "mo1",
        author: "Brian Anderson",
        authorInitials: "BA",
        rating: 4,
        date: "1 week ago",
        text: "Huge complex! Indoor and outdoor options are great. Hades 360 is a wild coaster. Good value with hotel packages!",
        helpful: 112
      },
      {
        id: "mo2",
        author: "Karen Peterson",
        authorInitials: "KP",
        rating: 4,
        date: "2 weeks ago",
        text: "Fun Wisconsin Dells destination! Lots to do. Park could use some updates but kids had a blast!",
        helpful: 87
      }
    ]
  },
  {
    id: "canobie-lake-park",
    name: "Canobie Lake Park",
    location: "Salem, NH",
    description: "Historic New England park since 1902! Features 5 coasters and classic rides on the shores of Canobie Lake.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Canobie_Lake_Park_-_panoramio.jpg",
    rating: 4.4,
    categoryRatings: {
      food: 4.3,
      rides: 4.4,
      parking: 4.5,
      cleanliness: 4.5,
      staff: 4.6,
      value: 4.5
    },
    reviewCount: 5234,
    priceRange: "$",
    categories: ["Regional Park", "Historic", "Lakefront"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Lakefront Setting", "Classic Rides", "Untamed Coaster", "Fireworks", "Good Food"],
    hours: "11:00 AM - 10:00 PM",
    phone: "(603) 893-3506",
    website: "canobie.com",
    reviews: [
      {
        id: "clp1",
        author: "Michael Sullivan",
        authorInitials: "MS",
        rating: 5,
        date: "4 days ago",
        text: "Classic New England park! Untamed is a great RMC raptor coaster. Beautiful lake setting. Clean and well-maintained!",
        helpful: 156
      },
      {
        id: "clp2",
        author: "Emily Davis",
        authorInitials: "ED",
        rating: 4,
        date: "2 weeks ago",
        text: "Charming park with history! Mix of classic and modern rides. Food is surprisingly good. Great for families!",
        helpful: 123
      }
    ]
  },
  {
    id: "playland-vancouver",
    name: "Playland Vancouver",
    location: "Vancouver, BC",
    description: "Vancouver's historic amusement park! Features 6 coasters including the classic Wooden Coaster from 1958.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Playland-entrance.jpg",
    rating: 4.2,
    categoryRatings: {
      food: 4.0,
      rides: 4.3,
      parking: 4.1,
      cleanliness: 4.2,
      staff: 4.3,
      value: 4.3
    },
    reviewCount: 5432,
    priceRange: "$",
    categories: ["Regional Park", "Historic", "Canadian"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Historic Wooden Coaster", "City Park", "Fair Events", "Classic Rides", "PNE Grounds"],
    hours: "11:00 AM - 10:00 PM (Seasonal)",
    phone: "(604) 253-2311",
    website: "pne.ca/playland",
    reviews: [
      {
        id: "pv1",
        author: "Alex Wong",
        authorInitials: "AW",
        rating: 4,
        date: "1 week ago",
        text: "Vancouver institution! The old wooden coaster is still thrilling. Great location near the city. Fun summer destination!",
        helpful: 123
      },
      {
        id: "pv2",
        author: "Sarah Thompson",
        authorInitials: "ST",
        rating: 4,
        date: "2 weeks ago",
        text: "Classic park with charm! Atmosfear drop tower is intense. Good for families. Fair food is great!",
        helpful: 98
      }
    ]
  },
  {
    id: "galaxyland",
    name: "Galaxyland",
    location: "Edmonton, Alberta",
    description: "World's largest indoor amusement park! Features 5 coasters including Mindbender, all indoors at West Edmonton Mall.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/WEM_Galaxyland_MindBender_Galaxy_Orbitter.JPG",
    rating: 4.3,
    categoryRatings: {
      food: 4.1,
      rides: 4.4,
      parking: 4.5,
      cleanliness: 4.4,
      staff: 4.3,
      value: 4.2
    },
    reviewCount: 6789,
    priceRange: "$",
    categories: ["Indoor Park", "Mall", "Year-Round"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Fully Indoor", "Mindbender Coaster", "West Ed Mall", "Year-Round Operation", "Climate Controlled"],
    hours: "10:00 AM - 9:00 PM",
    phone: "(780) 444-5321",
    website: "galaxyland.com",
    reviews: [
      {
        id: "gal1",
        author: "Tyler Brown",
        authorInitials: "TB",
        rating: 4,
        date: "1 week ago",
        text: "Amazing indoor park! Mindbender is surprisingly intense for being indoors. Perfect year-round attraction in Edmonton!",
        helpful: 145
      },
      {
        id: "gal2",
        author: "Jennifer Lee",
        authorInitials: "JL",
        rating: 4,
        date: "2 weeks ago",
        text: "Unique experience being fully indoors! Great escape from cold weather. The mall location is convenient!",
        helpful: 112
      }
    ]
  },
  {
    id: "calaway-park",
    name: "Calaway Park",
    location: "Calgary, Alberta",
    description: "Western Canada's largest outdoor family amusement park! Features 2 coasters and over 30 rides near the Rocky Mountains.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Calaway_Park.jpg",
    rating: 4.1,
    categoryRatings: {
      food: 4.0,
      rides: 4.1,
      parking: 4.4,
      cleanliness: 4.2,
      staff: 4.3,
      value: 4.2
    },
    reviewCount: 4321,
    priceRange: "$",
    categories: ["Regional Park", "Family-Friendly", "Western Canada"],
    audienceType: "Families",
    parkType: "Dry Park",
    features: ["Mountain Views", "Family Rides", "Live Shows", "Midway Games", "Picnic Areas"],
    hours: "10:00 AM - 7:00 PM (Seasonal)",
    phone: "(403) 240-3822",
    website: "calawaypark.com",
    reviews: [
      {
        id: "cp1",
        author: "Matthew Johnson",
        authorInitials: "MJ",
        rating: 4,
        date: "1 week ago",
        text: "Great family park! Perfect for kids. Beautiful mountain views. Good value for Calgary families!",
        helpful: 98
      },
      {
        id: "cp2",
        author: "Lisa Martin",
        authorInitials: "LM",
        rating: 4,
        date: "2 weeks ago",
        text: "Fun day out! Clean park with friendly staff. Rides perfect for younger kids. Nicely maintained!",
        helpful: 76
      }
    ]
  },
  {
    id: "fun-spot-kissimmee",
    name: "Fun Spot America Kissimmee",
    location: "Kissimmee, FL",
    description: "Orlando's second Fun Spot location! Features 4 coasters including Mine Blower wooden coaster and unique SkyCoaster.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fun_Spot_America_Kissimmee_entrance.jpg",
    rating: 4.2,
    categoryRatings: {
      food: 3.9,
      rides: 4.3,
      parking: 4.5,
      cleanliness: 4.1,
      staff: 4.2,
      value: 4.6
    },
    reviewCount: 3987,
    priceRange: "$",
    categories: ["Regional Park", "Go-Karts", "Pay-Per-Ride"],
    audienceType: "All Ages",
    parkType: "Dry Park",
    features: ["Free Admission", "Mine Blower Coaster", "Go-Karts", "SkyCoaster", "Pay-Per-Ride"],
    hours: "2:00 PM - 12:00 AM",
    phone: "(407) 870-2222",
    website: "fun-spot.com/kissimmee",
    reviews: [
      {
        id: "fsk1",
        author: "Daniel Clark",
        authorInitials: "DC",
        rating: 4,
        date: "1 week ago",
        text: "Mine Blower is a fantastic Gravity Group coaster! Free admission is great. Fun alternative to the big parks!",
        helpful: 112
      },
      {
        id: "fsk2",
        author: "Monica Rivera",
        authorInitials: "MR",
        rating: 4,
        date: "2 weeks ago",
        text: "Great value! Go-karts are fun and Mine Blower has great inversions. Perfect for an evening out!",
        helpful: 87
      }
    ]
  },
  {
    id: "typhoon-lagoon",
    name: "Disney's Typhoon Lagoon",
    location: "Lake Buena Vista, FL",
    description: "Immersive tropical storm-themed water park with the iconic Miss Tilly ship atop Mount Mayday and Florida's best surf wave pool.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Disney%27s_Typhoon_Lagoon_%2828923104866%29.jpg",
    rating: 4.5,
    categoryRatings: { food: 4.2, rides: 4.6, parking: 4.3, cleanliness: 4.7, staff: 4.7, value: 4.3 },
    reviewCount: 1898,
    priceRange: "$$",
    categories: ["Disney", "Water Park", "Tropical"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["Surf Wave Pool", "Lazy River", "Crush 'n' Gusher", "Family Rafts", "Cabanas"],
    hours: "10:00 AM - 7:00 PM",
    phone: "(407) 939-5277",
    website: "disneyworld.disney.go.com/destinations/typhoon-lagoon",
    reviews: [
      { id: "tl1", author: "Megan Lee", authorInitials: "ML", rating: 5, date: "3 days ago", text: "Wave pool is unbeatable and theming is gorgeous. Grab a cabana if you can; makes the day super relaxing.", helpful: 76 },
      { id: "tl2", author: "Brian Carter", authorInitials: "BC", rating: 4, date: "1 week ago", text: "Clean, well-staffed, and perfect for families. Arrive early for shade and seats near the wave pool.", helpful: 58 }
    ]
  },
  {
    id: "volcano-bay",
    name: "Universal Volcano Bay",
    location: "Orlando, FL",
    description: "Polynesian volcanic paradise anchored by Krakatau with TapuTapu virtual queues, coasters, and serene rivers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Volcano_Bay_%2836829605694%29.jpg",
    rating: 4.7,
    categoryRatings: { food: 4.4, rides: 4.8, parking: 4.4, cleanliness: 4.8, staff: 4.8, value: 4.5 },
    reviewCount: 1800,
    priceRange: "$$",
    categories: ["Universal", "Water Park", "Polynesian"],
    audienceType: "All Ages",
    parkType: "Water Park",
    features: ["Krakatau Aqua Coaster", "TapuTapu Virtual Line", "Lazy Rivers", "Wave Pools", "Kids Zones"],
    hours: "9:00 AM - 8:00 PM",
    phone: "(407) 363-8000",
    website: "universalorlando.com/volcano-bay",
    reviews: [
      { id: "vb1", author: "Ashley Moore", authorInitials: "AM", rating: 5, date: "2 days ago", text: "TapuTapu makes the day stress-free. Krakatau is amazing and the night lighting is gorgeous.", helpful: 81 },
      { id: "vb2", author: "Jordan Smith", authorInitials: "JS", rating: 4, date: "1 week ago", text: "Beautiful theming and plenty for kids and thrill seekers. Food is decent, cabanas are pricey but nice.", helpful: 64 }
    ]
  },
  {
    id: "aquatica-orlando",
    name: "Aquatica Orlando",
    location: "Orlando, FL",
    description: "Bright, tropical SeaWorld water park with high-thrill slides, Roa's Rapids, dolphin view slides, and great family areas.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Aquaticaentrance.jpg",
    rating: 4.1,
    categoryRatings: { food: 3.9, rides: 4.3, parking: 4.2, cleanliness: 4.3, staff: 4.3, value: 4.2 },
    reviewCount: 1437,
    priceRange: "$",
    categories: ["SeaWorld", "Water Park", "Tropical"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["Breakaway Falls", "Roa's Rapids", "Wave Pools", "Family Slides", "Cabanas"],
    hours: "10:00 AM - 7:00 PM",
    phone: "(407) 545-5550",
    website: "aquatica.com/orlando",
    reviews: [
      { id: "aqo1", author: "Emily Davis", authorInitials: "ED", rating: 4, date: "3 days ago", text: "Breakaway Falls is intense! Plenty of shade but grab chairs early. Great mix for kids and adults.", helpful: 59 },
      { id: "aqo2", author: "Carlos Perez", authorInitials: "CP", rating: 4, date: "1 week ago", text: "Clean and well-run. Roa's Rapids is a blast. Food is okay, lockers are convenient.", helpful: 41 }
    ]
  },
  {
    id: "schlitterbahn-new-braunfels",
    name: "Schlitterbahn New Braunfels",
    location: "New Braunfels, TX",
    description: "Classic Texas river resort water park spanning old and new sections with signature tube chutes and Master Blaster.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Schlitterbahn_%284784996890%29.jpg",
    rating: 4.0,
    categoryRatings: { food: 3.8, rides: 4.4, parking: 4.0, cleanliness: 4.1, staff: 4.2, value: 4.2 },
    reviewCount: 933,
    priceRange: "$",
    categories: ["Schlitterbahn", "Water Park", "Resort"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["Master Blaster", "Tube Chutes", "Lazy River", "Swim-Up Bars", "Resort Access"],
    hours: "10:00 AM - 8:00 PM",
    phone: "(830) 625-2351",
    website: "schlitterbahn.com/new-braunfels",
    reviews: [
      { id: "snb1", author: "Laura Hernandez", authorInitials: "LH", rating: 4, date: "4 days ago", text: "Huge park split into sections—plan your day. Master Blaster worth the wait. Great for overnights.", helpful: 52 },
      { id: "snb2", author: "Mark Evans", authorInitials: "ME", rating: 4, date: "1 week ago", text: "Old and new areas both fun. Shuttles help but can be confusing at first. Bring water shoes.", helpful: 37 }
    ]
  },
  {
    id: "water-country-usa",
    name: "Water Country USA",
    location: "Williamsburg, VA",
    description: "Tropical-themed wooded water park with big family slides, wave pool, and KIDsiderate play areas near Busch Gardens.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/13/Hubba_Hubba_Highway_Sign.jpg",
    rating: 4.3,
    categoryRatings: { food: 4.0, rides: 4.4, parking: 4.3, cleanliness: 4.4, staff: 4.4, value: 4.3 },
    reviewCount: 736,
    priceRange: "$",
    categories: ["Water Country USA", "Water Park", "Family"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["Surfer's Bay", "Colossal Curl", "Lazy River", "Kids Zones", "Cabanas"],
    hours: "10:00 AM - 7:00 PM",
    phone: "(757) 229-4386",
    website: "watercountryusa.com",
    reviews: [
      { id: "wc1", author: "Hannah Brooks", authorInitials: "HB", rating: 4, date: "5 days ago", text: "Great variety for all ages. Cabanas help on hot days. Some facilities could use updates.", helpful: 34 },
      { id: "wc2", author: "Ian Foster", authorInitials: "IF", rating: 4, date: "2 weeks ago", text: "Clean and well-staffed. Slides are fun, wave pool is huge. Lines can build midday.", helpful: 27 }
    ]
  },
  {
    id: "aquatica-san-antonio",
    name: "Aquatica San Antonio",
    location: "San Antonio, TX",
    description: "SeaWorld's South Texas water park with animal encounters, Walhalla Wave, and family play zones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Aquatica_San_Antonio_wave_pool.jpg",
    rating: 4.2,
    categoryRatings: { food: 3.9, rides: 4.3, parking: 4.2, cleanliness: 4.3, staff: 4.3, value: 4.2 },
    reviewCount: 650,
    priceRange: "$",
    categories: ["SeaWorld", "Water Park", "Texas"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["Walhalla Wave", "Stingray Encounter", "Wave Pool", "Kids Play Areas", "Quick Queue"],
    hours: "10:00 AM - 7:00 PM",
    phone: "(210) 520-4732",
    website: "aquatica.com/san-antonio",
    reviews: [
      { id: "aqsa1", author: "Sofia Martinez", authorInitials: "SM", rating: 4, date: "3 days ago", text: "Fun slides and great for kids. Quick Queue helps but not always enforced. Wave pool is a hit.", helpful: 29 },
      { id: "aqsa2", author: "David Nguyen", authorInitials: "DN", rating: 4, date: "1 week ago", text: "Clean park with friendly staff. Stingray encounter was memorable. Shade can be limited on busy days.", helpful: 22 }
    ]
  },
  {
    id: "adventure-island",
    name: "Adventure Island",
    location: "Tampa, FL",
    description: "Key West-inspired water park across from Busch Gardens with a relaxed vibe, slides for all ages, and big splash areas.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Adventure_island_2.jpg",
    rating: 3.6,
    categoryRatings: { food: 3.2, rides: 3.8, parking: 3.8, cleanliness: 3.7, staff: 3.7, value: 3.6 },
    reviewCount: 640,
    priceRange: "$",
    categories: ["Water Park", "Family", "Tropical"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["Colossal Curl", "Wave Pool", "Lazy River", "Kids Splash Areas", "Cabanas"],
    hours: "10:00 AM - 7:00 PM",
    phone: "(813) 884-4386",
    website: "adventureisland.com",
    reviews: [
      { id: "ai1", author: "Kelly Rogers", authorInitials: "KR", rating: 4, date: "4 days ago", text: "Chill atmosphere and plenty for families. Food is pricey; cabanas help with shade.", helpful: 21 },
      { id: "ai2", author: "Paul Rivera", authorInitials: "PR", rating: 3, date: "2 weeks ago", text: "Fun slides but some closures. Long food lines. Great for kids when everything's open.", helpful: 17 }
    ]
  },
  {
    id: "knotts-soak-city",
    name: "Knott's Soak City",
    location: "Buena Park, CA",
    description: "Southern California water park with Shore Break, The Wedge, and a popular lazy river near Knott's Berry Farm.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Welcome_to_Soak_City.jpg",
    rating: 4.0,
    categoryRatings: { food: 3.6, rides: 4.2, parking: 4.1, cleanliness: 4.2, staff: 4.2, value: 4.1 },
    reviewCount: 580,
    priceRange: "$",
    categories: ["Water Park", "California", "Family"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["Lazy River", "Shore Break", "The Wedge", "Kids Splash", "Cabanas"],
    hours: "10:00 AM - 6:00 PM",
    phone: "(714) 220-5200",
    website: "knotts.com/soak-city",
    reviews: [
      { id: "ksc1", author: "Tina Lopez", authorInitials: "TL", rating: 4, date: "5 days ago", text: "Great lazy river and kids areas. Food lines can be long—dining plan helps. Wear water shoes.", helpful: 24 },
      { id: "ksc2", author: "Eric Johnson", authorInitials: "EJ", rating: 4, date: "2 weeks ago", text: "Clean and friendly. Get there early for shaded seating. Slides are fun for all ages.", helpful: 19 }
    ]
  },
  {
    id: "schlitterbahn-galveston",
    name: "Schlitterbahn Galveston",
    location: "Galveston, TX",
    description: "Coastal Texas water park with a broad slide lineup, lazy rivers, and year-round indoor section.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Schlitterbahn_Waterpark_-_Galveston%2C_Texas_%285976256536%29.jpg",
    rating: 4.1,
    categoryRatings: { food: 3.8, rides: 4.3, parking: 4.1, cleanliness: 4.2, staff: 4.3, value: 4.2 },
    reviewCount: 539,
    priceRange: "$",
    categories: ["Schlitterbahn", "Water Park", "Coastal"],
    audienceType: "Families",
    parkType: "Water Park",
    features: ["Lazy River", "Wave Pool", "Indoor Section", "Raft Rides", "Bring-Your-Own Food"],
    hours: "10:00 AM - 7:00 PM",
    phone: "(409) 770-9283",
    website: "schlitterbahn.com/galveston",
    reviews: [
      { id: "sbg1", author: "Allison Reed", authorInitials: "AR", rating: 4, date: "1 week ago", text: "Love that you can bring your own food. Clean park with friendly staff. Some slides get long waits.", helpful: 26 },
      { id: "sbg2", author: "Tom Gray", authorInitials: "TG", rating: 4, date: "2 weeks ago", text: "Indoor section is great in shoulder seasons. Good variety of rides and nice lazy river.", helpful: 21 }
    ]
  },
  {
    id: "six-flags-hurricane-harbor",
    name: "Six Flags Hurricane Harbor",
    location: "Arlington, TX",
    description: "Large Six Flags water park with massive wave pool, Splash Island play structure, and dozens of slides and rivers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/27/SixFlagsTower-3908.jpg",
    rating: 3.6,
    categoryRatings: { food: 3.0, rides: 3.8, parking: 3.8, cleanliness: 3.6, staff: 3.6, value: 3.7 },
    reviewCount: 476,
    priceRange: "$",
    categories: ["Six Flags", "Water Park", "Texas"],
    audienceType: "All Ages",
    parkType: "Water Park",
    features: ["Mega Wave Pool", "Splash Island", "47 Acres of Slides", "Kids Zones", "Cabanas"],
    hours: "10:00 AM - 8:00 PM",
    phone: "(817) 640-8900",
    website: "sixflags.com/hurricaneharbortexas",
    reviews: [
      { id: "sfhh1", author: "Olivia White", authorInitials: "OW", rating: 3, date: "5 days ago", text: "Huge park with lots to do. Lines long on weekends; arrive early for shade. Food pricey.", helpful: 18 },
      { id: "sfhh2", author: "Ethan Brooks", authorInitials: "EB", rating: 4, date: "2 weeks ago", text: "Great variety of slides and big wave pool. Season pass makes it a better value. Could be cleaner in peak season.", helpful: 15 }
    ]
  }
];

validateThemeParks(themeParks);
