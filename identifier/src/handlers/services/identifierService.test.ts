import { IdentifierService } from './identifierService'
const identifierService = new IdentifierService()

describe('identifier service', () => {
  it('should return the right product', async () => {
    const product = await identifierService.execute('9780099477464')
    expect(product).toBe('brave new world huxley aldous')
  })
})
