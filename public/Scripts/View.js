/**
  ALL VISUAL/RENDERING CODE GOES HERE.
*/

// STEVEN DO NOT TOUCH!!!!!!!!!!!!!!!!!!!!!!

'use strict'

Bookstore.prototype.initTemplates = function () {
  this.templates = {};

  var that = this;
  document.querySelectorAll('.template').forEach(function (el) {
    that.templates[el.getAttribute('id')] = el;
  });

};

/* HEADER SCRIPTS */
Bookstore.prototype.viewHeader = function () {
  //grab clone of template header
  var header = document.querySelector('#main-header').cloneNode(true);
  var me = this;


  var cartButton = header.querySelector('#cart-btn');
  cartButton.addEventListener('click', function (event) {
    me.router.navigate('/cart');
  });
  
  var homeButton = header.querySelector('#home-btn');
  homeButton.addEventListener('click', function (event) {
    me.router.navigate('/');
  });
  // var accntButton = header.querySelector('#profile-btn');
  // accntButton.addEventListener('click', function(event) {
  //   me.router.navigate('/profile');

  var signupButton = header.querySelector('#signup-btn');
  signupButton.addEventListener('click', function(event) {
    me.router.navigate('/createAcc');
  });

  header.removeAttribute('hidden');
  this.replaceElement(document.querySelector('header'), header);
}

// STEVEN ---------------------
// Bookstore.prototype.viewProfile = function(doc) {
//   var profilePage = document.querySelector('#profile-page').cloneNode(true);

//   profilePage.removeAttribute('hidden');
//   this.replaceElement(document.querySelector('main'), profilePage);


//   //STEVEN ADD YOUR PROFILE PAGE CODE HERE
// }


/* HOME SCRIPTS */
Bookstore.prototype.viewHome = function (doc) {
  var homePage = document.querySelector('#home-page').cloneNode(true);

  homePage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), homePage);


  document.getElementById("home-books").innerHTML = "";
  var bookItems = document.getElementById("home-books");


  function renderRating(bookRating) {
    return bookRating;
    // Will turn double rating in DB to star representation
  }
  
  function renderCart() {
    var bookRow = document.createElement('div');
    bookRow.classList.add('cart-row');
    // TODO make routing work for pertaining books!
    var bookRowContents = `
                <div class="cart-item cart-column">
                  <i class="book-details-link" id="ZyeZCXscDEzIKRG7gqUJ">
                  <img class="item-image" src="${doc.get("Cover")}" width="100" height="200">
                  </i>
                </div>
                <div class="cart-description cart-column">
                  <span id="description">${"<i> " + doc.get("BookTitle") + "</i> By: " + doc.get("AuthorFn") + " " + doc.get("AuthorLn")}</span>
                </div>
                <span class="cart-price cart-column">
                  <span id ="item-price">$${doc.get("Price")}</span>
                </span>
                <div class="cart-quantity cart-column">
                  <span>${renderRating(doc.get("Rating"))}</span>
                </div>
              </div>
              </div>
            </div>`
    bookRow.innerHTML = bookRowContents

    var bookItems = document.getElementsByClassName('cart-items')[0];


    var bookDetails = bookRow.querySelector('.book-details-link');
    bookDetails.addEventListener('click', function () {
      bs.router.navigate('/book/' + bookDetails.id);
    });

    bookItems.append(bookRow);
  }
  renderCart();

  let bs = this;
  var bookDetails = homePage.querySelector('.book-details-link');
  bookDetails.addEventListener('click', function () {
    bs.router.navigate('/book/' + bookDetails.id);
  });

    document.getElementById("sortByGenre").addEventListener("click", function() {
        bs.router.navigate('/sortByGenre');
    });
    document.getElementById("sortByBestSellers").addEventListener("click", function() {
        bs.router.navigate('/sortByBestSellers');
    });
    document.getElementById("sortByRating").addEventListener("click", function() {
        bs.router.navigate('/sortByRating');
    });
    document.getElementById("sortByBookTitle").addEventListener("click", function() {
        bs.router.navigate('/');
    });
    document.getElementById("sortByAuthor").addEventListener("click", function() {
        bs.router.navigate('/sortByAuthor');
    });
    document.getElementById("sortByPrice").addEventListener("click", function() {
        bs.router.navigate('/sortByPrice');
    });
    // document.getElementById("sortByRelease").addEventListener("click", function() {
    //   bs.router.navigate('/sortByRelease');
    // });
}


