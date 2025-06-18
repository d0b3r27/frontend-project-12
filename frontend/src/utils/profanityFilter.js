import leoProfanity from 'leo-profanity'

const enDict = leoProfanity.getDictionary('en')
const ruDict = leoProfanity.getDictionary('ru')

leoProfanity.clearList()
leoProfanity.add([...enDict, ...ruDict])

export const cleanText = text => leoProfanity.clean(text)
export const containsProfanity = text => leoProfanity.check(text)
