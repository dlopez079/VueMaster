

//Create a 'COMPONENT' called 'Product'
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
    },
    template: `
    <div class="product">

            <!-- Added a class for product-image that includes a img tag referencing a source -->
            <div class="product-image">

                <!-- Created a v-bind directory to bind the attribuate to an expression.  The expression will call the data object for the value of the image.  -->
                <img v-bind:src="image">
            </div>

            <!-- Created a div that includes prodcut within  an h1 tag -->
            <div class="product-info">

                <!-- Insert the Brand name along with the product.  You can do this by combining the two properties in the data object.  I will create a name title and create a function within the computed object that will combine both brand and product. -->
                <h1>{{ title }}</h1>

                <!-- I want to display whether or not our product is "IN STOCK" OR "OUT OF STOCK".  To do this we have to render data from main using an if/else.  If you don't use the if/else, both elements below will show. The 'v-if' is going to check 'inStock' to see if it's true or false on main.js.  You can also check for quantity of an item as well as a boolean -->
                <p v-if="inStock">In Stock</p>

                <!-- When inStock is false, bind a class to the "Out of Stock" p tag that adds: text-decoration: line-through. -->
                <p v-else
                :class=" { outOfStock: !inStock } ">Out of Stock</p> 

                <!-- Insert if product is on sale or not. -->
                <p>{{ sale }}</p>

                <!-- Insert p tag displaying where user is premium or not -->
                <p>Shipping: {{shipping}} </p>

                <!-- Inserted a v-for to gather all strings from details array -->
                <ul>
                    <li v-for="detail in details"> {{ detail }} </li>
                </ul>

                <!-- Inserted a v-for to gather all strings from variants object -->
                <!-- Added a class 'color-box' so we can pull styles from CSS file.  Then we will v-bind to the colors in data object in main.js -->
                <!-- Change 'variant to '(variant, index).  This is going to pull the index from the variants property of the data object.  I currently have 2 of them so you should see either 0 or 1 when you console log them. Instead of passing the variant image through the updateProduct in @mouseover, I will pass in the 'index'. -->
                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)" 
                >
                </div>

                <!-- Added Button so we can add to cart.  We will implement v-on:click so when we click on the button, it will increment the cart div by 1 -->
                <!-- Added a disabled feature which will disable the button when there are no items in stock. I also added a disabled button class so CSS can change the view of the button so it displays disabled. -->
                <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
                >Add to Cart</button>

                <!-- Create a new button and use v-on to trigger a method that decrements the value of cart. -->
                <button v-on:click="subToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
                >Remove</button>

            </div>
            
        </div>
        
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            onSale: true,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green.jpg",
                    variantQuantity: 10
                }, 
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: ["Small", "Medium", "Large"],
            
        }
    },
    methods: {
        addToCart: function() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
        },
        subToCart: function() {
            this.$emit("sub-to-cart", this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title: function() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if(this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
                return this.brand + ' ' + this.product + ' are not on sale'
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
    
})

//Create a new '(ROOT VUE INSTANCE', tag the element with the ID of 'app', and give it data.  
var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
              if (this.cart[i] === id) {
                 this.cart.splice(i, 1);
              }
            }
          }
    }
})

// Below is a template for components
// Vue.component('ComponentName', {
//     props: [propsOption],
//     template:"<div>{{propsOption}}</div>"
// })



