module.exports = {
  dbUser: process.env.PGUSER || 'order_app_user',
  dbHost: process.env.PGUHOST || 'localhost',
  dbName: process.env.PGDATABASE || 'order_app',
  dbPassword: process.env.PGPASS || 'Tester321!',
  dbPort: process.env.PGPORT || 5432,
  appPort: process.env.PORT || 5000,
}