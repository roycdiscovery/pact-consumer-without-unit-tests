const { Matchers, Interaction } = require("@pact-foundation/pact");

module.exports = new Interaction()
  .given("I am logging in")
  .uponReceiving("a login request")
  .withRequest({
    method: "POST",
    path: "/login",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: {
      credentials: {
        username: Matchers.email("donotedit-non-geoblocked-free@test.com"),
        password: Matchers.string("testDplay1")
      }
    }
  })
  .willRespondWith({
    status: 200,
    headers: {
      "set-cookie": Matchers.term({
        generate: "st=1234567890qwertyuiop._",
        matcher: "^st="
      })
    }
  });
