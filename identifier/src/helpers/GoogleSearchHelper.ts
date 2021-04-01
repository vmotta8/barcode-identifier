/* eslint-disable array-callback-return */
import { google } from 'googleapis'
import createError from 'http-errors'
const customSearch = google.customsearch('v1')

class Gsearch {
  async QueryToString (query: string): Promise <string> {
    try {
      BigInt(query)
    } catch {
      throw new createError.BadRequest('This barcode contains invalid characters.')
    }

    const response = await customSearch.cse.list({
      auth: process.env.CUSTOM_SEARCH_API_KEY,
      cx: process.env.SEARCH_ENGINE_ID,
      q: query,
      num: 10
    })

    const itemsList = response.data.items

    if (!itemsList) {
      throw new createError.BadRequest('This barcode does not exist on google.')
    }

    const titleList = itemsList.map((item) => {
      return item.title!.toLowerCase()
    })

    const titleString = titleList.join(' ')

    let formattedString = titleString.replace(/[^A-Za-z0-9çÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ ]/g, '')
    formattedString = formattedString.replace(new RegExp(query, 'g'), '')
    formattedString = formattedString.replace(/\s\s+/g, ' ').trim()

    return formattedString
  }

  CountWords (str: string): { [x: string]: number } {
    const arr = str.split(' ')
    const newArr: string[] = []

    arr.map((item) => {
      if (item.length > 1) {
        newArr.push(item)
      }
    })

    const CountedWords = {} as any

    newArr.map((item) => {
      if (!CountedWords[item]) {
        CountedWords[item] = 1
      } else {
        CountedWords[item] += 1
      }
    })

    return CountedWords
  }

  ProductName (str: string, countedWords: { [x: string]: number }): any {
    const keysSorted = Object.keys(countedWords).sort(function (a, b) { return countedWords[b] - countedWords[a] })

    const n = countedWords[keysSorted[0]] * 0.6
    let nameArr = []
    for (const name of keysSorted) {
      if (countedWords[name] >= n) {
        nameArr.push(name)
      }
    }

    const obj: any = {}
    for (const name of nameArr) {
      const regex = new RegExp('\\b' + name + '\\b')
      const index = str.search(regex)
      obj[name] = index
    }

    nameArr = Object.keys(obj).sort(function (a, b) { return obj[a] - obj[b] })

    let nameStr = ''
    for (const name of nameArr) {
      nameStr += name + ' '
    }

    return nameStr.trim()
  }

  async CodeToName (codeNumber: string): Promise<string> {
    const str = await this.QueryToString(codeNumber)
    const obj = this.CountWords(str)
    const name = this.ProductName(str, obj)

    return name
  }
}

export default new Gsearch()
