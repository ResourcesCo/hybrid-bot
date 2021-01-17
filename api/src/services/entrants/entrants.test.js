import {
  entrants,
  entrant,
  createEntrant,
  updateEntrant,
  deleteEntrant,
} from './entrants'

describe('entrants', () => {
  scenario('returns all entrants', async (scenario) => {
    const result = await entrants()

    expect(result.length).toEqual(Object.keys(scenario.entrant).length)
  })

  scenario('returns a single entrant', async (scenario) => {
    const result = await entrant({ id: scenario.entrant.one.id })

    expect(result).toEqual(scenario.entrant.one)
  })

  scenario('creates a entrant', async (scenario) => {
    const result = await createEntrant({
      input: {
        name: 'String',
        body: 'String',
        postId: scenario.entrant.one.post.id,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.body).toEqual('String')
  })

  scenario('updates a entrant', async (scenario) => {
    const original = await entrant({ id: scenario.entrant.one.id })
    const result = await updateEntrant({
      id: original.id,
      input: { name: 'String4440297' },
    })

    expect(result.name).toEqual('String4440297')
  })

  scenario('deletes a entrant', async (scenario) => {
    const original = await deleteEntrant({ id: scenario.entrant.one.id })
    const result = await entrant({ id: original.id })

    expect(result).toEqual(null)
  })
})
