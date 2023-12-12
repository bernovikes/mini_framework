let $data = {};
function ProxyData(data) {
  return new Proxy(data, {
    get(target, key) {
      return target[key];
    },
  });
}
function paraseExp(item){    
    const match_exp = item.textContent.match("{{(.*)}}");
    if (match_exp) {
      const exp = match_exp[1];
      const $dataValue = eval(`$data.${exp}`);
      item.textContent = $dataValue;
    }
}
function  direct(){

}
function eachNode($el){    
    const childNodes = $el.childNodes;
    const text = 3;
    const element = 1;
    console.log($el.attributes)
    childNodes.forEach((item) => {
        switch(item.nodeType){
            case text:
                paraseExp(item)
                break;
            case element:
                eachNode(item)
                break;
        }
    //   if (item.nodeType == text) {
    //     paraseExp(item)
    //   }else if(item.nodeType===)
    });
}
function Core(option) {
  const el = option?.el;
  const data = option.data;
  if (typeof data === "function") {
    $data = ProxyData(data());
  }
  const $el = document.querySelector(el);
  eachNode($el)
}
