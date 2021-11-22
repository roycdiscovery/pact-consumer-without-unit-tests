
# Building pactfiles without unit tests
In some cases it may be complicated to add the unit test coverage PACT offers to a consumer. The good news is that you benefit from the bi-directional testing in PACTFlow _before_ you have your unit tests worked out, bypassing the 'consumer request test' stage of pact testing.

The first option is to simply create the pact files manually, following the schema described [here](https://github.com/pact-foundation/pact-specification/tree/version-3). The downdside to that approach is that it's quite a complicated schema and will take time to get familiar with it (and therefore carries a high risk of user error).

A nicer approach is to create pact 'interaction' files and let PACT generate the pactfile for you, which is what this repo is delivering.

This is intended as a 'starting point' to get you up and running - feel free to adapt this to suit your needs when you implement it.

The process is the same as decsribed [here](https://discoveryinc.atlassian.net/wiki/spaces/GQA/pages/2886369708/Implementing+in+Consumer+code), but instead of the "[...test consumer application](https://discoveryinc.atlassian.net/wiki/spaces/GQA/pages/2886369708/Implementing+in+Consumer+code#2.-Start-mock-provider-and-test-consumer-application)" step, follow these steps:

**1.** Create your 'interaction' files in `./interactions` (see [here](https://discoveryinc.atlassian.net/wiki/spaces/GQA/pages/2886369708/Implementing+in+Consumer+code#1.-Create-interaction-files) for a description on how to make them).

**2.** _(First time only)_
We're using 'docker' to remove the need to install node / pact etc... 
```bash
docker build -t generate-pactfile .
```


**3.** _(Do this any time you want to rebuild your pactfile)_

- PACT_CONSUMER_NAME: the name you want this contract to be known as in the _PACTFlow_ service.
- PACT_PROVIDER_NAME: the name your provider is known as in the _PACTFlow_ service.
```bash
docker run \
  -e PACT_CONSUMER_NAME="my_consumer" \
  -e PACT_PROVIDER_NAME="my_provider" \
  -v $(pwd)/pactfiles:/pactfiles \
  -v $(pwd)/interactions:/interactions \
  -v $(pwd)/logs:/logs \
  --rm \
  generate-pactfile
```

Your pact file will be generated in _./pactfiles_, and can now be used to verify your contract with your provider and protect you from new breaking provider changes. Follow the pipeline instructions described [here](https://discoveryinc.atlassian.net/wiki/spaces/GQA/pages/2886369708/Implementing+in+Consumer+code#2.-Is-the-consumer-specification-compatible-with-the-current-provider-specification%3F).

Later, if you solve the issues around getting PACT unit tests to work you can use the same interaction files and simply replace the process above with your 'consumer request tests'.