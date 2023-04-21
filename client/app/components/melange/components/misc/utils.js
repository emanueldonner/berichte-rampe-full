const getNodeIndex = (elements, child) => {
  const index = Array.prototype.indexOf.call(elements, child)
  return index
}

const randomHash = (length = 5) => {
  const hash = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length)
  return hash
}

const slug = string => {
  return string
    .toLowerCase()
    .replaceAll('ü', 'ue')
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ß', 'sz')
    .replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') // eslint-disable-line
    .replaceAll(' ', '-')
}

const _stringToObject = (string, object) => {
  return string.split('.').reduce((o, i) => o[i], object)
}

const throttle = function (fn, delay) {
  let timer = null
  return function () {
    const context = this; const args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

export { getNodeIndex, randomHash, slug, _stringToObject, throttle }
