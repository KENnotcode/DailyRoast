const hotCoffeeProducts = [
  {
    "id": 1,
    "name": "Espresso",
    "description": "The espresso, also known as a short black, is approximately 1 oz. of highly concentrated coffee. Although simple in appearance, it can be difficult to master.",
    "price": 4.50, // The price is in Dollar
    "ratio": "1 shot of espresso",
    "size": "2-4 oz. Espresso Cup",
    "image": "/kape/espresso.jpeg",
    "imageUrl": "/kape/kape info/coffee-drinks_espresso.jpg"
  },
  {
    "id": 2,
    "name": "Double Espresso",
    "description": "A double espresso may also be listed as doppio, which is the Italian word for double. This drink is highly concentrated and strong.",
    "price": 5.50, // The price is in Dollar
    "ratio": "2 shots of espresso",
    "size": "3-4 oz. Demitasse Cup",
    "image": "/kape/doubleshot.jpg", 
    "imageUrl": "/kape/kape info/coffee-drinks_double-espresso.jpg" 
  },
  {
    "id": 3,
    "name": "Red Eye",
    "description": "The red eye's purpose is to add a boost of caffeine to your standard cup of coffee.",
    "price": 4.25, // The price is in Dollar
    "ratio": "1 shot of espresso + 6 oz. of drip-brewed coffee",
    "size": "8 oz. Coffee Mug",
    "image": "/kape/redeye.webp",
    "imageUrl": "/kape/kape info/coffee-drinks_red-eye.jpg"
  },
  {
    "id": 4,
    "name": "Black Eye",
    "description": "The black eye is just the doubled version of the red eye and is very high in caffeine.",
    "price": 5.25, // The price is in Dollar
    "ratio": "2 shots of espresso + 6 oz. of drip-brewed coffee",
    "size": "8-10 oz. Coffee Mug",
    "image": "/kape/blackeye.jpg", 
    "imageUrl": "/kape/kape info/coffee-drinks_black-eye.jpg" 
  },
  {
    "id": 5,
    "name": "Americano",
    "description": "Americanos are popular breakfast drinks and thought to have originated during World War II. Soldiers would add water to their coffee to extend their rations farther. The water dilutes the espresso while still maintaining a high level of caffeine.",
    "price": 4.75, // The price is in Dollar
    "ratio": "1 shot of espresso + 3 oz. of hot water",
    "size": "5-6 oz. Glass Coffee Mug",
    "image": "/kape/americano.jpg",
    "imageUrl": "/kape/kape info/coffee-drinks_americano.jpg"
  },
  {
    "id": 6,
    "name": "Long Black",
    "description": "The long black is a similar coffee drink to the americano, but it originated in New Zealand and Australia. It generally has more crema than an americano.",
    "price": 5.00, // The price is in Dollar
    "ratio": "2 shots of espresso + 3 oz. of hot water",
    "size": "6-8 oz. Glass Coffee Mug",
    "image": "/kape/longblack.jpeg", 
    "imageUrl": "/kape/kape info/coffee-drinks_long-black.jpg" 
  },
  {
    "id": 7,
    "name": "Macchiato",
    "description": "The word macchiato means mark or stain. This is in reference to the mark that steamed milk leaves on the surface of the espresso as it is dashed into the drink. Flavoring syrups are often added to the drink according to customer preference.",
    "price": 4.25, // The price is in Dollar
    "ratio": "1 shot of espresso + 1 to 2 teaspoons of steamed milk",
    "size": "3 oz. Glass Espresso Cup",
    "image": "/kape/macchiato.jpg",
    "imageUrl": "/kape/kape info/coffee-drinks_macchiato.jpg" 
  },
  {
    "id": 8,
    "name": "Long Macchiato",
    "description": "Often confused with a standard macchiato, the long macchiato is a taller version and will usually be identifiable by its distinct layers of coffee and steamed milk.",
    "price": 5.25, // The price is in Dollar
    " ratio": "2 shots of espresso + 2 to 4 teaspoons of steamed milk",
    "size": "5 oz. Rocks Glass",
    "image": "/kape/longmacchiato.jpg", 
    "imageUrl": "/kape/kape info/coffee-drinks_long-macchiato.jpg" 
  },
  {
    "id": 9,
    "name": "Cortado",
    "description": "The cortado takes the macchiato one step further by evenly balancing the espresso with warm milk in order to reduce the acidity.",
    "price": 5.00, // The price is in Dollar
    "ratio": "1 shot of espresso + 1 oz. of warm milk + 1 cm of foam",
    "size": "5 oz. Rocks Glass",
    "image": "/kape/cortado.jpg", 
    "imageUrl": "/kape/kape info/coffee-drinks_cortado.jpg" 
  },
  {
    "id": 10,
    "name": "Breve",
    "description": "The breve provides a decadent twist on the average espresso, adding steamed half-and-half to create a rich and creamy texture.",
    "price": 5.75, // The price is in Dollar
    "ratio": "1 shot of espresso + 3 oz. of steamed half-and-half + 1 cm of foam",
    "size": "5-7 oz. Low Cup",
    "image": "/kape/breve.webp", 
    "imageUrl": "/kape/kape info/coffee-drinks_breve.jpg" 
  },
  {
    "id": 11,
    "name": "Cappuccino",
    "description": "This creamy coffee drink is usually consumed at breakfast time in Italy and is loved in the United States as well. It is usually associated with indulgence and comfort because of its thick foam layer and additional flavorings that can be added to it.",
    "price": 5.75, // The price is in Dollar
    "ratio": "1-2 shots of espresso + 2 oz. of steamed milk + 2 oz. of foamed milk + sprinkling of chocolate powder (optional)",
    "size": "6-8 oz. Cappuccino Mug",
    "image": "/kape/cappuccino.jpeg",
    "imageUrl": "/kape/kape info/coffee-drinks_cappuccino.jpg" 
  },
  {
    "id": 12,
    "name": "Flat White",
    "description": "A flat white also originates from New Zealand and Australia and is very similar to a cappuccino but lacks the foam layer and chocolate powder. To keep the drink creamy rather than frothy, steamed milk from the bottom of the jug is used instead of from the top.",
    "price": 5.50, // The price is in Dollar
    "ratio": "1 shot of espresso + 4 oz. of steamed milk",
    "size": "6 oz. Glass Tumbler",
    "image": "/kape/flatwhite.jpg", 
    "imageUrl": "/kape/kape info/coffee-drinks_flat-white.jpg" 
  },
  {
    "id": 13,
    "name": "Cafe Latte",
    "description": "Cafe lattes are considered an introductory coffee drink since the acidity and bitterness of coffee are cut by the amount of milk in the beverage. Flavoring syrups are often added to the latte for those who enjoy sweeter drinks.",
    "price": 5.25, // The price is in Dollar
    "ratio": "1 shot of espresso + 8-10 oz. of steamed milk + 1 cm of foam",
    "size": "6-9 oz. Coffee Mug",
    "image": "/kape/cafelatte.jpg", 
    "imageUrl": "/kape/kape info/coffee-drinks_caffe-latte.jpg" 
  },
  {
    "id": 14,
    "name": "Mocha",
    "description": "The mocha is considered a coffee and hot chocolate hybrid. The chocolate powder or syrup gives it a rich and creamy flavor and cuts the acidity of the espresso.",
    "price": 6.00, // The price is in Dollar
    "ratio": "1 shot of espresso + 1-2 oz. of chocolate syrup/powder + 1-3 oz. of steamed milk + 2-3 cm of foam or whipped cream",
    "size": "6-8 oz. Irish Coffee Mug",
    "image": "/kape/mocha.webp", 
    "imageUrl": "/kape/kape info/coffee-drinks_mocha.jpg" 
  },
  {
    "id": 15,
    "name": "Vienna ",
    "description": "There are a few variations on the Vienna, but one of the most common is made with two ingredients: espresso and whipped cream. The whipped cream takes the place of milk and sugar to provide a creamy texture.",
    "price": 5.75, // The price is in Dollar
    "ratio": "1-2 shots of espresso + 2 oz. of whipped cream",
    "size": "4-5 oz. Espresso Mug",
    "image": "/kape/vienna.jpg", 
    "imageUrl": "/kape/kape info/coffee-drinks_vienna.jpg" 
  },
  {
    "id": 16,
    "name": "Affogato",
    "description": "Affogatos are more for a dessert coffee than a drink you would find at a cafe, but they can add a fun twist to your coffee menu. They are made by pouring a shot of espresso over a scoop of vanilla ice cream to create a sweet after-meal treat.",
    "price": 6.50, // The price is in Dollar
    "ratio": "1-2 shots of espresso + 1 scoop of vanilla ice cream",
    "size": "5-7 oz. Dessert Dish",
    "image": "/kape/affogato.webp", 
    "imageUrl": "/kape/kape info/coffee-drinks_affogato.jpg" 
  },
  {
    "id": 17,
    "name": "Cafe au Lait",
    "description": "The cafe au lait is typically made with French press coffee instead of an espresso shot to bring out the different flavors in the coffee. It is then paired with scalded milk instead of steamed milk and poured at a 50/50 ratio.",
    "price": 5.50, // The price is in Dollar
    "ratio": "5 oz. French press coffee + 5 oz. scalded milk",
    "size": "12 oz. Coffee Mug",
    "image": "/kape/cafeaulait.webp", 
    "imageUrl": "/kape/kape info/coffee-drinks_cafe-au-lait.jpg" 
  }
];
  
module.exports = hotCoffeeProducts;    