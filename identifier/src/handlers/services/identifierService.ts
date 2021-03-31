import Gsearch from '../../helpers/GoogleSearchHelper'

export class IdentifierService {
  async execute (barcode: string): Promise<string> {
    const name = await Gsearch.CodeToName(barcode)
    return name
  }
}
