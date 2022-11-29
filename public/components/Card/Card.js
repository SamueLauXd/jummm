export var Attribute;
(function (Attribute) {
    Attribute["producttitle"] = "producttitle";
    Attribute["price"] = "price";
    Attribute["description"] = "description";
    Attribute["image"] = "image";
    Attribute["uid"] = "uid";
})(Attribute || (Attribute = {}));
export class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
        const attrs = {
            producttitle: null,
            price: null,
            description: null,
            image: null,
            uid: null
        };
        return Object.keys(attrs);
    }
    connectedCallback() {
        var _a;
        this.render();
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#delete');
        btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
            const evt = new CustomEvent('delete-product', {
                detail: { uid: this.uid },
                composed: true
            });
            this.dispatchEvent(evt);
        });
    }
    attributeChangedCallback(propName, _, newValue) {
        switch (propName) {
            case Attribute.price:
                this[propName] = newValue ? String(newValue) : undefined;
                break;
            default:
                this[propName] = newValue;
                break;
        }
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./components/Card/styles.css">
                <section class="products">
                <div class="container">
                    <div class="img">
                    <img src="${this.image}">
                    </div>
                    <div class="info">
                        <h1>${this.producttitle}</h1>
                        <h2>$${this.price}</h2>
                        <p>${this.description}</p>
                    </div>
                    <embed src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png" id="delete"></embed>
                </div>
                </section>
                `;
        }
    }
}
customElements.define("app-card", Card);
