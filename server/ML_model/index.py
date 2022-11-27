from flask import Flask, jsonify, request, json, session
from flask_restful import Api, Resource
from test import send

app = Flask(__name__)
api = Api(app)


# @app.route("/test")
# def test():
#     name = "Hello There"
#     print(name)
#     return jsonify({'fname': name[0]})


# @app.route("/attendance")
# def attendance():
#     ans = send('Hi there')
#     return jsonify({'res': ans})


class Test(Resource):
    def get(self):
        print("Testing route called")
        return {'data': 'message reached'}


api.add_resource(Test, "/attendance")


if __name__ == '__main__':
    print("Server has started at port:6001")
    app.run(port=6001)
