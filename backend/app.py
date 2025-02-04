import os
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
    """Fetch only the PUUID of a given summoner name."""
    game_name = request.args.get('game_name')
    tag_line = request.args.get('tag_line')

    if not game_name or not tag_line:
        return jsonify({'error': 'Both game_name and tag_line are required'}), 400

    url = f"{RIOT_BASE_URL}/riot/account/v1/accounts/by-riot-id/{game_name}/{tag_line}?api_key={RIOT_API_KEY}"
    print(url)  # Debugging
    try:
        response = requests.get(url, headers={'X-Riot-Token': RIOT_API_KEY})
        response.raise_for_status()
        data = response.json()
        puuid = data['puuid']
        print(f"PUUID: {puuid}")

        # Fetch match history using the PUUID
        match_history_url = f"{RIOT_BASE_URL}/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=10&api_key={RIOT_API_KEY}"
        match_history_response = requests.get(match_history_url)
        match_history_response.raise_for_status()
        match_ids = match_history_response.json()
        print(f"Match IDs: {match_ids}")

        # Fetch match data for each match ID
        match_data_list = []
        for match_id in match_ids:
            match_data_url = f"{RIOT_BASE_URL}/lol/match/v5/matches/{match_id}?api_key={RIOT_API_KEY}"
            match_data_response = requests.get(match_data_url)
            match_data_response.raise_for_status()
            match_data = match_data_response.json()
            match_data_list.append(match_data)

        return jsonify({'puuid': puuid, 'match_data': match_data_list})
    except requests.exceptions.RequestException as e:
        print("API Error:", e.response.text)  # Debugging
        return jsonify({'error': str(e), 'riot_response': e.response.text}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)