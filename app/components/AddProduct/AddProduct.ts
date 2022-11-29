import { addProduct } from "../../services/db.js";

export class ProductAdd extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render()

        const form = this.shadowRoot?.querySelector('product-form');
        form?.addEventListener('add-product', (evt: CustomEvent)=>{
            const productTitle = evt.detail.productTitle;
            const price = evt.detail.price;
            const description = evt.detail.description;
            const image = evt.detail.image;

            addProduct({productTitle, price, description, image});
        })
    }

    render(){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <div class="form">
        <product-form></product-form>
        </div>
        `;
    }
    
}

customElements.define('product-add', ProductAdd);