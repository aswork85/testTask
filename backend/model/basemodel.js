// It's constructor to connect & create request to Batabase
var BaseModel = function () {
    this.database = require("pg");
    
    // names of the requests type I will do
    this.selectAllQuery = "";
    this.addQuery = "";
    this.updateQuery = "";
    this.deleteQuery = "";
    
    this.connectionString = "pg://postgres@localhost:5432/db";
};
     
    BaseModel.prototype.getClient = function(){
        var _client = new this.database.Client(this.connectionString);
        _client.connect();
        return _client;
    }; 
    
    // request to read all records
    BaseModel.prototype.readAll = function (res) {
        // connect to db
        var  client = this.getClient();
        
        // make a request to db
        var query = client.query(this.selectAllQuery);
        
        // process a request -------------
        
        //add to array received records 
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on('error', function (error){
            console.log("Error during reading all records: " + error);          
            res.status(500).send('500, internal server error');
        });

        query.on('end', function(result){
            client.end();
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(result.rows));
        });
        // ---------------------
    };
        
        // request to add new record
    BaseModel.prototype.add = function(res, params){
        // connect to database
        var  client = this.getClient();
              
        var query = client.query(this.addQuery,params);
        
        query.on('error', function(error){
            console.log("Error during adding record: " + error);
            res.status(500).send('500, internal server error');
        });
        query.on('end', function(){
            client.end();
            res.end();
        });
    };
    
    // request to update record
    BaseModel.prototype.update = function(res, params){
        // connect to database
        var  client = this.getClient();
        
        var query = client.query(this.updateQuery,params);
        query.on('error', function (error){
            console.log("Error during reading all records: " + error);          
            res.status(500).send('500, internal server error');
        });
        query.on('end', function(){
            client.end();
            res.end();
        });

    };
    
    // request to delete record
    BaseModel.prototype.delete = function(res, params){
        var  client = this.getClient();
        
        var query = client.query(this.deleteQuery,params);
        query.on('error', function(error){
            console.log("Error during removing record: " + error);
            res.status(500).send('500, internal server error');
        });
        query.on('end', function(){
            client.end();
            res.end();
        });
    };

exports.BaseModel = BaseModel;


