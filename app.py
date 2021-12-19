from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.wishbasket

from bson import json_util, ObjectId
import json

@app.route('/')
def home():
    return render_template('index.html')


# APIs
# 아이템 추가하기
@app.route('/wish', methods=['POST'])
def add_item():
    url_receive = request.form['url_give']
    memo_receive = request.form['memo_give']
    tags_receive = request.form['tags_give']
    price_receive = request.form['price_give']

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    name = soup.select_one('meta[property="og:title"]')['content']
    desc = soup.select_one('meta[property="og:description"]')['content']
    image = soup.select_one('meta[property="og:image"]')['content']

    item = {
        'name': name,
        'desc': desc,
        'image': image,
        'url': url_receive,
        'memo': memo_receive,
        'tags': tags_receive,
        'price': price_receive
    }
    db.wishlist.insert_one(item)

    return jsonify({'msg': '아이템이 위시바구니에 추가되었습니다!'})

# 전체 아이템 가져오기
@app.route('/wish', methods=['GET'])
def get_all_items():
    items = list(db.wishlist.find({}))
    items_sanitised = json.loads(json_util.dumps(items))
    return jsonify({'all_items': items_sanitised})

# 아이템 삭제하기
@app.route('/wish/<id>', methods=['DELETE'])
def delete_item(id):
    db.wishlist.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': '아이템이 위시바구니에서 삭제되었습니다!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
