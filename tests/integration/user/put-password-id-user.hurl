# Authenticated PUT to /user/password/:id
PUT http://localhost:8080/user/password/64c6eb3602c0d3f4f6986095
Content-Type: application/json
# Include jwt auth
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg
{
  "password": "123456",
  "password2": "123456"
}

# 1. We expect to get back an HTTP 200
HTTP/1.1 200

# We have various assertions about the response that we want to check
[Asserts]
jsonpath "$.status" == "ok"
