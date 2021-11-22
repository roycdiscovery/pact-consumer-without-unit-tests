const { Matchers, Interaction } = require("@pact-foundation/pact");

module.exports = new Interaction()
  .given("I am requesting a token")
  .uponReceiving("a request for a token")
  .withRequest({
    method: "GET",
    path: "/token",
    query: {
      deviceId: Matchers.string("abc123"),
      realm: Matchers.string("go"),
      shortlived: "true",
    },
  })
  .willRespondWith({
    status: 200,
    headers: {
      "set-cookie": Matchers.term({
        generate: "st=1234567890qwertyuiop._",
        matcher: "^st=",
      }),
    },
    body: {
      data: {
        attributes: {
          realm: Matchers.string("go"),
          token: Matchers.string("1234567890qwertyuiop._"),
        },
        id: Matchers.term({
          generate: "token-1234567890qwertyuiop-",
          matcher: "^token-",
        }),
        type: "token",
      },
    },
  });
