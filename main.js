//Create a new vue instance, tag the element with the ID of 'app', and give it data.  
var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        brand: 'Vue Mastery',
        image: './assets/vmSocks-green.jpg',
        inStock: true,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green.jpg"
            }, 
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue.jpg"
            }
        ],
        sizes: ["Small", "Medium", "Large"],
        cart: 0,
    },
    methods: {
        addToCart: function() {
            this.cart += 1
        },
        subToCart: function() {
            this.cart -= 1
        },
        updateProduct: function(variantImage) {
            this.image = variantImage
        }
    },
    computed: {
        title: function() {
            return this.brand + ' ' + this.product
        }
    }
})