// STEVEN ---------------------
Bookstore.prototype.viewCreateAcc = function(doc) {
    var createAccPage = document.querySelector('#createAcc-page').cloneNode(true);
    let me = this;
    createAccPage.querySelector(".create-acc-btn").addEventListener('click',function() {
        me.router.navigate("/")
    });
    // this.router.navigate("/");
    // const userInfo = document.querySelector('.profile-info');

    // const setupUser = (data) => {
    //     userInfo(snapshot.docs);
    // }

    createAccPage.removeAttribute('hidden');
    this.replaceElement(document.querySelector('main'), createAccPage);
}


Bookstore.prototype.viewProfile = function(doc) {
    var profilePage = document.querySelector('#profile-page').cloneNode(true);
    
    const userInfo = document.querySelector('.profile-info');

    const setupUser = (data) => {
        userInfo(snapshot.docs);
    }
    
    // if (document.readyState == 'loading') {
    //     document.addEventListener('DOMContentLoaded', ready)
    // } else {
    //     ready()
    // }
    profilePage.removeAttribute('hidden');
    this.replaceElement(document.querySelector('main'), profilePage);
}


Bookstore.prototype.viewCart = function (doc) {
  var cartPage = document.querySelector('#shopping-cart').cloneNode(true);

  cartPage.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), cartPage);

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }

  //Eventlistener constructors
  function ready() {
    //listener for remove cart item button
    var removeCartItemButtons = document.getElementsByClassName('btn-danger-cart')   //for btn-danger class
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {                      //loops through all buttons in cart
      var button = removeCartItemButtons[i]                                   //listener for 'click' event
      button.addEventListener('click', removeCartItem)
    }
    //listener for remove save item button
    var removeSavedItemButtons = document.getElementsByClassName('btn-danger-save')   //for btn-danger class
    console.log(removeSavedItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {                      //loops through all buttons in cart
      var button = removeCartItemButtons[i]                                   //listener for 'click' event
      button.addEventListener('click', removeSavedItem)
    }

    //listener for quantity field
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
    }

    //listener for add to cart button
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    //listener for purchase button
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

  }

  //function shows an alert and removes from HTML
  function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
  }

  // Function calls the updateCartTotal function when ONLY the remove button is clicked.
  // @param {*} event even when remove button is clicked
  function removeCartItem(event) {
    //gets item ID
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement.parentElement.parentElement;
    var ID = cartItem.getElementsByClassName("data-id")[0].innerText;

    
    let cartDocRef = promise.collection("cart");
    let allItems = cartDocRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          var deleteDoc =  cartDocRef.doc(ID).delete();
            });
          })
    updateCartTotal();
  }


  function removeSavedItem(event) {
    //gets item ID
    var buttonClicked = event.target
    var cartItem =buttonClicked.parentElement.parentElement.parentElement.parentElement;
    var ID = cartItem.getElementsByClassName("save-data-id")[0].innerText;

     
    let cartDocRef = promise.collection("save");
    let allItems = cartDocRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          var deleteDoc =  cartDocRef.doc(ID).delete();
            });
          })
    updateCartTotal();
  }

  // Checks if inputted value is an int greater than 1 and calls updateCartTotal.
  // @param {*} event used when quantity value is changed
  function quantityChanged(event) {
    var input = event.target                        
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1                             
    }
    updateCartTotal();                               
  }

  //Getter function that gets saved item to cart
  function addToCartClicked(event){
    //gets targeted item
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement.parentElement.parentElement;

    //gets elements from targeted item
    var ID = cartItem.getElementsByClassName("save-data-id")[0].innerText;
    var docTitle = cartItem.getElementsByClassName("save-book-title")[0].innerText;
    var docAuthor = cartItem.getElementsByClassName("save-author-name")[0].innerText;
    var docPrice = cartItem.getElementsByClassName("save-price")[0].innerText;
    var docImage = cartItem.getElementsByClassName("save-item-image")[0].src;


    addToCartDB(ID,docTitle,docAuthor,docPrice,docImage);     //function adds item elements to cart database
    removeSavedDBItem(ID);                                    //function removes item from save database
    cartItem.remove();                                        //removes HTML row from 'saved for later'
  }

  //Setter function that adds item elements to the cart database 
  function addToCartDB(ID, docTitle, docAuthor, docPrice, docImage){
    let cartDocRef = promise.collection("cart");
    //adds item to the database
    let addDoc = cartDocRef.add({
      title: docTitle,
      authorName: docAuthor,
      price: docPrice,
      image: docImage
    }).then(ID => {
      console.log('Added document with ID: ', ID.id);
    });
    //refresh cart somehow
  }

  //Removes item from database
  function removeSavedDBItem(ID){
    let saveDocRef = promise.collection("save")
    let allItems = saveDocRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        var deleteDoc =  saveDocRef.doc(ID).delete();
          });
        })
    updateCartTotal();
  }

  //Getter function that gets item and sends item to saved for later
  function saveForLaterClick(event){
    //gets proper item
    var buttonClicked = event.target
    var cartItem = buttonClicked.parentElement.parentElement.parentElement.parentElement;

    //gets and assigns the elements from row
    var ID = cartItem.getElementsByClassName("data-id")[0].innerText
    var docTitle = cartItem.getElementsByClassName("item-book-title")[0].innerText;
    var docAuthor = cartItem.getElementsByClassName("item-author-name")[0].innerText;
    var docPrice = cartItem.getElementsByClassName("item-price")[0].innerText;
    var docImage = cartItem.getElementsByClassName("item-image")[0].src;

    saveForLaterDB(ID, docTitle, docAuthor, docPrice, docImage);        //calls function to pass item to save collection
    removeCartItemDB(ID);                                               //removes item from cart database
    cartItem.remove();                                                  //removes item from cart HTML row

  }

  //Adds item to save collection in the database
  function saveForLaterDB(ID, docTitle, docAuthor, docPrice, docImage){
    //gets the path to the saved items
    let saveDocRef = promise.collection("save");
    //adds item to the database
    let addDoc = saveDocRef.add({
      title: docTitle,
      authorName: docAuthor,
      price: docPrice,
      image: docImage
    }).then(ID => {
      console.log('Added document with ID: ', ID.id);
    });
  }


  function removeCartItemDB(ID){
    //removes item from cart database
    let cartDocRef = promise.collection("cart");
    let allItems = cartDocRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          var deleteDoc =  cartDocRef.doc(ID).delete();
            });
          })
   updateCartTotal();
  }

  
  //renders all the items in the shopping cart section
  //@param is the documents in the cart
  function renderCart(doc) {
    //creates a new row
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row')
    var cartRowContents = `
                <div class="cart-item cart-column">
                <div class ="data-id" hidden>${doc.id}</div>
                  <img class="item-image" src="${doc.get("image")}" width="100" height="200">
                </div>
                <div class="cart-description cart-column">
                <span>
                <span class="item-book-title"><i>${doc.get("title")}</i></span> By:
                <span class="item-author-name">${doc.get("authorName") + " "}</span>
                </span>
                </div>
                <span class="cart-price cart-column">
                  <span id ="item-price">${doc.get("price")}</span>
                </span>
                <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" id="quant" type="number" value="1">
                  <ul style="list-style-type:none;">
                  <li>
                  <button class="btn btn-save cart-quantity-button"
                  type="button">SAVE FOR LATER</button>
                  <button class="btn btn-danger-cart cart-quantity-button"
                  type="button">REMOVE</button>
                  </li>
                  </ul>
                </div>
              </div>
              </div>
            </div>`
    //replaces items in the new cartrow object
    cartRow.innerHTML = cartRowContents
    var cartItems = document.getElementsByClassName('cart-items')[0];
    cartItems.append(cartRow);

    //eventlistener for removing/quantity/save
    cartRow.getElementsByClassName('btn-danger-cart')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    cartRow.getElementsByClassName('btn-save')[0].addEventListener('click', saveForLaterClick);
}


