(function()  {
  let _shadowRoot;
  let ID = ""; //ID of option selected
  let _URLParameter_value = "";
  let setParameter = "";
  let navBar;

  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
      <script><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" /></script>
      <style>
          .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
          }
          nav {
              width: 71px;
              height: 100%;
              overflow: hidden;
              white-space: nowrap;
              display: block;
              cursor: pointer;
              background-color: #0460A9;
              border-right: 1px solid #9E9E9E;
          }
          .container-item{
            // margin-bottom: 16px;
            margin-bottom: 20px;
            width: 72px;
            overflow: hidden;
          }
          .container-item:first-of-type{
            // height: 48px;
            margin-bottom: 68px;
          }
          .container-menu {
            display: flex;
            cursor: pointer;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 59px;
            height: 48px;
            margin: 0 auto;
          }
          span {
            cursor: pointer;
            background-size: 30px;
            background-repeat: no-repeat;
            background-position: left 0px center;
            margin: 0 auto;
            margin-left: 16px;
            fill: #fff;
          }
          svg {
             display: block;
             margin: 0 auto;
          }
          button {
              border: 0px;
              cursor: pointer;
              background-color: transparent;
              color: #fff;
              text-align: left;
              padding: 0;
              width: 158px;
              height: 24px;
              font-family: 'Arial';
              font-style: normal;
              font-size: 16px;
              line-height: 24px;
              display: none;
          }
          small {
            height: 14px;
            width: 14px;
            margin: 0 15px;
            display: none;
          }
          .rotate-small {
            transform: rotate(180deg);
          }
          ul {
              margin: 0;
              list-style: none;
              padding: 0;
              margin-top: 16px;
              display: none;
          }
          li {
            width: 0;
          }
          a {
            font-family: 'Arial' !important;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 18px;
            display: flex;
            align-items: center;
            text-decoration: none;
            gap: 10px;
            padding: 0 0 0 20px;
            margin: 0 48px;
            width: 184px;
            height: 38px;

            cursor: pointer;
            color: #fff;
          }
          a:visited {
            text-decoration: none;
            color: #fff;
          }
          a:hover {
            text-decoration: none;
            // background: #EBF2F8;
            color: #fff;
            font-weight: 700;
          }
          .path {
            fill: #0460A9;
          }
          .setSelectedParent{
            background: #2877B6;
            color: #fff;
            font-weight: 700;
            border-radius: 4px;
          }
          .setSelectedParent button{
            font-weight: 700;
          }
          .setSelectedItem {
            text-decoration: none;
            background: #2877B6;
            color: #fff !important;
            font-weight: 700;
            border-radius: 4px;
          }
          .close{
            position: absolute;
            display: none;
            left: 246px;
            top: 14px;
            background-size: 15px;
            background-repeat: no-repeat;
            background-position: center;
            margin-left: 0;
          }
          .close svg{
            width: 40px;
            height: 40px;
          }
          
      </style>
      <nav id="nav">
        <div class="container-item">
          <span id="close" class="close">

            <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_10541_104078)">
                <ellipse cx="10.5883" cy="12.5" rx="10.2347" ry="10.5" transform="rotate(180 10.5883 12.5)" fill="#0460A9"/>
                <path d="M0.830957 12.5C0.830956 6.95301 5.21093 2.47727 10.5883 2.47727C15.9658 2.47727 20.3457 6.95301 20.3457 12.5C20.3457 18.047 15.9658 22.5227 10.5883 22.5227C5.21093 22.5227 0.830957 18.047 0.830957 12.5Z" stroke="#0460A9" stroke-width="0.954545"/>
              </g>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 15.8538V17.2168L6.34253 12.9032L11 8.77344V10.1099L8.30645 12.4983H16.002V13.4983H8.45677L11 15.8538Z" fill="white"/>
              <defs>
                <filter id="filter0_d_10541_104078" x="0.35376" y="0.95" width="22.5692" height="23.1" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dx="1.05"/>
                  <feGaussianBlur stdDeviation="0.525"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10541_104078"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10541_104078" result="shape"/>
                </filter>
              </defs>
            </svg>

          </span>
        </div>

        <div class="container-item">
          <div class="container-menu" id="Menu1">
            <span id="icon1">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <path d="M14.15 25.2227L12.1125 20.5853C14.075 19.883 15.9125 18.9386 17.6125 17.8367L14.15 25.2227ZM4.7875 13.4899L0 11.5163L7.625 8.16232C6.4875 9.80902 5.5125 11.5889 4.7875 13.4899ZM24.75 1.24857C24.75 1.24857 18.5625 -1.31957 11.4875 5.53485C8.75 8.18653 7.1125 11.1046 6.05 13.6594C5.7 14.5675 5.9375 15.5604 6.625 16.2384L9.2875 18.8054C9.975 19.4834 11 19.7014 11.9375 19.3624C14.6125 18.3695 17.5875 16.747 20.325 14.0953C27.4 7.2421 24.75 1.24857 24.75 1.24857ZM15.9125 9.80902C14.9375 8.86459 14.9375 7.32685 15.9125 6.38242C16.8875 5.43798 18.475 5.43798 19.45 6.38242C20.4125 7.32685 20.425 8.86459 19.45 9.80902C18.475 10.7535 16.8875 10.7535 15.9125 9.80902ZM8.8375 18.3695L7.075 16.6622L8.8375 18.3695ZM5.5375 24.9926L10.0875 20.5853C9.6625 20.4763 9.25 20.2947 8.875 20.0404L3.775 24.9926H5.5375ZM0.2375 24.9926H2L7.9625 19.2292L6.1875 17.5219L0.2375 23.2854V24.9926ZM0.2375 21.566L5.35 16.6259C5.0875 16.2627 4.9 15.8752 4.7875 15.4514L0.2375 19.8588V21.566Z" fill="white"/> 
              </svg>
            </span>
            <button id="Menu1.Button" class="menu">Sales Analytics</button>
            <small class="arrow rotate-small">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
              </svg>
            </small>
          </div>
          <ul id="Menu1UL">
            <li id="Menu1.Opt1"><a id="Menu1.link1" href="" target="_blank">Proxy Sales</a></li>
            <li id="Menu1.Opt2"><a id="Menu1.link2" href="" target="_blank">Forecast Accuracy</a></li>
            <li id="Menu1.Opt3"><a id="Menu1.link3" href="" target="_blank">PVM</a></li>
            <!-- <li id="Menu1.Opt4"><a id="Menu1.link4" href="" target="_blank">ROPs</a></li> -->
          </ul>
        </div>

        <div class="container-item">
          <div class="container-menu" id="Menu2">
            <span id="icon2">
            <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.05 10.607L25.6417 12.0237L19.975 2.2487L22.3833 0.832031L28.05 10.607ZM10.9083 9.19036L15.1583 16.557L23.8 11.5987L19.55 4.23203L10.9083 9.19036ZM13.175 15.9904L10.3417 11.032L4.25 14.5737L7.08333 19.532L13.175 15.9904ZM0 18.682L1.41667 21.0904L5.1 18.9654L3.68333 16.557L0 18.682ZM14.1667 17.832L13.7417 17.2654L7.65 20.807L8.075 21.3737C8.35833 21.7987 8.78333 22.2237 9.20833 22.507L6.94167 29.1654H9.775L11.7583 23.0737H11.9L14.025 29.1654H16.8583L14.1667 21.232C14.875 20.2404 14.875 18.9654 14.1667 17.832Z" fill="white"/>
            </svg>
            </span>
            <button id="Menu2.Button" class="menu">AI Sales Forecasting</button>
            <small class="arrow rotate-small">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
              </svg>
            </small>
          </div>
          <ul id="Menu2UL">
            <li id="Menu2.Opt1"><a id="Menu2.link1" href="" target="_blank">Sales Forecasting</a></li>
            <li id="Menu2.Opt2"><a id="Menu2.link2" href="" target="_blank">Launches</a></li>
            <li id="Menu2.Opt3"><a id="Menu2.link3" href="" target="_blank">Baseline</a></li>
            <li id="Menu2.Opt4"><a id="Menu2.link4" href="" target="_blank">Competitors</a></li>
            <li id="Menu2.Opt5"><a id="Menu2.link5" href="" target="_blank">Generics</a></li>
            <li id="Menu2.Opt6"><a id="Menu2.link6" href="" target="_blank">AI Scope</a></li>
            <li id="Menu2.Opt7"><a id="Menu2.link7" href="" target="_blank">Sales Outliers</a></li>
          </ul>
        </div>

        <div class="container-item">
          <div class="container-menu" id="Menu3">
            <span id="icon3">
              <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0H22.5C23.163 0 23.7989 0.263392 24.2678 0.732233C24.7366 1.20107 25 1.83696 25 2.5V17.5C25 18.163 24.7366 18.7989 24.2678 19.2678C23.7989 19.7366 23.163 20 22.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0M2.5 2.5V17.5H11.25V2.5H2.5ZM22.5 17.5V2.5H20.95C21.25 3.175 21.1875 3.8375 21.1875 3.9125C21.1 4.75 20.5125 5.625 20.3 5.9375L17.3875 9.125L21.5375 9.1L21.55 10.625L15.05 10.5875L15 9.3375C15 9.3375 18.8125 5.3 19 4.9375C19.175 4.5875 19.8875 2.5 18.125 2.5C16.5875 2.5625 16.7625 4.125 16.7625 4.125L14.8375 4.1375C14.8375 4.1375 14.85 3.3125 15.3125 2.5H13.75V17.5H16.975L16.9625 16.425L18.175 16.4125C18.175 16.4125 19.3125 16.2125 19.325 15.1C19.375 13.85 18.3125 13.85 18.125 13.85C17.9625 13.85 16.7875 13.9125 16.7875 14.9375H14.8875C14.8875 14.9375 14.9375 12.3625 18.125 12.3625C21.375 12.3625 21.2 14.8875 21.2 14.8875C21.2 14.8875 21.25 16.45 19.8125 17.0375L20.4625 17.5H22.5ZM8.65 15H6.775V7.75L4.525 8.45V6.9125L8.45 5.5125H8.65V15Z" fill="white"/>
              </svg>
            </span>
            <button id="Menu3.Button" class="menu">AI Cash Forecasting</button>
            <small class="arrow rotate-small">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
              </svg>
            </small>
          </div>
          <ul id="Menu3UL">
            <li id="Menu3.Opt1"><a id="Menu3.link1" href="" target="_blank">Cash Forecasting</a></li>
            <li id="Menu3.Opt2"><a id="Menu3.link2" href="" target="_blank">Cash Outliers</a></li>
          </ul>
        </div>
        
        <div class="container-item">
          <div class="container-menu" id="Menu4">
            <span id="icon4">
              <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6114 14.84C23.7946 14.84 23.9648 14.92 24.1087 15.0667L25.784 16.7733C26.072 17.0533 26.072 17.52 25.784 17.8L24.4752 19.1333L21.7921 16.4L23.1009 15.0667C23.2449 14.92 23.4281 14.84 23.6114 14.84ZM21.033 17.1733L23.7161 19.9067L15.7845 28H13.0883V25.2533L21.033 17.1733ZM10.4707 24L7.85301 26.6667H2.61767C1.17795 26.6667 0 25.4667 0 24V5.33333C0 3.86667 1.17795 2.66667 2.61767 2.66667H8.0886C8.63831 1.12 10.078 0 11.7795 0C13.481 0 14.9207 1.12 15.4704 2.66667H20.9414C22.3811 2.66667 23.559 3.86667 23.559 5.33333V10.6667L20.9414 13.3333V5.33333H18.3237V8H5.23534V5.33333H2.61767V24H10.4707ZM11.7795 2.66667C11.0597 2.66667 10.4707 3.26667 10.4707 4C10.4707 4.73333 11.0597 5.33333 11.7795 5.33333C12.4994 5.33333 13.0883 4.73333 13.0883 4C13.0883 3.26667 12.4994 2.66667 11.7795 2.66667Z" fill="white"/>
              </svg>
            </span>
            <button id="Menu4.Button" class="menu">Business Input</button>
            <small class="arrow rotate-small">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="span-arrow" d="M15 8.5L8 1.5L1 8.5" stroke="#fff" stroke-width="2"/>
              </svg>
            </small>
          </div>
          <ul id="Menu4UL">
            <!-- <li id="Menu4.Opt1"><a id="Menu4.link1" href="" target="_blank">Input Checkpoint</a></li> -->
            <li id="Menu4.Opt2"><a id="Menu4.link2" href="" target="_blank">Price Assumptions</a></li>
            <li id="Menu4.Opt3"><a id="Menu4.link3" href="" target="_blank">Brand Events</a></li>
            <li id="Menu4.Opt4"><a id="Menu4.link4" href="" target="_blank">Competitors</a></li>
            <li id="Menu4.Opt5"><a id="Menu4.link5" href="" target="_blank">Key Drivers</a></li>
          </ul>
        </div>

      </nav>
  `;

  customElements.define('com-sap-side-navigation-menu-v2', class SideNavigationMenuV2 extends HTMLElement {

    constructor() {
      super(); 
      this._shadowRoot = this.attachShadow({mode: "open"});
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this._export_settings = {};

      this.addEventListener("click", event => {
        var eventClick = new Event("onClick");
        this.dispatchEvent(eventClick);
      });
      
      this._props = {};
      this._firstConnection = false;
    }

    //Fired when the widget is added to the html DOM of the page
    connectedCallback(){
        this.firstConnection = true;
        var that = this;
        interactiveMenu(that);
    }

    //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
    disconnectedCallback(){
      
    }

    //When the custom widget is updated, the Custom Widget SDK framework executes this function first
    onCustomWidgetBeforeUpdate(oChangedProperties) {
      
    }

    //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
    onCustomWidgetAfterUpdate(oChangedProperties) {
      var that = this;
      loadthis(that);
      setSelectedFirstMenuItem(that);
    }

    //When the custom widget is removed from the canvas or the analytic application is closed
    onCustomWidgetDestroy(){

    }
    
    //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
    // Commented out by default
    /*
    onCustomWidgetResize(width, height){
    }
    */

    getID() {
      //console.log("ID:"+ID);
      return ID;
    }

    getParameter() {
      return _URLParameter_value;
    }

    get URLParameter() {
      return _URLParameter_value;
    }

    set URLParameter(value) {
      _URLParameter_value = value;
    }

    get setParameter() {
      return setParameter
    }

    set setParameter(value){
      setParameter = value;
    }

    static get observedAttributes() {
      return [
        "setParameter"
      ];
    }

  });
	

  function loadthis(that){
    let navBar = that._shadowRoot.getElementById("nav");
    // This gets the IDs from the clickedNodes
    navBar.onclick = e => {
      let target = e.target || e.srcElement;
      let clickedNodeTag = target.tagName;
      let clickedNode = "";
      if( clickedNodeTag === 'A' || clickedNodeTag === 'BUTTON' ){
        clickedNode = target.innerHTML;	
        ID = target.id;
      }
    }
    
    // This changes the URL
    var windowURL = window.location.href;
    let resultUrl = "";
    
    let urlString = windowURL.split('?')[0];
    let paramString1 = resultUrl.split('?')[0];
    let paramString = resultUrl.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let URLParameterPair = [];
    let arrayURLParameter = [];
    for(let pair of queryString.entries()){
      URLParameterPair = pair[0] + "=" + pair[1];
      arrayURLParameter.push(URLParameterPair);
    }
    let uniqueArrayURLParameter = [...new Set(arrayURLParameter)];
    resultUrl = windowURL + uniqueArrayURLParameter.join('&');

    let queryUrlString = new URLSearchParams(urlString);
    let UrlStringPair = [];
    for(let pair of queryUrlString.entries()){
      UrlStringPair = pair[0];
    }

    // _URLParameter_value = paramString;
    UrlSplitString = UrlStringPair.split('/');
    let removeID = urlString.replaceAll(UrlSplitString[2]+"/", "");
  }

  function interactiveMenu(that){

    navBar = that._shadowRoot.getElementById("nav");
    navBar.style.fontFamily = 'Arial';
    navBar.style.weight = '';

    let container_item = that._shadowRoot.querySelectorAll(".container-item");
    let container_menu = that._shadowRoot.querySelectorAll(".container-menu");
    let button = that._shadowRoot.querySelectorAll(".menu");
    let small = that._shadowRoot.querySelectorAll(".arrow");
    let closeIcon = that._shadowRoot.getElementById("close");

    let firstBtn = that._shadowRoot.getElementById("Menu1");
    let secondBtn = that._shadowRoot.getElementById("Menu2");
    let thirdBtn = that._shadowRoot.getElementById("Menu3");
    let forthBtn = that._shadowRoot.getElementById("Menu4");

    let firstUl = that._shadowRoot.getElementById("Menu1UL");
    let secondUl = that._shadowRoot.getElementById("Menu2UL");
    let thirdUl = that._shadowRoot.getElementById("Menu3UL");
    let forthUl = that._shadowRoot.getElementById("Menu4UL");

    const openFunction = () => {
      let parent = that.parentNode
      let secondParent = parent.parentNode
      let thirdParent = secondParent.parentNode
      let forthParent = thirdParent.parentNode

      navBar.style.width = "269px";
      parent.style.overflow = "visible";
      thirdParent.style.width = "270px";
      forthParent.style.width = "270px";
      closeIcon.style.display = "block";
      for (let i=0; i < container_item.length; i++){
        container_item[i].style.width = "269px";
      }
      for(let i=0; i < container_menu.length; i++){
        container_menu[i].style.width = "257px";
      }
      for(let i=0; i < button.length; i++){
        button[i].style.display = "block";
      }
      for(let i=0; i < button.length; i++){
        small[i].style.display = "block";
      }
    }
      
    navBar.addEventListener("click", function (event){

      let parent = that.parentNode
      let secondParent = parent.parentNode
      let thirdParent = secondParent.parentNode
      let forthParent = thirdParent.parentNode

      if (event.target == this){
        if (navBar.style.width === "269px"){
          let parent = that.parentNode
          let secondParent = parent.parentNode
          let thirdParent = secondParent.parentNode
          let forthParent = thirdParent.parentNode

          navBar.style.width = "71px";
          thirdParent.style.width = "72px";
          forthParent.style.width = "72px";
          closeIcon.style.display = "none";
          firstUl.style.display = "none";
          secondUl.style.display = "none";
          thirdUl.style.display = "none";
          forthUl.style.display = "none";
          for (let i=0; i < container_item.length; i++){
            container_item[i].style.width = "71px";
          }
          for(let i=0; i < container_menu.length; i++){
            container_menu[i].style.width = "59px";
          }
          for(let i=0; i < button.length; i++){
            button[i].style.display = "none";
          }
          for(let i=0; i < button.length; i++){
            small[i].style.display = "none";
          }
          for(let i=0; i < small.length; i++){
            small[i].classList.add("rotate-small");
          }
  
        }else {
          openFunction();
        }
      }

    });

    closeIcon.addEventListener("click", function (event){

      let parent = that.parentNode
      let secondParent = parent.parentNode
      let thirdParent = secondParent.parentNode
      let forthParent = thirdParent.parentNode

      navBar.style.width = "71px";
      thirdParent.style.width = "72px";
      forthParent.style.width = "72px";
      closeIcon.style.display = "none";
      firstUl.style.display = "none";
      secondUl.style.display = "none";
      thirdUl.style.display = "none";
      forthUl.style.display = "none";
      for (let i=0; i < container_item.length; i++){
        container_item[i].style.width = "71px";
      }
      for(let i=0; i < container_menu.length; i++){
        container_menu[i].style.width = "59px";
      }
      for(let i=0; i < button.length; i++){
        button[i].style.display = "none";
      }
      for(let i=0; i < button.length; i++){
        small[i].style.display = "none";
      }
      for(let i=0; i < small.length; i++){
        small[i].classList.add("rotate-small");
      }
      event.stopPropagation();
    });

    firstBtn.addEventListener("click", function (event){
      if(firstUl.style.display === "block"){
        firstUl.style.display = "none";
        small[0].classList.add("rotate-small");
      }else {
        openFunction();
        firstUl.style.display = "block";
        secondUl.style.display = "none";
        thirdUl.style.display = "none";
        forthUl.style.display = "none";
        small[0].classList.remove("rotate-small");
        small[1].classList.add("rotate-small");
        small[2].classList.add("rotate-small");
        small[3].classList.add("rotate-small");
      }
    });

    secondBtn.addEventListener("click", function (event){
      if(secondUl.style.display === "block"){
        secondUl.style.display = "none";
        small[1].classList.add("rotate-small");
      }else {
        openFunction();
        firstUl.style.display = "none";
        secondUl.style.display = "block";
        thirdUl.style.display = "none";
        forthUl.style.display = "none";
        small[0].classList.add("rotate-small");
        small[1].classList.remove("rotate-small");
        small[2].classList.add("rotate-small");
        small[3].classList.add("rotate-small");
      }
    });

    thirdBtn.addEventListener("click", function (event){
      if(thirdUl.style.display === "block"){
        thirdUl.style.display = "none";
        small[2].classList.add("rotate-small");
      }else {
        openFunction();
        firstUl.style.display = "none";
        secondUl.style.display = "none";
        thirdUl.style.display = "block";
        forthUl.style.display = "none";
        small[0].classList.add("rotate-small");
        small[1].classList.add("rotate-small");
        small[2].classList.remove("rotate-small");
        small[3].classList.add("rotate-small");
      }
    });

    forthBtn.addEventListener("click", function (event){
      if(forthUl.style.display === "block"){
        forthUl.style.display = "none";
        small[3].classList.add("rotate-small");
      }else {
        openFunction();
        firstUl.style.display = "none";
        secondUl.style.display = "none";
        thirdUl.style.display = "none";
        forthUl.style.display = "block";
        small[0].classList.add("rotate-small");
        small[1].classList.add("rotate-small");
        small[2].classList.add("rotate-small");
        small[3].classList.remove("rotate-small");
      }
    });

    const closeMenuAfterLink = () => {
      // let linkHref = that._shadowRoot.querySelectorAll("a");
      // console.log("This is a test", linkHref);
      that._shadowRoot.querySelectorAll("a").forEach(item => {
        item.addEventListener('click', event => {
          // console.log("This is a test", item);

          let parent = that.parentNode
          let secondParent = parent.parentNode
          let thirdParent = secondParent.parentNode
          let forthParent = thirdParent.parentNode
    
          navBar.style.width = "71px";
          thirdParent.style.width = "72px";
          forthParent.style.width = "72px";
          closeIcon.style.display = "none";
          firstUl.style.display = "none";
          secondUl.style.display = "none";
          thirdUl.style.display = "none";
          forthUl.style.display = "none";
          for (let i=0; i < container_item.length; i++){
            container_item[i].style.width = "71px";
          }
          for(let i=0; i < container_menu.length; i++){
            container_menu[i].style.width = "59px";
          }
          for(let i=0; i < button.length; i++){
            button[i].style.display = "none";
          }
          for(let i=0; i < button.length; i++){
            small[i].style.display = "none";
          }
          for(let i=0; i < small.length; i++){
            small[i].classList.add("rotate-small");
          }
          event.stopPropagation();
        })
      })
    }

    closeMenuAfterLink();

  }

  function setSelectedFirstMenuItem(that){
    
    let menu1 = that._shadowRoot.getElementById("Menu1");
    let menu2 = that._shadowRoot.getElementById("Menu2");
    let menu3 = that._shadowRoot.getElementById("Menu3");
    let menu4 = that._shadowRoot.getElementById("Menu4");
    let menu1_button = that._shadowRoot.getElementById("Menu1.Button");
    let menu2_button = that._shadowRoot.getElementById("Menu2.Button");
    let menu3_button = that._shadowRoot.getElementById("Menu3.Button");
    let menu4_button = that._shadowRoot.getElementById("Menu4.Button");

    let icon1 = that._shadowRoot.getElementById("icon1");
    let icon2 = that._shadowRoot.getElementById("icon2");
    let icon3 = that._shadowRoot.getElementById("icon3");
    let icon4 = that._shadowRoot.getElementById("icon4");
    
    let arrow = that._shadowRoot.querySelectorAll(".arrow");
    let span_arrow = that._shadowRoot.querySelectorAll(".span-arrow")

    let menu1_link1 = that._shadowRoot.getElementById("Menu1.link1");
    let menu1_link2 = that._shadowRoot.getElementById("Menu1.link2");
    let menu1_link3 = that._shadowRoot.getElementById("Menu1.link3");
    let menu1_link4 = that._shadowRoot.getElementById("Menu1.link4");
    
    let menu2_link1 = that._shadowRoot.getElementById("Menu2.link1");
    let menu2_link2 = that._shadowRoot.getElementById("Menu2.link2");
    let menu2_link3 = that._shadowRoot.getElementById("Menu2.link3");
    let menu2_link4 = that._shadowRoot.getElementById("Menu2.link4");
    let menu2_link5 = that._shadowRoot.getElementById("Menu2.link5");
    let menu2_link6 = that._shadowRoot.getElementById("Menu2.link6");
    let menu2_link7 = that._shadowRoot.getElementById("Menu2.link7");

    let menu3_link1 = that._shadowRoot.getElementById("Menu3.link1");
    let menu3_link2 = that._shadowRoot.getElementById("Menu3.link2");

    let menu4_link1 = that._shadowRoot.getElementById("Menu4.link1");
    let menu4_link2 = that._shadowRoot.getElementById("Menu4.link2");
    let menu4_link3 = that._shadowRoot.getElementById("Menu4.link3");
    let menu4_link4 = that._shadowRoot.getElementById("Menu4.link4");
    let menu4_link5 = that._shadowRoot.getElementById("Menu4.link5");



    // =========================================================================================================================
    // =========================================================================================================================
    // =========================================================================================================================

    // This changes the URL
    var windowURL = window.location.href;
    let resultUrl = "";
    let urlDefinedParameters = "";

    let parameterString = windowURL.split('?')[1];
    let queryString = new URLSearchParams(parameterString);
    let URLParameterPair = [];
    let arrayURLParameter = [];
    for(let pair of queryString.entries()){
      URLParameterPair = pair[0] + "=" + pair[1];
      arrayURLParameter.push(URLParameterPair);
    }
    let uniqueArrayURLParameter = [...new Set(arrayURLParameter)];
    function paramentersSAC(item) {
      return item.toLowerCase().indexOf('p_') === 0;
    }

    let constParameters = uniqueArrayURLParameter.filter(paramentersSAC);

    resultUrl = windowURL + uniqueArrayURLParameter.join('&');

    // ========================================================================================================================
    // ========================================================================================================================
    // ========================================================================================================================


    // ========================================================================================================================
    // ======================================= This gets the start of the URL before ID =======================================
    // ========================================================================================================================

    var windowURL = window.location.href;
    let urlString = windowURL.split('/?')[0];
    let queryUrlString = new URLSearchParams(urlString);
    let UrlStringPair = [];
    for(let pair of queryUrlString.entries()){
      UrlStringPair = pair[0];
    }
    UrlSplitString = UrlStringPair.split('/');
    UrlIDString = UrlSplitString[2];

    let removeID = urlString.replaceAll(UrlSplitString[2]+"/", "");

    let urlWithoutID = removeID.replace(UrlStringPair, '');

    if (!urlWithoutID.includes("shellMode=embed")){
      urlWithoutID = urlWithoutID.replace("analyticapp&", "analyticapp?shellMode=embed&");
    }

    urlDefinedParameters = "/?url_api=true&view_id=appBuilding";

    // =========================================================================================================================
    // =========================================================================================================================
    
    let menu1_href1 = "2CB86107C80A55E359F9D229D4FE4F8C"; //Proxy Sales - Sales Outlook
    menu1_link1.setAttribute("href",urlWithoutID + '/aa/' + menu1_href1);
    
    let menu1_href2 = "C888107C80F893D5BCBFB9A7D665542"; // Forecast Accuracy
    menu1_link2.setAttribute("href",urlWithoutID + '/aa/' + menu1_href2);

    let menu1_href3 = "22180E04DC8D1E73331D078436435475"; // PVM
    menu1_link3.setAttribute("href",urlWithoutID + '/aa/' + menu1_href3);

    // let menu1_href4 = ""; // ROPs
    // menu1_link4.setAttribute("href",urlWithoutID + '/aa/' + menu1_href4 );

    // =========================================================================================================================
    // =========================================================================================================================

    let menu2_href1 = "61309201F013FA429549454EF50F3B06"; // Sales Forecasting
    menu2_link1.setAttribute("href",urlWithoutID + '/aa/' + menu2_href1 + urlDefinedParameters + _URLParameter_value);

    // let menu2_href2 = "DEE82D0447236AFF96CEC02E2CA67253"; // Launches
    // menu2_link2.setAttribute("href",urlWithoutID + '/aa/' + menu2_href2 + urlDefinedParameters + _URLParameter_value);
    menu2_link2.setAttribute("href", "https://plai.gaia.novartis.net/componentsAnalysis?bu=232131032&frequency=1&isBrandGroupLevelForecast=false&activeScopeId=44&brands=60202&ai-version=45&variable-launches=2&activeTabLaunches=feature_plot&version=1%7C36%7C8&currency=2&ranges=2025-01-01T00%3A00%3A00.000Z%7C2025-05-01T00%3A00%3A00.000Z&launches-pt-treshold=1");

    let menu2_href3 = "DEE82D0447236AFF96CEC02E2CA67253"; // Baseline
    menu2_link3.setAttribute("href",urlWithoutID + '/aa/' + menu2_href3 + urlDefinedParameters + _URLParameter_value);
    
    let menu2_href4 = "6BA87A01F01381CD8BBACF2D8E99BDD6"; // Competitor
    menu2_link4.setAttribute("href",urlWithoutID + '/aa/' + menu2_href4 + urlDefinedParameters + _URLParameter_value);

    let menu2_href5 = "89809201F013A17E9A0A70468F5FCD75"; // Generics
    menu2_link5.setAttribute("href",urlWithoutID + '/aa/' + menu2_href5 + urlDefinedParameters + _URLParameter_value);
    
    let menu2_href6 = "5696F07AACC081BDC89EF07A4040F0E"; // AI Scope
    menu2_link6.setAttribute("href",urlWithoutID + '/aa/' + menu2_href6);

    let menu2_href7 = "7CC87E04DC88B7BB373934148818CEBC"; // Sales Outliers
    menu2_link7.setAttribute("href",urlWithoutID + '/aa/' + menu2_href7);
    
    // =========================================================================================================================
    // =========================================================================================================================

    // let menu3_href1 = "D4A13707AACF7B8181E0A0A574FFBA66"; // Cash Forecasting
    // menu3_link1.setAttribute("href",urlWithoutID + '/aa/' + menu3_href1);
    menu3_link1.setAttribute("href", "https://plai.gaia.novartis.net/CashSummary?regions=2222111&account=1&period=0&ai-version=45&version=36&currency=2");
    
    // let menu3_href2 = "5018D2FA15276C0412E717A01C65229F"; // Cash Outliers
    let menu3_href2 = "68800E820C94CB3ACEE8E6AAF6D43A40"; // Cash Outliers    
    menu3_link2.setAttribute("href",urlWithoutID + '/aa/' + menu3_href2);
    
    // =========================================================================================================================
    // =========================================================================================================================

    // let menu4_href1 = ""; // Input Checkpoint
    // menu4_link1.setAttribute("href",urlWithoutID + '/aa/' + menu4_href1);
    
    let menu4_href2 = "5D316F07AACD59DCE55CF2C5115CD607"; // Price Assumptions
    menu4_link2.setAttribute("href",urlWithoutID + '/aa/' + menu4_href2);

    let menu4_href3 = "F4286D822A63B89DD8807713F6A192A0"; // Brand Events
    menu4_link3.setAttribute("href",urlWithoutID + '/aa/' + menu4_href3);
     
    let menu4_href4 = "F08895822A61FBAD211A2C68F4B1A4A2"; // Competitors
    menu4_link4.setAttribute("href",urlWithoutID + '/aa/' + menu4_href4);

    let menu4_href5 = "488895822A656197B4B73B6551B27E42"; // Key Drivers
    menu4_link5.setAttribute("href",urlWithoutID + '/aa/' + menu4_href5);

    // =========================================================================================================================
    // =========================================================================================================================

    if (UrlIDString == menu1_href1){
      menu1.classList.add("setSelectedParent");
      icon1.classList.add("path");
      menu1_link1.classList.add("setSelectedItem");
      span_arrow[0].style.stroke="#fff";
    }else {
      menu1_link1.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu1_href2){
      menu1.classList.add("setSelectedParent");
      icon1.classList.add("path");
      menu1_link2.classList.add("setSelectedItem");
      span_arrow[0].style.stroke="#fff";
    }else {
      menu1_link2.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu1_href3){
      menu1.classList.add("setSelectedParent");
      icon1.classList.add("path");
      menu1_link3.classList.add("setSelectedItem");
      span_arrow[0].style.stroke="#fff";
    }else {
      menu1_link3.classList.remove("setSelectedItem");
    }

    // if (UrlIDString == menu1_href4){
    //   menu1.classList.add("setSelectedParent");
    //   icon1.classList.add("path");
    //   menu1_link4.classList.add("setSelectedItem");
    //   span_arrow[0].style.stroke="#fff";
    // }else {
    //   menu1_link4.classList.remove("setSelectedItem");
    // }

    if (UrlIDString !== menu1_href1 && UrlIDString !== menu1_href2 && UrlIDString !== menu1_href3 ){ // && UrlIDString !== menu1_href4){
      menu1.classList.remove("setSelectedParent");
      icon1.classList.remove("path")
      span_arrow[0].style.stroke="#fff";
    }
    
    // =========================================================================================================================
    // =========================================================================================================================

    if (UrlIDString == menu2_href1){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link1.classList.add("setSelectedItem");
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link1.classList.remove("setSelectedItem");
    }

    // if (UrlIDString == menu2_href2){
    //   menu2.classList.add("setSelectedParent");
    //   icon2.classList.add("path");
    //   menu2_link2.classList.add("setSelectedItem");
    //   span_arrow[1].style.stroke="#fff";
    // }else {
    //   menu2_link2.classList.remove("setSelectedItem");
    // }

    if (UrlIDString == menu2_href3){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link3.classList.add("setSelectedItem");
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link3.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu2_href4){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link4.classList.add("setSelectedItem");
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link4.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu2_href5){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link5.classList.add("setSelectedItem");
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link5.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu2_href6){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link6.classList.add("setSelectedItem");
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link6.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu2_href7){
      menu2.classList.add("setSelectedParent");
      icon2.classList.add("path");
      menu2_link7.classList.add("setSelectedItem");
      span_arrow[1].style.stroke="#fff";
    }else {
      menu2_link7.classList.remove("setSelectedItem");
    }

    if (UrlIDString !== menu2_href1 && UrlIDString !== menu2_href3 &&  UrlIDString !== menu2_href4 &&  UrlIDString !== menu2_href5 &&  UrlIDString !== menu2_href6 &&  UrlIDString !== menu2_href7){
      menu2.classList.remove("setSelectedParent");
      icon2.classList.remove("path")
      span_arrow[1].style.stroke="#fff";
    }

    // =========================================================================================================================
    // =========================================================================================================================

    // if (UrlIDString == menu3_href1){
    //   menu3.classList.add("setSelectedParent");
    //   icon3.classList.add("path");
    //   menu3_link1.classList.add("setSelectedItem");
    //   span_arrow[2].style.stroke="#fff";
    // }else {
    //   menu3_link1.classList.remove("setSelectedItem");
    // }

    if (UrlIDString == menu3_href2){
      menu3.classList.add("setSelectedParent");
      icon3.classList.add("path");
      menu3_link2.classList.add("setSelectedItem");
      span_arrow[2].style.stroke="#fff";
    }else {
      menu3_link2.classList.remove("setSelectedItem");
    }

    if (UrlIDString !== menu3_href2){
      menu3.classList.remove("setSelectedParent");
      icon3.classList.remove("path")
      span_arrow[2].style.stroke="#fff";
    }

    // =========================================================================================================================
    // =========================================================================================================================
    
    // if (UrlIDString == menu4_href1){
    //   menu4.classList.add("setSelectedParent");
    //   icon4.classList.add("path");
    //   menu4_link1.classList.add("setSelectedItem");
    //   span_arrow[2].style.stroke="#fff";
    // }else {
    //   menu4_link1.classList.remove("setSelectedItem");
    // }

    if (UrlIDString == menu4_href2){
      menu4.classList.add("setSelectedParent");
      icon4.classList.add("path");
      menu4_link2.classList.add("setSelectedItem");
      span_arrow[2].style.stroke="#fff";
    }else {
      menu4_link2.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu4_href3){
      menu4.classList.add("setSelectedParent");
      icon4.classList.add("path");
      menu4_link3.classList.add("setSelectedItem");
      span_arrow[2].style.stroke="#fff";
    }else {
      menu4_link3.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu4_href4){
      menu4.classList.add("setSelectedParent");
      icon4.classList.add("path");
      menu4_link4.classList.add("setSelectedItem");
      span_arrow[2].style.stroke="#fff";
    }else {
      menu4_link4.classList.remove("setSelectedItem");
    }

    if (UrlIDString == menu4_href5){
      menu4.classList.add("setSelectedParent");
      icon4.classList.add("path");
      menu4_link5.classList.add("setSelectedItem");
      span_arrow[2].style.stroke="#fff";
    }else {
      menu4_link5.classList.remove("setSelectedItem");
    }

    if (UrlIDString !== menu4_href2 && UrlIDString !== menu4_href3 && UrlIDString !== menu4_href4 && UrlIDString !== menu4_href5){
      menu4.classList.remove("setSelectedParent");
      icon4.classList.remove("path")
      span_arrow[2].style.stroke="#fff";
    }

  }

})();