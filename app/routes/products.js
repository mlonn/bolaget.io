import escape from 'escape-string-regexp'
import { mongoose } from '../lib/connections'
import { fuzzySearch, stringToBool } from '../lib/utils'

export default async (ctx, next) => {
  const Product = mongoose.model('Product')
  const maxLimit = 100

  const limit = parseInt(ctx.query.limit, 10) || 10
  const skip = parseInt(ctx.query.skip, 10) || 0
  const ecological = stringToBool(ctx.query.ecologial)
  const ethical = stringToBool(ctx.query.ethical)
  const koscher = stringToBool(ctx.query.koscher)
  const year_from = parseInt(ctx.query.year_from, 10) || 0
  const year_to = parseInt(ctx.query.year_to, 10) || 0
  const price_from = parseInt(ctx.query.price_from, 10) || 0
  const price_to = parseInt(ctx.query.price_to, 10) || 0
  const volume_from = parseInt(ctx.query.volume_from, 10) || 0
  const volume_to = parseInt(ctx.query.volume_to, 10) || 0
  const sort = ctx.query.sort || 'name'
  const name = ctx.query.name
  const type = ctx.query.type
  const style = ctx.query.style
  const product_group = ctx.query.product_group

  if (limit > maxLimit) {
    limit = maxLimit
  }

  let filter = {}
  if (ecological) {
    Object.assign(filter, { ecological: true })
  }

  if (ethical) {
    Object.assign(filter, { ethical: true })
  }

  if (koscher) {
    Object.assign(filter, { koscher: true })
  }

  if (product_group) {
    let regexp = new RegExp(`^${escape(product_group)}$`, 'i');
    Object.assign(filter, { product_group: regexp })
  }

  if (name) {
    Object.assign(filter, { name: fuzzySearch(name) })
  }

  if (type) {
    Object.assign(filter, { type: fuzzySearch(type) })
  }

  if (style) {
    Object.assign(filter, { style: fuzzySearch(style) })
  }

  if (price_from) {
    Object.assign(filter, { price: { $gte: price_from } })
  }

  if (price_to) {
    Object.assign(filter, { price: { $lte: price_to } })
  }

  if (price_from && price_to) {
    Object.assign(filter, { price: { $gte: price_from, $lte: price_to } })
  }

  if (volume_from) {
    Object.assign(filter, { volume_in_milliliter: { $gte: volume_from } })
  }

  if (volume_to) {
    Object.assign(filter, { volume_in_milliliter: { $lte: volume_to } })
  }

  if (volume_from && volume_to) {
    Object.assign(filter, { volume_in_milliliter: { $gte: volume_from, $lte: volume_to } })
  }

  if (year_from) {
    Object.assign(filter, { year: { $gte: year_from } })
  }

  if (year_to) {
    Object.assign(filter, { year: { $lte: year_to } })
  }

  if (year_from && year_to) {
    Object.assign(filter, { year: { $gte: year_from, $lte: year_to } })
  }

  const getProducts = Product.find(filter, { _id: 0 })
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .exec()

  const getCount = Product.count(filter).exec()

  const [products, count] = await Promise.all([getProducts, getCount])

  if (products.length <= 0) {
    let e = new Error(`Products doesn't exists`)
    e.status = 404
    throw e
  }

  ctx.set('X-Total-Count', count)
  ctx.body = products
}