//renders all the saved for later items
//@param is the documents from the saved collection
function renderSave(doc) {
  var saveRow = document.createElement('div');
  saveRow.classList.add('save-row')
  var saveRowContents = `
              <div class="cart-item cart-column">
              <div class="save-data-id" hidden>${doc.id}</div>
                <img class="save-item-image" src="${doc.get("image")}" width="100" height="200">
              </div>
              <div class="cart-description cart-column">
                <span>
                <span class="save-book-title"><i>${doc.get("title")}</i></span> By:
                <span class="save-author-name">${doc.get("authorName") + " "}</span>
                </span>
              </div>
              <span class="cart-price cart-column">
                <span class="save-price">${doc.get("price")}</span>
              </span>
              <div class="cart-quantity cart-column">
                <ul style="list-style-type:none;">
                <li>
                <button class="btn btn-add cart-quantity-button"
                type="button">ADD TO CART</button>
                <button class="btn btn-danger-save cart-quantity-button"
                type="button">REMOVE</button>
                </li>
                </ul>
              </div>
            </div>
            </div>
          </div>`
  saveRow.innerHTML = saveRowContents;
  var saveItems = document.getElementsByClassName('saved-items')[0];
  saveItems.append(saveRow);

  saveRow.getElementsByClassName('btn-danger-save')[0].addEventListener('click', removeSavedItem);
  saveRow.getElementsByClassName('btn-add')[0].addEventListener('click', addToCartClicked);
}



