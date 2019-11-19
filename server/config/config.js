// =================
// Puerto
// =================
process.env.PORT = process.env.PORT || 3000;

// =================
// Entorno
// =================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================
// Base de datos
// =================
let urlDB;
let local = 'mongodb://localhost:27017/VaSo&AsociadosLtda';
let online = process.env.MONGO_URI;
process.env.NODE_ENV === 'dev' ? (urlDB = local) : (urlDB = online);

process.env.URLDB = urlDB;

// =================
// Token
// =================
process.env.CADUCIDAD_TOKEN = '12h';
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'este-es-el-seed-desarrollo';

// TODO: Crear variables de entorno para el seed y la bd
