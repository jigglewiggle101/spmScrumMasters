export default {
  'residential': () => {
      return {
          id: 'residential',
          height: 1,
          updated: true,
          update: function() {
              if (Math.random() < 0.01) {
                  if (this.height < 5) {
                      this.height += 1;
                      this.updated = true;
                  }
              }
          }
      }
  },
  'commercial': () => {
      return {
          id: 'commercial',
          height: 1,
          updated: true,
          update: function() {
              if (Math.random() < 0.01) {
                  if (this.height < 5) {
                      this.height += 1;
                      this.updated = true;
                  }
              }
          }
      }
  },
  'park': () => {
      return {
          id: 'park',
          height: 1,
          updated: true,
          update: function() {
              if (Math.random() < 0.01) {
                  if (this.height < 5) {
                      this.height += 1;
                      this.updated = true;
                  }
              }
          }
      }
  },
  'road': () => {
      return {
          id: 'road',
          updated: true,
          update: function() {
              this.updated = false;
          }
      }
  },
  'industrial': () => {
      return {
          id: 'industrial',
          height: 1,
          updated: true,
          update: function() {
              if (Math.random() < 0.01) {
                  if (this.height < 5) {
                      this.height += 1;
                      this.updated = true;
                  }
              }
          }
      }
  }
};