// MAIN FUNCTIONS SHOPPING CART***

//global reference variables
var user = firebase.auth().currentUser;
var userUid = user.uid
let promise = firebase.firestore().collection('users').doc(userUid); 

//handles async calls
  function resolveAfter1Second(saveRef) {
    return new Promise(resolve => {
      setTimeout(() => {
        startSave(saveRef);
      }, 500);
    });
  }
  
  async function asyncCall() {
    let cartRef = promise.collection("cart");
    let saveRef = promise.collection("save");

    startCart(cartRef);
    var result = await resolveAfter1Second(saveRef);
  }
  
  asyncCall();

    //if there are items in the cart
    //get all cart documents and render
    function startCart(cartRef){
      if (cartRef != null){
        let cartItems = cartRef.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            renderCart(doc);
            updateCartTotal();
          });
        });
      }
    }
  
      //if there are items saved for later
      //get all saved items and render
      function startSave(saveRef){
        if (saveRef != null){
          let saveItems = saveRef.get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                renderSave(doc);
                updateCartTotal();
              });
            });
        }
      }

  // Function calculates cart total based on quantity and price
  function updateCartTotal(event) {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    //doesn't work for more than one item
    for (var i = 1; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = document.getElementById('item-price').innerHTML;
      var price = parseFloat(priceElement.replace('$',''));
      console.log(priceElement)
      var quantityElement = document.getElementById('quant').value;
      console.log(quantityElement);
      var quantity = quantityElement;
      total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
  }
}

