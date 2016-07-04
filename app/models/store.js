import mongoose from 'mongoose'
import { capitalize } from '../lib/utils'

const Schema = mongoose.Schema

function reduce (data) {
  return data['BUTIKEROMBUD']['BUTIKOMBUD']
}

function transformOpeningHours (str) {
  let list = str ? str.split(/;;;0?\-?;/g) : []

  list = list.filter(str => {
    return str.length > 0
  })

  const formattedStr = list.map(str => {
    let opening = str.replace('_*', '').split(';')
    const [day, openingHours, closingHours] = opening

    return `${day} ${openingHours}-${closingHours}`
  })

  return formattedStr
}

function transformLabels (str) {
  const labels = str.split(';')

  return labels.map(capitalize)
}

function transformPhone (str) {
  return str.replace(/[\/\-]|\s/g, '')
}

const mapping = {
  NR: 'nr',
  NAMN: 'name',
  TYP: 'type',
  ADDRESS1: 'address',
  ADDRESS2: 'additional_address',
  ADDRESS3: 'zip_code',
  ADDRESS4: 'city',
  ADDRESS5: 'county',
  TELEFON: 'phone',
  BUTIKSTYP: 'shop_type',
  TJANSTER: 'services',
  SOKORD: 'labels',
  OPPETTIDER: 'opening_hours',
  RT90X: 'RT90x',
  RT90Y: 'RT90y'
}

const Store = new Schema({
  nr: { type: String, index: true, required: true },
  name: { type: String, index: true, default: '' },
  type: { type: String, index: true, default: '' },
  address: { type: String, index: true, default: '' },
  additional_address: { type: String, index: true, default: '' },
  zip_code: { type: String, index: true, default: '' },
  city: { type: String, index: true, default: '', set: capitalize },
  county: { type: String, index: true, default: '' },
  phone: { type: String, index: true, default: '', set: transformPhone },
  shop_type: { type: String, index: true, default: '' },
  services: { type: String, index: true, default: '' },
  labels: { type: Array, index: true, default: [], set: transformLabels },
  opening_hours: { type: Array, index: true, default: [], set: transformOpeningHours },
  RT90x: { type: Number, index: true, default: null },
  RT90y: { type: Number, index: true, default: null }
})

mongoose.model('Store', Store)

export { mapping, reduce }
