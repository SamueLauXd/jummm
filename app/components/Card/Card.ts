
export enum Attribute {
    'producttitle' = 'producttitle',
    'price' = 'price',
    'description' = 'description',
    'image' = 'image',
    'uid' = 'uid'
}

export class Card extends HTMLElement {
    producttitle?: string;
    price?: string;
    description?: string
    image?: string;
    uid?: string;

    
    static get observedAttributes (){
        const attrs: Record<Attribute, null> = {
            producttitle: null,
            price: null,
            description: null,
            image: null,
            uid: null
        }
        return Object.keys(attrs);
    }


    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    
    connectedCallback(){
        this.render();

        const btn = this.shadowRoot?.querySelector('#delete');
        btn?.addEventListener('click', ()=>{
            const evt: CustomEvent<{uid: string}> = new CustomEvent ('delete-product', {
                detail: {uid: this.uid},
                composed: true
            });
            this.dispatchEvent(evt);
            })
        }
        
    
    
    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {
                case Attribute.price:
                    this[propName] = newValue ? String (newValue) : undefined;
                    break;
            
                default:
                    this[propName] = newValue;
                    break;
            } 
            this.render();
        }
        
        render(){
            if(this.shadowRoot){
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
                `
            }
        }
    }
    
customElements.define("app-card",Card);