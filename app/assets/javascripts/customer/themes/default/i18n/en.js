I18n.translations = I18n.translations || {};

$.extend(true, I18n.translations, {
  "en": {
    "languages": {
      "korean": "KO",
      "english": "EN"
    },
    "buttons": {
      "login": "Log in",
      "register": "Create account",
      "logout": "Log out",
      "my_account": "My account",
      "accept": "Accept",
      "decline": "Decline"
    },
    "customers": {
      "login": {
        "title": "Login",
        "fields": {
          "email": "Email",
          "password": "Password"
        },
        "texts": {
          "remember": "Remember me",
          "new_customer": "New Customer? "
        }
      },
      "register": {
        "title": "Register",
        "fields": {
          "term": "Terms and conditions",
          "privacy": "Privacy"
        },
        "texts": {
          "return_customer": "Returning Customer? "
        }
      },
      "account": {
        "title": "Your account",
        "orders": "Orders",
        "bookings": "Ticket Bookings",
        "fields": {
          "order": "Order",
          "booking": "Booking",
          "date": "Date",
          "payment_status": "Payment Status",
          "ticket_sent_at": "Ticket Sent At",
          "status": "Status",
          "total": "Total"
        }
      },
      "order": {
        "customer_contact": "Customer Contact",
        "your_ticket": "Your ticket",
        "your_order": "Your order",
        "total": "Total",
        "ticket_sent_at": "Ticket Sent At",
        "booking_detail": "Booking Detail",
        "shipping_address": "Shipping Address",
        "billing_address": "Billing Address",
        "payment": "Payment",
        "order_detail": "Order Detail"
      }
    },
    "categories": {
      "products": "products"
    },
    "products": {
      "featured_products": "Featured Products",
      "in_stock": "In Stock",
      "out_of_order": "Out of order",
      "add_to_cart": "Add To Cart"
    },
    "checkout": {
      "buttons": {
        "next": "Next",
        "place_order": "Place Order",
        "save": "Save",
        "cancel": "Cancel"
      },
      "texts": {
        "shipping_info": "Shipping Information",
        "new_customer": "New Customer",
        "returning_customer": "Returning Customer?",
        "checkout_as_guest": "Checkout As Guest",
        "or": "or",
        "thank_you": "Thank You",
        "order_info": "Your order number is %{order_number}",
        "payment_info": "Please complete your purchase by making a deposit to the below bank account within 24 hours.
Your order will be confirmed immediately after the payment has been made",
        "delivery_info": "Delivery time is within %{delivery_range} business days",
        "support": "Email us at %{email} if you have any questions"
      },
      "steps": {
        "billing": "Billing and Review Order",
        "shipping": "Shipping"
      },
      "summary": {
        "title": "Order Summary",
        "subtotal": "Subtotal",
        "shipping": "Shipping",
        "not_yet_calculated": "Not yet calculated"
      },
      "shipping": {
        "name": "Name",
        "first_name": "First name",
        "last_name": "Last name",
        "email": "Email",
        "address1": "Address",
        "address2": "Alternative Address",
        "city": "City",
        "country": "Country",
        "state": "State/Province",
        "zip_code": "Zip/Postal Code",
        "phone_number": "Phone Number",
        "alternative_phone": "Alternative Number",
        "fax": "Fax",
        "delivery_message": "Delivery Message"
      },
      "billing": {
        "name": "Name",
        "first_name": "First name",
        "last_name": "Last name",
        "email": "Email",
        "address1": "Address",
        "address2": "Alternative Address",
        "city": "City",
        "country": "Country",
        "state": "State/Province",
        "zip_code": "Zip/Postal Code",
        "phone_number": "Phone Number",
        "alternative_phone": "Alternative Number",
        "fax": "Fax",
        "user_shipping_address": "Use Shipping Address"
      }
    },
    "cart": {
      "title": "Your cart (%{item_count})",
      "empty": "It appears that your cart is currently empty!",
      "subtotal": "Subtotal",
      "buy_now": "Buy now",
      "continue_shopping": "Continue shopping",
      "remove": "Remove"
    },
    "pagination": {
      "first": "First",
      "last": "Last",
      "previous": "Previous",
      "next": "Next",
      "showing": "Showing %{size} of %{total} products"
    },
    "filter": {
      "all": "All",
      "vendor_filter": "Vendor Filter",
      "price_filter": "Price Filter"
    },
    "sorter": {
      "title": "Sort Product By",
      "name_asc": "Name (Z-A)",
      "name_desc": "Name (A-Z)",
      "price_asc": "Price (Low-High)",
      "price_desc": "Price (High-Low)"
    }
  }
})
