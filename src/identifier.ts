import { google } from 'googleapis'

import Secrets from '../config/secrets.config'

const customSearch = google.customsearch('v1')

class Gsearch {
  async TitleString (query: string) {
    const response = await customSearch.cse.list({
      auth: Secrets.CUSTOM_SEARCH_API_KEY,
      cx: Secrets.SEARCH_ENGINE_ID,
      q: query,
      num: 10
    })

    const itemsList = response.data.items

    if (itemsList === undefined) {
      return 'Doesnt exist onGoogle'
    }

    const titleList = itemsList!.map((item) => {
      return item.title!.toLowerCase()
    })

    const titleString = titleList.join(' ')

    const formattedString = titleString.replace(/[^A-Za-z0-9çÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ ]/g, '')
    const formattedString2 = formattedString.replace(new RegExp(query, 'g'), '')
    const formattedString3 = formattedString2.replace(/\s\s+/g, ' ').trim()

    return formattedString3
  }

  CountWords (str: string) {
    const arr = str.split(' ')
    const newArr: Array<string> = []

    arr.map((item) => {
      if (item.length > 1) {
        newArr.push(item)
      }
    })

    const CountedWords = {} as any

    newArr.map((item) => {
      if (CountedWords[item] === undefined) {
        CountedWords[item] = 1
      } else {
        CountedWords[item] += 1
      }
    })

    return CountedWords
  }

  ProductName (CountedWords: { [x: string]: number }) {
    const keysSorted = Object.keys(CountedWords).sort(function (a, b) { return CountedWords[b] - CountedWords[a] })

    const nameArr = keysSorted.slice(0, 3)

    const nameStr = `${nameArr[0]} ${nameArr[1]} ${nameArr[2]}`

    return nameStr
  }

  async CodeToName (codeNumber: string) {
    const str = await this.TitleString(codeNumber)
    const obj = this.CountWords(str)
    const name = this.ProductName(obj)

    return name
  }
}

export default new Gsearch()