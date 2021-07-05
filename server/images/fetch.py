import json
import requests

data = {
    'images': []
}

for i in range(100):
    image = requests.get('https://source.unsplash.com/64x64/?person').url
    data['images'].append(image)

with open('images/images.json', 'w') as file:
    json.dump(data, file)