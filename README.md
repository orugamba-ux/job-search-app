
# 💼 Job Search App

A web application that allows users to search for real job listings from around the world using the JSearch API.

## Features
- Search jobs by title and location
- Sort results by date, title, or company
- Filter results in real time
- Click "Apply Now" to go directly to job listing

## APIs Used
- [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) by OpenWeb Ninja via RapidAPI

## How to Run Locally

1. Clone the repository:
```
   git clone https://github.com/YOURNAME/job-search-app.git
   cd job-search-app
```

2. Install dependencies:
```
   npm install
```

3. Create a `.env` file in the root folder:
```
   RAPIDAPI_KEY=your_api_key_here
   PORT=3000
```

4. Start the server:
```
   node server.js
```

5. Open your browser and go to `http://localhost:3000`

## Deployment
- Deployed on Web01 and Web02 servers
- Load balancer (Lb01) configured with Nginx to distribute traffic

## Credits
- JSearch API by OpenWeb Ninja - https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
- Express.js - https://expressjs.com
- Node.js - https://nodejs.org
