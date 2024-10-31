export const categories = [
  {
    name: 'Pizza',
  },
  {
    name: 'Breakfast',
  },
  {
    name: 'Snacks',
  },
  {
    name: 'Cocktails',
  },
  {
    name: 'Drinks',
  },
];

export const _ingredients = [
  {
    name: 'Cheese side.',
    price: 2,
    image: '/assets/img-products/ingredients/cheese-side.png',
  },
  {
    name: 'Creamy mozzarella',
    price: 0.5,
    image: '/assets/img-products/ingredients/creamy-mozzarella.png',
  },
  {
    name: 'Cheddar and Parmesan cheeses',
    price: 3,
    image: '/assets/img-products/ingredients/cheddar-and-parmesan-cheeses.png',
  },
  {
    name: 'Jalapeno pepper',
    price: 1.2,
    image: '/assets/img-products/ingredients/jalapeno-pepper.png',
  },
  {
    name: 'Tender chicken',
    price: 1.45,
    image: '/assets/img-products/ingredients/tender-chicken.png',
  },
  {
    name: 'Mushrooms',
    price: 1,
    image: '/assets/img-products/ingredients/mushrooms.png',
  },
  {
    name: 'Ham',
    price: 1.2,
    image: '/assets/img-products/ingredients/ham.png',
  },
  {
    name: 'Pepperoni',
    price: 1.2,
    image: '/assets/img-products/ingredients/pepperoni.png',
  },
  {
    name: 'Aguzza chorizo',
    price: 1.5,
    image: '/assets/img-products/ingredients/aguzza-chorizo.png',
  },
  {
    name: 'Pickles',
    price: 0.6,
    image: '/assets/img-products/ingredients/pickles.png',
  },
  {
    name: 'Fresh tomatoes',
    price: 1,
    image: '/assets/img-products/ingredients/fresh-tomatoes.png',
  },
  {
    name: 'Red onion',
    price: 1,
    image: '/assets/img-products/ingredients/red-onion.png',
  },
  {
    name: 'Juicy pineapples',
    price: 1,
    image: '/assets/img-products/ingredients/juicy-pineapples.png',
  },
  {
    name: 'Italian herbs',
    price: 0.4,
    image: '/assets/img-products/ingredients/italian-herbs.png',
  },
  {
    name: 'Sweet pepper',
    price: 1,
    image: '/assets/img-products/ingredients/sweet-pepper.png',
  },
  {
    name: 'Cubes of Birreria',
    price: 2,
    image: '/assets/img-products/ingredients/cubes-of-birreria.png',
  },
  {
    name: 'Meatball',
    price: 3,
    image: '/assets/img-products/ingredients/meatball.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Omelette with ham and mushrooms',
    image: '/assets/img-products/products/Omelette-with-ham-and-mushrooms.webp',
    categoryId: 2,
  },
  {
    name: 'Omelette with pepperoni',
    image: '/assets/img-products/products/Omelette-with-pepperoni.webp',
    categoryId: 2,
  },
  {
    name: 'Caffè latte',
    image: '/assets/img-products/products/Caffè-latte.webp',
    categoryId: 2,
  },
  {
    name: 'Danich ham and cheese',
    image: '/assets/img-products/products/Danich-ham-and-cheese.webp',
    categoryId: 3,
  },
  {
    name: 'Chicken nuggets',
    image: '/assets/img-products/products/Chicken-nuggets.webp',
    categoryId: 3,
  },
  {
    name: 'Oven potatoes with sauce 🌱',
    image: '/assets/img-products/products/Oven-potatoes-with-sauce.webp',
    categoryId: 3,
  },
  {
    name: 'Banana milk shake',
    image: '/assets/img-products/products/Banana-milk-shake.webp',
    categoryId: 4,
  },
  {
    name: 'Caramel apple milk shake',
    image: '/assets/img-products/products/Caramel-apple-milk-shake.webp',
    categoryId: 4,
  },
  {
    name: 'Oreos milk shake',
    image: '/assets/img-products/products/Oreos-milk-shake.webp',
    categoryId: 4,
  },
  {
    name: 'Classic milk shake 👶',
    image: '/assets/img-products/products/Classic-milk-shake.webp',
    categoryId: 4,
  },
  {
    name: 'Caramel cappuccino',
    image: '/assets/img-products/products/Caramel-cappuccino.webp',
    categoryId: 5,
  },
  {
    name: 'Coffee Coconut Latte',
    image: '/assets/img-products/products/Coffee-Coconut-Latte.webp',
    categoryId: 5,
  },
  {
    name: 'American coffee',
    image: '/assets/img-products/products/American-coffee.webp',
    categoryId: 5,
  },
];
