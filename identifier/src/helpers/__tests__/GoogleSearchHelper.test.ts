import Gsearch from '../GoogleSearchHelper'

describe('google search helper', () => {
  describe('query to string function', () => {
    it('should return an error if barcode does not exist', async () => {
      try {
        await Gsearch.QueryToString('97800994774649780099477464')
      } catch (err) {
        expect(err.message).toBe('This barcode does not exist on google.')
      }
    })

    it('should return an error if barcode contains invalid characters', async () => {
      try {
        await Gsearch.QueryToString('onlynumbers')
      } catch (err) {
        expect(err.message).toBe('This barcode contains invalid characters.')
      }
    })
  })

  describe('count words function', () => {
    it('should return an error if barcode does not exist', async () => {
      const words = Gsearch.CountWords('oi oi oi tudo tudo tudo bem bem bem com voce')
      expect(words).toEqual({ bem: 3, com: 1, oi: 3, tudo: 3, voce: 1 })
    })
  })

  describe('product name function', () => {
    it('should return the right name', async () => {
      const str = 'oi oi oi tudo tudo tudo bem bem bem com voce'
      const obj = { bem: 3, com: 1, oi: 3, tudo: 3, voce: 1 }
      const words = Gsearch.ProductName(str, obj)
      expect(words).toEqual('oi tudo')
    })
  })

  describe('code to name function', () => {
    it('should return the right product', async () => {
      const product = await Gsearch.CodeToName('9788580575132')
      expect(product).toEqual('rei de amarelo livro')
    })
  })
})
