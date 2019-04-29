/*
 * jQuery Simple Shopping Cart v0.1
 * Basis shopping cart using javascript/Jquery.
 *
 * Authour : Sirisha
 * Modified By: Fernando Ferraz, Kobi Lee, Rachel Tang
 */


/* '(function(){})();' this function is used, to make all variables of the plugin Private */

(function ($, window, document, undefined) {

    /* Default Options */
    var defaults = {
        cart: [],
        addtoCartClass: '.sc-add-to-cart',
        removeFromCartClass: '.sc-remove-from-cart',
        checkoutClass: '.sc-checkout',
        cartProductListClass: '.cart-products-list',
        totalCartCountClass: '.total-cart-count',
        totalCartCostClass: '.total-cart-cost',
        showcartID : '#show-cart',
        itemCountClass : '.item-count'
    };

    /* Item Construtor Function */
    function Item(itemid, name, price, count) {
        this.itemid = itemid;
        this.name = name;
        this.price = price;
        this.count = count;
    }

    /*Cart Constructor Function*/
    function simpleCart(domEle, options) {

        /* Merge user settings with default, recursively */
        this.options = $.extend(true, {}, defaults, options);
        //Cart array
        this.cart = [];
        //Dom Element
        this.cart_ele = $(domEle);
        //Initial init function
        this.init();
    }

    /* Helper Function - Display return of SMS POST request */
    function updatePostMsgBox(isError, msg) {
        let $pRetMsgEl = $(".post-return-msg");
        let $pRetEl = $(".post-return-box");

        if ($pRetEl.css("display") != "none") {
          $pRetEl.slideToggle(75);
        }

        if (isError) {
            $pRetEl.removeClass("post-return-success");
            $pRetEl.addClass("post-return-error");
        } else {
            $pRetEl.removeClass("post-return-error");
            $pRetEl.addClass("post-return-success");
        }

          $pRetMsgEl.text(msg);

        $pRetEl.slideToggle();
        return;
    }

    /*Plugin Functions */
    $.extend(simpleCart.prototype, {
        init: function () {
            this._setupCart();
            this._setEvents();
            this._loadCart();
            this._updateCartDetails();
        },
        _setupCart: function () {
            this.cart_ele.addClass("cart-grid panel panel-defaults");
            this.cart_ele.append("<div class='panel-heading cart-heading'><div class='total-cart-count'>Your Cart: 0 items</div><div class='spacer'></div><i class='fa fa-dollar total-cart-cost'>0</i><div></div></div>")
            this.cart_ele.append("<div class='panel-body cart-body'><div class='cart-products-list' id='show-cart'><!-- Dynamic Code from Script comes here--></div></div>")
            this.cart_ele.append(
              "<div class='cart-summary-container'>\n\
                                <div class='cart-offer'></div>\n\
                                        <div class='cart-total-amount'>\n\
                                            <div>Total</div>\n\
                                            <div class='spacer'></div>\n\
                                            <div><i class='fa fa-dollar total-cart-cost'> 0</i></div>\n\
                                            </div>\n\
                                            <div class='cart-checkout'>\n\
                                            <form class='form-inline' action='#'>\n\
                                                <label class='sr-only' for='order-phone-number'>Username</label>\n\
                                                <div class='input-group mb-2 mr-sm-2 mb-sm-0 sc-phone-number'>\n\
                                                <div class='input-group-addon'><i class='fas fa-phone'></i></div>\n\
                                                <input class='form-control' id='order-phone-number' placeholder='Your Phone Number'></input>\n\
                                                <div class='post-return-box'>\n\
                                                <span class='post-return-close' onclick=\"$('.post-return-box').slideToggle(200);\">&times;</span>\n\
                                                <span class='post-return-msg'></span></div>\n\
                                                </div><button type='submit' class='btn btn-primary sc-checkout'>Proceed To Checkout</button>\n\
                                            </form>\n\
                                        </div>\n\
                                 </div>"
            );

            new Cleave('#order-phone-number', {
                phone: true,
                phoneRegionCode: 'CA'
            });
        },
        _addProductstoCart: function () {
        },
        _updateCartDetails: function () {
            var mi = this;
            $(this.options.cartProductListClass).html(mi._displayCart());
            $(this.options.totalCartCountClass).html("Your Cart: " + mi._totalCartCount() + " items");
            $(this.options.totalCartCostClass).html(mi._totalCartCost());
        },
        _setCartbuttons: function () {

        },
        _setEvents: function () {
            let mi = this;

            $(".panel-body .row").on(
              "click",
              this.options.addtoCartClass,
              function(e) {
                e.preventDefault();
                let elID = $(this).attr("data-id");
                let name = $(this).attr("data-name");
                let cost = Number($(this).attr("data-price"));
                mi._addItemToCart(elID, name, cost, 1);
                mi._updateCartDetails();
              }
            );

            $(this.options.checkoutClass).on("click", function(e) {
              e.preventDefault();
                let phoneNumberEntered = $("#order-phone-number").val().split(" ").join("");

              //Account for 10-digit or 11-digit number (with +1)
              if (phoneNumberEntered.length === 10 || phoneNumberEntered.length === 11) {
                $.ajax({
                  type: "POST",
                  url: "/twilio/send",
                  data: {
                    order: mi.cart,
                    phonenum: phoneNumberEntered
                  },
                  dataType: "object"
                })
                  .then(
                    updatePostMsgBox(false, "Hang in there, your food is being prepared!")
                  )
                  .then($("#order-phone-number").val(""))
                  .then(mi._clearCart())
                  .then(mi._updateCartDetails());
              } else {
                updatePostMsgBox(true, "You must enter a valid phone number!");
                return;
              }
            });

            $(this.options.showcartID).on("change", this.options.itemCountClass, function (e) {
                let ci = this;
                e.preventDefault();
                let count = $(this).val();
                let elID = $(this).attr("data-id");
                let name = $(this).attr("data-name");
                let cost = Number($(this).attr("data-price"));
                mi._removeItemfromCart(elID, cost, count);
                mi._updateCartDetails();
            });

            $(this.options.showcartID).on("click", this.options.removeFromCartClass, function (e) {
                let ci = this;
                e.preventDefault();
                let count = 0;
                let elID = $(this).attr("data-id");
                let name = $(this).attr("data-name");
                let cost = Number($(this).attr("data-price"));
                mi._removeItemfromCart(elID, cost, count);
                mi._updateCartDetails();
            });
        },
        /* Async Helper Functions */
        _addItemToCart: function (elID, name, price, count) {
            for (let i in this.cart) {
                if (this.cart[i].itemid == elID) {
                    this.cart[i].count++;
                    this.cart[i].price = price * this.cart[i].count;
                    this._saveCart();
                    return;
                }
            }
            let item = new Item(elID, name, price, count);
            this.cart.push(item);
            this._saveCart();
        },
        _removeItemfromCart: function (elID, price, count) {
            for (var i in this.cart) {
                console.log("(this.cart[i].itemid = " + this.cart[i].itemid + ", elID = " + elID);
                if (this.cart[i].itemid == elID) {
                    var singleItemCost = Number(price / this.cart[i].count);
                    this.cart[i].count = count;
                    this.cart[i].price = singleItemCost * count;
                    if (count == 0) {
                        this.cart.splice(i, 1);
                    }
                    break;
                }
            }
            this._saveCart();
        },
        _clearCart: function () {
            this.cart = [];
            this._saveCart();
        },
        _totalCartCount: function () {
            return this.cart.length;
        },
        _displayCart: function () {
            let cartArray = this._listCart();
            let output = "";
            if (cartArray.length <= 0) {
                output = "<span class='cart-empty-msg'>Your cart is empty</span>";
            }
            for (let i in cartArray) {
                console.log();
                let dataId = (cartArray[i].itemid) ? cartArray[i].itemid : 0;
                let itemPrice = parseFloat(cartArray[i].price).toFixed(2);

                output += `<div class='cart-each-product'>
                <div class='name'>${cartArray[i].name}</div>
                <div class='quantityContainer'><input type='number' class='quantity form-control item-count' data-name='${cartArray[i].name}' data-price='${itemPrice}' data-id='${dataId}' min='0' value='${cartArray[i].count}' +  name='number'></div>
                <div class='quantity-am'><i class='fa fa-dollar'></i> ${itemPrice}</div><div class='remove-button'><button class='btn sc-remove-from-cart' data-name='${cartArray[i].name}' data-price='${itemPrice}' data-id='${dataId}' type='submit'>x</button></div></div>`;
            }
            return output;
        },
        _totalCartCost: function () {
            let totalCost = 0;
            for (let i in this.cart) {
                totalCost += this.cart[i].price;
            }
            return parseFloat(totalCost).toFixed(2);
        },
        _listCart: function () {
            let cartCopy = [];
            for (let i in this.cart) {
                let item = this.cart[i];
                let itemCopy = {};
                for (let p in item) {
                    itemCopy[p] = item[p];
                }
                cartCopy.push(itemCopy);
            }
            return cartCopy;
        },
        _calGST: function () {
            let GSTPercent = 18;
            let totalcost = this.totalCartCost();
            let calGST = Number((totalcost * GSTPercent) / 100);
            return calGST;
        },
        _saveCart: function () {
            localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
        },
        _loadCart: function () {
            this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
            if (this.cart === null) {
                this.cart = [];
            }
        }
    });
    /* Defining the Structure of the plugin 'simpleCart'*/
    $.fn.simpleCart = function (options) {
        return this.each(function () {
            $.data(this, "simpleCart", new simpleCart(this));
        });
    }
    ;
})(jQuery, window, document);