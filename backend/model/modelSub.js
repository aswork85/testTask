var basemodel = require('./basemodel.js');

var modelSub = new basemodel.BaseModel();

modelSub.selectAllQuery = "select code,name from subdivisions order by code";
modelSub.addQuery = "INSERT INTO subdivisions (code, name) VALUES ($1, $2)";
modelSub.updateQuery = "UPDATE subdivisions SET name = $2 WHERE code = $1";
modelSub.deleteQuery = "DELETE FROM subdivisions WHERE code = ($1)";

exports.modelSub = modelSub;