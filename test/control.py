import time
import json
import random
from locust import HttpUser, task, between


class WebsiteUser(HttpUser):
    wait_time = between(1, 2)

    ids = []

    items = (
        {'title': 'BIG MOUTH® BITES', 'description': 'Cuatro mini hamburguesas con tocino ahumado, queso Americano y aderezo Ranch.'},
        {'title': 'BIG BOSS BURGER', 'description': 'Hamburguesa de carne de res, queso cheddar, salchicha (30 g), carnitas (85 g), tocino, salsa honey chipotle.'},
        {'title': 'SWEET & SMOKEY BURGER', 'description': 'Hamburguesa de carne de res, queso Monterey Jack, aros de cebolla empanizados, tocino, lechuga.'},
        {'title': 'GUACAMOLE BURGER', 'description': 'Hamburguesa de carne de res, guacamole, queso Monterey Jack, jalapeños asados, pimiento verde.'},
        {'title': 'CHIPOTLE CHEDDAR BURGER', 'description': 'Hamburguesa de carne de res, queso Chipotle Cheddar, tocino, pepinillos caseros, lechuga.'},
        {'title': 'OLDTIMER WITH CHEESE', 'description': 'Hamburguesa de carne de res con mostaza, lechuga, jitomate, pepinillos caseros.'},
        {'title': 'MUSHROOM SWISS BURGER', 'description': 'Hamburguesa de carne de res con champiñones, queso Suizo, mayonesa, pepinillos caseros.'},
        {'title': 'BACON BURGER', 'description': 'Hamburguesa de carne de res con tocino, queso Cheddar, mayonesa, cebolla morada, pepinillos caseros.'},
        {'title': 'BBQ RANCH BURGER', 'description': 'Hamburguesa de carne de res con salsa BBQ, tiras de tocino, queso Cheddar, pepinillos caseros.'},
    )


    def on_start(self):
        with self.client.post(
            url = '/api/users/login',
            headers = {'Content-Type': 'application/json'},
            data = json.dumps({
                "email": "mirary@ermiry.com", 
                "password": "049ec1af7c1332193d602986f2fdad5b4d1c2ff90e5cdc65388c794c1f10226b"
            })
        ) as response:
            self.token = response.json()['token']

    
    # Main
    @task
    def main_top_level_route(self):
        with self.client.get(
            url = '/api/todo',
            catch_response = True
        ) as response:
            if response.status_code != 200:
                response.failure("Got status code " + str(response.status_code) + " instead of 200")


    @task
    def version_route(self):
        with self.client.get(
            url = '/api/todo/version',
            catch_response = True
        ) as response:
            if response.status_code != 200:
                response.failure("Got status code " + str(response.status_code) + " instead of 200")


    @task
    def auth_route(self):
        with self.client.get(
            url = '/api/todo/auth',
            headers = {'Authorization': self.token},
            catch_response = True
        ) as response:
            if response.status_code != 200:
                response.failure("Got status code " + str(response.status_code) + " instead of 200")
        

    # Items
    @task
    def get_items_route(self):
        with self.client.get(
            url = '/api/todo/items',
            headers = {'Authorization': self.token},
            catch_response = True
        ) as response:
            if response.status_code != 200:
                response.failure("Got status code " + str(response.status_code) + " instead of 200")
            else:
                for item in response.json():
                    self.ids.append(item['_id']) # to save _ids in express environment
                    # self.ids.append(item['_id']['$oid']) # to save _ids in pycerver environment

    
    @task
    def create_items_route(self):
        with self.client.post(
            url = '/api/todo/items',
            headers = {
                'Authorization': self.token,
                'Content-Type': 'application/json'
            },
            data = json.dumps(self.items[random.randint(0,8)]),
            catch_response = True
        ) as response:
            if response.status_code != 200:
                response.failure("Got status code " + str(response.status_code) + " instead of 200")
    

    @task
    def get_item_info_route(self):
        if len(self.ids) > 0:
            _id = self.ids[0]
            with self.client.get(
                url = '/api/todo/items/' + _id + '/info',
                headers = {'Authorization': self.token,},
                name = '/api/todo/items/:id/info',
                catch_response = True
            ) as response:
                if response.status_code != 200:
                    response.failure("Got status code " + str(response.status_code) + " instead of 200")


    @task
    def update_item_route(self):
        if len(self.ids) > 0:
            _id = self.ids[0]
            with self.client.put(
                url = '/api/todo/items/' + _id + '/update',
                headers = {
                    'Authorization': self.token,
                    'Content-Type': 'application/json'
                },
                data = json.dumps(self.items[random.randint(0,8)]),
                name = '/api/todo/items/:id/update',
                catch_response = True
            ) as response:
                if response.status_code != 200:
                    response.failure("Got status code " + str(response.status_code) + " instead of 200")


    @task
    def delete_item_route(self):
        if len(self.ids) > 0:
            _id = self.ids[0]
            with self.client.delete(
                url = '/api/todo/items/' + _id + '/remove',
                headers = {'Authorization': self.token,},
                name = '/api/todo/items/:id/remove',
                catch_response = True
            ) as response: 
                if response.status_code != 200:
                    response.failure("Got status code " + str(response.status_code) + " instead of 200")
                self.ids.remove(_id)
          

    # Users
    @task
    def users_top_level_route(self):
        with self.client.get(
            url = '/api/users',
            catch_response = True
        ) as response:
            if response.status_code != 200:
                response.failure("Got status code " + str(response.status_code) + " instead of 200")


    @task
    def users_login_route(self):
        with self.client.post(
            url = '/api/users/login',
            headers = {'Content-Type': 'application/json'},
            data = json.dumps({
                "email": "mirary@ermiry.com", 
                "password": "049ec1af7c1332193d602986f2fdad5b4d1c2ff90e5cdc65388c794c1f10226b"
            }),
            catch_response = True
        ) as response:
            if response.status_code != 200:
                response.failure("Got status code " + str(response.status_code) + " instead of 200")


    @task
    def users_register_route(self):
        if len(self.ids) > 0:
            name = self.ids[0]
            with self.client.post(
                url = '/api/users/register',
                headers = {'Content-Type': 'application/json'},
                data = json.dumps({
                    "name": name,
                    "username": name,
                    "email": name + "@ermiry.com",
                    "password": "049ec1af7c1332193d602986f2fdad5b4d1c2ff90e5cdc65388c794c1f10226b",
                    "confirm": "049ec1af7c1332193d602986f2fdad5b4d1c2ff90e5cdc65388c794c1f10226b"
                }),
                catch_response = True
            ) as response:
                if response.status_code != 200:
                    response.failure("Got status code " + str(response.status_code) + " instead of 200")