const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let profesiones = {
  values: ['ESTUDIANTE', 'DESEMPLEADO', 'INDEPENDIENTE', 'EMPLEADO'],
  message: '{VALUE} no es una profesion válida'
};

let estadosCiviles = {
  values: ['SOLTERO/A', 'CASADO/A', 'DIVORCIADO/A', 'VIUDO/A'],
  message: '{VALUE} no es un estado civil válido'
};

let clientSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es necesario']
  },
  password: {
    type: String,
    required: [true, 'El password es necesario']
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  edad: {
    type: Number,
    required: [true, 'La edad es necesaria']
  },
  sexo: {
    type: String,
    required: [true, 'El sexo es necesario']
  },
  ciudad: {
    type: String,
    required: [true, 'La ciudad es necesaria']
  },
  direccion: {
    type: String,
    required: [true, 'La direccion es necesaria']
  },
  estadoCivil: {
    type: String,
    required: [true, 'El estado civil es necesario'],
    enum: estadosCiviles
  },
  profesion: {
    type: String,
    required: [true, 'La profesion es necesaria'],
    enum: profesiones
  }
});

//Modifico el metodo toJSON para no retornar el password
clientSchema.methods.toJSON = function() {
  let client = this;
  let clientObject = client.toObject();
  delete clientObject.password;

  return clientObject;
};

clientSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Client', clientSchema);
