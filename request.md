# Todo Express API Locust Load Testing Responses

## Routes

### Items

#### GET api/todo/items
- **Task:** get_items_route \
**Request name:** /api/todo/items \
Save items ids in an arrray \
Returns failure when the status code is different than 200 

#### POST api/todo/items
- **Task:** create_items_route \
**Request name:** /api/todo/items \
Returns success when status code equals 200 \
Returns failure when the status code is different than 200 

- **Task:** create_items_route_bad_token \
**Request name:** /api/todo/items - bad token \
Returns success when status code equals 401 \
Returns failure when the status code is different than 401 

- **Task:** create_items_route_no_description \
**Request name:** /api/todo/items - no description \
Returns success when status code equals 400 \
Returns failure when the status code is different than 400

- **Task:** create_items_route_no_title \
**Request name:** /api/todo/items - no title \
Returns success when status code equals 400 \
Returns failure when the status code is different than 400

- **Task:** create_items_route_no_data \
**Request name:** /api/todo/items - no data \
Returns success when status code equals 400 \
Returns failure when the status code is different than 400

#### PUT api/todo/items/:id/update
- **Task:** update_item_route \
**Request name:** /api/todo/items/:id/update \
Returns success when status code equals 200 \
Returns failure when the status code is different than 200 

- **Task:** update_item_route_bad_token \
**Request name:** /api/todo/items/:id/update - bad token \
Returns success when status code equals 401 \
Returns failure when the status code is different than 401 

- **Task:** update_item_route_no_description \
**Request name:** /api/todo/items/:id/update - no description \
Returns success when status code equals 400 \
Returns failure when the status code is different than 400

- **Task:** update_item_route_no_title \
**Request name:** /api/todo/items/:id/update - no title \
Returns success when status code equals 400 \
Returns failure when the status code is different than 400

- **Task:** update_item_route_no_data \
**Request name:** /api/todo/items/:id/update - no data \
Returns success when status code equals 400 \
Returns failure when the status code is different than 400

#### DELETE api/todo/items/:id/remove
- **Task:** delete_item_route \
**Request name:** /api/todo/items/:id/remove \
Returns success when status code equals 200 \
Returns failure when the status code is different than 200 

- **Task:** delete_item_route_bad_token \
**Request name:** /api/todo/items/:id/remove - bad token \
Returns success when status code equals 401 \
Returns failure when the status code is different than 401 