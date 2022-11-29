export class Form extends HTMLElement {
    productTitle = '';
    price = '';
    description = '';
    image = '';

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();

        const btn = this.shadowRoot?.querySelector('#upload');
        btn?.addEventListener('click', ()=>{
            const event: CustomEvent<{productTitle: string, price: string, description: string, image: string}> 
            = new CustomEvent ('add-product', {
                detail: {productTitle: this.productTitle, price: this.price, description: this.description, image: this.image},
                composed: true,
            })
            this.dispatchEvent(event);
        })

        const productTitle = this.shadowRoot?.querySelector('#title');
        const price = this.shadowRoot?.querySelector('#price');
        const description = this.shadowRoot?.querySelector('#desc');
        const image = this.shadowRoot?.querySelector('#image');

        productTitle?.addEventListener('change', (evt)=>{
            const value: string = (evt.target as HTMLInputElement).value || '';
            this.productTitle = value;
        })
        price?.addEventListener('change', (evt)=>{
            const value: string = (evt.target as HTMLInputElement).value || '';
            this.price = value;
        })
        description?.addEventListener('change', (evt)=>{
            const value: string = (evt.target as HTMLInputElement).value || '';
            this.description = value;
        })
        image?.addEventListener('change', (evt)=>{
            const value: string = (evt.target as HTMLInputElement).value || '';
            this.image = value;
        })
    }

    render(){
        if(!this.shadowRoot) return;
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