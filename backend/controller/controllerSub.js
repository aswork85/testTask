var modelSub = require('../model/modelSub.js');

// pars url & handle control to Model with parameters
var initSubController = {
    allSub: function(res){
        var sub = modelSub.modelSub;
        sub.readAll(res); 
    },
    addSub: function(req,res){
        var code = req.body.code;
        var name = req.body.name;
        var sub = modelSub.modelSub;
        sub.add(res, [code,name]);
    },
    updateSub: function(req,res){
        var code = req.body.code;
        var newName = req.body.newName;
        var sub = modelSub.modelSub;
        sub.update(res, [code, newName]);
    },
    deleteSub: function(req,res){
        var code = req.body.code;
        var sub = modelSub.modelSub;
        sub.delete(res,[code]);
    },
};

exports.initSubController = initSubController;