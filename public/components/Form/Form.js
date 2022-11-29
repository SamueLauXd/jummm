export class Form extends HTMLElement {
    constructor() {
        super();
        this.productTitle = '';
        this.price = '';
        this.description = '';
        this.image = '';
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        var _a, _b, _c, _d, _e;
        this.render();
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#upload');
        btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
            const event = new CustomEvent('add-product', {
                detail: { productTitle: this.productTitle, price: this.price, description: this.description, image: this.image },
                composed: true,
            });
            this.dispatchEvent(event);
        });
        const productTitle = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('#title');
        const price = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('#price');
        const description = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('#desc');
        const image = (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector('#image');
        productTitle === null || productTitle === void 0 ? void 0 : productTitle.addEventListener('change', (evt) => {
            const value = evt.target.value || '';
            this.productTitle = value;
        });
        price === null || price === void 0 ? void 0 : price.addEventListener('change', (evt) => {
            const value = evt.target.value || '';
            this.price = value;
        });
        description === null || description === void 0 ? void 0 : description.addEventListener('change', (evt) => {
            const value = evt.target.value || '';
            this.description = value;
        });
        image === null || image === void 0 ? void 0 : image.addEventListener('change', (evt) => {
            const value = evt.target.value || '';
            this.image = value;
        });
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/Card/styles.css">
        <section class="form">
        <h1>Add your product</h1>
        <div class="inputs">
        <label>Title</label>
        <input type="text" id="title"/>
        <label>Price</label>
        <input type="text" id="price"/>
        <label>Description</label>
        <input type="text" id="desc"/>
        <label>Image url</label>
        <input type="text" id="image"/>
        </div>
        <button type="submit" id="upload">Add</button>
        </section>
        `;
    }
}
customElements.define('product-form', Form);
