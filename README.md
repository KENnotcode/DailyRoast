
# Daily Roast ☕️

**Daily Roast** is a web application designed to simulate a coffee shop menu, where users can browse different coffee products, view their details, and access additional information such as price, description, and images. The UI resembles the clean and modern design of Coffee First.

## Project Overview

The Daily Roast project aims to create an engaging and interactive coffee menu that allows users to easily explore various hot coffee offerings. This project is built with React and styled using TailwindCSS, Ant Design (antd), and Framer Motion for a smooth and modern user interface.

## Features

- **Interactive Coffee Menu**: Users can browse through a variety of coffee options, with each product displayed in an elegant card format.
- **Product Detail View**: Clicking on a product brings up a detailed mini window displaying the product name, description, and price.
- **Responsive Design**: The site layout is responsive, offering an optimized experience across all devices.
- **Sign Up / Login Functionality**: Users can register or sign in using a dedicated form that allows switching between signup and login.
- **Dynamic Product Data**: The coffee product data is fetched dynamically from a mock API or local dataset, stored in `scripts/hotcoffeedata.js`.

## Technologies Used

- **React**: For building the user interface components.
- **TailwindCSS**: For quick and efficient styling of the layout.
- **Ant Design (antd)**: For additional styling and UI components.
- **Framer Motion**: For smooth animations and transitions.
- **Fake Coffee API**: A mock API to simulate coffee product data.
- **GitHub Pages / Vercel**: For deployment and live previews.

## Project Structure

- `components/`: Contains all the React components, including the main menu and product cards.
- `scripts/`: Houses the `hotcoffeedata.js`, which stores the data of hot coffee products.
- `pages/`: Contains the different pages like `Home`, `About Us`, and authentication forms.
- `public/`: Includes public assets such as images and icons.
- `styles/`: Includes global CSS files and custom styles.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/KENnotcode/DailyRoast.git
   ```

2. Navigate to the project directory:
   ```bash
   cd DailyRoast
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Future Enhancements

- **Payment Integration**: Adding an option for users to purchase coffee through the app.
- **Order History**: Storing previous user orders for future reference.
- **User Reviews**: Allowing users to leave reviews and ratings for each coffee product.

## Contributing

Feel free to open a pull request or file an issue if you encounter bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License.
