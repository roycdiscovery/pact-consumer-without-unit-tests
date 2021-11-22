
# Building pactfiles without uniit tests
In some cases it may be complicated to add the unit test coverage PACT offers to a consumer. To avoid being held up, this solution lets you benefit from the bi-directional testing in PACTFlow _before_ you have your unit tests worked out.

It is intended as a 'starting point' to get you up and running - feel free to adapt this to suit your needs when you implement it.

The process is the same as decsribed [here](https://discoveryinc.atlassian.net/wiki/spaces/GQA/pages/2886369708/Implementing+in+Consumer+code), but instead of the "[...test consumer application](https://discoveryinc.atlassian.net/wiki/spaces/GQA/pages/2886369708/Implementing+in+Consumer+code#2.-Start-mock-provider-and-test-consumer-application)" step, follow thes steps:

1. Create your 'interaction' files in `./interactions` (see [here](https://discoveryinc.atlassian.net/wiki/spaces/GQA/pages/2886369708/Implementing+in+Consumer+code#1.-Create-interaction-files) for a description on how to make them).

1. _(First time only)_
We're using 'docker' to remove the need to install node / pact etc... 
```bash
docker build -t generate-pactfile .
```

2. _(Do this any time you want to rebuild your pactfile)_

- PACT_CONSUMER_NAME: the name you want this contract to be known as in the _PACTFlow_ service.
- PACT_PROVIDER_NAME: the name your provider is known as in the _PACTFlow_ service.
```bash
docker run \
  -e PACT_CONSUMER_NAME="my_consumer" \
  -e PACT_PROVIDER_NAME="my_provider" \
  -v $(pwd)/pactfiles:/pactfiles \
  -v $(pwd)/interactions:/interactions \
  --rm \
  generate-pactfile
```

Your pact file will be generated in _./pactfiles_, and can now be used to verify your contract with your provider and protect you from new breaking provider changes. Follow the pipeline instructions described [here](https://discoveryinc.atlassian.net/wiki/spaces/GQA/pages/2886369708/Implementing+in+Consumer+code#2.-Is-the-consumer-specification-compatible-with-the-current-provider-specification%3F).

Later, if you solve the issues arund getting PACT unit tests to work you can use the same interaction files and simply replace the process above with your PACT unit tests.