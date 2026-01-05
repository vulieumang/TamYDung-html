# Hướng Dẫn Sử Dụng Hiệu Ứng Logo và Hero Text

## Tổng Quan

Hiệu ứng bao gồm 2 phần chính:

1. **Hiệu ứng ánh sáng quét qua Logo** (Logo Shine Effect)
2. **Hiệu ứng ánh sáng quét qua chữ Hero** (Hero Text Light Sweep)

Cả hai hiệu ứng này tạo ra cảm giác sang trọng, hiện đại với hiệu ứng ánh sáng di chuyển từ trái sang phải.

---

## 1. Hiệu Ứng Logo Shine

### Mô tả
Hiệu ứng tạo một dải sáng màu trắng di chuyển qua logo theo góc nghiêng, lặp lại mỗi 5 giây.

### Bước 1: Thêm CSS Keyframes

Tạo file `keyframes.css` hoặc thêm vào file CSS hiện tại:

```css
/* Hiệu ứng ánh sáng di chuyển (cho Logo và các phần tử khác) */
@keyframes shineMove {
  0% {
    left: -100%;
  }

  100% {
    left: 200%;
  }
}
```

### Bước 2: Áp dụng CSS cho Logo

```css
.logo-tyd {
  position: relative;
  display: inline-block;
  overflow: hidden;           /* Quan trọng: ẩn phần ánh sáng tràn ra ngoài */
  vertical-align: middle;
}

.logo-tyd::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;                /* Vị trí bắt đầu ngoài màn hình bên trái */
  width: 50%;                 /* Độ rộng của dải sáng */
  height: 100%;
  
  /* Gradient tạo hiệu ứng ánh sáng */
  background: linear-gradient(
    to right, 
    transparent 0%,           /* Trong suốt ở 2 đầu */
    rgba(255, 255, 255, 0.8) 50%,  /* Trắng sáng ở giữa */
    transparent 100%
  );
  
  transform: skewX(-25deg);   /* Nghiêng dải sáng 25 độ */
  animation: shineMove 5s infinite;  /* Lặp lại mỗi 5 giây */
  pointer-events: none;       /* Không chặn các sự kiện click */
}
```

### Bước 3: Cấu trúc HTML

```html
<div class="logo-tyd">
  <a href="/">
    <img src="logo.svg" alt="logo" class="logo-tyd__img" />
  </a>
</div>
```

### Tùy Chỉnh

| Thuộc tính | Mô tả | Giá trị gợi ý |
|------------|-------|---------------|
| `animation` duration | Tốc độ hiệu ứng | 3s - 8s |
| `width` | Độ rộng dải sáng | 30% - 70% |
| `rgba(255, 255, 255, 0.8)` | Độ mờ/sáng | 0.5 - 1.0 |
| `transform: skewX()` | Góc nghiêng | -30deg đến -15deg |

---

## 2. Hiệu Ứng Hero Text Light Sweep

### Mô tả
Chữ hero sẽ có hiệu ứng ánh sáng quét liên tục qua các chữ, tạo hiệu ứng lung linh.

### Bước 1: Thêm CSS Keyframes

```css
/* Hiệu ứng quét sáng qua text */
@keyframes lightSweep {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
```

### Bước 2: Áp dụng CSS cho Hero Text

```css
.banner-title {
  position: absolute;
  
  /* Màu chữ cơ bản - thay đổi theo màu của web */
  color: var(--blue-chill-600);
  
  font-size: 56px;
  line-height: 64px;
  font-weight: normal;

  /* TẠO HIỆU ỨNG ÁNH SÁNG */
  /* Gradient bao gồm: màu gốc - màu gốc - trắng - màu gốc - màu gốc */
  background: linear-gradient(
    to right, 
    var(--blue-chill-600) 0%,      /* Màu gốc */
    var(--blue-chill-600) 45%,     /* Màu gốc */
    #ffffff 50%,                   /* Ánh sáng trắng ở giữa */
    var(--blue-chill-600) 55%,     /* Màu gốc */
    var(--blue-chill-600) 100%     /* Màu gốc */
  );
  
  background-size: 200% auto;      /* Quan trọng: để gradient di chuyển */
  
  /* Áp dụng gradient lên text */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Animation */
  animation: lightSweep 3s linear infinite;
}
```

