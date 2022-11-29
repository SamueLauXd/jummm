import { addProduct } from "../../services/db.js";
export class ProductAdd extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        var _a;
        this.render();
        const form = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('product-form');
        form === null || form === void 0 ? void 0 : form.addEventListener('add-product', (evt) => {
            const productTitle = evt.detail.productTitle;
            const price = evt.detail.price;
            const description = evt.detail.description;
            const image = evt.detail.image;
            addProduct({ productTitle, price, description, image });
        });
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <div class="form">
        <product-form></product-form>
        </div>
        `;
    }
}
customElements.define('product-add', ProductAdd);
