// in this code I use ReactBootstrap 
/*
 * AddSubdivision, DeleteSubdivision, UpdateSubdivision, AllSubdivision  - it's buttons
 * when you click to button, you make an appropriate request to the server
 * 
 * for a exemple, when you click "AddSubdivision", you recieve all Subdivisions in the database table
 * when you click "pdateSubdivision", you will see modal window for updating. After Submit, all data send to server
 */



// modal window "Add Subdivision"
window.AddSubdivision = React.createClass({
    propTypes: function(){
        //resposible for hide "Add subdivision" modal window
        hideAddSub: React.propTypes.func.isRequired;
        //responsible for hide table "Subdivisions"
        hideAllSub: React.propTypes.func.isRequired;
    },
    // hide "Add subdivision" modal window
    hideModal: function(){  this.props.hideAddSub();  },
    // sent data to server
    sent: function(){
        var code = this.refs.addSubCode.value;
        var name = this.refs.addSubName.value;
        
        axios.post("http://127.0.0.1:8888/addSubdivision", {
            code : code,
            name : name
        })
            .then(
                function(){
                    // after data has been sent to server, we hide Subdivision table 
                    this.props.hideAllSub();
                    // notify that data has been changed 
                    observer.notify("All_subdivisions");
                }.bind(this)
            )
            
            .catch(function (error) {
                console.log(error);
            });
    },
    render: function(){
        return (
            <div className="static-modal">
                <Modal show={true} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">Add subdivision</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <span>Code : &nbsp;</span><input type="text" placeholder=" &nbsp;code" ref="addSubCode" /><br/>
                        <span>Name : &nbsp;</span><input type="text" placeholder=" &nbsp;name" ref="addSubName" /><br/>   
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.sent}>Save</Button>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
        
    }
});
// modal window "Delete Subdivision"
window.DeleteSubdivision = React.createClass({
    propTypes: function(){
        params: React.PropTypes.array.isRequired;
        // responcible for hiding modal window "Delete Subdivision" 
        hideDeleteSub: React.PropTypes.func.isRequired;
        // responsible for hiding table Subdivision
        hideAllSub : React.PropTypes.func.isRequired;
    },
    // send Code (row number) which we want to delete
    sent: function(){
        var params = this.props.params;
        for(var i=0;i<params.length;i++){
            if (params[i].code){var code = params[i].code;};
        };
        axios.post("http://127.0.0.1:8888/deleteSubdivision", {code : code} )
                .then(
                    function(){
                         // after data has been sent to server, we hide Subdivision table 
                        this.props.hideAllSub();
                        // notify that data has been changed 
                        observer.notify("All_subdivisions");
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
    },
    // hide modal window
    hideModal: function(){  this.props.hideDeleteSub(); },
    render: function(){
        var params = this.props.params;
        for(var i=0;i<params.length;i++){
            if (params[i].code){var code = params[i].code;};
            if (params[i].name){var name = params[i].name;};
        };
        
        return (
            <div className="static-modal">
                <Modal show={true} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">Delete subdivision</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>Do you really want to delete <b>{name}</b> subdivision with code <b>{code}</b></div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.sent}>Delete</Button>
                        <Button onClick={this.hideModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>    
        );
    }
});
// modal window "Update Subdivision"
window.UpdateSubdivision = React.createClass({
    propTypes: function(){
        // parameters
        params: React.PropTypes.array.isRequired;
        // response for hiding modal window "Update Subdivision"
        hideUpdateSub: React.PropTypes.func.isRequired;
        // hide table with All Subdivisions
        hideAllSub : React.PropTypes.func.isRequired;
    },
    // hide modal window "Update Subdivision"
    hideModal: function(){this.props.hideUpdateSub();},
    
    // send new data to server
    sent: function(){
        // "code" - take it from params
        var params = this.props.params;
        for(var i=0;i<params.length;i++){
            if (params[i].code){var code= params[i].code;};
        };
        var newName = this.refs.updateSubName.value;
        
        this.hideModal();
         axios.post("http://127.0.0.1:8888/updateSubdivision", {code : code, newName : newName} )
                .then(
                    function(){
                        // after data has been sent to server, we hide Subdivision table 
                        this.props.hideAllSub();
                        // notify that data has been changed 
                        observer.notify("All_subdivisions");
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
    },
    render: function(){
        // fetch value Code and Name from argument array   
        var params = this.props.params;
        for(var i=0;i<params.length;i++){
            if (params[i].code){var code= params[i].code;};
            if (params[i].name){var name= params[i].name;};
        }
        return (
            <div className="static-modal">
                <Modal show={true} onHide={this.hideModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">Update subdivision "{code}" </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <span>Name : &nbsp;</span>
                        <input  type="text" defaultValue={name} ref="updateSubName" /><br/>  
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.sent}>Save</Button>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});
// head of the table "Subdivisions"
window.SubHead = React.createClass({
    render: function(){
        return(
            <thead>
                <tr>
                    <th>Subdivision Code</th>
                    <th>Subdivision Name</th>
                    <th>#</th>
                </tr>
            </thead>
        );
    }
});
// body of the table "Subdivisions"
window.SubBody = React.createClass({
    propTypes: function(){  
        // show modal window "Update"
        showUpdateSub: React.propTypes.func.isRequired;
        // show modal window "Delete"
        showDeleteSub: React.propTypes.func.isRequired;
    },
    getInitialState: function(){
        // data from server
        return {subList: []};     },
    componentDidMount: function(){
        axios.get("http://127.0.0.1:8888/allSubdivisions")
                .then(
                    function(dataFromServer){
                       this.setState({subList: dataFromServer});
                    }.bind(this)
                )
                .catch(function (error) {
                    console.log(error);
                });
    },
    // write Code and Name string which we want to update and call parent method which Showing Delete modal window
    update: function(e){
        var params = [];
        params.push({code: e.target.getAttribute("data-code")});
        params.push({name: e.target.getAttribute("data-name")});
        this.props.showUpdateSub(params);
    },
    // write Code and Name string which we want to delete and call parent method which Showing Delete modal window
    delete: function(e){
        var params = [];
        params.push({code: e.target.getAttribute("data-code")});
        params.push({name: e.target.getAttribute("data-name")});
        this.props.showDeleteSub(params);
    },
    render: function(){
        // biult table with data from server 
        var str = this.state.subList.map(function(elem){
            return (
                <tr key={elem.code}>
                    <td>{elem.code}</td>
                    <td>{elem.name}</td>
                    <td>
                        <input onClick={this.delete} type="button" value="delete" data-code={elem.code} data-name={elem.name}/>
                        <input onClick={this.update} type="button" value="update" data-code={elem.code} data-name={elem.name} />
                    </td>
                </tr>
            );
        }.bind(this));
        return <tbody>{str}</tbody>;
    }
});
//subdivision table
window.SubTable = React.createClass({
    propTypes: function(){
        // show modal window "Add Subdivision", for button "NEW"
        showAddSub: React.propTypes.func.isRequired;
        // hide table "Subdivision"
        hideAllSub: React.propTypes.func.isRequired;
    },
    getInitialState: function(){
        return {
            // responsible for show/hide modal window for update/delete
            updateSub: false,
            deleteSub: false,
            // parameters for update/delete
            params: []
        };
    },
    // show update modal window
    showUpdateSub:  function(params){  this.setState({updateSub: true, params: params});   },
    // show delete modal window
    showDeleteSub: function(params){  this.setState({deleteSub: true, params: params});       },
    // hide update modal window
    hideUpdateSub: function(){  this.setState({updateSub: false});  },
    // hide delete modal window
    hideDeleteSub: function(){  this.setState({deleteSub: false});      },
    //show modal window "Add Subdivision"
    addSub: function(){  this.props.showAddSub();    },
    
    render: function(){
        var caption = function(){return <caption>SUBDIVISIONS</caption>;};
        return (
            <div>
                <br/><br/>
                <input type='button' value='New' onClick={this.addSub} />
                <Table>
                    {caption()}
                    <SubHead />
                    <SubBody showUpdateSub={this.showUpdateSub} showDeleteSub={this.showDeleteSub} />
                </Table>
                {this.state.updateSub ? <UpdateSubdivision hideUpdateSub={this.hideUpdateSub} params={this.state.params} hideAllSub={this.props.hideAllSub} /> : null}
                {this.state.deleteSub ? <DeleteSubdivision hideDeleteSub={this.hideDeleteSub} params={this.state.params} hideAllSub={this.props.hideAllSub} /> : null}
            </div>
        );
    }
});

// the main element in this file
window.Subdivision = React.createClass({
    propTypes: function(){
        // responsible for showing/hiding table Subdivision
       allSub: React.propTypes.bool.isRequired;
        // responsible for showing/hidding table Subdivision
       showAllSub: React.propTypes.func.isRequired;
       hideAllSub: React.propTypes.func.isRequired; 
    },
    getInitialState: function(){
        return {  
            // responsible for showing modal window "Add subdivision"
            addSub: false
        };
    },
    //  perform subscribtion
    componentDidMount: function(){
        observer.add("All_subdivisions",this.showAllSub);
        observer.add("Add_subdivision",this.showAddSub);
    },
    // remove elements from subscribes, so don't leave memory leakage 
    componentWillUnmount: function(){
        observer.remove("All_subdivisions");
        observer.remove("Add_subdivision");
    },
    // show subdivision table and hide modal window "Add Subdivision"
    showAllSub: function(){
        this.props.showAllSub();
        this.setState({addSub: false});
    },
    // show modal window "Add Subdivision"
    showAddSub: function(){   this.setState({addSub: true});    },
    // hide modal window "Add Subdivision"
    hideAddSub: function(){   this.setState({addSub: false});   },
    render: function(){
        return(
            <div>
                {this.props.allSub ? <SubTable showAddSub={this.showAddSub} hideAllSub={this.props.hideAllSub}/> : null}
                {this.state.addSub ? <AddSubdivision hideAddSub={this.hideAddSub} hideAllSub={this.props.hideAllSub} /> : null}
            </div>
        );
    }
});

