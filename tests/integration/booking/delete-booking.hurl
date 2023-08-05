# Authenticated POST to /booking/customer/
POST http://localhost:8080/booking/
Content-Type: application/json
# Include jwt auth
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg
{
  "employeeId": "64c6eb3602c0d3f4f6986095",
  "residenceId": "64c6a81e696feb195b478335",
  "serviceType": "casual",
  "frequency": "weekly",
  "startDate": "2023-07-29T00:00:00.000Z",
  "endDate": "2023-08-29T00:00:00.000Z",
  "specification": "Testing",
  "status": "ongoing"
}

# 1. We expect to get back an HTTP 200
HTTP/1.1 200
[Captures]
id: jsonpath "$.booking._id"

# Try to GET the booking we just posted
GET http://localhost:8080/booking/{{id}}
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg

# Confirm that the server returns expected result
HTTP/1.1 200
Content-Type: application/json; charset=utf-8


# Try to DELETE the booking we just posted
DELETE http://localhost:8080/booking/{{id}}
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg

# Confirm that the server returns 200
HTTP/1.1 200

# Try to GET the booking again
GET http://localhost:8080/booking/{{id}}
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg

# Confirm that the server returns 404
HTTP/1.1 404
[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 404
jsonpath "$.error.message" contains "not found"
