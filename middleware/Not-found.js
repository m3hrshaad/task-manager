const notFound = (req, res) => res.status(404).send('Rout does not exist')

module.exports = notFound;