/** BOOK DETAILS SCRIPTS **/
Bookstore.prototype.viewBookDetails = function (doc, booksByAuthor) {
  var bookDetails = document.querySelector('#book-details').cloneNode(true);


  bookDetails.removeAttribute('hidden');
  this.replaceElement(document.querySelector('main'), bookDetails);

  var bookCover = bookDetails.querySelector(".book-cover");
  bookCover.src = "http://localhost:5000/" + doc.get("Cover");

  var bookTitle = bookDetails.querySelector(".book-title");
  bookTitle.innerHTML = "<strong> Title: </strong>" + doc.get("BookTitle");

  var author = bookDetails.querySelector(".author-fn");
  author.innerHTML = "<strong> Author: </strong> " + doc.get("AuthorFn") + " " + doc.get("AuthorLn");

  var bookDesc = bookDetails.querySelector(".book-description");
  bookDesc.innerHTML = "<strong> Description: </strong> " + doc.get("BookDesc");

  var bookGenre = bookDetails.querySelector(".book-genre");
  bookGenre.innerHTML = "<strong> Genre: </strong> " + doc.get("Genre");

  var authorBio = bookDetails.querySelector(".author-bio");
  authorBio.innerHTML = "<strong> Biography: </strong> " + doc.get("AuthorBio");

  var publishDate = bookDetails.querySelector(".publish-date");
  publishDate.innerHTML = "<strong> Publish Date: </strong> " + doc.get("PublishDate");

  var publisher = bookDetails.querySelector(".publish-date");
  publisher.innerHTML = "<strong> Publisher: </strong> " + doc.get("Publisher");

  var price = bookDetails.querySelector(".price");
  price.innerHTML = "<strong> Price: </strong> " + doc.get("Price");

  var rating = bookDetails.querySelector(".rating");
  rating.innerHTML = "<strong> Rating: </strong> " + doc.get("Rating");

  var numSales = bookDetails.querySelector(".num-sales");
  numSales.innerHTML = "<strong> Number of Sales: </strong> " + doc.get("NumSales");
  
  //Modal
  var modal = bookDetails.querySelector("#myModal");
  var img = bookDetails.querySelector(".book-cover");
  var modalImg = bookDetails.querySelector("#img01");
  //var captionText = bookDetails.querySelector("#caption");
  img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = bookCover.src;
  }

  var span = bookDetails.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  }

  // Books being passed are:
  console.log(booksByAuthor)

  // Books by the same author
  var bookItems = document.getElementById("books-by-author");
  
  function renderBookRow(doc) {
    var bookRow = document.createElement('div');
    bookRow.classList.add('cart-row');
    var bookRowContents = `
                <div class="cart-item cart-column">
                  <img class="item-image" src="${doc.Cover}" width="100" height="200">
                </div>
                <div class="cart-description cart-column">
                  <span id="description">${"<i> " + doc.BookTitle + "</i> By: " + doc.AuthorFn + " " + doc.AuthorLn}</span>
                </div>
                <span class="cart-price cart-column">
                  <span id ="item-price">$${doc.Price}</span>
                </span>
                <div class="cart-quantity cart-column">
                  <span>${doc.Rating}</span>
                </div>
              </div>
              </div>
            </div>`
    bookRow.innerHTML = bookRowContents

    bookItems.append(bookRow);
  }

  booksByAuthor.forEach(book => {
    renderBookRow(book);
  });

  // End books by same author

  let bReviews = [];
  let reviewRef = this.db.collection("bookdetails").doc(doc.id).collection("Reviews");
  reviewRef.get().then(snapshot => {
    if(!snapshot.exists){
    }
    snapshot.forEach(review => {
      bReviews.push(review.data());
    });
    this.renderReviews(bReviews, bookDetails);
  });

  let reviewText = bookDetails.querySelector("#review-text");
  let submitBtn = bookDetails.querySelector("#submit-btn");
  let starRating = bookDetails.querySelector('.rate');
  let me = this;
  let exists = true;
  submitBtn.onclick = function() {
    //send review to database
    //update rating
    let list = starRating.querySelectorAll("input");
    console.log(list);
    for(let i = 0; i < 5; i++){

      if(list[i].checked){
        starRating.rating = 5 - i;
        break;
      }
    }

    if(starRating.rating == -1) {
      alert("Please add a star rating to your review");
    } else {
      let newReview = me.db.collection("bookdetails").doc(doc.id).collection("Reviews").add({
        Rating: starRating.rating,
        Text: reviewText.value
      });
      console.log("review added");
      console.log({
        rating: starRating.rating,
        reviewText: reviewText.value
      });

      reviewText.setAttribute("disabled", true);
      submitBtn.setAttribute("disabled", true);
    }
  };
}

Bookstore.prototype.renderReviews = function (bReviews, details_El) {
  let review_Container = document.createElement("div");
  let reviewID = 0;
  bReviews.forEach(review => {
    let review_El = details_El.querySelector(".filled-review").cloneNode(true);
    review_El.querySelector(".rated").setAttribute("rating", review.Rating);
    let index = 5;
    review_El.querySelectorAll(".rated label").forEach(rating => {
      rating.previousElementSibling.name = "rated-" + reviewID + "" + index;
      rating.setAttribute("for", rating.previousElementSibling.name);
      index--;
    });

    review_El.querySelectorAll("input").forEach(radio => {
        if(radio.getAttribute("value") == review_El.querySelector(".rated").getAttribute("rating")){
          radio.setAttribute("checked", "checked");
        }
      });

    review_El.querySelector(".filled-review-text").innerHTML = review.Text;
    review_El.removeAttribute("hidden");
    review_Container.appendChild(review_El);

    reviewID++;
  });
  details_El.querySelector(".filled-review-container").removeAttribute("hidden");
  details_El.querySelector(".filled-review-container").innerHTML = '';
  details_El.querySelector(".filled-review-container").appendChild(review_Container);
}
//TODO CLEANUP
Bookstore.prototype.renderTemplate = function (id, data) {
  var template = this.templates[id];
  var el = template.cloneNode(true);
  el.removeAttribute('hidden');
  this.render(el, data);
  return el;
}

Bookstore.prototype.render = function (el, data) {
  if (!data) {
    return;
  }

}

Bookstore.prototype.getDeepItem = function (obj, path) {
  path.split('/').forEach(function (chunck) {
    obj = obj[chunk];
  });
  return obj;
};


//USED FOR RENDERING;
Bookstore.prototype.replaceElement = function (parent, content) {
  parent.innerHTML = '';
  parent.append(content);
}
