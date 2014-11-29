var host = 'http://nurwin.koding.io:5000';
var baseUrlAPI = '/api/v1/';
var apiUrl = host + baseUrlAPI;
var tblId = "idTbl";
var tblIdDetail = "idTblDetail";
var tblIdDetailAttach = "idTblDetailAttach";

var checkBox = "<input type='checkbox' onchange='setEnable()' />";
var checkBoxDetail = "<input type='checkbox' onchange='setEnable(this)' />";
var id = "<input type='hidden' name='textId' value='{0}'/>";