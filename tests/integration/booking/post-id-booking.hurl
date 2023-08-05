# Authenticated POST to /booking/customer/:id
POST http://localhost:8080/booking/customer/64c6a7e2696feb195b47832d
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
# We have various assertions about the response that we want to check
[Asserts]
jsonpath "$.status" == "ok"
jsonpath "$.booking._id" matches "^[0-9a-zA-Z]{24}$"
jsonpath "$.booking.customerId" == "64c6a7e2696feb195b47832d"
