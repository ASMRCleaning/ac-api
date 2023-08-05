# Unauthenticated POST to /residence
POST http://localhost:8080/residence

# 1. We expect to get back an HTTP 401
HTTP/1.1 401
# We have various assertions about the response that we want to check
[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.message" isString
jsonpath "$.error.message" == "Unauthorized"
jsonpath "$.error.code" == 401
