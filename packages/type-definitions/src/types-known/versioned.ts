const versioned = [
  {
    minmax: [0, 299] as any,
    types: {
      RefCount: 'RefCountTo259',
    },
  },
  {
    minmax: [300, 399] as any,
    types: {
      CurrencyId: {
        _enum: ['LAMI', 'AUSD', 'FEUR', 'FJPY', 'FBTC', 'FETH', 'FAUD', 'FCAD', 'FCHF', 'FXAU', 'FOIL', 'FGBP'],
      },
    },
  },
  {
    minmax: [400, undefined] as any,
    types: {},
  },
];

export default versioned;
