(function () {

    /*--------------------------------------------------------------------------------------------------------------- */
    /*--------------------------  Global Variable Declaration  ------------------------------------- */

    let _shadowRoot;
    let div;
    let widgetName;
    let _SelectedChild;
    let _SelectedNode;
    let _SelectedNodeDec;

    let _SelectedLevel_Value;
    let _SelectedParentId_Value;
    let _SelectedNodeId_Value;
    let _SelectedTextId_Value;
    let _SelectedTextDesc_Value;
    

    let previousSelectedNode;
    let currentSelectedNode;

    let _ptid;
    let _ptdec;
    let _FF1;
    let _FF2;
    var Ar = [];
    let _filternode = [];
    let _filtervalue = [];
    let _filterValueDesc = [];
    let _filterinfo = [];
    let _setModeInfo = [1, 1, 1];
    let _dfnumber = [];
    let _dfdesc = [];
    let _BuilderPanel = [];
    let _dfF1 = [];
    let _dfF2 = [];
    let IDNum = [3, 3, 3];
    let IDNum1 = [0, 0, 0];
    let _FontStyle = [];

    let _ParentNodes = [];
    let _SelectedNodes = [];
    let _Default_Level = [];

    let searchBar = "";
    let widgetFocus;
    let numberNodeSelected;
    
    let setItemSelected;
    
    let getItemsSelection = [];
    
    let getSelection = [];
    let getSpart = [];
    let arrClickedNode = [];

    let firstParent = [];
    let secondParent = [];
    let thirdParent = [];
    let forthParent = [];
    let fifthParent = [];

    let firstChild = [];
    let secondChild = [];
    let thirdChild = [];
    let forthChild = [];
    let fifthChild = [];

    let nodeDescID = [];

    let nodeLevelDefault = [];

    /*--------------------------------------------------------------------------------------------------------------- */
    /*--------------------------  Start: Template Creation  ------------------------------------- */

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `<div style="background-color: #fff; height: 100%; width: 100%; border-radius: 10px" id="root"></div> `;
    // tmpl.innerHTML = `<div id="root"></div> `;

    /*--------------------------  End: Template Creation  ------------------------------------- */
    /*----------------------------------------------------------------------------------------ccc----------------------- */


    /*--------------------------------------------------------------------------------------------------------------- */
    /*--------------------------Start: Main Class  ------------------------------------- */

    class MultiInput extends HTMLElement {
        
        constructor() {
            super();

            _shadowRoot = this.attachShadow({ mode: "open" });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));
            // _shadowRoot.getElementById("root");

            this._export_settings = {};

            this.addEventListener("click", event => {
                var eventclick = new Event("onClick");
                this.dispatchEvent(eventclick);
                
            });
                
            this.addEventListener("mouseup", event => {
                if(previousSelectedNode === undefined){
                    previousSelectedNode = _SelectedNode;
                }
                setTimeout(() => {
                    currentSelectedNode = _SelectedNode;
                    if (previousSelectedNode !== currentSelectedNode) {
                        var eventchange = new Event("onChange");
                        this.dispatchEvent(eventchange); // Dispatch the event
                    }
                    previousSelectedNode = currentSelectedNode;
                }, "200")
            });

            this._props = {};
            this._firstConnection = 0;
        }

        connectedCallback()  {
            // ===================================================================================
            // =================== Remove Search and show all Items of the List ==================
            // ===================================================================================

            let searchBar = document.querySelectorAll(".sapMInputBaseInner"); // Get search bar
            for (let i=0; i < searchBar.length; i++){
                searchBar[i].value = "";
            }

            let itemList = document.querySelectorAll(".sapMTreeItemBase"); // Get the List of Items
            for (let i=0; i < itemList.length; i++){
                itemList[i].style.display = "";
            }

            this._firstConnection = 1;
        }

        disconnectedCallback() {

            if (this._subscription) { // react store subscription
                this._subscription();
                this._subscription = null;
            }
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
            if ("designMode" in changedProperties) {
                this._designMode = changedProperties["designMode"];
            }

        }

        onCustomWidgetAfterUpdate(changedProperties) {
            var that = this;
            loadthis(that, changedProperties);
        }

        _firePropertiesChanged() {
            this.SelectedChild = "";
            this.SelectedNodeId = "";
            this.SelectedNodeDec = "";

            this.SelectedLevel_Value = "";
            this.SelectedParentId_Value = "";
            this.SelectedNodeId_Value = "";
            this.SelectedTextId_Value = "";
            this.SelectedTextDesc_Value = "";

            this.Field1_Value = "";
            this.Field2_Value = "";
            this.ptid = "";
            this.ptdec = "";

            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        SelectedChild: this.SelectedChild,
                        SelectedNodeId: this.SelectedNodeId,
                        SelectedNodeDec: this.SelectedNodeDec,

                        SelectedLevel_Value: this.SelectedLevel_Value,
                        SelectedParentId_Value: this.SelectedParentId_Value,
                        SelectedNodeId_Value: this.SelectedNodeId_Value, 
                        SelectedTextId_Value: this.SelectedTextId_Value,
                        SelectedTextDesc_Value: this.SelectedTextDesc_Value,

                        ptid: this.ptid,
                        ptdec: this.ptdec,
                        Field1_Value: this.Field1_Value,
                        Field2_Value: this.Field2_Value
                    }
                }
            }));
        }

        /*-------------------------- Get Set property for data return method  ------------------------------------- */
        get SelectedChild() {
            return this._export_settings.SelectedChild;
        }
        set SelectedChild(value) {
            value = _SelectedChild;
            this._export_settings.SelectedChild = value;
        }

        get SelectedNodeId() {
            return this._export_settings.SelectedNodeId;
        }
        set SelectedNodeId(value) {
            value = _SelectedNode;
            this._export_settings.SelectedNodeId = value;
        }

        get SelectedNodeDec() {
            return this._export_settings.SelectedNodeDec;
        }
        set SelectedNodeDec(value) {
            value = _SelectedNodeDec;
            this._export_settings.SelectedNodeDec = value;
        }


        get SelectedLevel_Value() {
            return this._export_settings.SelectedLevel_Value;
        }
        set SelectedLevel_Value(value) {
            value = _SelectedLevel_Value;
            this._export_settings.SelectedLevel_Value = value;
        }
        get SelectedParentId_Value() {
            return this._export_settings.SelectedParentId_Value;
        }
        set SelectedParentId_Value(value) {
            value = _SelectedParentId_Value;
            this._export_settings.SelectedParentId_Value = value;
        }
        get SelectedNodeId_Value() {
            return this._export_settings.SelectedNodeId_Value;
        }
        set SelectedNodeId_Value(value) {
            value = _SelectedNodeId_Value;
            this._export_settings.SelectedNodeId_Value = value;
        }
        get SelectedTextId_Value() {
            return this._export_settings.SelectedTextId_Value;
        }
        set SelectedTextId_Value(value) {
            value = _SelectedTextId_Value;
            this._export_settings.SelectedTextId_Value = value;
        }
        get SelectedTextDesc_Value() {
            return this._export_settings.SelectedTextDesc_Value;
        }
        set SelectedTextDesc_Value(value) {
            value = _SelectedTextDesc_Value;
            this._export_settings.SelectedTextDesc_Value = value;
        }

        get ptid() {
            return this._export_settings.ptid;
        }
        set ptid(value) {
            value = _ptid;
            this._export_settings.ptid = value;
        }

        get ptdec() {
            return this._export_settings.ptdec;
        }
        set ptdec(value) {
            value = _ptdec;
            this._export_settings.ptdec = value;
        }

        get Field1_Value() {
            return this._export_settings.Field1_Value;
        }
        set Field1_Value(value) {
            value = _FF1;
            this._export_settings.Field1_Value = value;
        }

        get Field2_Value() {
            return this._export_settings.Field2_Value;
        }
        set Field2_Value(value) {
            value = _FF2;
            this._export_settings.Field2_Value = value;
        }

        get setdata() {
            return this._export_settings.setdata;
        }
        set setdata(value) {
            this._export_settings.setdata = value;
        }



        static get observedAttributes() {
            return [
                "SelectedChild",
                "setdata",
                "SelectedNodeId",
            ];
        }
    }

    /*--------------------------------------------------------------------------------------------------------------- */
    /*--------------------------End: Main Class ------------------------------------- */

    customElements.define("com-ds-finalv4-7-sap-sac-alive", MultiInput);

    function loadthis(that, changedProperties) {
        var that_ = that;
        widgetName = changedProperties.widgetName;

        /*--------------------------------------------------------------------------------------------------------------- */
        /*--------------------------Start: Data from SAC and prepare for JSON Model -------------------- ----------------- */
        /*--------------------------------------------------------------------------------------------------------------- */

        var LL = that.LEVEL_col;
        var PI = that.PARENTID_col;
        var NI = that.NODEID_col;
        var ND = that.TEXTDEC_col
        var TI = that.TEXTID_col;
        var TD = that.TEXTDEC_col;
        // var FF1 = that.Field1_Name;
        // var FF2 = that.Field2_Name;
        

        var a = changedProperties.setdata;

        var rowData = [[], [], [], [], [], [], [], []];

        // Level wise Node Distrubution
        if (a) {
            for (var i = 0; i < a.length; i++) {

                switch (a[i][LL].id) {
                    case '1':
                        rowData[0].push(a[i]);
                        break;
                    case '2':
                        rowData[1].push(a[i]);
                        break;
                    case '3':
                        rowData[2].push(a[i]);
                        break;
                    case '4':
                        rowData[3].push(a[i]);
                        break;
                    case '5':
                        rowData[4].push(a[i]);
                        break;
                    case '6':
                        rowData[5].push(a[i]);
                        break;
                    case '7':
                        rowData[6].push(a[i]);
                        break;
                    case '8':
                        rowData[7].push(a[i]);
                        break;
                }
            }
        }

        /*-------------------------- Node Hierarchy Creation based on Paren-Child Relations  ------------------------------------- */
        /*-------------------------- Local Variable Declaration  ------------------------------------- */
        var data = [];
        var count = 0;

        var filternode = [];
        var filtervalue = [];
        var filterValueDesc = [];
        var filterinfo = [];
        var nodenm = changedProperties.default;
        var dfcount = 0;
        var dfnumber = [];
        var dfdesc = [];
        var F1 = that.Field1_Name;
        var F2 = that.Field2_Name;

        var dfF1 = [];
        var dfF2 = [];
        var FontStyle = [that.fstyle, that.fsize, that.fbi, that.fcolor]
        let ParentNodes = [that.Parent_fStyle, that.Parent_fSize, that.Parent_fColor, that.Parent_fTransp, that.Parent_bg]
        let SelectedNodes = [that.SelectedNode_fStyle, that.SelectedNode_fSize, that.SelectedNode_fColor, that.SelectedNode_bg]
        let Default_Level = [that.Default_Level];
        _FontStyle[that.widgetno] = FontStyle;
        _ParentNodes[that.widgetno] = ParentNodes;
        _SelectedNodes[that.widgetno] = SelectedNodes;
        _Default_Level[that.widgetno] = Default_Level;

        /*-------------------------- Check and Set Separator  ------------------------------------- */
        if (that.Separator) {
            _BuilderPanel[that.widgetno] = { Separator: that.Separator, Display: that.Display, Show_Display: that.Show_Display, Show_Parent: that.Show_Parent };
            var spart = that.Separator;
            var Selection = that.Display;
        } else {
            spart = _BuilderPanel[that.widgetno].Separator;
            Selection = _BuilderPanel[that.widgetno].Display;
        }

        if (rowData.length > 0) {

            for (var a = 0; a < rowData[0].length; a++) {
                var nodeid0 = rowData[0][a][TI].id;
                var nodedec0 = rowData[0][a][TD].id;
                var nodeIdDec0 = nodeid0 + " " + spart + " " + nodedec0;
                var selectionnode0 = { nodedec: nodedec0, nodeid: nodeid0, nodeIdDec: nodeIdDec0 };
                var node0 = { nodedec: nodedec0, nodeid: nodeid0, nodeIdDec: nodeIdDec0, text: selectionnode0[Selection] };

                /*-------------------------- Field Mapping for Return Data    ------------------------------------- */
                if (F1) {
                    node0[F1] = rowData[0][a][F1].id;
                }
                if (F2) {
                    node0[F2] = rowData[0][a][F2].id;;
                }

                var id0 = rowData[0][a][NI].id;
                node0.nodes = [];
                var child0 = '';
                var child0Desc = '';
                var pc0 = 0;
                dfcount++;
                for (var a0 = 0; a0 < nodenm.length; a0++) {
                    if (nodenm[a0] === nodeid0) {
                        dfnumber.push(dfcount - 1);
                        dfdesc.push(nodedec0);

                        if (F1) {
                            dfF1.push(rowData[0][a][F1].id);
                        }
                        if (F2) {
                            dfF2.push(rowData[0][a][F2].id);
                        }
                    }
                }

                for (var b = 0; b < rowData[1].length; b++) {

                    if (rowData[1][b][PI].id === id0) {

                        var nodeid1 = rowData[1][b][TI].id;
                        var nodedec1 = rowData[1][b][TD].id;
                        var nodeIdDec1 = nodeid1 + " " + spart + " " + nodedec1;
                        var selectionnode1 = { nodedec: nodedec1, nodeid: nodeid1, nodeIdDec: nodeIdDec1 };
                        var node1 = { nodedec: nodedec1, nodeid: nodeid1, nodeIdDec: nodeIdDec1, text: selectionnode1[Selection] };

                        if (F1) {
                            node1[F1] = rowData[1][b][F1].id;
                        }
                        if (F2) {
                            node1[F2] = rowData[1][b][F2].id;;
                        }

                        var id1 = rowData[1][b][NI].id;
                        node1.nodes = [];
                        pc0 = pc0 + 1;
                        var child1 = '';
                        var child1Desc = '';
                        var pc1 = 0;
                        dfcount++;
                        for (var a1 = 0; a1 < nodenm.length; a1++) {
                            if (nodenm[a1] === nodeid1) {
                                dfnumber.push(dfcount - 1);
                                dfdesc.push(nodedec1);

                                if (F1) {
                                    dfF1.push(rowData[1][b][F1].id);
                                }
                                if (F2) {
                                    dfF2.push(rowData[1][b][F2].id);
                                }
                            }
                        }

                        for (var c = 0; c < rowData[2].length; c++) {

                            if (rowData[2][c][PI].id === id1) {

                                var nodeid2 = rowData[2][c][TI].id;
                                var nodedec2 = rowData[2][c][TD].id;
                                var nodeIdDec2 = nodeid2 + " " + spart + " " + nodedec2;
                                var selectionnode2 = { nodedec: nodedec2, nodeid: nodeid2, nodeIdDec: nodeIdDec2 };
                                var node2 = { nodedec: nodedec2, nodeid: nodeid2, nodeIdDec: nodeIdDec2, text: selectionnode2[Selection] };

                                if (F1) {
                                    node2[F1] = rowData[2][c][F1].id;
                                }
                                if (F2) {
                                    node2[F2] = rowData[2][c][F2].id;
                                }

                                var id2 = rowData[2][c][NI].id;
                                node2.nodes = [];
                                pc1 = pc1 + 1;
                                var child2 = '';
                                var child2Desc = '';
                                var pc2 = 0;
                                dfcount++;
                                for (var a2 = 0; a2 < nodenm.length; a2++) {
                                    if (nodenm[a2] === nodeid2) {
                                        dfnumber.push(dfcount - 1);
                                        dfdesc.push(nodedec2);


                                        if (F1) {
                                            dfF1.push(rowData[3][c][F1].id);
                                        }
                                        if (F2) {
                                            dfF2.push(rowData[3][c][F2].id);
                                        }
                                    }
                                }


                                for (var d = 0; d < rowData[3].length; d++) {

                                    if (rowData[3][d][PI].id === id2) {

                                        var nodeid3 = rowData[3][d][TI].id;
                                        var nodedec3 = rowData[3][d][TD].id;
                                        var nodeIdDec3 = nodeid3 + " " + spart + " " + nodedec3;
                                        var selectionnode3 = { nodedec: nodedec3, nodeid: nodeid3, nodeIdDec: nodeIdDec3 };
                                        var node3 = { nodedec: nodedec3, nodeid: nodeid3, nodeIdDec: nodeIdDec3, text: selectionnode3[Selection] };

                                        if (F1) {
                                            node3[F1] = rowData[3][d][F1].id;
                                        }
                                        if (F2) {
                                            node3[F2] = rowData[3][d][F2].id;;
                                        }

                                        var id3 = rowData[3][d][NI].id;
                                        node3.nodes = [];
                                        pc2 = pc2 + 1;
                                        var child3 = '';
                                        var child3Desc = '';
                                        var pc3 = 0;
                                        dfcount++;
                                        for (var a3 = 0; a3 < nodenm.length; a3++) {
                                            if (nodenm[a3] === nodeid3) {
                                                dfnumber.push(dfcount - 1);
                                                dfdesc.push(nodedec3);


                                                if (F1) {
                                                    dfF1.push(rowData[3][d][F1].id);
                                                }
                                                if (F2) {
                                                    dfF2.push(rowData[3][d][F2].id);
                                                }
                                            }
                                        }

                                        for (var e = 0; e < rowData[4].length; e++) {

                                            if (rowData[4][e][PI].id === id3) {

                                                var nodeid4 = rowData[4][e][TI].id;
                                                var nodedec4 = rowData[4][e][TD].id;
                                                var nodeIdDec4 = nodeid4 + " " + spart + " " + nodedec4;
                                                var selectionnode4 = { nodedec: nodedec4, nodeid: nodeid4, nodeIdDec: nodeIdDec4 };
                                                var node4 = { nodedec: nodedec4, nodeid: nodeid4, nodeIdDec: nodeIdDec4, text: selectionnode4[Selection] };

                                                if (F1) {
                                                    node4[F1] = rowData[4][e][F1].id;
                                                }
                                                if (F2) {
                                                    node4[F2] = rowData[4][e][F2].id;;
                                                }

                                                var id4 = rowData[4][e][NI].id;
                                                node4.nodes = [];
                                                pc3 = pc3 + 1;
                                                var child4 = '';
                                                var child4Desc = '';
                                                var pc4 = 0;
                                                dfcount++;
                                                for (var a4 = 0; a4 < nodenm.length; a4++) {
                                                    if (nodenm[a4] === nodeid4) {
                                                        dfnumber.push(dfcount - 1);
                                                        dfdesc.push(nodedec4);


                                                        if (F1) {
                                                            dfF1.push(rowData[4][e][F1].id);
                                                        }
                                                        if (F2) {
                                                            dfF2.push(rowData[4][e][F2].id);
                                                        }
                                                    }
                                                }

                                                for (var f = 0; f < rowData[5].length; f++) {

                                                    if (rowData[5][f][PI].id === id4) {

                                                        var nodeid5 = rowData[5][f][TI].id;
                                                        var nodedec5 = rowData[5][f][TD].id;
                                                        var nodeIdDec5 = nodeid5 + " " + spart + " " + nodedec5;
                                                        var selectionnode5 = { nodedec: nodedec5, nodeid: nodeid5, nodeIdDec: nodeIdDec5 };
                                                        var node5 = { nodedec: nodedec5, nodeid: nodeid5, nodeIdDec: nodeIdDec5, text: selectionnode5[Selection] };

                                                        if (F1) {
                                                            node5[F1] = rowData[5][f][F1].id;
                                                        }
                                                        if (F2) {
                                                            node5[F2] = rowData[5][f][F2].id;;
                                                        }

                                                        var id5 = rowData[5][f][NI].id;
                                                        node5.nodes = [];
                                                        pc4 = pc4 + 1;
                                                        var child5 = '';
                                                        var child5Desc = '';
                                                        var pc5 = 0;
                                                        dfcount++;
                                                        for (var a5 = 0; a5 < nodenm.length; a5++) {
                                                            if (nodenm[a5] === nodeid5) {
                                                                dfnumber.push(dfcount - 1);
                                                                dfdesc.push(nodedec5);

                                                                if (F1) {
                                                                    dfF1.push(rowData[5][f][F1].id);
                                                                }
                                                                if (F2) {
                                                                    dfF2.push(rowData[5][f][F2].id);
                                                                }
                                                            }
                                                        }

                                                        for (var g = 0; g < rowData[6].length; g++) {

                                                            if (rowData[6][g][PI].id === id5) {

                                                                var nodeid6 = rowData[6][g][TI].id;
                                                                var nodedec6 = rowData[6][g][TD].id;
                                                                var nodeIdDec6 = nodeid6 + " " + spart + " " + nodedec6;
                                                                var selectionnode6 = { nodedec: nodedec6, nodeid: nodeid6, nodeIdDec: nodeIdDec6 };
                                                                var node6 = { nodedec: nodedec6, nodeid: nodeid6, nodeIdDec: nodeIdDec6, text: selectionnode6[Selection] };

                                                                if (F1) {
                                                                    node6[F1] = rowData[6][g][F1].id;
                                                                }
                                                                if (F2) {
                                                                    node6[F2] = rowData[6][g][F2].id;;
                                                                }

                                                                var id6 = rowData[6][g][NI].id;
                                                                node6.nodes = [];
                                                                pc5 = pc5 + 1;
                                                                var child6 = '';
                                                                var child6Desc = '';
                                                                var pc6 = 0;
                                                                dfcount++;
                                                                for (var a6 = 0; a6 < nodenm.length; a6++) {
                                                                    if (nodenm[a6] === nodeid6) {
                                                                        dfnumber.push(dfcount - 1);
                                                                        dfdesc.push(nodedec6);


                                                                        if (F1) {
                                                                            dfF1.push(rowData[6][g][F1].id);
                                                                        }
                                                                        if (F2) {
                                                                            dfF2.push(rowData[6][g][F2].id);
                                                                        }
                                                                    }
                                                                }

                                                                for (var h = 0; h < rowData[7].length; h++) {

                                                                    if (rowData[7][h][PI].id === id6) {

                                                                        var nodeid7 = rowData[7][h][TI].id;
                                                                        var nodedec7 = rowData[7][h][TD].id;
                                                                        var nodeIdDec7 = nodeid7 + " " + spart + " " + nodedec7;
                                                                        var selectionnode7 = { nodedec: nodedec7, nodeid: nodeid7, nodeIdDec: nodeIdDec7 };
                                                                        var node7 = { nodedec: nodedec7, nodeid: nodeid7, nodeIdDec: nodeIdDec7, text: selectionnode7[Selection] };

                                                                        if (F1) {
                                                                            node7[F1] = rowData[7][h][F1].id;
                                                                        }
                                                                        if (F2) {
                                                                            node7[F2] = rowData[7][h][F2].id;;
                                                                        }

                                                                        var id7 = rowData[7][h][NI].id;
                                                                        node7.nodes = [];
                                                                        pc6 = pc6 + 1;
                                                                        var child7 = '';
                                                                        var child7Desc = '';
                                                                        dfcount++;
                                                                        for (var a7 = 0; a7 < nodenm.length; a7++) {
                                                                            if (nodenm[a7] === nodeid7) {
                                                                                dfnumber.push(dfcount - 1);
                                                                                dfdesc.push(nodedec7);


                                                                                if (F1) {
                                                                                    dfF1.push(rowData[7][h][F1].id);
                                                                                }
                                                                                if (F2) {
                                                                                    dfF2.push(rowData[7][h][F2].id);
                                                                                }
                                                                            }
                                                                        }

                                                                        child0 = child0 + ',' + nodeid7;
                                                                        child1 = child1 + ',' + nodeid7;
                                                                        child2 = child2 + ',' + nodeid7;
                                                                        child3 = child3 + ',' + nodeid7;
                                                                        child4 = child4 + ',' + nodeid7;
                                                                        child5 = child5 + ',' + nodeid7;
                                                                        child6 = child6 + ',' + nodeid7;
                                                                        child7 = child7 + ',' + nodeid7;

                                                                        child0Desc = child0Desc + ',' + nodedec7;
                                                                        child1Desc = child1Desc + ',' + nodedec7;
                                                                        child2Desc = child2Desc + ',' + nodedec7;
                                                                        child3Desc = child3Desc + ',' + nodedec7;
                                                                        child4Desc = child4Desc + ',' + nodedec7;
                                                                        child5Desc = child5Desc + ',' + nodedec7;
                                                                        child6Desc = child6Desc + ',' + nodedec7;
                                                                        child7Desc = child7Desc + ',' + nodedec7;

                                                                        var otherinfo7 = {
                                                                            LEVEL: rowData[7][h][LL].id,
                                                                            PARENTID: rowData[7][h][PI].id,
                                                                            NODEID: rowData[7][h][NI].id,
                                                                            NODEDEC: rowData[7][h][ND].id,
                                                                            PTDEC: rowData[6][g][TD].id,
                                                                            PTID: rowData[6][g][TI].id,
                                                                            GRANULARITY: rowData[7][h].GRANULARITY.id,
                                                                            BU: rowData[7][h].BU.id,
                                                                            IDNAME: nodeid7,
                                                                            PTIDNAME: nodeid6
                                                                        }

                                                                        filterinfo.push(otherinfo7);
                                                                        filternode.push(nodeid7);
                                                                        filtervalue.push(child7);
                                                                        filterValueDesc.push(child7Desc);
                                                                        count++;



                                                                    }
                                                                }

                                                                if (pc6 === 0) {

                                                                    child0 = child0 + ',' + nodeid6;
                                                                    child1 = child1 + ',' + nodeid6;
                                                                    child2 = child2 + ',' + nodeid6;
                                                                    child3 = child3 + ',' + nodeid6;
                                                                    child4 = child4 + ',' + nodeid6;
                                                                    child5 = child5 + ',' + nodeid6;
                                                                    child6 = child6 + ',' + nodeid6;

                                                                    child0Desc = child0Desc + ',' + nodedec6;
                                                                    child1Desc = child1Desc + ',' + nodedec6;
                                                                    child2Desc = child2Desc + ',' + nodedec6;
                                                                    child3Desc = child3Desc + ',' + nodedec6;
                                                                    child4Desc = child4Desc + ',' + nodedec6;
                                                                    child5Desc = child5Desc + ',' + nodedec6;
                                                                    child6Desc = child6Desc + ',' + nodedec6;

                                                                }

                                                                var otherinfo6 = {
                                                                    LEVEL: rowData[6][g][LL].id,
                                                                    PARENTID: rowData[6][g][PI].id,
                                                                    NODEID: rowData[6][g][NI].id,
                                                                    NODEDEC: rowData[6][g][ND].id,
                                                                    PTDEC: rowData[5][f][TD].id,
                                                                    PTID: rowData[5][f][TI].id,
                                                                    GRANULARITY: rowData[6][g].GRANULARITY.id,
                                                                    BU: rowData[6][g].BU.id,
                                                                    IDNAME: nodeid6,
                                                                    PTIDNAME: nodeid5
                                                                }

                                                                filterinfo.push(otherinfo6);

                                                                filternode.push(nodeid6);
                                                                filtervalue.push(child6);
                                                                filterValueDesc.push(child6Desc);
                                                                count++;

                                                                node5.nodes.push(node6);

                                                            }
                                                        }
                                                        if (pc5 === 0) {

                                                            child0 = child0 + ',' + nodeid5;
                                                            child1 = child1 + ',' + nodeid5;
                                                            child2 = child2 + ',' + nodeid5;
                                                            child3 = child3 + ',' + nodeid5;
                                                            child4 = child4 + ',' + nodeid5;
                                                            child5 = child5 + ',' + nodeid5;

                                                            child0Desc = child0Desc + ',' + nodedec5;
                                                            child1Desc = child1Desc + ',' + nodedec5;
                                                            child2Desc = child2Desc + ',' + nodedec5;
                                                            child3Desc = child3Desc + ',' + nodedec5;
                                                            child4Desc = child4Desc + ',' + nodedec5;
                                                            child5Desc = child5Desc + ',' + nodedec5;

                                                        }

                                                        var otherinfo5 = {
                                                            LEVEL: rowData[5][f][LL].id,
                                                            PARENTID: rowData[5][f][PI].id,
                                                            NODEID: rowData[5][f][NI].id,
                                                            NODEDEC: rowData[5][f][ND].id,
                                                            PTDEC: rowData[4][e][TD].id,
                                                            PTID: rowData[4][e][TI].id,
                                                            GRANULARITY: rowData[5][f].GRANULARITY.id,
                                                            BU: rowData[5][f].BU.id,
                                                            IDNAME: nodeid5,
                                                            PTIDNAME: nodeid4
                                                        }

                                                        filterinfo.push(otherinfo5);

                                                        filternode.push(nodeid5);
                                                        filtervalue.push(child5);
                                                        filterValueDesc.push(child5Desc);
                                                        filterValueDesc.push(child5Desc);
                                                        count++;

                                                        node4.nodes.push(node5);
                                                    }
                                                }
                                                if (pc4 === 0) {

                                                    child0 = child0 + ',' + nodeid4;
                                                    child1 = child1 + ',' + nodeid4;
                                                    child2 = child2 + ',' + nodeid4;
                                                    child3 = child3 + ',' + nodeid4;
                                                    child4 = child4 + ',' + nodeid4;

                                                    child0Desc = child0Desc + ',' + nodedec4;
                                                    child1Desc = child1Desc + ',' + nodedec4;
                                                    child2Desc = child2Desc + ',' + nodedec4;
                                                    child3Desc = child3Desc + ',' + nodedec4;
                                                    child4Desc = child4Desc + ',' + nodedec4;

                                                }

                                                var otherinfo4 = {
                                                    LEVEL: rowData[4][e][LL].id,
                                                    PARENTID: rowData[4][e][PI].id,
                                                    NODEID: rowData[4][e][NI].id,
                                                    NODEDEC: rowData[4][e][ND].id,
                                                    PTDEC: rowData[3][d][TD].id,
                                                    PTID: rowData[3][d][TI].id,
                                                    GRANULARITY: rowData[4][e].GRANULARITY.id,
                                                    BU: rowData[4][e].BU.id,
                                                    IDNAME: nodeid4,
                                                    PTIDNAME: nodeid3
                                                }

                                                filterinfo.push(otherinfo4);

                                                filternode.push(nodeid4);
                                                filtervalue.push(child4);
                                                filterValueDesc.push(child4Desc);
                                                filterValueDesc.push(child4Desc);
                                                count++;

                                                node3.nodes.push(node4);

                                            }
                                        }
                                        if (pc3 === 0) {

                                            child0 = child0 + ',' + nodeid3;
                                            child1 = child1 + ',' + nodeid3;
                                            child2 = child2 + ',' + nodeid3;
                                            child3 = child3 + ',' + nodeid3;

                                            child0Desc = child0Desc + ',' + nodedec3;
                                            child1Desc = child1Desc + ',' + nodedec3;
                                            child2Desc = child2Desc + ',' + nodedec3;
                                            child3Desc = child3Desc + ',' + nodedec3;

                                        }

                                        var otherinfo3 = {
                                            LEVEL: rowData[3][d][LL].id,
                                            PARENTID: rowData[3][d][PI].id,
                                            NODEID: rowData[3][d][NI].id,
                                            NODEDEC: rowData[3][d][ND].id,
                                            PTDEC: rowData[2][c][TD].id,
                                            PTID: rowData[2][c][TI].id,
                                            GRANULARITY: rowData[3][d].GRANULARITY.id,
                                            BU: rowData[3][d].BU.id,
                                            IDNAME: nodeid3,
                                            PTIDNAME: nodeid2
                                        }

                                        filterinfo.push(otherinfo3);

                                        filternode.push(nodeid3);
                                        filtervalue.push(child3);
                                        filterValueDesc.push(child3Desc);
                                        count++;

                                        node2.nodes.push(node3);

                                    }
                                }
                                if (pc2 === 0) {

                                    child0 = child0 + ',' + nodeid2;
                                    child1 = child1 + ',' + nodeid2;
                                    child2 = child2 + ',' + nodeid2;

                                    child0Desc = child0Desc + ',' + nodedec2;
                                    child1Desc = child1Desc + ',' + nodedec2;
                                    child2Desc = child2Desc + ',' + nodedec2;

                                }

                                var otherinfo2 = {
                                    LEVEL: rowData[2][c][LL].id,
                                    PARENTID: rowData[2][c][PI].id,
                                    NODEID: rowData[2][c][NI].id,
                                    NODEDEC: rowData[2][c][ND].id,
                                    PTDEC: rowData[1][b][TD].id,
                                    PTID: rowData[1][b][TI].id,
                                    GRANULARITY: rowData[2][c].GRANULARITY.id,
                                    BU: rowData[2][c].BU.id,
                                    IDNAME: nodeid2,
                                    PTIDNAME: nodeid1
                                }

                                filterinfo.push(otherinfo2);

                                filternode.push(nodeid2);
                                filtervalue.push(child2);
                                filterValueDesc.push(child2Desc);
                                count++;

                                node1.nodes.push(node2);
                            }
                        }

                        if (pc1 === 0) {

                            child0 = child0 + ',' + nodeid1;
                            child1 = child1 + ',' + nodeid1;

                            child0Desc = child0Desc + ',' + nodedec1;
                            child1Desc = child1Desc + ',' + nodedec1;

                        }

                        var otherinfo1 = {
                            LEVEL: rowData[1][b][LL].id,
                            PARENTID: rowData[1][b][PI].id,
                            NODEID: rowData[1][b][NI].id,
                            NODEDEC: rowData[1][b][ND].id,
                            PTDEC: rowData[0][a][TD].id,
                            PTID: rowData[0][a][TI].id,
                            GRANULARITY: rowData[1][b].GRANULARITY.id,
                            BU: rowData[1][b].BU.id,
                            IDNAME: nodeid1,
                            PTIDNAME: nodeid0
                        }

                        filterinfo.push(otherinfo1);

                        filternode.push(nodeid1);
                        filtervalue.push(child1);
                        filterValueDesc.push(child1Desc);
                        count++;

                        node0.nodes.push(node1);
                    }
                }
                if (pc0 === 0) {

                    child0 = child0 + ',' + nodeid0;
                    
                    child0Desc = child0Desc + ',' + nodedec0;

                }

                var otherinfo0 = {
                    LEVEL: rowData[0][a][LL].id,
                    PARENTID: rowData[0][a][PI].id,
                    NODEID: rowData[0][a][NI].id,
                    NODEDEC: rowData[0][a][ND].id,
                    PTDEC: "root",
                    PTID: "root",
                    GRANULARITY: rowData[0][a].GRANULARITY.id,
                    BU: rowData[0][a].BU.id,
                    IDNAME: nodeid0,
                    PTIDNAME: "root"
                }

                filterinfo.push(otherinfo0);
                filternode.push(nodeid0);
                filtervalue.push(child0);
                filterValueDesc.push(child0Desc);
                count++;

                data.push(node0);
            }

            _filternode[that.widgetno - 1] = filternode;
            _filtervalue[that.widgetno - 1] = filtervalue;
            _filterValueDesc[that.widgetno - 1] = filterValueDesc;
            _filterinfo[that.widgetno - 1] = filterinfo;
            _dfnumber[that.widgetno - 1] = dfnumber;
            _setModeInfo[that.widgetno] = 1;
            _dfdesc[that.widgetno - 1] = dfdesc;
            _dfF1[that.widgetno] = dfF1;
            _dfF2[that.widgetno] = dfF2;
        }
        

        /*--------------------------------------------------------------------------------------------------------------- */
        /*--------------------------End: Data from SAC and prepare for JSON Model ------------------------------------- */
        /*--------------------------------------------------------------------------------------------------------------- */

        div = document.createElement('div');
        div.slot = "content_" + widgetName;

        /*--------------------------  Set Display to Chosse ID,DEC,ID-DEC at Runtime ------------------------------------- */
        if (that.Show_Display === "Yes") {
            var Selelect_List = '<Select width="45%" selectedKey="' + changedProperties.Display + '"  change="handleSelectChange"> <items> <core:Item key="nodeid" text="ID" /> <core:Item key="nodedec" text="DESCRIPTION" /> <core:Item key="nodeIdDec" text="ID-DESCRIPTION" /> </items></Select>'
            var WD = `45%`;
        }
        else {
            Selelect_List = "";
            WD = `93%`;
        }

        let div0 = document.createElement('div');

        //Div Tree Structure
        div0.innerHTML = '<script id="oView' + widgetName + '" name="oView' + widgetName + '" type="sapui5/xmlview"><mvc:View controllerName="myView.Template" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc"  xmlns="sap.m">  <Tree class=""  id="Tree"  items="{' + widgetName + '>/}" mode="MultiSelect"  selectionChange="onSelect"  includeItemInSelection="true" updateFinished="onDefaultSelction"> <headerToolbar> <OverflowToolbar> ' + Selelect_List + ' <Input  width="' + WD + '" placeholder="Type to search" value="{search/query}" liveChange="onLiveChange" /> </OverflowToolbar> </headerToolbar><StandardTreeItem title="{' + widgetName + '>text}" selected="{selected}"/></Tree></mvc:View></script>'
        _shadowRoot.appendChild(div0);

        if (that._firstConnection === 1) {
        } else {
            let div2 = document.createElement('div');
            div2.innerHTML = '<div style="max-height: 550px; border-radius: 15px; overflow-y: hidden;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><div style="max-height: 550px; border-radius: 15px; overflow-y: auto;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"> </slot></div></div>';
            _shadowRoot.appendChild(div2);
            that._firstConnection = 1;
        }
        that_.appendChild(div);

        var mapcanvas_divstr = _shadowRoot.getElementById('oView' + widgetName);

        Ar.push({
            'id': widgetName,
            'div': mapcanvas_divstr
        });


        sap.ui.getCore().attachInit(function () {
            "use strict";


            /*-------------------------- Controller Fucntion ------------------------------------- */

            sap.ui.define(['sap/ui/core/mvc/Controller',
                'sap/ui/model/json/JSONModel'],

                function (Controller, JSONModel) {
                    "use strict";

                    var PageController = Controller.extend("myView.Template", {
                        onInit: function (event) {
                            if (IDNum1[that.widgetno] > 0) {
                                 /*-------------------------- Check Widgetno. for Custom Widget xmlView coordination ------------------------------------- */
                                switch (that.widgetno) {
                                    case 1:
                                        if (sap.ui.getCore().byId("__xmlview1--Tree").getSelectedItems().length > 0) {
                                            sap.ui.getCore().byId("__xmlview1--Tree").removeSelections();
                                            
                                        }
                                        break;
                                    case 2:
                                        if (sap.ui.getCore().byId("__xmlview2--Tree").getSelectedItems().length > 0) {
                                            sap.ui.getCore().byId("__xmlview2--Tree").removeSelections();
                                            
                                        }
                                        break;
                                    case 3:
                                        if (sap.ui.getCore().byId("__xmlview3--Tree").getSelectedItems().length > 0) {
                                            sap.ui.getCore().byId("__xmlview3--Tree").removeSelections();
                                           
                                        }
                                        break;
                                    case 4:
                                        if (sap.ui.getCore().byId("__xmlview4--Tree").getSelectedItems().length > 0) {
                                            sap.ui.getCore().byId("__xmlview4--Tree").removeSelections();
                                            
                                        }
                                        break;
                                }
                            }
                            IDNum1[that.widgetno] += 1;

                            /*-------------------------- Data assigned to Model For Tree Structure ------------------------------------- */

                            var oModel = new JSONModel(data);
                            let SizeLimitCW = filternode.length + 100;
                            
                            oModel.setSizeLimit(SizeLimitCW); // This set the amount of items that the dropdown shows (default value 100)
                            sap.ui.getCore().setModel(oModel, that.widgetName);
                        },

                        /*-------------------------- Live Search for SearchField  ------------------------------------- */
                        // onLiveChange: function (event) {

                            // const aFilters = [];
                            // const query = event.getParameter("newValue").trim();
                            // this.byId("Tree").getBinding("items").filter(query ? new sap.ui.model.Filter({
                            //     path: "text",
                            //     operator: "Contains",
                            //     value1: query,
                            // }) : null);


                        // },

                        /*-------------------------- DefaultSelection at OnInitialization ------------------------------------- */
                        onDefaultSelction: function (event) {     

                            let itemList = this.byId("Tree").$().find(".sapMTreeItemBase"); // Get the List of Items

                            if (this.getView().byId("Tree").sId == "__xmlview1--Tree"){
                                if(!getItemsSelection.includes(this.getView().byId("Tree"))){
                                    getItemsSelection.push(this.getView().byId("Tree"));
                                }
                            }
                            if (this.getView().byId("Tree").sId == "__xmlview2--Tree"){
                                if(!getItemsSelection.includes(this.getView().byId("Tree"))){
                                    getItemsSelection.push(this.getView().byId("Tree"));
                                }
                            }
                            if (this.getView().byId("Tree").sId == "__xmlview3--Tree"){ 
                                if(!getItemsSelection.includes(this.getView().byId("Tree"))){
                                    getItemsSelection.push(this.getView().byId("Tree"));
                                }
                            }
                            if (this.getView().byId("Tree").sId == "__xmlview4--Tree"){
                                if(!getItemsSelection.includes(this.getView().byId("Tree"))){
                                    getItemsSelection.push(this.getView().byId("Tree"));
                                }
                            }

                            // ===================================================================================
                            // ================================= SEARCH FUNCTION =================================
                            // ===================================================================================

                            let nodeDescriptionSearch = [];
                            let nodeIdentifierSearch = [];
                            let searchStringID = [];
                            let searchStringDesc = [];
                            // if (document.readyState === 'complete'){
                            //     let stateCheck = setInterval(() => {
                                    let searchBar = "";
                                    searchBar = this.byId("Tree").$().find("input.sapMInputBaseInner")[0]; // Get the searchbar
                                    searchBar.addEventListener('keyup', (evnt) => {
                                        const searchString = evnt.target.value.toLowerCase(); // Get value of the searchBar
                                        let filterNodeList = filternode; // Gets the array for the children
                                        let filterValueList = filtervalue; // Gets the array for the List Item
                                        let filterValueDescList = filterValueDesc; // Gets the array for the List Item
                                        let filterInfoList = _filterinfo; // Gets the array of all info
                                        let appendFilters = [];
                                        
                                        if (searchBar.id == "__input0-inner"){
                                            filterInfoList = filterInfoList[0];
                                            itemList = getItemsSelection[0].$().find(".sapMTreeItemBase");;
                                        }
                                        if (searchBar.id == "__input1-inner"){
                                            filterInfoList = filterInfoList[1];
                                            itemList = getItemsSelection[1].$().find(".sapMTreeItemBase");;
                                        }
                                        if (searchBar.id == "__input2-inner"){
                                            filterInfoList = filterInfoList[2];
                                            itemList = getItemsSelection[2].$().find(".sapMTreeItemBase");;
                                        }
                                        if (searchBar.id == "__input3-inner"){
                                            filterInfoList = filterInfoList[3];
                                            itemList = getItemsSelection[3].$().find(".sapMTreeItemBase");;
                                        }

                                        for (let i=0; i < filterInfoList.length; i++){ // This is getting the Node ID
                                            if(!nodeIdentifierSearch.includes(filterInfoList[i].IDNAME)){
                                                nodeIdentifierSearch.push(filterInfoList[i].IDNAME);
                                            }
                                        }
                                        for (let i=0; i < filterInfoList.length; i++){ // This is getting the Node Name
                                            if(!nodeDescriptionSearch.includes(filterInfoList[i].NODEDEC)){
                                                nodeDescriptionSearch.push(filterInfoList[i].NODEDEC);
                                            }
                                        }

                                        for (let i=0; i < itemList.length; i++){
                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items to change the innerHTML
                                            filteredList.parentNode.style.display = "none";
                                        }

                                        for (let i=0; i < filterInfoList.length; i++){
                                            let strNodeIdentifierSearch = nodeIdentifierSearch[i];
                                            let strNodeDescriptionSearch = nodeDescriptionSearch[i];
                                            if (typeof strNodeIdentifierSearch === "undefined"){
                                                strNodeIdentifierSearch = "";
                                            }
                                            if (typeof strNodeDescriptionSearch === "undefined"){
                                                strNodeDescriptionSearch = "";
                                            }
                                            if (strNodeIdentifierSearch.toLowerCase().indexOf(searchString) > -1 || strNodeDescriptionSearch.toLowerCase().indexOf(searchString) > -1){
                                                searchStringID = strNodeIdentifierSearch;
                                                searchStringDesc = strNodeDescriptionSearch;
                                                for (let x=0; x < itemList.length; x++){
                                                    let filteredList = itemList[x].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items to change the innerHTML
                                                    if ( filteredList.innerHTML.indexOf(strNodeIdentifierSearch) > -1 || filteredList.innerHTML.indexOf(strNodeDescriptionSearch) > -1 ){
                                                        filteredList.parentNode.style.display = "flex";
                                                    }
                                                } // Search in the List for the Child elements                                                 
                                            }
                                        }
                                    });

                            //         clearInterval(stateCheck);
                            //     }, 1000)
                            // }

                            // ===================================================================================
                            // ========================= this is to hide flickering bug ==========================
                            // ===================================================================================

                            let scriptParent = mapcanvas_divstr.parentNode; // This gets parent of mapcanvas script (its a div);
                            let shadowRootDiv = scriptParent.parentNode; // This gets shadowroot;
                            let shadowPanel = shadowRootDiv.firstChild; // This gets the 1st element of shadowroot (aka target that we want);
                            if(that.widgetno){
                                let stateCheck = setInterval(() => { // Creates a setInterval of 1sec to hide the content flicker;
                                    if (document.readyState === 'complete'){ // when document is loaded then removes the style
                                        clearInterval(stateCheck);
                                        shadowPanel.style.height = "0%";
                                    }
                                }, 1000)
                            }

                            // ===================================================================================
                            // ==================== Setting up the display and Selection Type ====================
                            // ===================================================================================

                            if (IDNum[that.widgetno]) {
                                this.byId("Tree").setMode(that.Selection_Type);
                                if (that.Selection_Type == "MultiSelect"){
                                    this.byId("Tree").expandToLevel(99);
                                }else {
                                    this.byId("Tree").expandToLevel(that.Default_Level);
                                }
                                IDNum[that.widgetno] -= 1;
                            }

                            //====================================================================================

                            partiallySelected();
                            
                            if (that.widgetName && that.Selection_Type && _setModeInfo[that.widgetno]) {
                                dfnumber = _dfnumber[that.widgetno - 1];
                                filterinfo = _filterinfo[that.widgetno - 1];
                                filtervalue = _filtervalue[that.widgetno - 1];
                                filterValueDesc = _filterValueDesc[that.widgetno - 1];
                                filternode = _filternode[that.widgetno - 1];
                                dfdesc = _dfdesc[that.widgetno - 1];
                                var schild = "";
                                var listselected = [];
                                var listselecteddec = [];
                                var ptextid = [];
                                var ptextdec = [];
                                var ll_1 = [];
                                var pi_1 =[];
                                var ni_1 =[];
                                var nd_1 = [];

                                for (var i = 0; i < dfnumber.length; i++) {
                                    if (that.Selection_Type == "MultiSelect"){
                                        this.byId("Tree").expandToLevel(99);
                                    }else {
                                        this.byId("Tree").expandToLevel(that.Default_Level);
                                    }
                                    this.byId("Tree").getItems()[dfnumber[i]].setSelected(true);
                                    var snode = that.default[i];
                                    listselected.push(snode);
                                    listselecteddec.push(dfdesc[i]); 
                                    for (var x = 0; x < filternode.length; x++) {
                                        if (snode === filternode[x]) {
                                            schild += filtervalue[x];
                                            ptextid.push(filterinfo[x].PTID);
                                            ptextdec.push(filterinfo[x].PTDEC);
                                            ll_1.push(filterinfo[x].LEVEL);
                                            pi_1.push(filterinfo[x].PARENTID);
                                            ni_1.push(filterinfo[x].NODEID);
                                            nd_1.push(filterinfo[x].NODEDEC);
                                        }
                                    }
                                };
                                _SelectedChild = schild.substr(1, schild.length).split(",");
                                _SelectedNodeDec = listselecteddec;
                                _SelectedNode = listselected;
                                _FF1 = _dfF1[that.widgetno];
                                _FF2 = _dfF2[that.widgetno];
                                _ptdec = ptextdec;
                                _ptid = ptextid;

                                _SelectedLevel_Value = ll_1;
                                _SelectedParentId_Value = pi_1;
                                _SelectedNodeId_Value = ni_1;
                                _SelectedTextId_Value = listselected;
                                _SelectedTextDesc_Value = listselecteddec; 
                            
                                that._firePropertiesChanged();
                                _setModeInfo[that.widgetno] = 0;

                            }

                            // ===================================================================================
                            // ================================= Styling Options =================================
                            // ===================================================================================
                            
                            var fbi = _FontStyle[that.widgetno];

                            let disableParent = _ParentNodes[that.widgetno];
                            let selectNodes = _SelectedNodes[that.widgetno];

                            // ==============================================================================
                            // ========== THIS IS A TEST TOO SEE IF I CAN PUT CHECKBOX ON THE RIGHT =========
                            // ==============================================================================
                            // this.byId("Tree").$().find('.sapMCb').css({ "position": "fixed", "right": "0" });
                            // this.byId("Tree").$().find('.sapMLIBContent').css({ "margin-left": "1rem" });

                            numberNodeSelected = this.getView().byId("Tree").getSelectedItems();
                            setItemSelected = this.getView().byId("Tree").getItems()[0];

                            // ===================================================================================
                            // =============================== SELECTION FUNCTION ================================
                            // ===================================================================================

                            let listLabel = document.querySelector(".unselectable");

                            let filterinfo1 = _filterinfo[0];
                            let filterinfo2 = _filterinfo[1];
                            let filterinfo3 = _filterinfo[2];
                            let filterinfo4 = _filterinfo[3];

                            if(!getSelection.includes(Selection)){
                                getSelection.push(Selection);
                            }
                            if (Selection === "nodeIdDec"){
                                if(!getSpart.includes(spart)){
                                    getSpart.push(spart);
                                }
                            }

                            if (that.Selection_Type == "MultiSelect") {

                                // ==================================================================================
                                // == Onload get the default selected node and put parents also partially selected ==
                                // ==================================================================================
                                let clickedNode = "";
                                let positionClickedNode = "";
                                let defaultNode = [];
                                
                                let itemList = this.byId("Tree").$().find("li.sapMTreeItemBase"); // Get the List of Items

                                let filterNodeList = filternode; // Gets the array for the children
                                let filterValueList = filtervalue; // Gets the array for the List Item
                                let filterInfoList = filterinfo; // Gets the array of all info

                                clickedNode = _SelectedNodeDec[0];
                                
                                if(typeof clickedNode !== "undefined"){
                                    if(typeof arrClickedNode !== "undefined"){
                                        if(!arrClickedNode.includes(clickedNode)) { // This if is to not duplicate data
                                            arrClickedNode.push(clickedNode); // Push position of the items that we are searching into this variable
                                        }
                                    }
                                }

                                let nodeDescription = [];
                                let nodeIdentifier = [];
                                let nodeIdentiferPlusDescription = [];
                                for (let i=0; i < filterInfoList.length; i++){
                                    nodeDescription.push(filterInfoList[i].NODEDEC);
                                    nodeIdentifier.push(filterInfoList[i].IDNAME);
                                    nodeIdentiferPlusDescription.push(filterInfoList[i].IDNAME + " " + spart + " " + filterInfoList[i].NODEDEC);
                                }
    
                                for (let i=0; i < nodeDescription.length; i++){
                                    let strDescription = nodeDescription[i];
                                    if (strDescription === arrClickedNode[0] || strDescription === arrClickedNode[1] ||  strDescription === arrClickedNode[2] || strDescription === arrClickedNode[3]){
                                        positionClickedNode = i;
                                    }
                                }

                                for (let i=0; i < nodeIdentifier.length; i++){
                                    let strIdentifier = nodeIdentifier[i];
                                    if (strIdentifier === arrClickedNode[0] || strIdentifier === arrClickedNode[1] ||  strIdentifier === arrClickedNode[2] || strIdentifier === arrClickedNode[3]){
                                        positionClickedNode = i;
                                    }
                                }

                                for (let i=0; i < nodeIdentiferPlusDescription.length; i++){
                                    let strIdentiferPlusDescription = nodeIdentiferPlusDescription[i];
                                    if (strIdentiferPlusDescription === arrClickedNode[0] || strIdentiferPlusDescription === arrClickedNode[1] ||  strIdentiferPlusDescription === arrClickedNode[2] || strIdentiferPlusDescription === arrClickedNode[3]){
                                        positionClickedNode = i;
                                    }
                                }

                                let nodeDesc = [];

                                // ========================================================================
                                if (positionClickedNode !== ""){
                                    if (Selection !== "nodeid"){
                                    
                                    }else {
                                        for (let i=0; i < filterinfo.length; i++){
                                            nodeDesc.push(filterInfoList[i].IDNAME);
                                        }
                                        if ( filterInfoList[positionClickedNode] === "undefined" ){
                                            
                                        }else {
                                            defaultNode.push(filterInfoList[positionClickedNode].IDNAME);
                                        }
                                    }
    
    
                                    // ========================================================================
                                    if (Selection !== "nodedec"){
                                       
                                    }else {
                                        for (let i=0; i < filterinfo.length; i++){
                                            nodeDesc.push(filterInfoList[i].NODEDEC);
                                        }
                                        if  ( filterInfoList[positionClickedNode] === "undefined" ){
    
                                        }else {
                                            defaultNode.push(filterInfoList[positionClickedNode].NODEDEC);
                                        }
                                    }
    
                                    // ========================================================================
                                    if (Selection !== "nodeIdDec"){
                                        
                                    }else {
                                        for (let i=0; i < filterinfo.length; i++){
                                            if (spart === " "){
                                                nodeDesc.push(filterInfoList[i].IDNAME + " " + spart + " " + filterInfoList[i].NODEDEC);
                                            }else {
                                                nodeDesc.push(filterInfoList[i].IDNAME + " " + spart + " " + filterInfoList[i].NODEDEC);
                                            }
                                        }
                                        if ( filterInfoList[positionClickedNode] === "undefined" ){
                                            
                                        }else {
                                            if (spart === " "){
                                                defaultNode.push(filterInfoList[positionClickedNode].IDNAME + " " + spart + " " + filterInfoList[positionClickedNode].NODEDEC);
                                            }else {
                                                defaultNode.push(filterInfoList[positionClickedNode].IDNAME + " " + spart + " " + filterInfoList[positionClickedNode].NODEDEC);
                                            }
                                        }
                                    }
                                }
                                

                                // ========================================================================

                                //#region 
                                let clickedNodeDefault = "";
                                for (let i=0; i < defaultNode.length; i++){
                                    clickedNodeDefault = defaultNode[i];
                                }

                                // ================================= Present Children ================================
                                // ===================================================================================
                                
                                let appendFilters = [];
                                //#region 
                                for (let i=0; i < nodeDesc.length; i++){ // This is getting array for children
                                    if(nodeDesc[i] == clickedNodeDefault){ // See if the clickedNode is inside the Array filterNodeList
                                        if(!appendFilters.includes(i)) { // This if is to not duplicate data
                                            appendFilters.push(i); // Push position of the items that we are searching into this variable
                                        }
                                    }
                                }

                                let getChildrenPosition = [];
                                for (let id in appendFilters){ // Create the array that gets the childs from the positions of appendFilters
                                    getChildrenPosition.push(filterValueList[appendFilters[id]]);
                                }
                                let strChildren = getChildrenPosition.toString(); // Make arry into a string
                                let noCommasChildren = strChildren.replaceAll(',', ' '); // Remove Commas from words
                                let splitChildren = noCommasChildren.trim().split(/(\s+)/); // Split string into an array to get a clean value
                                let filteredChildren = splitChildren.filter(function (el){ // Remove blank spaces from array
                                    return String(el).trim();
                                });
                                let appendChild = [];
                                for (let i=0; i < filteredChildren.length; i++){
                                    let strFilteredChildren = filteredChildren[i];
                                    for (let u=0; u < filterNodeList.length; u++){ // This is getting array for children
                                        if(filterNodeList[u] == strFilteredChildren){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!appendChild.includes(u)) { // Doesn't let duplication of nodes
                                                appendChild.push(u); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                    }
                                }
                                //#endregion

                                // ===================================================================================
                                // ===================================================================================
                                // ===================================================================================

                                let getChildren = [];
                                let pullChildren = [];
                                // This gets the children position and children nodes
                                //#region 
                                for (let id in appendChild){ // Create the array that gets the childs from the positions of appendFilters
                                    getChildren.push(filterInfoList[appendChild[id]]);
                                }                            
                                
                                if (Selection === "nodeid"){
                                    for (let i=0; i < getChildren.length; i++){
                                        pullChildren[i] = getChildren[i].IDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < getChildren.length; i++){
                                        pullChildren[i] = getChildren[i].NODEDEC; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < getChildren.length; i++){

                                        if (spart === " "){                                        
                                            pullChildren[i] = getChildren[i].IDNAME + " " + spart + " " + getChildren[i].NODEDEC; // Get Parent of clicked Element
                                        }else {
                                            pullChildren[i] = getChildren[i].IDNAME + " " + spart + " " + getChildren[i].NODEDEC; // Get Parent of clicked Element
                                        }
                                    }
                                }
                                //#endregion
                                let uniquePullChildren = [...new Set(pullChildren)];

                                // ================================== Present Parent =================================
                                // ===================================================================================

                                let getParent = [];
                                let pullParent = [];
                                // This gets the Parent position and parent nodes
                                //#region 
                                for (let id in appendFilters){ // Create the array that gets the childs from the positions of appendFilters
                                    getParent.push(filterInfoList[appendFilters[id]]);
                                }
                                

                                if (Selection === "nodeid"){
                                    for (let i=0; i < getParent.length; i++){
                                        pullParent[i] = getParent[0].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < getParent.length; i++){
                                        pullParent[i] = getParent[0].PTDEC; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < getParent.length; i++){

                                        if (spart === " "){                                        
                                            pullParent[i] = getParent[i].PTIDNAME + " " + spart + " " + getChildren[i].PTDEC; // Get Parent of clicked Element
                                        }else {
                                            pullParent[i] = getParent[i].PTIDNAME + " " + spart + " " + getChildren[i].PTDEC; // Get Parent of clicked Element
                                        }
                                    }
                                }
                                //#endregion
                                let uniquePullParent = [...new Set(pullParent)];

                                // ============================ Present Child Nodes of Parent ===========================
                                // ======================================================================================
                                
                                let appendChildParent = [];
                                // Select middle if parent isn't the same
                                //#region 
                                for (let i=0; i < filteredChildren.length; i++){
                                    let strParentChildren = filteredChildren[i];
                                    for (let u=0; u < filterNodeList.length; u++){ // This is getting array for children
                                        if(filterNodeList[u] == strParentChildren){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!appendChildParent.includes(u)) { // Doesn't let duplication of nodes
                                                appendChildParent.push(u); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                    }
                                }
                                let getChildrenParent = [];
                                let pullChildrenParent = [];
                                for (let id in appendChildParent){ // Create the array that gets the childs from the positions of appendFilters
                                    getChildrenParent.push(filterInfoList[appendChildParent[id]]);
                                }                            
                                

                                if (Selection === "nodeid"){
                                    for (let i=0; i < getChildrenParent.length; i++){
                                        pullChildrenParent[i] = getChildrenParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < getChildrenParent.length; i++){
                                        pullChildrenParent[i] = getChildrenParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < getChildrenParent.length; i++){

                                        if (spart === " "){                                        
                                            pullChildrenParent[i] = getChildrenParent[i].PTIDNAME + " " + spart + " " + getChildrenParent[i].PTDEC; // Get Parent of clicked Element
                                        }else {
                                            pullChildrenParent[i] = getChildrenParent[i].PTIDNAME + " " + spart + " " + getChildrenParent[i].PTDEC; // Get Parent of clicked Element
                                        }
                                    }
                                }
                                //#endregion
                                let uniquePullChildrenParent = [...new Set(pullChildrenParent)];

                                // =========================== Present Parent Nodes Parent ===========================
                                // ===================================================================================

                                let str2ndParent = "";
                                let append2ndParent = [];
                                // Get position of the parent parent inside nodeDesc 
                                //#region                 
                                for (let i=0; i < pullChildrenParent.length; i++){
                                    str2ndParent = pullChildrenParent[i];
                                    for (let u=0; u < nodeDesc.length; u++){ // This is getting array for children
                                        if(nodeDesc[u] == str2ndParent){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!append2ndParent.includes(u)) { // Doesn't let duplication of nodes
                                                append2ndParent.push(u); // Push position of the items that we are searching into this variable
                                            } 
                                        }
                                    }
                                }

                                let get2ndParent = [];
                                let pullParentParent = [];
                                for (let id in append2ndParent){ // Create the array that gets the childs from the positions of appendFilters
                                    get2ndParent.push(filterInfoList[append2ndParent[id]]);
                                }
                                

                                if (Selection === "nodeid"){
                                    for (let i=0; i < get2ndParent.length; i++){
                                        pullParentParent[i] = get2ndParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < get2ndParent.length; i++){
                                        pullParentParent[i] = get2ndParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < get2ndParent.length; i++){

                                        if (spart === " "){                                        
                                            pullParentParent[i] = get2ndParent[i].PTIDNAME + " " + spart + " " + get2ndParent[i].PTDEC; // Get Parent of clicked Element
                                        }else {
                                            pullParentParent[i] = get2ndParent[i].PTIDNAME + " " + spart + " " + get2ndParent[i].PTDEC; // Get Parent of clicked Element
                                        }
                                    }
                                }
                                //#endregion
                                let uniquePullParentParent = [...new Set(pullParentParent)];

                                // ============================= Present 3rd Nodes Parent =============================
                                // ====================================================================================

                                let str3rdParent = "";
                                let append3rdParent = [];
                                // Get position of the parent parent inside nodeDesc
                                //#region 
                                for (let i=0; i < get2ndParent.length; i++){
                                    str3rdParent = pullParentParent[i];
                                    for (let u=0; u < nodeDesc.length; u++){ // This is getting array for children
                                        if(nodeDesc[u] == str3rdParent){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!append3rdParent.includes(u)) { // Doesn't let duplication of nodes
                                                append3rdParent.push(u); // Push position of the items that we are searching into this variable
                                            } 
                                        }
                                    }
                                }
                                let get3rdParent = [];
                                let pull3rdParent = [];
                                for (let id in append3rdParent){ // Create the array that gets the childs from the positions of appendFilters
                                    get3rdParent.push(filterInfoList[append3rdParent[id]]);
                                }
                                

                                if (Selection === "nodeid"){
                                    for (let i=0; i < get3rdParent.length; i++){
                                        pull3rdParent[i] = get3rdParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < get3rdParent.length; i++){
                                        pull3rdParent[i] = get3rdParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < get3rdParent.length; i++){

                                        if (spart === " "){                                        
                                            pull3rdParent[i] = get3rdParent[i].PTIDNAME + " " + spart + " " + get3rdParent[i].PTDEC; // Get Parent of clicked Element
                                        }else {
                                            pull3rdParent[i] = get3rdParent[i].PTIDNAME + " " + spart + " " + get3rdParent[i].PTDEC; // Get Parent of clicked Element
                                        }
                                    }
                                }
                                //#endregion
                                let uniquePull3rdParent = [...new Set(pull3rdParent)];

                                // ============================= Present 4rd Nodes Parent =============================
                                // ====================================================================================

                                let str4thParent = "";
                                let append4thParent = [];
                                // Get position of the parent parent inside nodeDesc
                                //#region 
                                for (let i=0; i < pull3rdParent.length; i++){
                                    str4thParent = pull3rdParent[i];
                                    for (let u=0; u < nodeDesc.length; u++){ // This is getting array for children
                                        if(nodeDesc[u] == str4thParent){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!append4thParent.includes(u)) { // Doesn't let duplication of nodes
                                                append4thParent.push(u); // Push position of the items that we are searching into this variable
                                            } 
                                        }
                                    }
                                }

                                let get4thParent = [];
                                let pull4thParent = [];
                                for (let id in append4thParent){ // Create the array that gets the childs from the positions of appendFilters
                                    get4thParent.push(filterInfoList[append4thParent[id]]);
                                }
                                

                                if (Selection === "nodeid"){
                                    for (let i=0; i < get4thParent.length; i++){
                                        pull4thParent[i] = get4thParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < get4thParent.length; i++){
                                        pull4thParent[i] = get4thParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < get4thParent.length; i++){

                                        if (spart === " "){                                        
                                            pull4thParent[i] = get4thParent[i].PTIDNAME + " " + spart + " " + get4thParent[i].PTDEC; // Get Parent of clicked Element
                                        }else {
                                            pull4thParent[i] = get4thParent[i].PTIDNAME + " " + spart + " " + get4thParent[i].PTDEC; // Get Parent of clicked Element
                                        }
                                    }
                                }
                                //#endregion
                                let uniquePull4thParent = [...new Set(pull4thParent)];

                                // ============================= Present 5rd Nodes Parent =============================
                                // ====================================================================================

                                let str5thParent = "";
                                let append5thParent = [];
                                // Get position of the parent parent inside nodeDesc
                                //#region 
                                for (let i=0; i < pull4thParent.length; i++){
                                    str5thParent = pull4thParent[i];
                                    for (let u=0; u < nodeDesc.length; u++){ // This is getting array for children
                                        if(nodeDesc[u] == str5thParent){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!append5thParent.includes(u)) { // Doesn't let duplication of nodes
                                                append5thParent.push(u); // Push position of the items that we are searching into this variable
                                            } 
                                        }
                                    }
                                }

                                let get5thParent = [];
                                let pull5thParent = [];
                                for (let id in append5thParent){ // Create the array that gets the childs from the positions of appendFilters
                                    get5thParent.push(filterInfoList[append5thParent[id]]);
                                }
                                

                                if (Selection === "nodeid"){
                                    for (let i=0; i < get5thParent.length; i++){
                                        pull5thParent[i] = get5thParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < get5thParent.length; i++){
                                        pull5thParent[i] = get5thParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < get5thParent.length; i++){

                                        if (spart === " "){                                        
                                            pull5thParent[i] = get5thParent[i].PTIDNAME + " " + spart + " " + get5thParent[i].PTDEC; // Get Parent of clicked Element
                                        }else {
                                            pull5thParent[i] = get5thParent[i].PTIDNAME + " " + spart + " " + get5thParent[i].PTDEC; // Get Parent of clicked Element
                                        }
                                    }
                                }
                                //#endregion
                                let uniquePull5thParent = [...new Set(pull5thParent)];
                                
                                // ==========================================================================================================
                                // ==========================================================================================================
                                // ==========================================================================================================

                                let elementPartiallySelected = this.byId("Tree").$().find('.sapMCbMark');
                                for (let m=0; m < itemList.length; m++){
                                    let filteredList = itemList[m].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items 
                                    if (filteredList.innerHTML == clickedNodeDefault.replace(/&/g, "&amp;") ){
                                        if (this.getView().byId("Tree").getItems()[m].mProperties.selected == true){

                                            // ==========================================================================================================
                                            // ======================================= Need to get ALL the Parents ======================================
                                            // ==========================================================================================================

                                            // Select 1st Parent
                                            for (let u=0; u < uniquePullChildrenParent.length; u++){
                                                let strPullChildrenParent = uniquePullChildrenParent[u];
                                                if ( strPullChildrenParent !=  clickedNodeDefault ){
                                                    for (let i=0; i < itemList.length; i++){
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strPullChildrenParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            this.getView().byId("Tree").getItems()[i].setSelected(false); // set the selection of Parent to false
                                                            elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                            this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                        }
                                                    }
                                                }
                                            }

                                            // Select 2nd Parent
                                            for (let u=0; u < uniquePullParentParent.length; u++){
                                                let strPullParentParent = uniquePullParentParent[u];                                        
                                                if ( strPullParentParent !=  clickedNodeDefault  ){
                                                    for (let i=0; i < itemList.length; i++){
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strPullParentParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            this.getView().byId("Tree").getItems()[i].setSelected(false); // set the selection of Parent to false
                                                            elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                            this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                        }
                                                    }
                                                }
                                            }

                                            // Select 3rd Parent
                                            for (let u=0; u < uniquePull3rdParent.length; u++){
                                                let strPull3rdParent = uniquePull3rdParent[u];                                   
                                                if ( strPull3rdParent !=  clickedNodeDefault ){
                                                    for (let i=0; i < itemList.length; i++){
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strPull3rdParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            this.getView().byId("Tree").getItems()[i].setSelected(false); // set the selection of Parent to false
                                                            elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                            this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                            
                                                        }
                                                    }
                                                }
                                            }

                                            // Select 4th Parent
                                            for (let u=0; u < uniquePull4thParent.length; u++){
                                                let strPull4thParent = uniquePull4thParent[u];                                     
                                                if ( strPull4thParent !=  clickedNodeDefault ){
                                                    for (let i=0; i < itemList.length; i++){
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strPull4thParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            this.getView().byId("Tree").getItems()[i].setSelected(false); // set the selection of Parent to false
                                                            elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                            this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                        }
                                                    }
                                                }
                                            }

                                            // Select 5th Parent
                                            for (let u=0; u < uniquePull5thParent.length; u++){
                                                let strPull5thParent = uniquePull5thParent[u];                                     
                                                if ( strPull5thParent !=  clickedNodeDefault ){
                                                    for (let i=0; i < itemList.length; i++){
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strPull5thParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            this.getView().byId("Tree").getItems()[i].setSelected(false); // set the selection of Parent to false
                                                            elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                            this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                        }
                                                    }
                                                }
                                            }

                                            // ==========================================================================================================
                                            // ======================================= Need to get ALL the Parents ======================================
                                            // ==========================================================================================================

                                            let childrenLevel1 = [];
                                            // Select 1st Children level
                                            childrenLevel1.push(...uniquePullChildren);
                                            for (let u=0; u < childrenLevel1.length; u++){ // cycle through filteredChildren values
                                                let strChildren = childrenLevel1[u]; // This is to compare text later on
                                                let strPullChildrenParent = uniquePullChildrenParent;
                                                if ( strPullChildrenParent ==  clickedNodeDefault ){
                                                    for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strChildren.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            this.getView().byId("Tree").getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                            // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                            elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                            this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                        }
                                                    }
                                                }
                                            }

                                            let childrenLevel2 = [];
                                            // Select 2nd children level
                                            childrenLevel2.push(...uniquePullChildrenParent, ...uniquePullChildren);
                                            for (let u=0; u < childrenLevel2.length; u++){
                                                let strPullChildrenParent = childrenLevel2[u]; 
                                                let strPullParentParent = uniquePullParentParent;
                                                if ( strPullParentParent ==  clickedNodeDefault ){
                                                    for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strPullChildrenParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            this.getView().byId("Tree").getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                            // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                            elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                            this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                        }
                                                    }
                                                }
                                            }

                                            let childrenLevel3 = [];
                                            // Select 3rd children level
                                            childrenLevel3.push(...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                            for (let x=0; x < uniquePull3rdParent.length; x++){
                                                let strPull3rdParent = uniquePull3rdParent[x]; 
                                                for (let u=0; u < childrenLevel3.length; u++){ 
                                                    let strPullChildrenLevel = childrenLevel3[u];
                                                    if ( strPull3rdParent ==  clickedNodeDefault ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                this.getView().byId("Tree").getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                                // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                                elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            let childrenLevel4 = [];
                                            // Select 4th children level 
                                            childrenLevel4.push(...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                            uniquePull4thParent = uniquePull4thParent.filter( function( el ){
                                                return uniquePull3rdParent.indexOf( el ) < 0;
                                            });
                                            for (let x=0; x < uniquePull4thParent.length; x++){
                                                let strPull4thParent = uniquePull4thParent[x]; 
                                                for (let u=0; u < childrenLevel4.length; u++){ 
                                                    let strPullChildrenLevel = childrenLevel4[u];
                                                    if ( strPull4thParent ==  clickedNodeDefault ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be truet
                                                                this.getView().byId("Tree").getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                                // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                                elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            let childrenLevel5 = [];
                                            // Select 5th children level
                                            childrenLevel5.push(...uniquePull4thParent, ...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                            uniquePull5thParent = uniquePull5thParent.filter( function( el ){
                                                return uniquePull3rdParent.indexOf( el ) < 0;
                                            });
                                            for (let x=0; x < uniquePull5thParent.length; x++){
                                                let strPull5thParent = uniquePull5thParent[x];
                                                for (let u=0; u < childrenLevel5.length; u++){ 
                                                    let strPullChildrenLevel = childrenLevel5[u];
                                                    if ( strPull5thParent ==  clickedNodeDefault ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                this.getView().byId("Tree").getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                                // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                                elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                            }
                                                        }
                                                    }
                                                }
                                            }//end of 5th level selection
                                        }// end of if item is selected == true
                                    }// end of if itemlist equals to selectedNode
                                }// end of selection

                                // ===================================================================================
                                // =================== Collapse and Expand Nodes custom Interaction ==================
                                // ===================================================================================

                                // let itemList = this.byId("Tree").$().find("li.sapMTreeItemBase"); // Get the List of Items
                                let baseItem = this.byId("Tree").$().find('.sapMTreeItemBase');
                                
                                this.byId("Tree").$().find(".sapMTreeItemBaseExpander").css({ "pointer-events": "none", "display": "none" });
                                let label = document.createElement('label');
                                label.setAttribute("id", "expander cleanLabel");
                                label.setAttribute("role", "presentation");
                                label.setAttribute("aria-hidden", "true");
                                label.setAttribute("title", "Collapse Node");
                                label.setAttribute("data-sap-ui", "expander");
                                label.classList.add("sapUiIcon", "sapUiIconMirrorInRTL", "sapUiIconPointer", "sapMTreeItemBaseExpander", "expanded", "unselectable");
                                label.setAttribute("data-sap-ui-icon-content", ""); //This is for the down arrow
                                label.setAttribute("unselectable", "on");

                                let itemWithSpan = this.byId("Tree").$().find("li.sapMTreeItemBase");
                                itemWithSpan.prepend(label);
                                let listLabel = this.byId("Tree").$().find(".unselectable ");
                                let listPadding = "";

                                itemWithSpan.css({ "padding-left": "0px" });
                                listLabel.css({ "font-family": "SAP-icons", "pointer-events": "all" });

                                //#region 

                                let nodeLevel = [];
                                for (let i=0; i < filterinfo.length; i++){
                                    nodeLevel.push(filterInfoList[i].LEVEL);
                                }
                                
                                let nodeLevel1 = [];
                                let nodeLevel2 = [];
                                let nodeLevel3 = [];
                                let nodeLevel4 = [];
                                let nodeLevel5 = [];
                                let nodeLevel6 = [];
                                let nodeLevel7 = [];
                                for (let u=1; u < 7; u++){
                                    
                                    for (let i=0; i < nodeLevel.length; i++){ // This is getting array for children
                                        if(nodeLevel[i] == "1"){ // Get level 1 nodes from filterNodeList
                                            if(!nodeLevel1.includes(i)) { // This if is to not duplicate data
                                                nodeLevel1.push(i); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                        if(nodeLevel[i] == "2"){ // Get level 2 nodes from filterNodeList
                                            if(!nodeLevel2.includes(i)) { // This if is to not duplicate data
                                                nodeLevel2.push(i); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                        if(nodeLevel[i] == "3"){ // Get level 3 nodes from filterNodeList
                                            if(!nodeLevel3.includes(i)) { // This if is to not duplicate data
                                                nodeLevel3.push(i); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                        if(nodeLevel[i] == "4"){ // Get level 4 nodes from filterNodeList
                                            if(!nodeLevel4.includes(i)) { // This if is to not duplicate data
                                                nodeLevel4.push(i); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                        if(nodeLevel[i] == "5"){ // Get level 5 nodes from filterNodeList
                                            if(!nodeLevel5.includes(i)) { // This if is to not duplicate data
                                                nodeLevel5.push(i); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                        if(nodeLevel[i] == "6"){ // Get level 6 nodes from filterNodeList
                                            if(!nodeLevel6.includes(i)) { // This if is to not duplicate data
                                                nodeLevel6.push(i); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                        if(nodeLevel[i] == "7"){ // Get level 7 nodes from filterNodeList
                                            if(!nodeLevel7.includes(i)) { // This if is to not duplicate data
                                                nodeLevel7.push(i); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                    }
                                }

                                //#endregion
                                // ==========================================================================
                                // ============================== Node Level 1 ==============================
                                // ==========================================================================
                                let getNodeLevel1 = [];
                                //#region 
                                if (Selection == undefined){
                                    Selection = that.Display;
                                }
                                if (Selection === "nodeid"){
                                    for (let i=0; i < nodeLevel1.length; i++){
                                        getNodeLevel1.push(filterInfoList[nodeLevel1[i]].IDNAME);
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < nodeLevel1.length; i++){
                                        getNodeLevel1.push(filterInfoList[nodeLevel1[i]].NODEDEC);
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < nodeLevel1.length; i++){
                                        getNodeLevel1.push(filterInfoList[nodeLevel1[i]].IDNAME + " " + spart + " " + filterInfoList[nodeLevel1[i]].NODEDEC);
                                    }
                                }
                                
                                //#endregion
                                
                                for (let i= 0; i < getNodeLevel1.length; i++){ // getNodeLevel1
                                    let strGetNodeLevel1 = getNodeLevel1[i];
                                    for (let u=0; u < itemList.length; u++){
                                        let filteredList = itemList[u].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                        let filteredListParent = filteredList.parentNode;
                                        let listItemLabel = filteredListParent.firstChild;
                                        if (filteredList.innerHTML == strGetNodeLevel1){ 
                                            listItemLabel.style.paddingLeft = "0";
                                        }
                                    }
                                }
                                // ==========================================================================
                                // ============================== Node Level 2 ==============================
                                // ==========================================================================
                                let getNodeLevel2 = [];
                                //#region
                                if (Selection == undefined){
                                    Selection = that.Display;
                                }
                                if (Selection === "nodeid"){
                                    for (let i=0; i < nodeLevel2.length; i++){
                                        getNodeLevel2.push(filterInfoList[nodeLevel2[i]].IDNAME);
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < nodeLevel2.length; i++){
                                        getNodeLevel2.push(filterInfoList[nodeLevel2[i]].NODEDEC);
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < nodeLevel2.length; i++){
                                        getNodeLevel2.push(filterInfoList[nodeLevel2[i]].IDNAME + " " + spart + " " + filterInfoList[nodeLevel2[i]].NODEDEC);
                                    }
                                }
                                //#endregion

                                for (let i= 0; i < getNodeLevel2.length; i++){ // getNodeLevel2
                                    let strGetNodeLevel2 = getNodeLevel2[i];
                                    for (let u=0; u < itemList.length; u++){
                                        let filteredList = itemList[u].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                        let filteredListParent = filteredList.parentNode;
                                        let listItemLabel = filteredListParent.firstChild;
                                        if (filteredList.innerHTML == strGetNodeLevel2){
                                            listItemLabel.style.paddingLeft = "8px";
                                        }
                                    }
                                }
                                // ==========================================================================
                                // ============================== Node Level 3 ==============================
                                // ==========================================================================
                                let getNodeLevel3 = [];
                                //#region 
                                if (Selection == undefined){
                                    Selection = that.Display;
                                }
                                if (Selection === "nodeid"){
                                    for (let i=0; i < nodeLevel3.length; i++){
                                        getNodeLevel3.push(filterInfoList[nodeLevel3[i]].IDNAME);
                                    }
                                }   
                                if (Selection === "nodedec"){
                                    for (let i=0; i < nodeLevel3.length; i++){
                                        getNodeLevel3.push(filterInfoList[nodeLevel3[i]].NODEDEC);
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < nodeLevel3.length; i++){
                                        getNodeLevel3.push(filterInfoList[nodeLevel3[i]].IDNAME + " " + spart + " " + filterInfoList[nodeLevel3[i]].NODEDEC);
                                    }
                                }
                                //#endregion

                                for (let i= 0; i < getNodeLevel3.length; i++){ // getNodeLevel3
                                    let strGetNodeLevel3 = getNodeLevel3[i];
                                    for (let u=0; u < itemList.length; u++){
                                        let filteredList = itemList[u].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                        let filteredListParent = filteredList.parentNode;
                                        let listItemLabel = filteredListParent.firstChild;
                                        if (filteredList.innerHTML == strGetNodeLevel3){ 
                                            listItemLabel.style.paddingLeft = "16px";
                                        }
                                    }
                                }
                                // ==========================================================================
                                // ============================== Node Level 4 ==============================
                                // ==========================================================================
                                let getNodeLevel4 = [];
                                //#region 
                                if (Selection == undefined){
                                    Selection = that.Display;
                                }
                                if (Selection === "nodeid"){
                                    for (let i=0; i < nodeLevel4.length; i++){
                                        getNodeLevel4.push(filterInfoList[nodeLevel4[i]].IDNAME);
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < nodeLevel4.length; i++){
                                        getNodeLevel4.push(filterInfoList[nodeLevel4[i]].NODEDEC);
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < nodeLevel4.length; i++){
                                        getNodeLevel4.push(filterInfoList[nodeLevel4[i]].IDNAME + " " + spart + " " + filterInfoList[nodeLevel4[i]].NODEDEC);
                                    }
                                }
                                //#endregion

                                for (let i= 0; i < getNodeLevel4.length; i++){ // getNodeLevel4
                                    let strGetNodeLevel4 = getNodeLevel4[i];
                                    for (let u=0; u < itemList.length; u++){
                                        let filteredList = itemList[u].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                        let filteredListParent = filteredList.parentNode;
                                        let listItemLabel = filteredListParent.firstChild;
                                        if (filteredList.innerHTML == strGetNodeLevel4){ 
                                            listItemLabel.style.paddingLeft = "24px";
                                        }
                                    }
                                }
                                // ==========================================================================
                                // ============================== Node Level 5 ==============================
                                // ==========================================================================
                                let getNodeLevel5 = [];
                                //#region 
                                if (Selection == undefined){
                                    Selection = that.Display;
                                }
                                if (Selection === "nodeid"){
                                    for (let i=0; i < nodeLevel5.length; i++){
                                        getNodeLevel5.push(filterInfoList[nodeLevel5[i]].IDNAME);
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < nodeLevel5.length; i++){
                                        getNodeLevel5.push(filterInfoList[nodeLevel5[i]].NODEDEC);
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < nodeLevel5.length; i++){
                                        getNodeLevel5.push(filterInfoList[nodeLevel5[i]].IDNAME + " " + spart + " " + filterInfoList[nodeLevel5[i]].NODEDEC);
                                    }
                                }
                                //#endregion

                                for (let i= 0; i < getNodeLevel5.length; i++){ // getNodeLevel5
                                    let strGetNodeLevel5 = getNodeLevel5[i];
                                    for (let u=0; u < itemList.length; u++){
                                        let filteredList = itemList[u].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                        let filteredListParent = filteredList.parentNode;
                                        let listItemLabel = filteredListParent.firstChild;
                                        if (filteredList.innerHTML == strGetNodeLevel5.toString()){ 
                                            listItemLabel.style.paddingLeft = "32px";
                                        }
                                    }
                                }
                                // ==========================================================================
                                // ============================== Node Level 6 ==============================
                                // ==========================================================================
                                let getNodeLevel6 = [];
                                //#region 
                                if (Selection == undefined){
                                    Selection = that.Display;
                                }
                                if (Selection === "nodeid"){
                                    for (let i=0; i < nodeLevel6.length; i++){
                                        getNodeLevel6.push(filterInfoList[nodeLevel6[i]].IDNAME);
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < nodeLevel6.length; i++){
                                        getNodeLevel6.push(filterInfoList[nodeLevel6[i]].NODEDEC);
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < nodeLevel6.length; i++){
                                        getNodeLevel6.push(filterInfoList[nodeLevel6[i]].IDNAME + " " + spart + " " + filterInfoList[nodeLevel6[i]].NODEDEC);
                                    }
                                }
                                //#endregion

                                for (let i= 0; i < getNodeLevel6.length; i++){ // getNodeLevel6
                                    let strGetNodeLevel6 = getNodeLevel6[i];
                                    for (let u=0; u < itemList.length; u++){
                                        let filteredList = itemList[u].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                        let filteredListParent = filteredList.parentNode;
                                        let listItemLabel = filteredListParent.firstChild;
                                        if (filteredList.innerHTML == strGetNodeLevel6){ 
                                            listItemLabel.style.paddingLeft = "40px";
                                        }
                                    }
                                }
                            }

                            // ==========================================================================
                            // ========================= End of Default Styling =========================
                            // ==========================================================================

                            
                            // ==========================================================================
                            // == Start of onclick Event for Item Selection and Expand/ Collapse Nodes ==
                            // ==========================================================================

                            // this.byId("Tree").onclick = e => {
                            window.onclick = e => {

                                let target = e.target || e.srcElement;
                                // console.log("target", target);
                                let targetParent = target.parentNode;
                                // console.log("targetParent", targetParent);
                                let listItemsNode = targetParent.parentNode;
                                // console.log(listItemsNode);
                                let listItemChild = listItemsNode.children;
                                // console.log(listItemChild);
                                let targetParentChild = targetParent.children;
                                // console.log("targetParentChild", targetParentChild);
                                let listChild = target.children;
                                let clickedNode = "";
                                let clickedLabel = "";
                                let clickedChild = "";
                                
                                // This if gets the text of the selected Node
                                if (target.tagName.toUpperCase() == 'DIV' || target.tagName.toUpperCase() == 'LI' || target.tagName.toUpperCase() == 'LABEL' ){
                                    if (target.classList.contains('sapMCbBg')){
                                        clickedNode = listItemChild[3].innerHTML;
                                    }else if (target.classList.contains('sapMLIBSelectM')){
                                        clickedNode = targetParentChild[3].innerHTML;
                                    } else if (target.classList.contains('sapMTreeItemBase')){
                                        clickedNode = listChild[3].innerHTML;
                                    }else if ( target.classList.contains("expanded") || target.classList.contains("collapsed") ){
                                        clickedLabel = targetParent.children[3].innerHTML
                                    }else {
                                        clickedNode = e.target.innerHTML;
                                    }
                                }
                                // ======================================================================================

                                let itemListWidget1 = "";
                                let itemListWidget2 = "";
                                let itemListWidget3 = "";
                                let itemListWidget4 = "";
                                
                                let itemListTotal = document.querySelectorAll("li"); // Get the List of Items
    
                                // ======================================================================================
                                // ======================================================================================
    
                                // This is a check too not give error of Undefined
                                let filterInfoLength1 = "";
                                let itemListID1 = "";
                                if (typeof filterinfo1 !== "undefined"){
                                    filterInfoLength1 = 0;
                                    if (typeof itemListTotal[filterInfoLength1] !== "undefined"){
                                        itemListID1 = itemListTotal[filterInfoLength1].id; // This gets the ID of the ItemListTotal
                                    }
                                }
    
                                let filterInfoLength2 = "";
                                let itemListID2 = "";
                                if (typeof filterinfo2 !== "undefined"){
                                    filterInfoLength2 = filterinfo1.length + 1;
                                    if (typeof itemListTotal[filterInfoLength2] !== "undefined"){
                                        itemListID2 = itemListTotal[filterInfoLength2].id;  // This gets the ID of the ItemListTotal
                                    }
                                }
    
                                let filterInfoLength3 = "";
                                let itemListID3 = "";
                                if (typeof filterinfo3 !== "undefined"){
                                    filterInfoLength3 = filterInfoLength2 + filterinfo2.length;
                                    if (typeof itemListTotal[filterInfoLength3] !== "undefined"){
                                        itemListID3 = itemListTotal[filterInfoLength3].id;  // This gets the ID of the ItemListTotal
                                    }
                                }
    
                                let filterInfoLength4 = "";
                                let itemListID4 = ""; 
                                if (typeof filterinfo4 !== "undefined"){
                                    filterInfoLength4 = filterInfoLength3 + filterinfo3.length;
                                    if (typeof itemListTotal[filterInfoLength4] !== "undefined"){
                                        itemListID4 = itemListTotal[filterInfoLength4].id;  // This gets the ID of the ItemListTotal
                                    }
                                }
    
                                // ======================================================================================
                                // ======================================================================================

                                let itemListID1Split = "";
                                let itemDivWidget1 = "";
    
                                let itemListID2Split = "";
                                let itemDivWidget2 = "";
    
                                let itemListID3Split = "";
                                let itemDivWidget3 = "";
    
                                let itemListID4Split = "";
                                let itemDivWidget4 = "";
    
                                if (itemListID1.includes('1')){
                                    itemListID1Split = itemListID1.split("-")[1]; // Then we get the name and number of the instance of the widget
                                    itemDivWidget1 = document.getElementById(itemListID1Split); // we get the div associated to the name and number 
                                    itemListWidget1 = itemDivWidget1.querySelectorAll("li"); // we get the item List of said div
                                }
                                if(itemListID2.includes('2')) {
                                    itemListID2Split = itemListID2.split("-")[1];  // Then we get the name and number of the instance of the widget
                                    itemDivWidget2 = document.getElementById(itemListID2Split);  // we get the div associated to the name and number 
                                    itemListWidget2 = itemDivWidget2.querySelectorAll("li");  // we get the item List of said div
                                }
    
                                if(itemListID3.includes('3')) {
                                    itemListID3Split = itemListID3.split("-")[1];  // Then we get the name and number of the instance of the widget
                                    itemDivWidget3 = document.getElementById(itemListID3Split);  // we get the div associated to the name and number 
                                    itemListWidget3 = itemDivWidget3.querySelectorAll("li");  // we get the item List of said div
                                }
    
                                if(itemListID4.includes('4')) {
                                    itemListID4Split = itemListID4.split("-")[1];  // Then we get the name and number of the instance of the widget
                                    itemDivWidget4 = document.getElementById(itemListID4Split);  // we get the div associated to the name and number 
                                    itemListWidget4 = itemDivWidget4.querySelectorAll("li");  // we get the item List of said div
                                }

                                // ======================================================================================
                                // =============================                            =============================
                                // ======================================================================================

                                let targetParentNode = target.parentNode;
                                let targetGrandParent = targetParentNode.parentNode;
                                let targetGreatParent = targetGrandParent.parentNode;
                                let targetNodeID = "";
                                targetNodeID = targetGreatParent.id;

                                if (targetNodeID.includes('1')){
                                    filterinfo = _filterinfo[0];
                                    filternode = _filternode[0];
                                    filtervalue = _filtervalue[0];
                                    itemList = itemListWidget1;
                                    Selection = getSelection[0];
                                    if (Selection === "nodeIdDec"){
                                        spart = getSpart[0];
                                    }
                                }
                                if (targetNodeID.includes('2')){
                                    filterinfo = _filterinfo[1];
                                    filternode = _filternode[1];
                                    filtervalue = _filtervalue[1];
                                    itemList = itemListWidget2;
                                    Selection = getSelection[1];
                                    if (Selection === "nodeIdDec"){
                                        if (getSpart.length = 1) {
                                            spart = getSpart[0];
                                        }else {
                                            spart = getSpart[1];
                                        }
                                    }
                                }
                                if (targetNodeID.includes('3')){
                                    filterinfo = _filterinfo[2];
                                    filternode = _filternode[2];
                                    filtervalue = _filtervalue[2];
                                    itemList = itemListWidget3;
                                    Selection = getSelection[2];

                                    if (Selection === "nodeIdDec"){
                                        if (getSpart.length = 1) {
                                            spart = getSpart[0];
                                        }
                                        if (getSpart.length = 2) {
                                            spart = getSpart[1];
                                        }
                                        if (getSpart.length = 3) {
                                            spart = getSpart[2];
                                        }
                                    }
                                }
                                if (targetNodeID.includes('4')){
                                    filterinfo = _filterinfo[3];
                                    filternode = _filternode[3];
                                    filtervalue = _filtervalue[3];
                                    itemList = itemListWidget4;
                                    Selection = getSelection[3];

                                    if (Selection === "nodeIdDec"){
                                        if (getSpart.length = 1) {
                                            spart = getSpart[0];
                                        }
                                        if (getSpart.length = 2) {
                                            spart = getSpart[1];
                                        }
                                        if (getSpart.length = 3) {
                                            spart = getSpart[2];
                                        }
                                        if (getSpart.length = 4) {
                                            spart = getSpart[3];
                                        }
                                    }
                                }

                                // ======================================================================================
                                
                                let filterNodeList = []; // Gets the array for the children
                                filterNodeList = filternode; // Gets the array for the children
                                let filterValueList = []; // Gets the array for the List Item
                                filterValueList = filtervalue; // Gets the array for the List Item
                                let filterInfoList = []; // Gets the array of all info
                                filterInfoList = filterinfo; // Gets the array of all info

                                let nodeDesc = [] || 0;

                                if (Selection === "nodeid"){
                                    for (let i=0; i < filterInfoList.length; i++){
                                        nodeDesc.push(filterInfoList[i].IDNAME);
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < filterInfoList.length; i++){
                                        nodeDesc.push(filterInfoList[i].NODEDEC);
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < filterInfoList.length; i++){
                                        nodeDesc.push(filterInfoList[i].IDNAME + " " + spart + " " + filterInfoList[i].NODEDEC);
                                    }
                                }

                                // ==================================================================================
                                // ===================== This is for Appending all the Children =====================
                                // ==================================================================================
                                
                                //#region 
                                let appendFilters = [];
                                //#region 
                                for (let i=0; i < nodeDesc.length; i++){ // This is getting array for children
                                    if(nodeDesc[i].toLowerCase() == clickedNode.toLowerCase() || nodeDesc[i].toLowerCase() == clickedLabel.toLowerCase()){ // See if the clickedNode is inside the Array filterNodeList
                                        if(!appendFilters.includes(i)) { // This if is to not duplicate data
                                            appendFilters.push(i); // Push position of the items that we are searching into this variable
                                        }
                                    }
                                }
                                
                                let getChildrenPosition = [];
                                for (let id in appendFilters){ // Create the array that gets the childs from the positions of appendFilters
                                    getChildrenPosition.push(filterValueList[appendFilters[id]]);
                                }

                                let strChildren = getChildrenPosition.toString(); // Make arry into a string
                                let noCommasChildren = strChildren.replaceAll(',', ' '); // Remove Commas from words
                                let splitChildren = noCommasChildren.trim().split(/(\s+)/); // Split string into an array to get a clean value
                                let filteredChildren = splitChildren.filter(function (el){ // Remove blank spaces from array
                                    return String(el).trim();
                                });

                                let appendChild = [];
                                for (let i=0; i < filteredChildren.length; i++){
                                    let strFilteredChildren = filteredChildren[i];
                                    for (let u=0; u < filterNodeList.length; u++){ // This is getting array for children
                                        if(filterNodeList[u] == strFilteredChildren){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!appendChild.includes(u)) { // Doesn't let duplication of nodes
                                                appendChild.push(u); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                    }
                                }

                                // This gets the children position and children nodes
                                let getChildren = [];
                                let pullChildren = [];
                                for (let id in appendChild){ // Create the array that gets the childs from the positions of appendFilters
                                    getChildren.push(filterInfoList[appendChild[id]]);
                                }

                                if (Selection === "nodeid"){
                                    for (let i=0; i < getChildren.length; i++){
                                        pullChildren[i] = getChildren[i].IDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < getChildren.length; i++){
                                        pullChildren[i] = getChildren[i].NODEDEC; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < getChildren.length; i++){
                                        pullChildren.push(getChildren[i].IDNAME + " " + spart + " " + getChildren[i].NODEDEC);
                                    }
                                }

                                let uniquePullChildren = [...new Set(pullChildren)];
                                //#endregion

                                // ================================== Present Parent =================================
                                // ===================================================================================

                                // This gets the Parent position and parent nodes
                                let getParent = [];
                                let pullParent = [];
                                //#region 
                                for (let id in appendFilters){ // Create the array that gets the childs from the positions of appendFilters
                                    getParent.push(filterInfoList[appendFilters[id]]);
                                }

                                if (Selection === "nodeid"){
                                    for (let i=0; i < getParent.length; i++){
                                        pullParent[i] = getParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodedec"){
                                    for (let i=0; i < getParent.length; i++){
                                        pullParent[i] = getParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < getParent.length; i++){
                                        pullParent.push(getParent[i].PTIDNAME + " " + spart + " " + getParent[i].PTDEC);
                                    }
                                }

                                // pullParent = getParent[0].PTDEC; // Get Parent of clicked Element
                                let uniquePullParent = [...new Set(pullParent)];
                                //#endregion

                                // ============================ Present Child Nodes of Parent ===========================
                                // ======================================================================================
                                
                                let appendChildParent = [];
                                //#region 
                                // Select middle if parent isn't the same
                                for (let i=0; i < filteredChildren.length; i++){
                                    let strParentChildren = filteredChildren[i];
                                    for (let u=0; u < filterNodeList.length; u++){ // This is getting array for children
                                        if(filterNodeList[u] == strParentChildren){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!appendChildParent.includes(u)) { // Doesn't let duplication of nodes
                                                appendChildParent.push(u); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                    }
                                }
                                let getChildrenParent = [];
                                let pullChildrenParent = [];
                                for (let id in appendChildParent){ // Create the array that gets the childs from the positions of appendFilters
                                    getChildrenParent.push(filterInfoList[appendChildParent[id]]);
                                }          
                                if (Selection === "nodedec"){                  
                                    for (let i=0; i < getChildrenParent.length; i++){
                                        pullChildrenParent[i] = getChildrenParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodeid"){                  
                                    for (let i=0; i < getChildrenParent.length; i++){
                                        pullChildrenParent[i] = getChildrenParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < getChildrenParent.length; i++){
                                        pullChildrenParent.push(getChildrenParent[i].PTIDNAME + " " + spart + " " + getChildrenParent[i].PTDEC);
                                    }
                                }

                                let uniquePullChildrenParent = [...new Set(pullChildrenParent)];
                                //#endregion

                                // =========================== Present Parent Nodes Parent ===========================
                                // ===================================================================================
                                let str2ndParent = "";
                                //#region 
                                let append2ndParent = [];
                                // Get position of the parent parent inside nodeDesc                 
                                for (let i=0; i < pullChildrenParent.length; i++){
                                    str2ndParent = pullChildrenParent[i];
                                    for (let u=0; u < nodeDesc.length; u++){ // This is getting array for children
                                        if(nodeDesc[u] == str2ndParent){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!append2ndParent.includes(u)) { // Doesn't let duplication of nodes
                                                append2ndParent.push(u); // Push position of the items that we are searching into this variable
                                            } 
                                        }
                                    }
                                }

                                let get2ndParent = [];
                                let pullParentParent = [];
                                for (let id in append2ndParent){ // Create the array that gets the childs from the positions of appendFilters
                                    get2ndParent.push(filterInfoList[append2ndParent[id]]);
                                }
                                if (Selection === "nodeid"){
                                    for (let i=0; i < get2ndParent.length; i++){
                                        pullParentParent[i] = get2ndParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < get2ndParent.length; i++){
                                        pullParentParent[i] = get2ndParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < get2ndParent.length; i++){
                                        pullParentParent.push(get2ndParent[i].PTIDNAME + " " + spart + " " + get2ndParent[i].PTDEC);
                                    }
                                }

                                let uniquePullParentParent = [...new Set(pullParentParent)];
                                //#endregion

                                // =========================== Present 3rd Nodes Parent ===========================
                                // ===================================================================================
                                let str3rdParent = "";
                                //#region 
                                let append3rdParent = [];
                                // Get position of the parent parent inside nodeDesc
                                for (let i=0; i < get2ndParent.length; i++){
                                    str3rdParent = pullParentParent[i];
                                    for (let u=0; u < nodeDesc.length; u++){ // This is getting array for children
                                        if(nodeDesc[u] == str3rdParent){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!append3rdParent.includes(u)) { // Doesn't let duplication of nodes
                                                append3rdParent.push(u); // Push position of the items that we are searching into this variable
                                            } 
                                        }
                                    }
                                }
                                let get3rdParent = [];
                                let pull3rdParent = [];
                                for (let id in append3rdParent){ // Create the array that gets the childs from the positions of appendFilters
                                    get3rdParent.push(filterInfoList[append3rdParent[id]]);
                                }
                                
                                if (Selection === "nodeid"){
                                    for (let i=0; i < get3rdParent.length; i++){
                                        pull3rdParent[i] = get3rdParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < get3rdParent.length; i++){
                                        pull3rdParent[i] = get3rdParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < get3rdParent.length; i++){
                                        pull3rdParent.push(get3rdParent[i].PTIDNAME + " " + spart + " " + get3rdParent[i].PTDEC);
                                    }
                                }

                                let uniquePull3rdParent = [...new Set(pull3rdParent)];
                                //#endregion

                                // =========================== Present 4rd Nodes Parent ===========================
                                // ===================================================================================
                                let str4thParent = "";
                                //#region 
                                let append4thParent = [];
                                // Get position of the parent parent inside nodeDesc
                                for (let i=0; i < pull3rdParent.length; i++){
                                    str4thParent = pull3rdParent[i];
                                    for (let u=0; u < nodeDesc.length; u++){ // This is getting array for children
                                        if(nodeDesc[u] == str4thParent){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!append4thParent.includes(u)) { // Doesn't let duplication of nodes
                                                append4thParent.push(u); // Push position of the items that we are searching into this variable
                                            } 
                                        }
                                    }
                                }

                                let get4thParent = [];
                                let pull4thParent = [];
                                for (let id in append4thParent){ // Create the array that gets the childs from the positions of appendFilters
                                    get4thParent.push(filterInfoList[append4thParent[id]]);
                                }
                                if (Selection === "nodeid"){
                                    for (let i=0; i < get4thParent.length; i++){
                                        pull4thParent[i] = get4thParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < get4thParent.length; i++){
                                        pull4thParent[i] = get4thParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < get4thParent.length; i++){
                                        pull4thParent.push(get4thParent[i].PTIDNAME + " " + spart + " " + get4thParent[i].PTDEC);
                                    }
                                }

                                let uniquePull4thParent = [...new Set(pull4thParent)];
                                //#endregion

                                // =========================== Present 5rd Nodes Parent ===========================
                                // ===================================================================================
                                let str5thParent = "";
                                //#region
                                let append5thParent = [];
                                // Get position of the parent parent inside nodeDesc
                                for (let i=0; i < pull4thParent.length; i++){
                                    str5thParent = pull4thParent[i];
                                    for (let u=0; u < nodeDesc.length; u++){ // This is getting array for children
                                        if(nodeDesc[u] == str5thParent){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!append5thParent.includes(u)) { // Doesn't let duplication of nodes
                                                append5thParent.push(u); // Push position of the items that we are searching into this variable
                                            }                                           }
                                    }
                                }

                                let get5thParent = [];
                                let pull5thParent = [];
                                for (let id in append5thParent){ // Create the array that gets the childs from the positions of appendFilters
                                    get5thParent.push(filterInfoList[append5thParent[id]]);
                                }

                                if (Selection === "nodeid"){
                                    for (let i=0; i < get5thParent.length; i++){
                                        pull5thParent[i] = get5thParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }
                                if (Selection === "nodedec"){
                                    for (let i=0; i < get5thParent.length; i++){
                                        pull5thParent[i] = get5thParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < get5thParent.length; i++){
                                        pull5thParent.push(get5thParent[i].PTIDNAME + " " + spart + " " + get5thParent[i].PTDEC);
                                    }
                                }
                                
                                let uniquePull5thParent = [...new Set(pull5thParent)];
                                //#endregion

                                // ============================= Present 6th Nodes Parent =============================
                                // ====================================================================================
                                let str6thParent = "";
                                //#region 
                                let append6thParent = [];
                                // Get position of the parent parent inside nodeDesc
                                for (let i=0; i < pull5thParent.length; i++){
                                    str6thParent = pull5thParent[i];
                                    for (let u=0; u < nodeDesc.length; u++){ // This is getting array for children
                                        if(nodeDesc[u] == str6thParent){ // See if the clickedNode is inside the Array filterNodeList
                                            if(!append6thParent.includes(u)) { // Doesn't let duplication of nodes
                                                append6thParent.push(u); // Push position of the items that we are searching into this variable
                                            }
                                        }
                                    }
                                }

                                let get6thParent = [];
                                let pull6thParent = [];
                                for (let id in append6thParent){ // Create the array that gets the childs from the positions of appendFilters
                                    get5thParent.push(filterInfoList[append6thParent[id]]);
                                }
                                if (Selection === "nodeid"){
                                    for (let i=0; i < get6thParent.length; i++){
                                        pull6thParent[i] = get6thParent[i].PTIDNAME; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodedec"){
                                    for (let i=0; i < get6thParent.length; i++){
                                        pull6thParent[i] = get6thParent[i].PTDEC; // Get Parent of clicked Element
                                    }
                                }

                                if (Selection === "nodeIdDec"){
                                    for (let i=0; i < get6thParent.length; i++){
                                        pull6thParent.push(get6thParent[i].PTIDNAMEBget6thParent[i].PTDEC);
                                    }
                                }
                                
                                let uniquePull6thParent = [...new Set(pull6thParent)];
                                
                                //#endregion
                                //#endregion

                                // ===================================================================================
                                // ================ Makes Collapse and Extend Labels ================
                                // ===================================================================================

                                //#region 
                                if (target.tagName.toUpperCase() == 'LABEL' && that.Selection_Type == "MultiSelect"){

                                    let index = [];
                                    let targetLabel = e.target || e.srcElement;
                                    let targetParent = targetLabel.parentNode;
                                    let target3rdchild = targetParent.children[3].innerHTML;
                                    let strPullParent = "";
                                    for (let i=0; i < pullParent.length; i++){
                                        strPullParent = pullParent[i];
                                    }
                                    
                                    for (let m=0; m < itemList.length; m++){
                                        let filteredList = itemList[m].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                        let liSapMTree = itemList;

                                        let listItemForCSS = document.querySelector('li');
                                        if (listItemForCSS.classList.contains("disabled")){
                                            listItemForCSS.classList.remove("disabled");
                                        }
                                        
                                        if ( targetLabel.classList.contains("expanded") && filteredList.innerHTML == clickedLabel.replace(/&/g, "&amp;") ) {

                                            target.setAttribute("data-sap-ui-icon-content", ""); //This is for the right arrow
                                            target.classList.add("collapsed");
                                            target.classList.remove("expanded");
                                    
                                            // ========================= Select Children of Parents =========================
                                            // ==============================================================================
                                            let childrenLevel1 = [];
                                            childrenLevel1.push(...uniquePullChildren);

                                            childrenLevel1 = childrenLevel1.filter(v => v !== clickedLabel);
                                            childrenLevel1 = childrenLevel1.filter(v => v !== strPullParent);

                                            for (let u=0; u < childrenLevel1.length; u++){ // cycle through filteredChildren values
                                                let strChildren = childrenLevel1[u]; // This is to compare text later on
                                                let strPullChildrenParent = uniquePullChildrenParent;
                                                if ( strPullChildrenParent ==  clickedLabel ){
                                                    for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strChildren.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            liSapMTree[i].classList.remove("displayed");
                                                            liSapMTree[i].classList.add("disabled");
                                                        }
                                                    }
                                                }
                                            }

                                            // ========================= Select 2nd children level =========================
                                            // =============================================================================
                                            let childrenLevel2 = [];
                                            childrenLevel2.push(...uniquePullChildrenParent, ...uniquePullChildren);

                                            childrenLevel2 = childrenLevel2.filter(v => v !== clickedLabel);
                                            childrenLevel2 = childrenLevel2.filter(v => v !== strPullParent);

                                            for (let u=0; u < childrenLevel2.length; u++){
                                                let strPullChildrenParent = childrenLevel2[u]; 
                                                let strPullParentParent = uniquePullParentParent;
                                                if ( strPullParentParent ==  clickedLabel ){
                                                    for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strPullChildrenParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            liSapMTree[i].classList.remove("displayed");
                                                            liSapMTree[i].classList.add("disabled");
                                                        }
                                                    }
                                                }
                                            }

                                            // ========================= Select 3rd children level =========================
                                            // =============================================================================
                                            let childrenLevel3 = [];
                                            childrenLevel3.push(...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);

                                            childrenLevel3 = childrenLevel3.filter(v => v !== clickedLabel);
                                            childrenLevel3 = childrenLevel3.filter(v => v !== strPullParent);

                                            for (let x=0; x < uniquePull3rdParent.length; x++){
                                                let strPull3rdParent = uniquePull3rdParent[x];
                                                for (let u=0; u < childrenLevel3.length; u++){ 
                                                    let strPullChildrenLevel = childrenLevel3[u];
                                                    if ( strPull3rdParent ==  clickedLabel ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                liSapMTree[i].classList.remove("displayed");
                                                                liSapMTree[i].classList.add("disabled");
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            // ========================= Select 4th children level =========================
                                            // =============================================================================
                                            let childrenLevel4 = [];
                                            childrenLevel4.push(...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);

                                            childrenLevel4 = childrenLevel4.filter(v => v !== clickedLabel);
                                            childrenLevel4 = childrenLevel4.filter(v => v !== strPullParent);

                                            for (let x=0; x < uniquePull4thParent.length; x++){
                                                let strPull4thParent = uniquePull4thParent[x];
                                                for (let u=0; u < childrenLevel4.length; u++){
                                                    let strPullChildrenLevel = childrenLevel4[u];
                                                    if ( strPull4thParent ==  clickedLabel ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                liSapMTree[i].classList.remove("displayed");
                                                                liSapMTree[i].classList.add("disabled");
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                                
                                            // ========================= Select 5th children level =========================
                                            // =============================================================================
                                            let childrenLevel5 = [];
                                            childrenLevel5.push(...uniquePull4thParent, ...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);

                                            childrenLevel5 = childrenLevel5.filter(v => v !== clickedLabel);
                                            childrenLevel5 = childrenLevel5.filter(v => v !== strPullParent);

                                            for (let x=0; x < uniquePull5thParent.length; x++){
                                                let strPull5thParent = uniquePull5thParent[x];
                                                for (let u=0; u < childrenLevel5.length; u++){ 
                                                    let strPullChildrenLevel = childrenLevel5[u];
                                                    if ( strPull5thParent ==  clickedLabel ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                liSapMTree[i].classList.remove("displayed");
                                                                liSapMTree[i].classList.add("disabled");
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }else if ( targetLabel.classList.contains("collapsed") && filteredList.innerHTML == clickedLabel.replace(/&/g, "&amp;") ) {
                                            
                                            targetLabel.setAttribute("data-sap-ui-icon-content", ""); //This is for the right arrow
                                            targetLabel.classList.remove("collapsed");
                                            targetLabel.classList.add("expanded");

                                            // ========================= Select Children of Parents =========================
                                            // ==============================================================================
                                            let childrenLevel1 = [];
                                            childrenLevel1.push(...uniquePullChildren);
                                            for (let u=0; u < childrenLevel1.length; u++){ // cycle through filteredChildren values
                                                let strChildren = childrenLevel1[u]; // This is to compare text later on
                                                let strPullChildrenParent = uniquePullChildrenParent;
                                                if ( strPullChildrenParent ==  clickedLabel ){
                                                    for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strChildren.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            liSapMTree[i].classList.add("displayed");
                                                            liSapMTree[i].classList.remove("disabled");
                                                        }
                                                    }
                                                }
                                            }
                                            
                                            // ========================= Select 2nd children level =========================
                                            // =============================================================================
                                            let childrenLevel2 = [];
                                            childrenLevel2.push(...uniquePullChildrenParent, ...uniquePullChildren);
                                            for (let u=0; u < childrenLevel2.length; u++){
                                                let strPullChildrenParent = childrenLevel2[u]; 
                                                let strPullParentParent = uniquePullParentParent;
                                                if ( strPullParentParent ==  clickedLabel ){
                                                    for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                        let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                        if ( filteredList.innerHTML == strPullChildrenParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                            liSapMTree[i].classList.add("displayed");
                                                            liSapMTree[i].classList.remove("disabled");
                                                        }
                                                    }
                                                }
                                            }

                                            // ========================= Select 3rd children level =========================
                                            // =============================================================================
                                            let childrenLevel3 = [];
                                            childrenLevel3.push(...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                            for (let x=0; x < uniquePull3rdParent.length; x++){
                                                let strPull3rdParent = uniquePull3rdParent[x];
                                                for (let u=0; u < childrenLevel3.length; u++){ 
                                                    let strPullChildrenLevel = childrenLevel3[u];
                                                    if ( strPull3rdParent ==  clickedLabel ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                liSapMTree[i].classList.add("displayed");
                                                                liSapMTree[i].classList.remove("disabled");
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            // ========================= Select 4th children level =========================
                                            // =============================================================================
                                            let childrenLevel4 = [];
                                            childrenLevel4.push(...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                            for (let x=0; x < uniquePull4thParent.length; x++){
                                                let strPull4thParent = uniquePull4thParent[x];
                                                for (let u=0; u < childrenLevel4.length; u++){
                                                    let strPullChildrenLevel = childrenLevel4[u];
                                                    if ( strPull4thParent ==  clickedLabel ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                liSapMTree[i].classList.add("displayed");
                                                                liSapMTree[i].classList.remove("disabled");
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                                
                                            // ========================= Select 5th children level =========================
                                            // =============================================================================
                                            let childrenLevel5 = [];
                                            childrenLevel5.push(...uniquePull4thParent, ...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                            for (let x=0; x < uniquePull5thParent.length; x++){
                                                let strPull5thParent = uniquePull5thParent[x];
                                                for (let u=0; u < childrenLevel5.length; u++){ 
                                                    let strPullChildrenLevel = childrenLevel5[u];
                                                    if ( strPull5thParent ==  clickedLabel ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                liSapMTree[i].classList.add("displayed");
                                                                liSapMTree[i].classList.remove("disabled");
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        } // end of collapse and extend
                                    } // end Cycle too see what is collapsed and extended
                                }// end of target == Label
                                // #endregion
                                
                                // ===================================================================================
                                // ================ This makes the Selection and Deselection of Nodes ================
                                // ===================================================================================
                                
                                // ===================================================================================
                                // ===================================================================================
                                // ===================================================================================
                                
                                let sapMCbMark = document.querySelectorAll(".sapMCbMark");
                                let elementPartiallySelected = '';
                                let getItemsForSelection = '';

                                // ===================================================================================
                                // ===================================================================================

                                let sapMCbMarkLength4 = "";
                                let sapMCbMarkID4 = "";
                                if (typeof filterinfo4 !== "undefined"){ // This is a check too not give error of Undefined
                                    sapMCbMarkLength4 = filterInfoLength3 + filterinfo3.length;
                                    if (typeof sapMCbMark[sapMCbMarkLength4] !== "undefined"){
                                        sapMCbMarkID4 = sapMCbMark[sapMCbMarkLength4].id; // This gets the ID of the ItemListTotal
                                    }
                                }

                                let sapMCbMarkIDSplit4 = "";
                                let sapMCbMarkWidget4 = "";
                                let sapMCbMarkWidgetTitle4 = "";
                                if (sapMCbMarkID4.includes('4')){
                                    sapMCbMarkIDSplit4 = sapMCbMarkID4.split("-")[1]; // Then we get the name and number of the instance of the widget
                                    sapMCbMarkWidget4 = document.getElementById(sapMCbMarkIDSplit4); // we get the div associated to the name and number 
                                    sapMCbMarkWidgetTitle4 = sapMCbMarkWidget4.querySelectorAll(".sapMCbMark"); // we get the item List of said div
                                }
                                
                                if (targetNodeID.includes('4')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle4;
                                    getItemsForSelection = getItemsSelection[3];
                                }

                                // ===================================================================================
                                // ===================================================================================

                                let sapMCbMarkLength3 = "";
                                let sapMCbMarkID3 = "";
                                if (typeof filterinfo3 !== "undefined"){ // This is a check too not give error of Undefined
                                    sapMCbMarkLength3 = filterInfoLength2 + filterinfo2.length;
                                    if (typeof sapMCbMark[sapMCbMarkLength3] !== "undefined"){
                                        sapMCbMarkID3 = sapMCbMark[sapMCbMarkLength3].id; // This gets the ID of the ItemListTotal
                                    }
                                }

                                let sapMCbMarkIDSplit3 = "";
                                let sapMCbMarkWidget3 = "";
                                let sapMCbMarkWidgetTitle3 = "";
                                if (sapMCbMarkID3.includes('3') || sapMCbMarkID3.includes('4')){
                                    sapMCbMarkIDSplit3 = sapMCbMarkID3.split("-")[1]; // Then we get the name and number of the instance of the widget
                                    sapMCbMarkWidget3 = document.getElementById(sapMCbMarkIDSplit3); // we get the div associated to the name and number 
                                    sapMCbMarkWidgetTitle3 = sapMCbMarkWidget3.querySelectorAll(".sapMCbMark"); // we get the item List of said div
                                }

                                if (targetNodeID.includes('3')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle3;
                                    getItemsForSelection = getItemsSelection[2];
                                }
                                if (targetNodeID.includes('4')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle3;
                                    getItemsForSelection = getItemsSelection[3];
                                }

                                // ===================================================================================
                                // ===================================================================================
                                
                                let sapMCbMarkLength2 = "";
                                let sapMCbMarkID2 = "";
                                if (typeof filterinfo2 !== "undefined"){ // This is a check too not give error of Undefined
                                    sapMCbMarkLength2 = filterinfo1.length + 1;
                                    if (typeof sapMCbMark[sapMCbMarkLength2] !== "undefined"){
                                        sapMCbMarkID2 = sapMCbMark[sapMCbMarkLength2].id; // This gets the ID of the ItemListTotal
                                    }
                                }

                                let sapMCbMarkIDSplit2 = "";
                                let sapMCbMarkWidget2 = "";
                                let sapMCbMarkWidgetTitle2 = "";
                                if (sapMCbMarkID2.includes('2') || sapMCbMarkID2.includes('3') || sapMCbMarkID2.includes('4') ){
                                    sapMCbMarkIDSplit2 = sapMCbMarkID2.split("-")[1]; // Then we get the name and number of the instance of the widget
                                    sapMCbMarkWidget2 = document.getElementById(sapMCbMarkIDSplit2); // we get the div associated to the name and number 
                                    sapMCbMarkWidgetTitle2 = sapMCbMarkWidget2.querySelectorAll(".sapMCbMark"); // we get the item List of said div
                                }
                                
                                if (targetNodeID.includes('2')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle2;
                                    getItemsForSelection = getItemsSelection[1];
                                }
                                if (targetNodeID.includes('3')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle2;
                                    getItemsForSelection = getItemsSelection[2];
                                }
                                if (targetNodeID.includes('4')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle2;
                                    getItemsForSelection = getItemsSelection[3];
                                }

                                // ===================================================================================
                                // ===================================================================================

                                let sapMCbMarkLength1 = "";
                                let sapMCbMarkID1 = "";
                                if (typeof filterinfo1 !== "undefined"){ // This is a check too not give error of Undefined
                                    sapMCbMarkLength1 = 0;
                                    if (typeof sapMCbMark[sapMCbMarkLength1] !== "undefined"){
                                        sapMCbMarkID1 = sapMCbMark[sapMCbMarkLength1].id; // This gets the ID of the ItemListTotal
                                    }
                                }
                                
                                let sapMCbMarkIDSplit1 = "";
                                let sapMCbMarkWidget1 = "";
                                let sapMCbMarkWidgetTitle1 = "";
                                if ( sapMCbMarkID1.includes('1') || sapMCbMarkID1.includes('2') || sapMCbMarkID1.includes('3') || sapMCbMarkID1.includes('4') ){
                                    sapMCbMarkIDSplit1 = sapMCbMarkID1.split("-")[1]; // Then we get the name and number of the instance of the widget
                                    sapMCbMarkWidget1 = document.getElementById(sapMCbMarkIDSplit1); // we get the div associated to the name and number 
                                    sapMCbMarkWidgetTitle1 = sapMCbMarkWidget1.querySelectorAll(".sapMCbMark"); // we get the item List of said div
                                }
                                if (targetNodeID.includes('1')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle1;
                                    getItemsForSelection = getItemsSelection[0];
                                }

                                if (targetNodeID.includes('2')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle1;
                                    getItemsForSelection = getItemsSelection[1];
                                }

                                if (targetNodeID.includes('3')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle1;
                                    getItemsForSelection = getItemsSelection[2];
                                }
                                if (targetNodeID.includes('4')){
                                    elementPartiallySelected = sapMCbMarkWidgetTitle1;
                                    getItemsForSelection = getItemsSelection[3];
                                }
                                // ========================================================================================
                                // ================================= This is the ItemList =================================
                                // ========================================================================================

                                //#region 
                                if (target.tagName.toUpperCase() == 'LI' || target.tagName.toUpperCase() == 'DIV' && that.Selection_Type == "MultiSelect") {
                                    
                                    for (let m=0; m < itemList.length; m++){
                                        let filteredList = itemList[m].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items

                                        if (filteredList.innerHTML == clickedNode.replace(/&/g, "&amp;") ){
                                            if (getItemsForSelection.getItems()[m].mProperties.selected == true){

                                                // ==========================================================================================================
                                                // ============================== Getting all Parents to get Partially Selected =============================
                                                // ==========================================================================================================

                                                // Select 1st Parent
                                                for (let u=0; u < uniquePullChildrenParent.length; u++){
                                                    let strPullChildrenParent = uniquePullChildrenParent[u];
                                                    if ( strPullChildrenParent !=  clickedNode ){
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                getItemsForSelection.getItems()[i].setSelected(false); // set selection of Parent Node to false
                                                                elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                            }
                                                        }
                                                    }
                                                }

                                                // Select 2nd Parent
                                                for (let u=0; u < uniquePullParentParent.length; u++){
                                                    let strPullParentParent = uniquePullParentParent[u];                                    
                                                    if ( strPullParentParent !=  clickedNode  ){
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullParentParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                getItemsForSelection.getItems()[i].setSelected(false); // set selection of Parent Node to false
                                                                elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                            }
                                                        }
                                                    }
                                                }

                                                // Select 3rd Parent
                                                for (let u=0; u < uniquePull3rdParent.length; u++){
                                                    let strPull3rdParent = uniquePull3rdParent[u];                                   
                                                    if ( strPull3rdParent !=  clickedNode ){
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPull3rdParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                getItemsForSelection.getItems()[i].setSelected(false); // set selection of Parent Node to false
                                                                elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];  
                                                            }
                                                        }
                                                    }
                                                }

                                                // Select 4th Parent
                                                for (let u=0; u < uniquePull4thParent.length; u++){
                                                    let strPull4thParent = uniquePull4thParent[u];                                    
                                                    if ( strPull4thParent !=  clickedNode ){
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPull4thParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                getItemsForSelection.getItems()[i].setSelected(false); // set selection of Parent Node to false
                                                                elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                            }
                                                        }
                                                    }
                                                }

                                                // Select 5th Parent
                                                for (let u=0; u < uniquePull5thParent.length; u++){
                                                    let strPull5thParent = uniquePull5thParent[u];                                     
                                                    if ( strPull5thParent !=  clickedNode ){
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPull5thParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                getItemsForSelection.getItems()[i].setSelected(false); // set selection of Parent Node to false
                                                                elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMLIBSelected').css({ "background-color": + "rgb" + selectNodes[3] })[i];
                                                            }
                                                        }
                                                    }
                                                }

                                                // ===========================================================================================================
                                                // ============================== Getting all Children to get Partially Selected =============================
                                                // ===========================================================================================================

                                                let childrenLevel1 = [];
                                                // Select 1st Children level
                                                childrenLevel1.push(...uniquePullChildren);
                                                for (let u=0; u < childrenLevel1.length; u++){ // cycle through filteredChildren values
                                                    let strChildren = childrenLevel1[u]; // This is to compare text later on
                                                    let strPullChildrenParent = uniquePullChildrenParent;
                                                    if ( strPullChildrenParent ==  clickedNode ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strChildren.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                getItemsForSelection.getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                                // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                                elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                            }
                                                        }
                                                    }
                                                }

                                                let childrenLevel2 = [];
                                                // Select 2nd children level
                                                childrenLevel2.push(...uniquePullChildrenParent, ...uniquePullChildren);
                                                for (let u=0; u < childrenLevel2.length; u++){
                                                    let strPullChildrenParent = childrenLevel2[u]; 
                                                    let strPullParentParent = uniquePullParentParent;
                                                    if ( strPullParentParent ==  clickedNode ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                getItemsForSelection.getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                                // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                                elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                            }
                                                        }
                                                    }
                                                }

                                                let childrenLevel3 = [];
                                                // Select 3rd children level
                                                childrenLevel3.push(...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                                for (let x=0; x < uniquePull3rdParent.length; x++){
                                                    let strPull3rdParent = uniquePull3rdParent[x];
                                                    for (let u=0; u < childrenLevel3.length; u++){ 
                                                        let strPullChildrenLevel = childrenLevel3[u];
                                                        if ( strPull3rdParent ==  clickedNode ){
                                                            for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                                let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                    getItemsForSelection.getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                                    // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                                    elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                    this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                let childrenLevel4 = [];
                                                // Select 4th children level 
                                                childrenLevel4.push(...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                                uniquePull4thParent = uniquePull4thParent.filter( function( el ){
                                                    return uniquePull3rdParent.indexOf( el ) < 0;
                                                });
                                                for (let x=0; x < uniquePull4thParent.length; x++){
                                                    let strPull4thParent = uniquePull4thParent[x]; 
                                                    for (let u=0; u < childrenLevel4.length; u++){ 
                                                        let strPullChildrenLevel = childrenLevel4[u];
                                                        if ( strPull4thParent ==  clickedNode ){
                                                            for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                                let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be truet
                                                                    getItemsForSelection.getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                                    // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                                    elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                    this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                let childrenLevel5 = [];
                                                // Select 5th children level
                                                childrenLevel5.push(...uniquePull4thParent, ...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                                uniquePull5thParent = uniquePull5thParent.filter( function( el ){
                                                    return uniquePull3rdParent.indexOf( el ) < 0;
                                                });
                                                for (let x=0; x < uniquePull5thParent.length; x++){
                                                    let strPull5thParent = uniquePull5thParent[x];
                                                    for (let u=0; u < childrenLevel5.length; u++){ 
                                                        let strPullChildrenLevel = childrenLevel5[u];
                                                        if ( strPull5thParent ==  clickedNode ){
                                                            for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                                let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                    getItemsForSelection.getItems()[i].setSelected(true); // set Selected to the elements that we want
                                                                    // elementPartiallySelected[i].classList.add("sapMCbMarkChecked");
                                                                    elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                    this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            
                                            }else {
                                                // Pass the code to deselect the items
                                                //#region 
                                                // Deselect 1st children level
                                                let childrenLevel1 = [];
                                                childrenLevel1.push(...uniquePullChildren);
                                                for (let u=0; u < childrenLevel1.length; u++){ // cycle through filteredChildren values
                                                    let strChildren = childrenLevel1[u]; // This is to compare text later on
                                                    let strPullChildrenParent = uniquePullChildrenParent;
                                                    if ( strPullChildrenParent ==  clickedNode ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strChildren.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                // elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                            }
                                                        }
                                                    } 
                                                }

                                                // Deselect 2nd children level
                                                let childrenLevel2 = [];
                                                childrenLevel2.push(...uniquePullChildrenParent, ...uniquePullChildren);
                                                for (let u=0; u < childrenLevel2.length; u++){
                                                    let strPullChildrenParent = childrenLevel2[u]; 
                                                    let strPullParentParent = uniquePullParentParent;
                                                    if ( strPullParentParent ==  clickedNode ){
                                                        for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                            let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredList.innerHTML == strPullChildrenParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                // elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                            }
                                                        }
                                                    }
                                                }

                                                // Deselect 3rd children level
                                                let childrenLevel3 = [];
                                                childrenLevel3.push(...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                                for (let x=0; x < uniquePull3rdParent.length; x++){
                                                    let strPull3rdParent = uniquePull3rdParent[x]; 
                                                    for (let u=0; u < childrenLevel3.length; u++){ 
                                                        let strPullChildrenLevel = childrenLevel3[u];
                                                        if ( strPull3rdParent ==  clickedNode ){
                                                            for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                                let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                    getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                    // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                    // elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                    this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                // Deselect 4th children level
                                                let childrenLevel4 = [];
                                                childrenLevel4.push(...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                                uniquePull4thParent = uniquePull4thParent.filter( function( el ){
                                                    return uniquePull3rdParent.indexOf( el ) < 0;
                                                });
                                                for (let x=0; x < uniquePull4thParent.length; x++){
                                                    let strPull4thParent = uniquePull4thParent[x]; 
                                                    for (let u=0; u < childrenLevel4.length; u++){ 
                                                        let strPullChildrenLevel = childrenLevel4[u];
                                                        if ( strPull4thParent ==  clickedNode ){
                                                            for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                                let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                    getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                    // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                    // elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                    this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase').css({ "background-color": "transparent" })[i];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                // Deselect 5th children level
                                                let childrenLevel5 = [];
                                                childrenLevel5.push(...uniquePull4thParent, ...uniquePull3rdParent, ...uniquePullParentParent, ...uniquePullChildrenParent, ...uniquePullChildren);
                                                uniquePull5thParent = uniquePull5thParent.filter( function( el ){
                                                    return uniquePull3rdParent.indexOf( el ) < 0;
                                                });
                                                for (let x=0; x < uniquePull5thParent.length; x++){
                                                    let strPull5thParent = uniquePull5thParent[x]; 
                                                    for (let u=0; u < childrenLevel5.length; u++){ 
                                                        let strPullChildrenLevel = childrenLevel5[u];
                                                        if ( strPull5thParent ==  clickedNode ){
                                                            for (let i=0; i < itemList.length; i++){ // cycle through itemList values
                                                                let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                if ( filteredList.innerHTML == strPullChildrenLevel.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                    getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                    // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                    // elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                    this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                //#endregion

                                                // =======================================================================================
                                                // ================== Remove Parent selection when no child is selected ==================
                                                // =======================================================================================
                                                
                                                for(let i=0; i < 1; i++){ // 1st Parent
                                                    //#region
                                                    let strUniquePullChildrenParent = uniquePullChildrenParent[i];
                                                    let appendNodeParent = [];
                                                    for (let i=0; i < nodeDesc.length; i++){ // This is getting array for children
                                                        if(nodeDesc[i] == strUniquePullChildrenParent){ // See if the clickedNode is inside the Array filterNodeList
                                                            if(!appendNodeParent.includes(i)) { // This if is to not duplicate data
                                                                appendNodeParent.push(i); // Push position of the items that we are searching into this variable
                                                            }
                                                        }
                                                    }

                                                    let getNodeChildrenPosition = [];
                                                    for (let id in appendNodeParent){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildrenPosition.push(filterValueList[appendNodeParent[id]]);
                                                    }

                                                    let strNodeChildren = getNodeChildrenPosition.toString(); // Make arry into a string
                                                    let noCommasNodeChildren = strNodeChildren.replaceAll(',', ' '); // Remove Commas from words
                                                    let splitNodeChildren = noCommasNodeChildren.trim().split(/(\s+)/); // Split string into an array to get a clean value
                                                    let filteredNodeChildren = splitNodeChildren.filter(function (el){ // Remove blank spaces from array
                                                        return String(el).trim();
                                                    });

                                                    let appendNodeChild = [];
                                                    for (let i=0; i < filteredNodeChildren.length; i++){
                                                        let strFilteredNodeChildren = filteredNodeChildren[i];
                                                        for (let u=0; u < filterNodeList.length; u++){ // This is getting array for children
                                                            if(filterNodeList[u] == strFilteredNodeChildren){ // See if the clickedNode is inside the Array filterNodeList
                                                                if(!appendNodeChild.includes(u)) { // Doesn't let duplication of nodes
                                                                    appendNodeChild.push(u); // Push position of the items that we are searching into this variable
                                                                }
                                                            }
                                                        }
                                                    }

                                                    // This gets the children position and children nodes
                                                    let getNodeChildren = [];
                                                    let pullNodeChildren = [];
                                                    for (let id in appendNodeChild){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildren.push(filterInfoList[appendNodeChild[id]]);
                                                    }
                                                    if (Selection === "nodeid"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodedec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodeIdDec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME + " " + spart + " " + getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    let uniqueNodePullChildren = [...new Set(pullNodeChildren)];

                                                    let parentFilteredListItem = [];
                                                    for (let u=0; u < uniqueNodePullChildren.length; u++){
                                                        let strUniqueNodePullChildren = uniqueNodePullChildren[u];
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredListItem = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredListItem.innerHTML == strUniqueNodePullChildren ){
                                                                parentFilteredListItem.push(i); // This Array contains the position of the items in the list
                                                            }
                                                        }    
                                                    }

                                                    let getparentFilteredListItem = [];
                                                    for (let id in parentFilteredListItem){ // Create the array that gets the childs from the positions of appendFilters
                                                        getparentFilteredListItem.push(itemList[parentFilteredListItem[id]]);
                                                    }
                                                    
                                                    // let checkingSelected = getparentFilteredListItem;
                                                    getparentFilteredListItem = Array.from(getparentFilteredListItem)
                                                    let check = getparentFilteredListItem.every((item) => { 
                                                        return !item.classList.contains('sapMLIBSelected') 
                                                    });

                                                    //#endregion
                                                    if (check == true){
                                                        // Select Parent of Childrens
                                                        for (let u=0; u < uniquePullChildrenParent.length; u++){
                                                            let strPullChildrenParent = uniquePullChildrenParent[u];
                                                            if ( strPullChildrenParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPullChildrenParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    let checkAny = getparentFilteredListItem.some((item) => {
                                                        return item.classList.contains('sapMLIBSelected') 
                                                    });

                                                    if (checkAny == true){
                                                        // Select Parent of Childrens
                                                        for (let u=0; u < uniquePullChildrenParent.length; u++){
                                                            let strPullChildrenParent = uniquePullChildrenParent[u];
                                                            if ( strPullChildrenParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPullChildrenParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        setTimeout(() => {
                                                                            elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                        }, "20")
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }//end get 1st Parent of clickedNode
                                                
                                                for(let i=0; i < 1; i++){ // 2nd Parent
                                                    //#region
                                                    let struniquePullParentParent = uniquePullParentParent[i];
                                                    let appendNodeParent = [];
                                                    for (let i=0; i < nodeDesc.length; i++){ // This is getting array for children
                                                        if(nodeDesc[i] == struniquePullParentParent){ // See if the clickedNode is inside the Array filterNodeList
                                                            if(!appendNodeParent.includes(i)) { // This if is to not duplicate data
                                                                appendNodeParent.push(i); // Push position of the items that we are searching into this variable
                                                            }
                                                        }
                                                    }

                                                    let getNodeChildrenPosition = [];
                                                    for (let id in appendNodeParent){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildrenPosition.push(filterValueList[appendNodeParent[id]]);
                                                    }

                                                    let strNodeChildren = getNodeChildrenPosition.toString(); // Make arry into a string
                                                    let noCommasNodeChildren = strNodeChildren.replaceAll(',', ' '); // Remove Commas from words
                                                    let splitNodeChildren = noCommasNodeChildren.trim().split(/(\s+)/); // Split string into an array to get a clean value
                                                    let filteredNodeChildren = splitNodeChildren.filter(function (el){ // Remove blank spaces from array
                                                        return String(el).trim();
                                                    });

                                                    let appendNodeChild = [];
                                                    for (let i=0; i < filteredNodeChildren.length; i++){
                                                        let strFilteredNodeChildren = filteredNodeChildren[i];
                                                        for (let u=0; u < filterNodeList.length; u++){ // This is getting array for children
                                                            if(filterNodeList[u] == strFilteredNodeChildren){ // See if the clickedNode is inside the Array filterNodeList
                                                                if(!appendNodeChild.includes(u)) { // Doesn't let duplication of nodes
                                                                    appendNodeChild.push(u); // Push position of the items that we are searching into this variable
                                                                }
                                                            }
                                                        }
                                                    }

                                                    // This gets the children position and children nodes
                                                    let getNodeChildren = [];
                                                    let pullNodeChildren = [];
                                                    for (let id in appendNodeChild){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildren.push(filterInfoList[appendNodeChild[id]]);
                                                    }
                                                    if (Selection === "nodeid"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodedec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodeIdDec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME + " " + spart + " " + getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    let uniqueNodePullChildren = [...new Set(pullNodeChildren)];
                                                    let parentFilteredListItem = [];
                                                    for (let u=0; u < uniqueNodePullChildren.length; u++){
                                                        let strUniqueNodePullChildren = uniqueNodePullChildren[u];
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredListItem = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredListItem.innerHTML == strUniqueNodePullChildren ){
                                                                parentFilteredListItem.push(i); // This Array contains the position of the items in the list
                                                            }
                                                        }    
                                                    }

                                                    let getparentFilteredListItem = [];
                                                    for (let id in parentFilteredListItem){ // Create the array that gets the childs from the positions of appendFilters
                                                        getparentFilteredListItem.push(itemList[parentFilteredListItem[id]]);
                                                    }
                                                    
                                                    // let checkingSelected = getparentFilteredListItem;
                                                    getparentFilteredListItem = Array.from(getparentFilteredListItem)
                                                    let check = getparentFilteredListItem.every((item) => { 
                                                        return !item.classList.contains('sapMLIBSelected') 
                                                    });
                                                    //#endregion
                                                    if (check == true){
                                                            // Select Parent of Childrens
                                                        for (let u=0; u < uniquePullParentParent.length; u++){
                                                            let strPullParentParent = uniquePullParentParent[u];
                                                            if ( strPullParentParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPullParentParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    let checkAny = getparentFilteredListItem.some((item) => {
                                                        return item.classList.contains('sapMLIBSelected') 
                                                    });
                                                    if (checkAny == true){
                                                        // Select Parent of Childrens
                                                        for (let u=0; u < uniquePullParentParent.length; u++){
                                                            let strPullParentParent = uniquePullParentParent[u];
                                                            if ( strPullParentParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPullParentParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        setTimeout(() => {
                                                                        elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                    }, "20")
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }//end get 2nd Parents of clickedNode
                                                    
                                                for(let i=0; i < 1; i++){// 3rd Parent
                                                    //#region
                                                    let strUniquePull3rdParent = uniquePull3rdParent[i];
                                                    let appendNodeParent = [];
                                                    for (let i=0; i < nodeDesc.length; i++){ // This is getting array for children
                                                        if(nodeDesc[i] == strUniquePull3rdParent){ // See if the clickedNode is inside the Array filterNodeList
                                                            if(!appendNodeParent.includes(i)) { // This if is to not duplicate data
                                                                appendNodeParent.push(i); // Push position of the items that we are searching into this variable
                                                            }
                                                        }
                                                    }

                                                    let getNodeChildrenPosition = [];
                                                    for (let id in appendNodeParent){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildrenPosition.push(filterValueList[appendNodeParent[id]]);
                                                    }

                                                    let strNodeChildren = getNodeChildrenPosition.toString(); // Make arry into a string
                                                    let noCommasNodeChildren = strNodeChildren.replaceAll(',', ' '); // Remove Commas from words
                                                    let splitNodeChildren = noCommasNodeChildren.trim().split(/(\s+)/); // Split string into an array to get a clean value
                                                    let filteredNodeChildren = splitNodeChildren.filter(function (el){ // Remove blank spaces from array
                                                        return String(el).trim();
                                                    });

                                                    let appendNodeChild = [];
                                                    for (let i=0; i < filteredNodeChildren.length; i++){
                                                        let strFilteredNodeChildren = filteredNodeChildren[i];
                                                        for (let u=0; u < filterNodeList.length; u++){ // This is getting array for children
                                                            if(filterNodeList[u] == strFilteredNodeChildren){ // See if the clickedNode is inside the Array filterNodeList
                                                                if(!appendNodeChild.includes(u)) { // Doesn't let duplication of nodes
                                                                    appendNodeChild.push(u); // Push position of the items that we are searching into this variable
                                                                }
                                                            }
                                                        }
                                                    }

                                                    // This gets the children position and children nodes
                                                    let getNodeChildren = [];
                                                    let pullNodeChildren = [];
                                                    for (let id in appendNodeChild){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildren.push(filterInfoList[appendNodeChild[id]]);
                                                    }
                                                    if (Selection === "nodeid"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodedec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodeIdDec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME + " " + spart + " " + getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    let uniqueNodePullChildren = [...new Set(pullNodeChildren)];
                                                    let parentFilteredListItem = [];
                                                    for (let u=0; u < uniqueNodePullChildren.length; u++){
                                                        let strUniqueNodePullChildren = uniqueNodePullChildren[u];
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredListItem = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredListItem.innerHTML == strUniqueNodePullChildren ){
                                                                parentFilteredListItem.push(i); // This Array contains the position of the items in the list
                                                            }
                                                        }    
                                                    }
                                                    let getparentFilteredListItem = [];
                                                    for (let id in parentFilteredListItem){ // Create the array that gets the childs from the positions of appendFilters
                                                        getparentFilteredListItem.push(itemList[parentFilteredListItem[id]]);
                                                    }
                                                    // let checkingSelected = getparentFilteredListItem;
                                                    getparentFilteredListItem = Array.from(getparentFilteredListItem)
                                                    let check = getparentFilteredListItem.every((item) => { 
                                                        return !item.classList.contains('sapMLIBSelected') 
                                                    });
                                                    //#endregion
                                                    if (check == true){
                                                        // Select Parent of Childrens
                                                        for (let u=0; u < uniquePull3rdParent.length; u++){
                                                            let strPull3rdParent = uniquePull3rdParent[u];
                                                            if ( strPull3rdParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPull3rdParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    let checkAny = getparentFilteredListItem.some((item) => {
                                                        return item.classList.contains('sapMLIBSelected') 
                                                    });
                                                    if (checkAny == true){
                                                        // Select Parent of Childrens
                                                        for (let u=0; u < uniquePull3rdParent.length; u++){
                                                            let strPull3rdParent = uniquePull3rdParent[u];
                                                            if ( strPull3rdParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPull3rdParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        setTimeout(() => {
                                                                            elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                        }, "20")
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }//end get 3rd Parent of clickedNode

                                                for(let i=0; i < 1; i++){ // 4th Parent
                                                    //#region
                                                    let strUniquePull4thParent = uniquePull4thParent[i];
                                                    let appendNodeParent = [];
                                                    for (let i=0; i < nodeDesc.length; i++){ // This is getting array for children
                                                        if(nodeDesc[i] == strUniquePull4thParent){ // See if the clickedNode is inside the Array filterNodeList
                                                            if(!appendNodeParent.includes(i)) { // This if is to not duplicate data
                                                                appendNodeParent.push(i); // Push position of the items that we are searching into this variable
                                                            }
                                                        }
                                                    }

                                                    let getNodeChildrenPosition = [];
                                                    for (let id in appendNodeParent){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildrenPosition.push(filterValueList[appendNodeParent[id]]);
                                                    }

                                                    let strNodeChildren = getNodeChildrenPosition.toString(); // Make arry into a string
                                                    let noCommasNodeChildren = strNodeChildren.replaceAll(',', ' '); // Remove Commas from words
                                                    let splitNodeChildren = noCommasNodeChildren.trim().split(/(\s+)/); // Split string into an array to get a clean value
                                                    let filteredNodeChildren = splitNodeChildren.filter(function (el){ // Remove blank spaces from array
                                                        return String(el).trim();
                                                    });

                                                    let appendNodeChild = [];
                                                    for (let i=0; i < filteredNodeChildren.length; i++){
                                                        let strFilteredNodeChildren = filteredNodeChildren[i];
                                                        for (let u=0; u < filterNodeList.length; u++){ // This is getting array for children
                                                            if(filterNodeList[u] == strFilteredNodeChildren){ // See if the clickedNode is inside the Array filterNodeList
                                                                if(!appendNodeChild.includes(u)) { // Doesn't let duplication of nodes
                                                                    appendNodeChild.push(u); // Push position of the items that we are searching into this variable
                                                                }
                                                            }
                                                        }
                                                    }

                                                    // This gets the children position and children nodes
                                                    let getNodeChildren = [];
                                                    let pullNodeChildren = [];
                                                    for (let id in appendNodeChild){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildren.push(filterInfoList[appendNodeChild[id]]);
                                                    }
                                                    if (Selection === "nodeid"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodedec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodeIdDec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME + " " + spart + " " + getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    let uniqueNodePullChildren = [...new Set(pullNodeChildren)];
                                                    let parentFilteredListItem = [];
                                                    for (let u=0; u < uniqueNodePullChildren.length; u++){
                                                        let strUniqueNodePullChildren = uniqueNodePullChildren[u];
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredListItem = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredListItem.innerHTML == strUniqueNodePullChildren ){
                                                                parentFilteredListItem.push(i); // This Array contains the position of the items in the list
                                                            }
                                                        }    
                                                    }
                                                    let getparentFilteredListItem = [];
                                                    for (let id in parentFilteredListItem){ // Create the array that gets the childs from the positions of appendFilters
                                                        getparentFilteredListItem.push(itemList[parentFilteredListItem[id]]);
                                                    }
                                                    // let checkingSelected = getparentFilteredListItem;
                                                    getparentFilteredListItem = Array.from(getparentFilteredListItem)
                                                    let check = getparentFilteredListItem.every((item) => { 
                                                        return !item.classList.contains('sapMLIBSelected') 
                                                    });
                                                    //#endregion
                                                    if (check == true){
                                                        // Select Parent of Childrens
                                                        for (let u=0; u < uniquePull4thParent.length; u++){
                                                            let strPull4thParent = uniquePull4thParent[u];
                                                            if ( strPull4thParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPull4thParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    let checkAny = getparentFilteredListItem.some((item) => {
                                                        return item.classList.contains('sapMLIBSelected') 
                                                    });
                                                    if (checkAny == true){
                                                        // Select Parent of Childrens
                                                        for (let u=0; u < uniquePull4thParent.length; u++){
                                                            let strPull4thParent = uniquePull4thParent[u];
                                                            if ( strPull4thParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPull4thParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        setTimeout(() => {
                                                                            elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                        }, "20")
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }//end get 4th Parent of clickedNode

                                                for(let i=0; i < 1; i++){ // 5th Parent
                                                    //#region
                                                    let strUniquePull5thParent = uniquePull5thParent[i];
                                                    let appendNodeParent = [];
                                                    for (let i=0; i < nodeDesc.length; i++){ // This is getting array for children
                                                        if(nodeDesc[i] == strUniquePull5thParent){ // See if the clickedNode is inside the Array filterNodeList
                                                            if(!appendNodeParent.includes(i)) { // This if is to not duplicate data
                                                                appendNodeParent.push(i); // Push position of the items that we are searching into this variable
                                                            }
                                                        }
                                                    }

                                                    let getNodeChildrenPosition = [];
                                                    for (let id in appendNodeParent){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildrenPosition.push(filterValueList[appendNodeParent[id]]);
                                                    }

                                                    let strNodeChildren = getNodeChildrenPosition.toString(); // Make arry into a string
                                                    let noCommasNodeChildren = strNodeChildren.replaceAll(',', ' '); // Remove Commas from words
                                                    let splitNodeChildren = noCommasNodeChildren.trim().split(/(\s+)/); // Split string into an array to get a clean value
                                                    let filteredNodeChildren = splitNodeChildren.filter(function (el){ // Remove blank spaces from array
                                                        return String(el).trim();
                                                    });

                                                    let appendNodeChild = [];
                                                    for (let i=0; i < filteredNodeChildren.length; i++){
                                                        let strFilteredNodeChildren = filteredNodeChildren[i];
                                                        for (let u=0; u < filterNodeList.length; u++){ // This is getting array for children
                                                            if(filterNodeList[u] == strFilteredNodeChildren){ // See if the clickedNode is inside the Array filterNodeList
                                                                if(!appendNodeChild.includes(u)) { // Doesn't let duplication of nodes
                                                                    appendNodeChild.push(u); // Push position of the items that we are searching into this variable
                                                                }
                                                            }
                                                        }
                                                    }

                                                    // This gets the children position and children nodes
                                                    let getNodeChildren = [];
                                                    let pullNodeChildren = [];
                                                    for (let id in appendNodeChild){ // Create the array that gets the childs from the positions of appendFilters
                                                        getNodeChildren.push(filterInfoList[appendNodeChild[id]]);
                                                    }
                                                    if (Selection === "nodeid"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodedec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    if (Selection === "nodeIdDec"){
                                                        for (let i=0; i < getNodeChildren.length; i++){
                                                            pullNodeChildren[i] = getNodeChildren[i].IDNAME + " " + spart + " " + getNodeChildren[i].NODEDEC; // Get Parent of clicked Element
                                                        }
                                                    }
                                                    let uniqueNodePullChildren = [...new Set(pullNodeChildren)];
                                                    let parentFilteredListItem = [];
                                                    for (let u=0; u < uniqueNodePullChildren.length; u++){
                                                        let strUniqueNodePullChildren = uniqueNodePullChildren[u];
                                                        for (let i=0; i < itemList.length; i++){
                                                            let filteredListItem = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                            if ( filteredListItem.innerHTML == strUniqueNodePullChildren ){
                                                                parentFilteredListItem.push(i); // This Array contains the position of the items in the list
                                                            }
                                                        }    
                                                    }
                                                    let getparentFilteredListItem = [];
                                                    for (let id in parentFilteredListItem){ // Create the array that gets the childs from the positions of appendFilters
                                                        getparentFilteredListItem.push(itemList[parentFilteredListItem[id]]);
                                                    }
                                                    // let checkingSelected = getparentFilteredListItem;
                                                    getparentFilteredListItem = Array.from(getparentFilteredListItem)
                                                    let check = getparentFilteredListItem.every((item) => { 
                                                        return !item.classList.contains('sapMLIBSelected') 
                                                    });

                                                    //#endregion
                                                    if (check == true){
                                                        // Select Parent of Childrens
                                                        for (let u=0; u < uniquePull5thParent.length; u++){
                                                            let strPull5thParent = uniquePull5thParent[u];
                                                            if ( strPull5thParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPull5thParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        elementPartiallySelected[i].classList.remove("sapMCbMarkPartiallyChecked");
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    let checkAny = getparentFilteredListItem.some((item) => {
                                                        return item.classList.contains('sapMLIBSelected') 
                                                    });
                                                    if (checkAny == true){
                                                        // Select Parent of Childrens
                                                        for (let u=0; u < uniquePull5thParent.length; u++){
                                                            let strPull5thParent = uniquePull5thParent[u];
                                                            if ( strPull5thParent !=  clickedNode ){
                                                                for (let i=0; i < itemList.length; i++){
                                                                    let filteredList = itemList[i].querySelectorAll('div.sapMLIBContent')[0]; // Gets all the List Items
                                                                    if ( filteredList.innerHTML == strPull5thParent.replace(/&/g, "&amp;") ){ // Compare if innerHTML == strChildren so we can know what elements should be true
                                                                        getItemsForSelection.getItems()[i].setSelected(false); // set Selected to the elements that we want
                                                                        // elementPartiallySelected[i].classList.remove("sapMCbMarkChecked");
                                                                        setTimeout(() => {
                                                                            elementPartiallySelected[i].classList.add("sapMCbMarkPartiallyChecked");
                                                                        }, "20")
                                                                        this.byId("Tree").$().find('.sapMLIB.sapMTreeItemBase ').css({ "background-color": "transparent" })[i];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }//end get 5th Parent of clickedNode
                                            }
                                        }
                                    }
                                } //#endregion               
                            }; //end


                            // ===============================================================================
                            // =============================== Styling Options ===============================
                            // ===============================================================================
                            //#region 
                            // This function gets the color and alpha from styling panel and joins them together to get an RGBA color code
                            function hexToRgbA(hex){
                                var c;
                                if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                                    c= hex.substring(1).split('');
                                    if(c.lenght==3){
                                        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                                    }
                                    c= '0x'+c.join('');
                                    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255]. join(',')+',' + disableParent[3] + ')';
                                }
                                throw new Error('Bad Hex');
                            }
                            
                            this.byId("Tree").$().find('ul').css({"font-family": fbi[0], "font-size": fbi[1] + "px", "font-weight": fbi[2], "font-style": fbi[2], "color": fbi[3] + "!important", "background-color": "transparent" });
                            // In this part the styling options from the panel gets applied to the List Items
                            $('.sapMLIB').css({ "border-bottom": "0px solid #e5e5e5" });
                            // Major change to all ListItems - "Tree"
                            this.byId("Tree").$().find('.sapMLIBContent').css({"font-family": fbi[0], "font-size": fbi[1] + "px", "font-weight": fbi[2], "font-style": fbi[2], "color": fbi[3] + "!important", "background-color": "transparent" });
                            // This is to Enable Child Elements for Selection
                            const baseItem = this.byId("Tree").$().find('.sapMTreeItemBaseLeaf');
                            const baseSelected = this.byId("Tree").$().find('.sapMLIBSelected');
                            baseSelected.find('div').css({ 
                                "font-style": selectNodes[0] + "!important", 
                                "font-weight": selectNodes[0]  + "!important", 
                                "font-size": selectNodes[1] + "px", 
                                "color": selectNodes[2]  + "!important" 
                            });
                            baseSelected.css({ "background-color": + "rgb" + selectNodes[3]  + "!important"});
                            this.byId("Tree").$().find('.sapMLIBFocusable', '::focus').css({ "outline": "none" });
                            this.byId("Tree").$().find('li', '::hover').css({ "background-color": "#e0e0e0" });
                            
                            // This starts the styling of the parent nodes
                            if (that.Show_Parent === "Yes") {
                                // THIS IS SHOW_PARENT === YES

                                // This is to disable Nodes and to make the span (Expand/ Collapse Icon) clickable
                                this.byId("Tree").$().find('ul').css('cursor', 'not-allowed');
                                // This changes the Selected Node Background and pointer event to nonee
                                this.byId("Tree").$().find('.sapMTreeItemBase').css({ "pointer-events": "none", "background-color": disableParent[4] + "!important" });
                                this.byId("Tree").$().find('li').css('pointer-events', 'none');
                                // this.byId("Tree").$().find('label .unselectable').css('pointer-events', 'all');
                                this.byId("Tree").$().find('span').css('pointer-events', 'all');
                                this.byId("Tree").$().find('.sapMRb').css({ "display": "", "pointer-events": "none" }); 
                                // this changes the Disabled Parent Nodes Text
                                this.byId("Tree").$().find('.sapMLIBContent').css({ 
                                    "font-style": disableParent[0], 
                                    "font-weight": disableParent[0], 
                                    "font-size": disableParent[1] + "px", 
                                    "color": "rgba" + hexToRgbA(disableParent[2]), 
                                    // "margin-left": "1rem", 
                                    "pointer-events": "none" 
                                });

                                // This changes the Selected Node Background
                                baseItem.css({ 
                                    "pointer-events": "all", 
                                    "cursor": "pointer", 
                                    "background-color": "transparent" 
                                });
                                baseItem.find('span').css({ "pointer-events": "none" });
                                baseItem.find('li').css({ 
                                    "pointer-events": "all", 
                                    "cursor": "pointer"
                                });
                                baseItem.find('.sapMRb').css({ 
                                    "display": "block", 
                                    "pointer-events": "all" 
                                });
                                // This changes the Selected Node text
                                baseItem.find('.sapMLIBContent').css({ 
                                    // "margin-left": "-0.5rem", 
                                    "pointer-events": "all", 
                                    "font-style": fbi[2], 
                                    "font-weight": fbi[2], 
                                    "font-size": fbi[1] + "px", 
                                    "color": "rgb" + fbi[3] 
                                });
                                // This changes the Node that is Selected by Default
                                baseSelected.css({ "background-color": selectNodes[3] });
                                baseSelected.find('.sapMLIBContent').css({ 
                                    "font-style": selectNodes[0], 
                                    "font-weight": selectNodes[0], 
                                    "font-size": selectNodes[1] + "!important", 
                                    "color": selectNodes[2]
                                });
                            }
                            else {
                                // THIS IS SHOW_PARENT === NO   
                                this.byId("Tree").$().find('.sapMTreeItemBase').css({ "background-color": "transparent" });
                                // This changes the Node that is Selected by Default
                                baseSelected.css({ "background-color": selectNodes[3] });
                                baseSelected.find('.sapMLIBContent').css({ "font-style": selectNodes[0], "font-weight": selectNodes[0], "font-size": selectNodes[1] + "!important", "color": selectNodes[2] });
                            }  
                            //#endregion
                        
                            // ===============================================================================
                        
                        },

                        /*--------------------------  Set DisplayTitle Node for ID,DEC,ID-DEC ------------------------------------- */
                        handleSelectChange: function (oEvent) {
                            var displaymode = oEvent.getParameter("selectedItem").getKey();
                            if (that.Selection_Type == "MultiSelect"){
                                this.byId("Tree").expandToLevel(99);
                            }else {
                                this.byId("Tree").expandToLevel(that.Default_Level);
                            }
                            for (var i = 0; i < this.getView().byId("Tree").getItems().length; i++) {

                                var node = this.getView().byId("Tree").getItems()[i].getBindingContext(that.widgetName).getObject()[displaymode];

                                this.byId("Tree").getItems()[i].setTitle(node);

                            }
                        },

                        /*-------------------------- OnSelect Event for Tree Hierarchy at Runtime ------------------------------------- */
                        onSelect: function (oEvent) {
                            var listselected = [];
                            var listselecteddec = [];

                            var schild = "";
                            var ptextid = [];
                            var ptextdec = [];
                            var ll_1 = [];
                            var pi_1 = [];
                            var ni_1 = [];
                            var nd_1 = [];
                            var FFF1 = [];
                            var FFF2 = [];

                            let selectedItemsDelay = [];

                            filterinfo = _filterinfo[that.widgetno - 1];
                            filtervalue = _filtervalue[that.widgetno - 1];
                            filterValueDesc = _filterValueDesc[that.widgetno - 1];
                            filternode = _filternode[that.widgetno - 1];

                            F1 = that.Field1_Name;
                            F2 = that.Field2_Name;
                            
                            setTimeout(() => {
                                selectedItemsDelay = this.getView().byId("Tree").getSelectedItems();

                                for (var i = 0; i < selectedItemsDelay.length; i++) {
                                    var snode = selectedItemsDelay[i].getBindingContext(that.widgetName).getObject().nodeid;
                                    var tnode = selectedItemsDelay[i].getBindingContext(that.widgetName).getObject().nodedec;
                                

                                    listselected.push(snode);
                                    listselecteddec.push(tnode);

                                    if (F1) {
                                        var F1node = selectedItemsDelay[i].getBindingContext(that.widgetName).getObject()[F1];
                                        FFF1.push(F1node);
                                    }
                                    if (F2) {
                                        var F2node = selectedItemsDelay[i].getBindingContext(that.widgetName).getObject()[F2];
                                        FFF2.push(F2node);
                                    }

                                    for (var x = 0; x < filternode.length; x++) {
                                        if (snode === filternode[x]) {
                                            schild += filtervalue[x];
                                            ptextid.push(filterinfo[x].PTID);
                                            ptextdec.push(filterinfo[x].PTDEC);
                                            ll_1.push(filterinfo[x].LEVEL);
                                            pi_1.push(filterinfo[x].PARENTID);
                                            ni_1.push(filterinfo[x].NODEID);
                                            nd_1.push(filterinfo[x].NODEDEC);
                                        }
                                    }
                                }

                                var _unit1 = schild.substr(1, schild.length).split(",");
                                _SelectedChild = _unit1.filter((c, index) => {
                                    return _unit1.indexOf(c) === index;
                                });

                            }, "0");

                            _SelectedNode = listselected;
                            _SelectedNodeDec = listselecteddec;

                            _FF1 = FFF1;
                            _FF2 = FFF2;

                            _SelectedLevel_Value = ll_1;
                            _SelectedParentId_Value = pi_1;
                            _SelectedNodeId_Value = ni_1;
                            _SelectedTextId_Value = listselected;
                            _SelectedTextDesc_Value = listselecteddec;
                            
                            _ptdec = ptextdec;
                            _ptid = ptextid;

                            var fbi = _FontStyle[that.widgetno];

                            let disableParent = _ParentNodes[that.widgetno];
                            let selectNodes = _SelectedNodes[that.widgetno];

                            // ===================================================================================
                            // ================================= Styling Options =================================
                            // ===================================================================================
                            
                           
                            if (that.Show_Parent === "Yes") {
                                // THIS IS SHOW_PARENT === YES

                                // This makes the Checkbox hoverable after a change and removes the Checkbox of the 1st item
                                const baseItem = this.byId("Tree").$().find('.sapMTreeItemBaseLeaf');
                                baseItem.find('.sapMRb').css({ "display": "block", "pointer-events": "all" });

                                baseItem.find('.sapMLIBContent').css({ "font-style": fbi[2],
                                    "font-weight": fbi[2],
                                    "font-size": fbi[1] + "px",
                                    "color": "rgb" + fbi[3]
                                });

                                const baseSelected = this.byId("Tree").$().find('.sapMLIBSelected');
                                baseSelected.find('.sapMLIBContent').css({ "font-style": selectNodes[0],
                                    "font-weight": selectNodes[0],
                                    "font-size": selectNodes[1] + "!important",
                                    "color": selectNodes[2]
                                });
                                
                                baseItem.css({ "background-color": "transparent" });
                                baseSelected.css({ "background-color": selectNodes[3] });
                        
                            }
                            else {
                                // THIS IS SHOW_PARENT === NO
                                const baseItem = this.byId("Tree").$().find('.sapMTreeItemBase');
                                baseItem.find('.sapMLIBContent').css({ "font-style": fbi[2],
                                    "font-weight": fbi[2],
                                    "font-size": fbi[1] + "px",
                                    "color": "rgb" + fbi[3]
                                });

                                const baseSelected = this.byId("Tree").$().find('.sapMLIBSelected');
                                baseSelected.find('.sapMLIBContent').css({ "font-style": selectNodes[0],
                                    "font-weight": selectNodes[0],
                                    "font-size": selectNodes[1] + "!important",
                                    "color": selectNodes[2]
                                });
                                
                                baseItem.css({ "background-color": "transparent" });
                                baseSelected.css({ "background-color": selectNodes[3] });

                            }

                            setTimeout(() => {
                                that._firePropertiesChanged();
                            }, "0")

                        }

                    });

                    return PageController;

                });

            var foundIndex = Ar.findIndex(x => x.id == widgetName);
            var divfinal = Ar[foundIndex].div;
            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(divfinal).html(),
            });
            oView.placeAt(div);
        });
    }

    // ===================================================================================
    // ========== This will add the icon fill for the partially selected option ==========
    // ===================================================================================
    let partiallySelected = (function() { // This function is to executed the add only once
        let executed = false;
        return function(){
            if (!executed){
                let partiallyCheck = '<style>.sapMCbMarkPartiallyChecked:before{content:"\\e17b"!important; font-family:"SAP-icons"; display: inline-block; color:#427cac !important; border: 0px !important; font-size: .875rem !important}</style>';
                let disabledNode = '<style>.disabled{display: none !important;}</style>';
                let displayedNode = '<style>.displayed{display: "";}</style>';
                let unselectable = '<style>.unselectable{-moz-user-select: -moz-none; -khtml-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none;}</style>'
                $('body').append(partiallyCheck, disabledNode, displayedNode, unselectable);
                executed = true; 
            }
        };
    })();

})();