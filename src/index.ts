import Gsearch from './identifier'

async function run(barcode: string): Promise<void> {
    const name = await Gsearch.CodeToName(barcode)
    console.log(name)
}

run('9780099477464')