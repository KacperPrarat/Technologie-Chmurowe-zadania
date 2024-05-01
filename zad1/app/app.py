from flask import Flask

app=Flask(__name__)

@app.route("/hello",methods=["GET"])
def say_hello():
    return "<h1>Hello :) </h1>"

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=8080)