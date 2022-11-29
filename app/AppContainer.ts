
import './components/Import.js';
import {getProducts, deleteProduct, listenProducts} from './services/db.js';

class AppContainer extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback(){

       listenProducts((products) =>{
        this.render(products);

        const card = this.shadowRoot?.querySelectorAll('app-card');
        card?.forEach((cardE) =>{
            cardE.addEventListener('delete-product', async (evt: CustomEvent) =>{
                deleteProduct(evt.detail.uid);
            })
        })
       })

    }
    
    render(data?){
        if(!this.shadowRoot) return;
        const productCard = data.map(e => {
            return `<app-card uid="${e.id}" producttitle="${e.data.productTitle}" price="${e.data.price}" description="${e.data.description}" image="${e.data.image}"></app-card>`
        });
        this.shadowRoot.innerHTML = productCard.join('');
        this.shadowRoot.innerHTML += `<product-add></product-add>`;
        
    }

    
}


customElements.define('app-container', AppContainer);