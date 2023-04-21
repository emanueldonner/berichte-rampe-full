const properties = {
  label: { type: String },
  placeholder: { type: String },
  url: { type: String },
  searchlabel: { type: String },
  dismisslabel: { type: String },
  isOpen: { type: Boolean, reflect: true },
  totalChecked: { type: Number, attribute: false },
  allOptions: { type: Object, attribute: false },
  totalSelected: { type: Number, attribute: false }
}

const propertyDetails = [
  {
    title: 'Label',
    key: 'label',
    component_properties: properties.label,
    description: 'Bezeichnung für das Dropdown.',
    options: [
      { value: "'Erweitere Filter'", default: true },
      { value: 'Beliebiger String' }
    ]
  },
  {
    title: 'Platzhalter',
    key: 'placeholder',
    component_properties: properties.placeholder,
    description: 'Platzhaltertext im Eingabefeld',
    options: []
  },
  {
    title: 'Suchen',
    key: 'searchlabel',
    component_properties: properties.searchlabel,
    description: 'Text für Suchen-Button',
    options: [
      { value: "'Suchen'", default: true },
      { value: 'Beliebiger String' }
    ]
  },
  {
    title: 'Schliessen',
    key: 'dismisslabel',
    component_properties: properties.dismisslabel,
    description: 'Text für Schliessen-Button',
    options: [
      { value: "'Schliessen'", default: true },
      { value: 'Beliebiger String' }
    ]
  },
  {
    title: 'Offen',
    key: 'isOpen',
    component_properties: properties.isOpen,
    description: 'Dropdown geöffnet darstellen',
    options: [
      { value: 'Boolsches Attribut (kein Wert)' }
    ]
  }
]

const meta = {
  tag: 'wm-filter-dropdown',
  properties: propertyDetails
}

export { meta, properties }