### Bước 3: Cấu trúc HTML

```html
<div class="banner">
  <div class="container banner-wrapper">
    <img src="banner.png" alt="banner" class="banner-img" />
    
    <!-- Các dòng chữ hero -->
    <h1 class="banner-title banner-title__left">Nâng tầm nhận thức</h1>
    <h1 class="banner-title banner-title__right">Về sức khỏe & sắc đẹp</h1>
  </div>
</div>
```

### Tùy Chỉnh Cho Màu Khác

#### Ví dụ 1: Màu Vàng Gold
```css
.banner-title {
  color: #D4AF37;  /* Gold */
  
  background: linear-gradient(
    to right, 
    #D4AF37 0%,      /* Gold */
    #D4AF37 45%, 
    #FFFFFF 50%,     /* White shine */
    #D4AF37 55%, 
    #D4AF37 100%
  );
  
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: lightSweep 3s linear infinite;
}
```

#### Ví dụ 2: Màu Đỏ Burgundy
```css
.banner-title {
  color: #8B0000;  /* Dark Red */
  
  background: linear-gradient(
    to right, 
    #8B0000 0%, 
    #8B0000 45%, 
    #FFD700 50%,     /* Gold shine instead of white */
    #8B0000 55%, 
    #8B0000 100%
  );
  
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: lightSweep 3s linear infinite;
}
```

#### Ví dụ 3: Màu Xanh Navy
```css
.banner-title {
  color: #001F3F;  /* Navy */
  
  background: linear-gradient(
    to right, 
    #001F3F 0%, 
    #001F3F 45%, 
    #00CED1 50%,     /* Cyan shine */
    #001F3F 55%, 
    #001F3F 100%
  );
  
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: lightSweep 3s linear infinite;
}
```

### Tùy Chỉnh Tốc Độ và Hiệu Ứng

| Thuộc tính | Mô tả | Giá trị gợi ý |
|------------|-------|---------------|
| `animation` duration | Tốc độ quét | 2s - 5s |
| `background-size` | Kích thước gradient | 150% - 300% |
| Màu shine (50%) | Màu ánh sáng | `#ffffff`, `#FFD700`, màu sáng khác |
| % position (45%, 55%) | Độ rộng dải sáng | 40%-60% hoặc 45%-55% |

---

## 3. Hiệu Ứng Banner Image Shine (Bonus)

### Mô tả
Tạo hiệu ứng ánh sáng quét qua toàn bộ hình ảnh banner.

### CSS

```css
.banner-wrapper {
  position: relative;
  overflow: hidden;  /* Quan trọng */
}

.banner-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* Dải sáng chéo */
  background: linear-gradient(
    to right, 
    transparent 0%, 
    rgba(255, 255, 255, 0.4) 50%,  /* Độ mờ thấp hơn */
    transparent 100%
  );
  
  transform: skewX(-25deg) translateX(-150%);
  z-index: 10;
  pointer-events: none;
  animation: lightSweep 6s infinite;  /* Chậm hơn text */
}
```

---

## 4. Checklist Áp Dụng

Khi áp dụng cho website mới:

- [ ] Copy file `keyframes.css` hoặc thêm các `@keyframes` vào CSS
- [ ] Link file keyframes trong HTML: `<link href="keyframes.css" rel="stylesheet" />`
- [ ] Thay đổi màu sắc trong gradient để phù hợp với màu chủ đạo của website
- [ ] Điều chỉnh tốc độ animation (duration) nếu cần
- [ ] Kiểm tra hiển thị trên các trình duyệt khác nhau
- [ ] Kiểm tra hiệu suất trên mobile (có thể tắt animation trên mobile nếu lag)

---

## 5. Tips & Best Practices

