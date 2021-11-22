require('isomorphic-fetch')

const fs = require('fs')
const { Pact } = require('@pact-foundation/pact')
const interactionsFolder = './interactions'
const pactFolder = './pactfiles'
const logs = './logs'

const { PACT_CONSUMER_NAME, PACT_PROVIDER_NAME } = process.env

const provider = new Pact({
  dir: pactFolder,
  consumer: PACT_CONSUMER_NAME,
  provider: PACT_PROVIDER_NAME,
  log: `${logs}/pact_log.txt`
})

const buildQuery = (query = {}) => {
  const keys = Object.keys(query)

  return keys.reduce((acc, key) => {
    const queryItem = query[key]
    const value = queryItem.contents || queryItem
    return `${acc}${acc ? '&' : '?'}${key}=${value}`
  }, '')
}

const buildBody = (body = {}) => {
  const { data, contents } = body
  const value = (data || {}).generate || contents
  if (value) {
    return value
  }

  const keys = Object.keys(body)
  return keys.reduce((acc, key) => {
    const item = body[key]

    if (typeof item !== 'function') {
      acc[key] = buildBody(item)
    }

    return acc
  }, {})
}

const buildRequest = interaction => {
  const interactionJson = interaction.json()
  const path = interactionJson.request.path
  const method = interactionJson.request.method
  const headers = interactionJson.request.headers
  const query = buildQuery(interactionJson.request.query)
  const body = buildBody(interactionJson.request.body)

  return {
    path,
    method,
    headers,
    query,
    body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined
  }
}

const generatePactFile = async () => {
  const { port } = await provider.setup()
  mockProviderUrl = `http://localhost:${port}`

  const promises = fs
    .readdirSync(interactionsFolder)
    .filter(file => file.match(/.js$/))
    .map(async interactionFile => {
      const interaction = require(`${interactionsFolder}/${interactionFile}`)

      await provider.addInteraction(interaction)

      const { path, method, headers, query, body } = buildRequest(interaction)
      const url = mockProviderUrl + path + query
      await fetch(url, { headers, method, body })
    })

  await Promise.all(promises)

  await provider.verify()
  await provider.finalize()
}

generatePactFile()
