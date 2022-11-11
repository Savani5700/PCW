(function () {
  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
     <style>
          table {
                     font-size:15px;
                     border: 0px solid black;
                     width: 390px;
                     margin-bottom:30px;
                     
                 }                      
          td {
                    padding-bottom: 4px;
          }
                  
          select,input {
                         
                         font-size: 15px;
                         height:30px;
                         border-radius: 1.5px;
                         border-color:lightgray;
                       }
 
        option , select, input  {
                                  font-weight: normal;
                                }  

          h3{
            font-size: 1.05rem;
          }
          label {
            font-size
          }
     </style>
             <table>
                <tr>
                   <td>Font</td>
                   <td>Size</td>
                   <td>Style</td>
                   <td>Color</td>
                </tr>
 
                     <tr>
                   
                     <td><select style="width:155px;"  class="form-control" name="fstyle" id="fstyle" >
                         <option value="72-Web">72-Web</option>
                         <option selected="selected"  value="Arial">Arial</option>
                         <option value="Bai Jamjuree">Bai Jamjuree</option>
                         <option value="Besley">Besley</option>
                         <option value="Chakra Petch">Chakra Petch</option>
                         <option value="Changa">Changa</option>
                         <option value="Courier">Courier</option>
                         <option value="EL Messiri">EL Messiri</option>
                         <option value="Georgia">Georgia</option>
                         <option value="Jura">Jura</option>
                         <option value="Lato">Lato</option>
                         <option value="Marcellus">Marcellus</option>
                         <option value="Montserrat Alternates">Montserrat Alternates</option>
                         <option value="Old Standard TT">Old Standard TT</option>
                         <option value="Philosopher">Philosopher</option>
                         <option value="Prata">Prata</option>
                         <option value="Roboto">Roboto</option>
                         <option value="Saira">Saira</option>
                         <option value="Times New Roman">Times New Roman</option>
                         <option value="Trebuchet MS">Trebuchet MS</option>
                         <option value="Verdana">Verdana</option>
                         <option value="Vidaloka">Vidaloka</option>
                       </select></td>

                   <td><select  style="width:50px;  margin-right:10px;"  class="form-control" name="fsize" id="fsize" >
                         <option selected="selected" value="10">10</option>
                         <option value="12">12</option>
                         <option value="14">14</option>
                         <option value="16">16</option>
                         <option value="20">20</option>
                         <option value="22">22</option>
                         <option value="24">24</option>
                         <option value="32">32</option>
                         <option value="48">48</option>
                       </select></td>

                       <td><select  style="width:75px; margin-right:10px;" class="form-control" name="fbi" id="fbi" >
                       <option selected="selected" value="normal">Normal</option>
                       <option value="bold">Bold</option>
                       <option value="italic">Italic</option>                       
                     </select></td>

                       <td>
                       <input style="width:45px" type="color" class="form-control" name="fcolor" id="fcolor" >
                       </input>
                       </td>
                </tr>
              </table>

              <table>
              <legend><h3>Change Disabled Parent Nodes</h3></legend>
                <thead>
                  <tr>
                    <td>Size</td>
                    <td>Style</td>
                    <td>Color</td>
                    <td>Transparency</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td>
                      <select  style="width:75px;  margin-right:10px;"  class="form-control" name="Parent_fSize" id="Parent_fSize" >
                        <option value="10">10</option>
                        <option selected="selected" value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                        <option value="22">22</option>
                        <option value="24">24</option>
                        <option value="32">32</option>
                        <option value="48">48</option>
                      </select>
                    </td>
                    <td>
                      <select  style="width:100px; margin-right:10px;" class="form-control" name="Parent_fStyle" id="Parent_fStyle" >
                       <option selected="selected" value="normal">Normal</option>
                       <option value="bold">Bold</option>
                       <option value="italic">Italic</option>                       
                      </select>
                    </td>
                    
                    <td><input style="width:45px" type="color" class="form-control" name="Parent_fColor" id="Parent_fColor" value="#000"></td>
                    <td><input style="width: 75px" type="range" min="0" max="1" step="0.1" class="form-control" name="Parent_fTransp" id="Parent_fTransp"></td>
                    </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr><td>Background Colors</td></tr>
                </thead>
                <tbody>
                  <tr><td><input style="width:75px" type="color" class="form-control" name="Parent_bg" id="Parent_bg" value="#ffffff"></td></tr>
                </tbody>
              </table>

              <table>
              <legend><h3>Change Selected Nodes</h3></legend>
                <thead>
                  <tr>
                    <td>Size</td>
                    <td>Style</td>
                    <td>Color</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td>
                      <select  style="width:75px;  margin-right:10px;"  class="form-control" name="SelectedNode_fSize" id="SelectedNode_fSize" >
                        <option value="10">10</option>
                        <option value="12" selected="selected">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                        <option value="22">22</option>
                        <option value="24">24</option>
                        <option value="32">32</option>
                        <option value="48">48</option>
                      </select>
                    </td>
                    <td>
                      <select  style="width:155px; margin-right:10px;" class="form-control" name="SelectedNode_fStyle" id="SelectedNode_fStyle" >
                        <option value="normal" selected="selected">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="italic">Italic</option>                       
                      </select>
                    </td>
                    <td><input style="width:75px" type="color" class="form-control" name="SelectedNode_fColor" id="SelectedNode_fColor" value="#ffffff"></td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr><td>Background Colors</td></tr>
                </thead>
                <tbody>
                  <tr><td><input style="width:75px" type="color" class="form-control" name="SelectedNode_bg" id="SelectedNode_bg" value="#ffffff"></td></tr>
                </tbody>
              </table>
 
             
          <style>
       :host {
          display: block;
       }
       </style>
    `;

  class MultiInput extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this.setChangeEventListeners([
        "fstyle",
        "fsize",
        "fbi",
        "fcolor",
        // Disable Parent Nodes
        "Parent_fStyle",
        "Parent_fSize",
        "Parent_fColor",
        "Parent_fTransp",
        "Parent_bg",
        // Selected Node
        "SelectedNode_fStyle",
        "SelectedNode_fSize",
        "SelectedNode_fColor",
        "SelectedNode_bg",

      ]);

    }

    setChangeEventListeners(propArray) {

      const update = this.updateProp.bind(this);
      propArray.forEach((prop) => {
        this.getId(prop).addEventListener("change", () => update(prop));
      });
    }

    getId(id) {

      return this._shadowRoot.getElementById(`${id}`);
    }

    updateProp(prop) {

      //  console.log(this.Selection_Type);

      this.dispatchEvent(
        new CustomEvent("propertiesChanged", {
          detail: {
            properties: {
              ['fstyle']: this['fstyle'],
              ['fsize']: this['fsize'],
              ['fbi']: this['fbi'],
              ['fcolor']: this['fcolor'],

              // Parent Styling
              ['Parent_fStyle']: this['Parent_fStyle'],
              ['Parent_fSize']: this['Parent_fSize'],
              ['Parent_fColor']: this['Parent_fColor'],
              ['Parent_fTransp']: this['Parent_fTransp'],
              ['Parent_bg']: this['Parent_bg'],

              // Selected Node Styling
              ['SelectedNode_fStyle']: this['SelectedNode_fStyle'],
              ['SelectedNode_fSize']: this['SelectedNode_fSize'],
              ['SelectedNode_fColor']: this['SelectedNode_fColor'],
              ['SelectedNode_bg']: this['SelectedNode_bg'],
            },
          },
        })
      );
    }

    set fstyle(newfstyle) {
      this._shadowRoot.getElementById("fstyle").value = newfstyle;
    }
    get fstyle() {
      return this._shadowRoot.getElementById("fstyle").value;
    }

    set fsize(newfsize) {
      this._shadowRoot.getElementById("fsize").value = newfsize;
    }
    get fsize() {
      return this._shadowRoot.getElementById("fsize").value;
    }

    set fbi(newfbi) {
      this._shadowRoot.getElementById("fbi").value = newfbi;
    }
    get fbi() {
      return this._shadowRoot.getElementById("fbi").value;
    }

    set fcolor(newfcolor) {
      this._shadowRoot.getElementById("fcolor").value = newfcolor;
    }
    get fcolor() {
      return this._shadowRoot.getElementById("fcolor").value;
    }

    // ================= Parent Node Styling =================    

    set Parent_fStyle(newParent_fStyle) {
      this._shadowRoot.getElementById("Parent_fStyle").value = newParent_fStyle;
    }
    get Parent_fStyle() {
      return this._shadowRoot.getElementById("Parent_fStyle").value;
    }

    set Parent_fSize(newParent_fSize) {
      this._shadowRoot.getElementById("Parent_fSize").value = newParent_fSize;
    }
    get Parent_fSize() {
      return this._shadowRoot.getElementById("Parent_fSize").value;
    }

    set Parent_fColor(newParent_fColor) {
      this._shadowRoot.getElementById("Parent_fColor").value = newParent_fColor;
    }
    get Parent_fColor() {
      return this._shadowRoot.getElementById("Parent_fColor").value;
    }

    set Parent_fTransp(newParent_fTransp) {
      this._shadowRoot.getElementById("Parent_fTransp").value = newParent_fTransp;
    }
    get Parent_fTransp() {
      return this._shadowRoot.getElementById("Parent_fTransp").value;
    }

    set Parent_bg(newParent_bg) {
      this._shadowRoot.getElementById("Parent_bg").value = newParent_bg;
    }
    get Parent_bg() {
      return this._shadowRoot.getElementById("Parent_bg").value;
    }

    // ================= Selected Node Styling =================    

    set SelectedNode_fStyle(newSelectedNode_fStyle) {
      this._shadowRoot.getElementById("SelectedNode_fStyle").value = newSelectedNode_fStyle;
    }
    get SelectedNode_fStyle() {
      return this._shadowRoot.getElementById("SelectedNode_fStyle").value;
    }

    set SelectedNode_fSize(newSelectedNode_fSize) {
      this._shadowRoot.getElementById("SelectedNode_fSize").value = newSelectedNode_fSize;
    }
    get SelectedNode_fSize() {
      return this._shadowRoot.getElementById("SelectedNode_fSize").value;
    }

    set SelectedNode_fColor(newSelectedNode_fColor) {
      this._shadowRoot.getElementById("SelectedNode_fColor").value = newSelectedNode_fColor;
    }
    get SelectedNode_fColor() {
      return this._shadowRoot.getElementById("SelectedNode_fColor").value;
    }

    set SelectedNode_bg(newSelectedNode_bg) {
      this._shadowRoot.getElementById("SelectedNode_bg").value = newSelectedNode_bg;
    }
    get SelectedNode_bg() {
      return this._shadowRoot.getElementById("SelectedNode_bg").value;
    }
  }

  customElements.define("com-ds-finalv4-7-sap-sac-alive-styling", MultiInput);
})();