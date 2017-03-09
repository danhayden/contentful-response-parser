export const generateItemObject = (data, assets = null, entries = null) => {
  if (Array.isArray(data.items)) return generateItemObjectArray(data)[0]
  assets = assets || generateAssetsObject(data)
  entries = entries || generateEntriesObject(data, assets)
  const item = {}
  Object.keys(data.fields).forEach(key => {
    let fieldValue = data.fields[key]
    if (Array.isArray(fieldValue) && fieldValue[0].sys) {
      fieldValue = resolveLinkArray(fieldValue, assets, entries)
    } else if (fieldValue.sys) {
      fieldValue = resolveLink(fieldValue, assets, entries)
    }
    item[key] = fieldValue
  })
  return item
}

export const generateItemObjectArray = (data) => {
  const assets = generateAssetsObject(data)
  const entries = generateEntriesObject(data, assets)
  return data.items.map(datum => generateItemObject(datum, assets, entries))
}

const generateAssetsObject = (data) => {
  if (!data.includes) return {}
  const Asset = data.includes.Asset || []
  return Asset.reduce((result, value) => {
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
  const Entry = data.includes.Entry || []
  return Entry.reduce((result, value, key) => {
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
  return data.items.map(datum => resolveLink(datum, assets, entries))
}
