# LeagueStats
LeagueStats is a web application that allows players to analyze their League of Legends performance by fetching match data from the Riot API. It provides key statistics like CS per minute, deaths per minute, and vision score per minute, helping players track their gameplay efficiency.

![LeagueStats Preview](![LeagueStats](images/Preview.png))

**Tech used:**
- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Flask (Python), Riot API, aiohttp (for async requests)

LeagueStats was built using **React** on the frontend and **Flask** on the backend.

## Optimizations
One of the major optimizations in this project was **reducing API request time**. Initially, match data was fetched **sequentially**, causing delays when retrieving multiple games. These improvements made LeagueStats significantly **faster and more scalable**

✅ **Parallelized Riot API requests** → Fetch match history and all match data simultaneously. 

![Backend Data Flow](images/DataFlow.jpg)

## Lessons Learned:

- **Async Python is powerful** → Using `asyncio` and `aiohttp` made API calls much faster compared to sequential requests.
- **Data Flow Optimization** → Looking back, I realize that the current data flow could be streamlined. If I were to redo the project, I would focus on reducing redundant returns to backend functions to have a streamlined flow from the api call to the data being sent to the frontend.
- **State Management for Data Pipeline** → lifting state and backend calls up to App.jsx improved data flow and made it easier to pass data between components.

## How to Run

I wouldn't recommend trying to run it because a API key is hard to get. I am not deploying because it only lasts 24 hours.

- Generate a 24hr Riot API key and add it in `.env`: `RIOT_API_KEY=''`
- navigate to the frontend and run `npm start`
- navigate to the backend and run `App.py`