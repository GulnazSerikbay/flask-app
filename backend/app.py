from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

GITHUB_API_URL = "https://api.github.com/search/repositories"

@app.route('/', methods=['GET'])
def get_top_repositories():
    params = {
        'q': 'stars:>1',
        'sort': 'stars',
        'order': 'desc',
        'per_page': 10
    }

    headers = {
        'Accept': 'application/vnd.github.v3+json'
    }

    # send a req to github API
    response = requests.get(GITHUB_API_URL, params=params, headers=headers)

    if response.status_code == 200:
        data = response.json()
        top_repos = [
            {
                'name': repo['name'],
                'full_name': repo['full_name'],
                'html_url': repo['html_url'],
                'description': repo['description'],
                'stargazers_count': repo['stargazers_count'],
                'language': repo['language']
            }
            for repo in data.get('items', [])
        ]
        return jsonify(top_repos)
    else:
        return jsonify({'error': 'Failed to fetch'}), response.status_code

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
