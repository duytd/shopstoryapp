I18n.translations = I18n.translations || {};

$.extend(true, I18n.translations, {
  "ko": {
    "languages": {
      "korean": "한국어",
      "english": "EN"
    },
    "buttons": {
      "login": "로그인",
      "register": "가입하기",
      "logout": "로그아웃",
      "my_account": "마이 페이지"
    },
    "customers": {
      "login": {
        "title": "로그인",
        "fields": {
          "email": "이메일",
          "password": "비밀번호"
        },
        "texts": {
          "remember": "로그인 유지",
          "new_customer": "계정이 없으세요? "
        }
      },
      "register": {
        "title": "가입하기",
        "texts": {
          "return_customer": "계정이 이미 있으세요? "
        }
      },
      "account": {
        "title": "고객님의 정보",
        "orders": "주문내역",
        "bookings": "티켓 예매내역",
        "fields": {
          "order": "주문",
          "booking": "예매",
          "date": "날짜",
          "payment_status": "결제상태",
          "ticket_sent_at": "이메일 티켓 전송 시각",
          "status": "상태",
          "total": "합계"
        }
      },
      "order": {
        "customer_contact": "고객님의 연락처",
        "your_ticket": "고객님의 티켓",
        "your_order": "고객님의 주문",
        "total": "합계",
        "ticket_sent_at": "이메일 티켓 전송 시각",
        "booking_detail": "예매 상세정보",
        "shipping_address": "배송 주소",
        "billing_address": "주문 주소",
        "payment": "결제",
        "order_detail": "주문 상세정보"
      }
    },
    "categories": {
      "products": "상품"
    },
    "products": {
      "in_stock": "재고 있음",
      "out_of_order": "재고 없음",
      "add_to_cart": "장바구니에 추가"
    },
    "checkout": {
      "buttons": {
        "next": "다음",
        "place_order": "주문하기",
        "save": "저장",
        "cancel": "취소"
      },
      "texts": {
        "shipping_info": "배송 정보",
        "new_customer": "새 계정 만들기?",
        "returning_customer": "계정이 이미 있으세요?",
        "checkout_as_guest": "손님으로 주문하기",
        "or": "혹은",
        "thank_you": "감사합니다",
        "order_info": "고객님의 주문번호는 %{order_number}입니다",
        "delivery_info": "배송 소요기간은 약 %{delivery_range}일 입니다.(영업일기준)",
        "support": "문의사항은 %{email} 로 보내주세요"
      },
      "steps": {
        "billing": "청구 정보 및 주문 확인",
        "shipping": "배송"
      },
      "summary": {
        "title": "주문 정보",
        "subtotal": "상품 합계",
        "shipping": "배송료",
        "not_yet_calculated": "아직 계산되지 않았습니다."
      },
      "shipping": {
        "name": "이름",
        "first_name": "First name",
        "last_name": "Last name",
        "email": "이메일",
        "address1": "주소",
        "address2": "상세주소",
        "city": "시/군",
        "country": "국가",
        "state": "도",
        "zip_code": "우편번호",
        "phone_number": "전화번호",
        "fax": "팩스"
      },
      "billing": {
        "name": "이름",
        "first_name": "First name",
        "last_name": "Last name",
        "email": "이메일",
        "address1": "주소",
        "address2": "상세주소",
        "city": "시/군",
        "country": "국가",
        "state": "도",
        "zip_code": "우편번호",
        "phone_number": "전화번호",
        "fax": "팩스",
        "user_shipping_address": "청구지와 배송지가 같습니다."
      }
    },
    "cart": {
      "empty": "장바구니가 비어있습니다!",
      "subtotal": "상품 합계",
      "buy_now": "지금 구매",
      "continue_shopping": "쇼핑 계속하기",
      "remove": "삭제"
    }
  }
})
