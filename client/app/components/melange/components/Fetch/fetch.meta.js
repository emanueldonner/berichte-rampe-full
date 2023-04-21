const properties = {
  pagination: { type: String },
  skeleton: { type: String },
  itemsPerPage: { type: Number },
  itemsPerSet: { type: Number },
  _results: { type: Array },
  fetchUrl: { type: String },
  fetchSource: { type: String },
  fetchTarget: { type: String },
  fetchType: { type: String },
  fetchLoading: { type: String }
}

const propertyDetails = [
  {
    title: 'Filter hervorheben',
    key: 'bg',
    component_properties: properties.bg,
    description: 'Filter mit oder ohne Hintergrund.',
    options: []
  }
]

const meta = {
  tag: 'wm-filter',
  properties: propertyDetails
}

export { meta, properties }
