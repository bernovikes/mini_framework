let $data = {};
const vdom = [

]
let vm = ''
function ProxyData(data) {
  return new Proxy(data, {
    get(target, key) {
      return target[key];
    },
  });
}
function paraseExp(item, obj) {
  item.textContent = item.textContent.replace(/{{(.*?)}}/g, (match, p) => {
    console.log(p)
    try {
      const $dataValue = eval(`obj.${p.trim()}`);
      return $dataValue || match
    } catch (error) {
      return match
    }
  })
}
function vfor($el, parse) {
  const split = parse.split(' in ')
  const key = split[1]
  const variables = split[0].match(/[(](.*)[)]/)[1].split(',')
  const list = Reflect.get($data, key)
  const nodeName = $el.nodeName.toLocaleLowerCase()
  console.log($el.innerHTML)
  const Fragment = document.createDocumentFragment()
  list.forEach((item, index) => {
    const _data = { [variables[0]]: item, [variables[1]]: index }
    const ele = document.createElement(nodeName)
    ele.innerHTML = $el.innerHTML
    eachNode(ele, _data)
    Fragment.appendChild(ele)
  })
  vm.insertBefore(Fragment,$el)
}
function direct($el) {
  const attrs = $el.attributes
  for (const attr of attrs) {
    const { name, value } = attr
    if (!['v-text', 'v-for'].includes(name)) {
      eachNode($el,)
    }
    if ('v-for' === name) {
      vfor($el, value)
    }
  }
}
function eachNode($el, context) {
  const childNodes = $el.childNodes;
  const text = 3;
  const element = 1;
  childNodes.forEach((item) => {
    switch (item.nodeType) {
      case text:
        paraseExp(item, context)
        break;
      case element:
        direct(item, context)
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
  vm = $el
  eachNode($el, $data)
}
