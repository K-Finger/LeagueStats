import os
import asyncio
import aiohttp
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
RIOT_API_KEY = os.getenv('RIOT_API_KEY')

app = Flask(__name__)
CORS(app)

RIOT_BASE_URL = "https://americas.api.riotgames.com"

@app.route('/api/get-puuid', methods=['GET'])
def get_puuid():
    """
    Fetch the PUUID of a given summoner name and their match history.

    This endpoint expects two query parameters: game_name and tag_line.
    It returns the PUUID and the match history of the summoner.

    Query Parameters:
    - game_name (str): The game name of the summoner.
    - tag_line (str): The tag line of the summoner.

    Returns:
    - JSON response containing the PUUID and match history.
    - 400 status code if game_name or tag_line is missing.
    - 500 status code if there is an error with the API request.
    """
    game_name = request.args.get('game_name')
    tag_line = request.args.get('tag_line')

    if not game_name or not tag_line:
        return jsonify({'error': 'Both game_name and tag_line are required'}), 400

    try:
        puuid = fetch_puuid(game_name, tag_line)
        stats = asyncio.run(fetch_match_history(puuid))  # Run async function
        return jsonify(stats)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

def fetch_puuid(game_name, tag_line):
    """
    Fetch the PUUID for a given summoner name and tag line.

    Parameters:
    - game_name (str): The game name of the summoner.
    - tag_line (str): The tag line of the summoner.

    Returns:
    - puuid (str): The PUUID of the summoner.
    """
    url = f"{RIOT_BASE_URL}/riot/account/v1/accounts/by-riot-id/{game_name}/{tag_line}?api_key={RIOT_API_KEY}"
    response = requests.get(url, headers={'X-Riot-Token': RIOT_API_KEY})
    response.raise_for_status()
    return response.json()['puuid']

async def fetch_match_data(session, match_id, puuid):
    """
    Fetch individual match data asynchronously.

    Parameters:
    - session: The aiohttp session.
    - match_id (str): The match ID.
    - puuid (str): The player's PUUID.

    Returns:
    - Dictionary containing match stats.
    """
    url = f"{RIOT_BASE_URL}/lol/match/v5/matches/{match_id}?api_key={RIOT_API_KEY}"
    async with session.get(url) as response:
        match_data = await response.json()
        participant_index = match_data['metadata']['participants'].index(puuid)
        participant_info = match_data['info']['participants'][participant_index]
        
        cs = participant_info['totalMinionsKilled'] + participant_info['neutralMinionsKilled']
        deaths = participant_info['deaths']
        vision_score = participant_info['visionScore']
        game_time = match_data['info']['gameDuration']

        return {
            "cs_per_min": cs / (game_time / 60),
            "deaths_per_min": deaths / (game_time / 60),
            "vision_score_per_min": vision_score / (game_time / 60),
        }

async def fetch_match_history(puuid):
    """
    Fetch the match history for a given PUUID asynchronously.

    Parameters:
    - puuid (str): The PUUID of the summoner.

    Returns:
    - Dictionary containing average CS, deaths, and vision scores.
    """
    match_history_url = f"{RIOT_BASE_URL}/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=10&api_key={RIOT_API_KEY}"
    
    match_history_response = requests.get(match_history_url)
    match_history_response.raise_for_status()
    match_ids = match_history_response.json()

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_match_data(session, match_id, puuid) for match_id in match_ids]
        match_stats = await asyncio.gather(*tasks)

    num_matches = len(match_stats)
    avg_cs_per_min = sum(match["cs_per_min"] for match in match_stats) / num_matches
    avg_deaths_per_min = sum(match["deaths_per_min"] for match in match_stats) / num_matches
    avg_vision_per_min = sum(match["vision_score_per_min"] for match in match_stats) / num_matches

    return {
        "average_cs_per_min": avg_cs_per_min,
        "average_deaths_per_min": avg_deaths_per_min,
        "average_vision_score_per_min": avg_vision_per_min
    }

if __name__ == '__main__':
    app.run(port=5000, debug=True)
