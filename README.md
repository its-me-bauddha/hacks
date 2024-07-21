# Healthy Go - Capture and Analyze Food Ingredients for Healthiness 

## Overviewe LIVE LINK [https://app.netlify.com/sites/quiet-profiterole-3695bc/overview]

This project is a mobile/web friendly application that allows users to capture images of packed food ingredients using their mobile phone's front or back camera. The captured photo is analyzed by the ChatGPT-4.0 API to determine the healthiness of the product. Based on the analysis, the user earns coins which are updated in their profile dashboard. Users can redeem these coins at various places offering healthy food options. The system ensures secure and accurate coin management, preventing any unauthorized access or interference between user profiles.

[![Screenshot-2024-07-21-at-8-27-41-AM.png](https://i.postimg.cc/nhFthpzg/Screenshot-2024-07-21-at-8-27-41-AM.png)](https://postimg.cc/zVcQdmTF)


## Features

- **Capture Food Ingredients Image**: Use your mobile phone's camera to take a photo of the packed food ingredients.
- **Health Analysis**: The captured photo is analyzed by the ChatGPT-4.0 API to determine if the food is good, moderate, or best for eating.
- **Earn Coins**: If the food is deemed good for eating, coins are added to the user's profile.
- **User Dashboard**: View total coins, redeem coins, and see user profile information.
- **Redeem Coins**: Users can redeem their coins at places offering healthy food options.
- **Secure Coin Management**: Ensures secure coin management, preventing interference between different users' profiles.
  
[![Screenshot-2024-07-21-at-8-27-54-AM.png](https://i.postimg.cc/pTP4VBqv/Screenshot-2024-07-21-at-8-27-54-AM.png)](https://postimg.cc/NyPppm3C)
## Tech Stack
[![Screenshot-2024-07-21-at-8-28-11-AM.png](https://i.postimg.cc/q7Ngb88k/Screenshot-2024-07-21-at-8-28-11-AM.png)](https://postimg.cc/v1dQDxqj)

- **React.js**: For building the user dashboard.
- **Material-UI**: For UI components.
- **Axios**: For making HTTP requests.
- **Node.js**: Backend server.
- **Express.js**: Web framework for Node.js.
- **ChatGPT-4.0 API**: For analyzing the captured images.
- **json-server**: For mocking backend data during development.

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)
- Expo CLI (for running the React Native app)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/food-health-analysis.git
cd food-health-analysis
```

2. Install the dependencies:

```bash
npm install
```

3. Install `json-server` globally if not already installed:

```bash
npm install -g json-server
```

### Running the Application

1. Start the JSON server:

```bash
json-server --watch db.json --port 8000
```

2. Start the React Native app:

```bash
expo start
```

3. Start the React dashboard:

```bash
npm run start-dashboard
```

The mobile application will be available through Expo, and the dashboard will be available at `http://localhost:3000`.

## API Endpoints

- **GET /users/1**: Fetch the user data.
- **PATCH /users/1**: Update the user data (e.g., add or deduct points).
- **POST /analyze-image**: Analyze the captured image using ChatGPT-4.0 API.

## Project Structure

```
food-health-analysis/
|-- public/
|-- src/
|   |-- components/
|   |   |-- Dashboard.js
|   |   |-- Profile.js
|   |-- mobile/
|   |   |-- App.js
|   |   |-- CameraScreen.js
|   |-- server/
|   |   |-- index.js
|-- db.json
|-- package.json
|-- README.md
```

## Components

### Mobile Application

**`CameraScreen.js`**: Capture and upload images for analysis.

### Dashboard Component

Displays the user dashboard with total coins, redeem coin button, add coin button, and user profile.

### Profile Component

Displays the user's profile photo and name.

### Main Application

**`App.js`**: Main application file.

### Mock API with JSON Server


### Backend Server

**`index.js`**: Backend server to handle image analysis and user updates.

## Contributing

Feel free to open issues or submit pull requests if you find any bugs or have feature suggestions.

## License

This project is licensed under the MIT License.