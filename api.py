import requests

url = ('https://newsapi.org/v2/top-headlines?country=in&apiKey=43088de2f347406ca6e23b1f00bd736d')
response = requests.get(url)

print(response.json())