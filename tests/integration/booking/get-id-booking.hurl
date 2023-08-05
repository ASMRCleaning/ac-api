# Authenticated GET to /booking/
GET http://localhost:8080/booking/64c6a895696feb195b478345
# Include jwt auth
Authorization: jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM2ZWIzNjAyYzBkM2Y0ZjY5ODYwOTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE2OTExNjU0NDh9.96griXpQPaueWEa8gk6NLAeQu4Be2UZj2Z0Gnaarqbg


# 1. We expect to get back an HTTP 200
HTTP/1.1 200
# We have various assertions about the response that we want to check
[Asserts]
jsonpath "$.status" == "ok"
jsonpath "$.bookings._id" matches "^[0-9a-z]{24}$"
jsonpath "$.bookings._id" == "64c6a895696feb195b478345"
