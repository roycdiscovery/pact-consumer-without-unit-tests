const { Matchers, Interaction } = require("@pact-foundation/pact");

module.exports = new Interaction()
  .given("Viewing my state")
  .uponReceiving("an /me GET request as an anonymous user")
  .withRequest({
    method: "GET",
    path: "/users/me",
    credentials: "include",
  })
  .willRespondWith({
    status: 200,
    body: {
      data: {
        id: Matchers.term({
          generate: "USERID:46da34dd-1cee-4404-9ca7-ce30cc8fd4a0",
          matcher: "^USERID:",
        }),
        type: "user",
        attributes: {
          selectedProfileId: Matchers.term({
            generate: "PROFILEID:c715f570-814c-4fb3-82d9-21aad2499bc7",
            matcher: "^PROFILEID:",
          }),
          packages: ["Free"],
          products: [],
          realm: Matchers.string("go"),
          anonymous: true,
          bucket: Matchers.term({
            generate: "A",
            matcher: "A|B",
          }),
          newsletterPreference: Matchers.string("NOT_YET_DECIDED"),
          currentLocationTerritory: Matchers.string("us"),
          tokensCount: Matchers.integer(0),
          clientTranslationLanguageTags: Matchers.eachLike("en"),
          currentLocationSovereignTerritory: Matchers.string("us"),
          derivedLanguageTags: Matchers.eachLike("en"),
          features: [],
        },
      },
    },
  });
