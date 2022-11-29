var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import './components/Import.js';
import { deleteProduct, listenProducts } from './services/db.js';
class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            listenProducts((products) => {
                var _a;
                this.render(products);
                const card = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('app-card');
                card === null || card === void 0 ? void 0 : card.forEach((cardE) => {
                    cardE.addEventListener('delete-product', (evt) => __awaiter(this, void 0, void 0, function* () {
                        deleteProduct(evt.detail.uid);
                    }));
                });
            });
        });
    }
    render(data) {
        if (!this.shadowRoot)
            return;
        const productCard = data.map(e => {
            return `<app-card uid="${e.id}" producttitle="${e.data.productTitle}" price="${e.data.price}" description="${e.data.description}" image="${e.data.image}"></app-card>`;
        });
        this.shadowRoot.innerHTML = productCard.join('');
        this.shadowRoot.innerHTML += `<product-add></product-add>`;
    }
}
customElements.define('app-container', AppContainer);
