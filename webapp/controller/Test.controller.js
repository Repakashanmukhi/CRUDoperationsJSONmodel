sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"

], (Controller,JSONModel,Fragment,MessageBox) => {
    "use strict";
    var that;
    return Controller.extend("testing.controller.Test", {
        onInit() {
            that=this;
            var oEmployeeData = {
                employees: [] 
            };
            var oModel = new JSONModel(oEmployeeData);
            this.getView().setModel(oModel);
          if(!that.dialogId){
            that.dialogId=sap.ui.xmlfragment("testing.Fragments.Create",that)
            this.getView().addDependent(that.dialogId); 
          }
        },
        onOpenDialog: function(){
        that.dialogId.open()
        },
        onclose: function(){
            that.dialogId.close()
        },
        onSubmitDialog: function(){
           
            var sEmpId = sap.ui.getCore().byId("idInput").getValue();
			var sfirstName = sap.ui.getCore().byId("firstNameInput").getValue();
			var slastName = sap.ui.getCore().byId("lastNameInput").getValue();
			var sphone = sap.ui.getCore().byId("phoneInput").getValue();
			var sdepartment = sap.ui.getCore().byId("departmentInput").getValue();
            var sposition=sap.ui.getCore().byId("positionInput").getValue();
            var sjoiningDate=sap.ui.getCore().byId("joiningDateInput").getValue();
            if (sEmpId && sfirstName && slastName &&sphone && sdepartment && sposition && sjoiningDate) {
                var oNewEmployee = {
                    sEmpId: sEmpId,
                    sfirstName:sfirstName,
                    slastName:slastName,
                    sphone:sphone,
                    sdepartment:sdepartment,
                    sposition:sposition,
                    sjoiningDate:sjoiningDate
                };
                var oModel = this.getView().getModel();
                var aEmployees = oModel.getProperty("/employees");
                aEmployees.push(oNewEmployee);
                oModel.setProperty("/employees", aEmployees);
            }
            
            that.dialogId.close();
        
            
            sap.ui.getCore().byId("idInput").setValue();
            sap.ui.getCore().byId("firstNameInput").setValue();
            sap.ui.getCore().byId("lastNameInput").setValue();
            sap.ui.getCore().byId("phoneInput").setValue();
            sap.ui.getCore().byId("departmentInput").setValue();
            sap.ui.getCore().byId("positionInput").setValue();
            sap.ui.getCore().byId("joiningDateInput").setValue();
        },
            onDelete: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext().getObject();
                var oModel = this.getView().getModel();
                var aEmployees = oModel.getProperty("/employees");
                var iIndex = aEmployees.findIndex(employee => employee.sEmpId === oContext.sEmpId);
                if (iIndex !== -1) {
                    sap.m.MessageBox.confirm("Are you sure you want to delete this record?", {
                        title: "Confirm",
                        onClose: function (sAction) {
                            if (sAction === sap.m.MessageBox.Action.OK) {
                                aEmployees.splice(iIndex, 1);
                                oModel.setProperty("/employees", aEmployees);
                                sap.m.MessageToast.show("Record deleted successfully!");
                            }
                        }
                    });
                } else {
                    sap.m.MessageToast.show("Record not found!");
                }
            },
        oncloseBtn: function(){
            that.UpdateId.close()
        },
        onClearBtn: function(){
            sap.ui.getCore().byId("id_e").setValue();
            sap.ui.getCore().byId("firstName_e").setValue();
            sap.ui.getCore().byId("lastName_e").setValue();
            sap.ui.getCore().byId("phone_e").setValue();
            sap.ui.getCore().byId("department_e").setValue();
            sap.ui.getCore().byId("position_e").setValue();
            sap.ui.getCore().byId("joiningDate_e").setValue();
        },
        onUpdateIcon: function(oEvent) {
            if (!that.UpdateId) {
                that.UpdateId = sap.ui.xmlfragment("testing.Fragments.Update", that);
            }
            var oContext = oEvent.getSource().getBindingContext().getObject();
            sap.ui.getCore().byId("id_e").setValue(oContext.sEmpId);
            sap.ui.getCore().byId("firstName_e").setValue(oContext.sfirstName);
            sap.ui.getCore().byId("lastName_e").setValue(oContext.slastName);
            sap.ui.getCore().byId("phone_e").setValue(oContext.sphone);
            sap.ui.getCore().byId("department_e").setValue(oContext.sdepartment);
            sap.ui.getCore().byId("position_e").setValue(oContext.sposition);
            sap.ui.getCore().byId("joiningDate_e").setValue(oContext.sjoiningDate);
            that.UpdateId.open();
        },
        onUpdate: function() {
            var sEmpId = sap.ui.getCore().byId("id_e").getValue();
            var sfirstName = sap.ui.getCore().byId("firstName_e").getValue();
            var slastName = sap.ui.getCore().byId("lastName_e").getValue();
            var sphone = sap.ui.getCore().byId("phone_e").getValue();
            var sdepartment = sap.ui.getCore().byId("department_e").getValue();
            var sposition = sap.ui.getCore().byId("position_e").getValue();
            var sjoiningDate = sap.ui.getCore().byId("joiningDate_e").getValue();
            if (sEmpId && sfirstName && slastName && sphone && sdepartment && sposition && sjoiningDate) {
                var oModel = this.getView().getModel();
                var aEmployees = oModel.getProperty("/employees");
                var iIndex = aEmployees.findIndex(employee => employee.sEmpId === sEmpId);
                if (iIndex !== -1) {
                    aEmployees[iIndex] = {
                        sEmpId: sEmpId,
                        sfirstName: sfirstName,
                        slastName: slastName,
                        sphone: sphone,
                        sdepartment: sdepartment,
                        sposition: sposition,
                        sjoiningDate: sjoiningDate
                    };
                    oModel.setProperty("/employees", aEmployees);
                    sap.m.MessageToast.show("Record updated successfully!");
                    that.UpdateId.close();
                } else {
                    sap.m.MessageToast.show("Employee not found!");
                }
            } else {
                sap.m.MessageToast.show("Please fill in all the fields.");
            }
        }
    });
});


 

 