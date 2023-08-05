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

# We have various assertions about the response that we want to check
[Asserts]
jsonpath "$.status" == "ok"
jsonpath "$.residence.houseType" == "condo"
jsonpath "$.residence.size" == 1200
jsonpath "$.residence.empty" == false

DELETE http://localhost:8080/residence/{{id}}
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg
