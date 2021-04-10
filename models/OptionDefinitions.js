// command line option definition
module.exports = [
  {
    name: 'url',
    alias: 'u',
    type: String
  },
  {
    name: 'output',
    alias: 'o',
    type: String,
    defaultValue: "screenshot.png"
  },
  {
    name: "width",
    alias: 'w',
    type: Number,
    defaultValue: 1280
  },
  {
    name: 'height',
    alias: 'h',
    type: Number,
    defaultValue: 800,
  },
  {
    name: 'list',
    alias: 'l',
    type: String,
  },
  {
    name: 'multiple',
    alias: 'm',
    type: Number,
    defaultValue: 10,
  },
  {
      name: 'createdir',
      alias: 'd',
      type: Boolean,
      defaultValue: false,
  },
  {
      name: 'usetimestamp',
      alias: 't',
      type: Boolean,
      defaultValue: false,
  },
  {
      name: 'forcecapture',
      alias: 'f',
      type: Boolean,
      defaultValue: false,    
  }
  
];
