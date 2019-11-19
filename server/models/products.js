const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let productSchema = new Schema({
  nombre: {
    type: String,
    unique: true,
    required: [true, 'El nombre es necesario']
  },
  opiniones: {
    type: [{ cliente: Schema.Types.ObjectId, opinion: String }],
    required: true,
    default: []
  }
});

clientSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Product', productSchema);
