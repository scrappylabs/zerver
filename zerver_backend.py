from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data
items = [
    {"id": 1, "name": "item1", "price": 10.99},
    {"id": 2, "name": "item2", "price": 12.99},
]

# Get all items
@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(items)

# Get a specific item by id
@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((item for item in items if item['id'] == item_id), None)
    return jsonify(item) if item else ('', 404)

# Create a new item
@app.route('/items', methods=['POST'])
def create_item():
    new_item = request.get_json()
    new_item['id'] = max(item['id'] for item in items) + 1
    items.append(new_item)
    return jsonify(new_item), 201

# Update an existing item
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = next((item for item in items if item['id'] == item_id), None)
    if item:
        data = request.get_json()
        item.update(data)
        return jsonify(item)
    return ('', 404)

# Delete an item
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [item for item in items if item['id'] != item_id]
    return ('', 204)

if __name__ == '__main__':
    app.run(host='10.101.145.133',debug=True)