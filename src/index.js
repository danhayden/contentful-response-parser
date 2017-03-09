import { reduce, get, isArray, isObject, map } from 'lodash'

export const generateItemObject = (data, assets = null, entries = null) => {
  if (isArray(data.items)) return generateItemObjectArray(data)[0]
  assets = assets || generateAssetsObject(data)
  entries = entries || generateEntriesObject(data, assets)
  return reduce(data.fields, (result, value, key) => {
    let fieldValue = data.fields[key]
    if (isArray(fieldValue) && fieldValue[0].sys) {
      fieldValue = resolveLinkArray(fieldValue, assets, entries)
    } else if (isObject(fieldValue) && fieldValue.sys) {
      fieldValue = resolveLink(fieldValue, assets, entries)
    }
    result[key] = fieldValue
    return result
  }, {})
}

export const generateItemObjectArray = (data) => {
  const assets = generateAssetsObject(data)
  const entries = generateEntriesObject(data, assets)
  return map(data.items, datum => generateItemObject(datum, assets, entries))
}

const generateAssetsObject = (data) => {
  if (!data.includes) return {}
  const Asset = get(data, 'includes.Asset', [])
  return reduce(Asset, (result, value) => {
    result[value.sys.id] = {
      title: value.fields.title,
      url: `https:${value.fields.file.url}`,
      description: value.fields.description
    }
    return result
  }, {})
}

const generateEntriesObject = (data, assets) => {
  if (!data.includes) return {}
  const Entry = get(data, 'includes.Entry', [])
  return reduce(Entry, (result, value, key) => {
    result[value.sys.id] = generateItemObject(value, assets)
    return result
  }, {})
}

const resolveLink = (item, assets, entries) => {
  if (item.sys.linkType === 'Asset') {
    return assets[item.sys.id] || {}
  } else if (item.sys.linkType === 'Entry') {
    return entries[item.sys.id] || {}
  }
}

const resolveLinkArray = (data, assets = {}, entries = {}) => {
  return map(data.items, datum => resolveLink(datum, assets, entries))
}
