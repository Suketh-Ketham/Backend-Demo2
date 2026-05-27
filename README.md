How to make the route as authenticated?
when client made the request to login route which is a post request, it will login and store the token in cookie
login success
when client made the request to protected route, it will send the token in cookie
now any req will have the token in cookie, so we can create a middleware to check the token and verify it, if it is valid then we will allow the request to access the protected route otherwise we will return an error message.
