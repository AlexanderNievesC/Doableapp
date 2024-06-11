const DOMHandler = (function (parentSelector) {
    const parent = document.querySelector(parentSelector);
  
    if (!parent) throw new Error("Parent not found");
  
    return {
      module: null,
      async load(module) {
        this.module = module;
        const html = await module.toString();
        parent.innerHTML = html;
        module.addListeners();
      },
      reload() {
        this.load(this.module);
      },
    };
  })("#root");
  
  export default DOMHandler;