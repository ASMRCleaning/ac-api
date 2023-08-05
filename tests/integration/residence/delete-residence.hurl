# Authenticated POST to /residence/
POST http://localhost:8080/residence/
Content-Type: application/json
# Include jwt auth
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg
{
  "houseType": "condo",
  "size": 1200,
  "empty": false,
  "furnished": true,
  "pet": true,
  "bedroom": 10,
  "bathroom": 10,
  "den": 10,
  "address": {
    "streetAddress": "address",
    "unit": "unit 1",
    "postalCode": "A1B2C3",
    "city": "Toronto",
    "province": "Ontario",
    "country": "CA"
  }
}

# 1. We expect to get back an HTTP 201
HTTP/1.1 201
[Captures]
id: jsonpath "$.residence._id"

# Try to GET the booking we just posted
GET http://localhost:8080/residence/{{id}}
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg

# Confirm that the server returns expected result
HTTP/1.1 200
Content-Type: application/json; charset=utf-8


# Try to DELETE the booking we just posted
DELETE http://localhost:8080/residence/{{id}}
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg

# Confirm that the server returns 200
HTTP/1.1 200

# Try to GET the booking again
GET http://localhost:8080/residence/{{id}}
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg

# Confirm that the server returns 404
HTTP/1.1 404
[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 404
jsonpath "$.error.message" contains "not found"
