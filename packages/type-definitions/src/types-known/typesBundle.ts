const typesBundle = {
  spec: {
    laminar: {
      types: [
        {
          minmax: [0, 299] as any,
          types: {
            RefCount: 'RefCountTo259'
          }
        },
        {
          minmax: [300, undefined] as any,
          types: {}
        }
      ]
    }
  }
};

export default typesBundle;
