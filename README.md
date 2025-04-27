# Song Popularity Globe Visualization Web App

A React application that visualizes song popularity across the globe using 3D visualization. This application allows users to search for songs and see a heatmap of their global popularity on an interactive 3D globe.

![Song Popularity Globe](https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=400)

## Features

- **Interactive 3D Globe**: Using globe.GL library to render a beautiful, interactive Earth
- **Song Popularity Heatmap**: Visualizing song popularity across different regions of the world
- **Song Library**: Browse and search for songs in the application library
- **Music Controls**: Play, pause, and navigate between songs (currently simulated without actual audio)
- **Detailed Analytics**: View detailed information about a song's popularity in different regions
- **Time Range Selection**: View popularity data across different time ranges
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React with TypeScript
- Vite as the build tool
- Tailwind CSS for styling
- globe.GL for 3D globe visualization
- Zustand for state management
- Framer Motion for animations

## Getting Started

### Prerequisites

- Node.js v14+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/song-popularity-globe.git
cd song-popularity-globe
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── assets/         # Custom utilities for the globe and animations
├── components/     # React components
├── data/           # Mock data for songs and regions
├── store/          # Zustand state management
├── styles/         # Custom stylesheets
├── utils/          # Utility functions
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Key Components

- **GlobeVisualization**: Renders the 3D globe with heatmap data
- **MusicControls**: Audio player controls for the selected song
- **SearchCard**: Search functionality for finding songs
- **SongList**: Library of available songs
- **InfoPanel**: Displays detailed popularity information for the selected song

## Future Enhancements

- **Spotify API Integration**: Connect to Spotify API for real song data and playback
- **Additional Visualizations**: Add more visualization options (bar charts, area maps)
- **User Accounts**: Allow users to sign in and save favorite songs
- **Social Sharing**: Share visualizations with others
- **Enhanced Analytics**: Provide more detailed analytics about song popularity trends

## Mock Data vs Real Data

Currently, the application uses mock data for song popularity. The data is generated to simulate realistic global popularity patterns based on:

- Song genre influence in different regions
- Artist origin
- Language factors
- Spotify market penetration estimates

In the future, this will be replaced with real data from the Spotify API.

## Credits

- Globe visualization powered by [globe.GL](https://github.com/vasturiano/globe.gl)
- UI inspiration from various music visualization platforms

## License

This project is licensed under the MIT License - see the LICENSE file for details.