### Performance
```css
/* Tối ưu hiệu suất trên mobile */
@media (max-width: 768px) {
  .logo-tyd::after,
  .banner-title {
    animation: none;  /* Tắt animation trên mobile */
  }
  
  .banner-title {
    -webkit-text-fill-color: currentColor;  /* Hiển thị màu bình thường */
  }
}
```

### Accessibility
```css
/* Tôn trọng người dùng muốn giảm chuyển động */
@media (prefers-reduced-motion: reduce) {
  .logo-tyd::after,
  .banner-title,
  .banner-wrapper::after {
    animation: none;
  }
  
  .banner-title {
    -webkit-text-fill-color: currentColor;
  }
}
```

### Tương Thích Trình Duyệt

Các prefix cần thiết:
```css
.banner-title {
  /* Chuẩn */
  background-clip: text;
  
  /* Webkit (Chrome, Safari, Edge mới) */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Firefox hỗ trợ từ version 49+ */
}
```

---

## 6. Ví Dụ Hoàn Chỉnh

### HTML
```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <link rel="stylesheet" href="keyframes.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Header with Logo -->
  <header class="header">
    <div class="logo-tyd">
      <a href="/">
        <img src="logo.svg" alt="Logo" />
      </a>
    </div>
  </header>
  
  <!-- Hero Banner -->
  <div class="banner">
    <div class="banner-wrapper">
      <img src="banner.png" alt="Banner" class="banner-img" />
      <h1 class="banner-title banner-title__left">Your Tagline</h1>
      <h1 class="banner-title banner-title__right">Subtitle Here</h1>
    </div>
  </div>
</body>
</html>
```

### CSS Tổng Hợp
```css
/* ===== KEYFRAMES ===== */
@keyframes shineMove {
  0% { left: -100%; }
  100% { left: 200%; }
}

@keyframes lightSweep {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ===== LOGO SHINE ===== */
.logo-tyd {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.logo-tyd::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
  transform: skewX(-25deg);
  animation: shineMove 5s infinite;
  pointer-events: none;
}

/* ===== HERO TEXT SHINE ===== */
.banner-title {
  /* Thay YOUR_COLOR bằng màu của bạn */
  color: #YOUR_COLOR;
  
  background: linear-gradient(
    to right, 
    #YOUR_COLOR 0%, 
    #YOUR_COLOR 45%, 
    #ffffff 50%, 
    #YOUR_COLOR 55%, 
    #YOUR_COLOR 100%
  );
  
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: lightSweep 3s linear infinite;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .logo-tyd::after,
  .banner-title {
    animation: none;
  }
  
  .banner-title {
    -webkit-text-fill-color: currentColor;
  }
}
```

---

## 7. Troubleshooting

### Vấn đề: Không thấy hiệu ứng
- ✅ Kiểm tra file `keyframes.css` đã được link chưa
- ✅ Kiểm tra chính tả của `@keyframes` name
- ✅ Kiểm tra `overflow: hidden` trên container

### Vấn đề: Chữ không hiển thị
- ✅ Kiểm tra có cả 2 dòng: `background-clip` và `-webkit-background-clip`
- ✅ Thử remove `-webkit-text-fill-color: transparent` để debug

### Vấn đề: Hiệu ứng quá nhanh/chậm
- ✅ Điều chỉnh `animation` duration (3s, 5s, 8s...)
- ✅ Thay `linear` bằng `ease-in-out` cho mượt hơn

---

## 8. Files Liên Quan Trong Dự Án

Trong dự án TYD HTML, các file liên quan:

- **Keyframes**: `/assets/css/keyframes.css` - Chứa các animations
- **Styles**: `/assets/css/style.css` - Áp dụng hiệu ứng cho logo và banner
- **HTML**: `index.html` - Cấu trúc HTML của banner và logo

---

## Kết Luận

Hai hiệu ứng này tạo nên sự khác biệt cho website với chi phí performance thấp. Chỉ cần:

1. Copy 2 `@keyframes`
2. Áp dụng CSS cho logo và hero text
3. Thay đổi màu sắc cho phù hợp

**Chúc bạn thành công!** 🎨✨

---

**Thiết kế và phát triển bởi: [Tiến Vũ](https://dinhtienvu.com)**
