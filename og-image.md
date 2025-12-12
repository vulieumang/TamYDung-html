# OG Image Generation Guide for WiTi.VN

This document provides the source code and instructions to recreate the standard Glassmorphism OG Image for WiTi.VN.

## Design Aesthetic
- **Style**: Minimum Glassmorphism + Liquid.
- **Background**: Deep gradient overlaid with `og-image.png` (abstract shapes).
- **Typography**: 'Outfit', Google Fonts.
- **Colors**:
    - Primary: `#4facfe`
    - Secondary: `#00f2fe`
    - Text: White

## HTML/CSS Template
Save this code as a `.html` file (e.g., `custom-og.html`) in the same folder as `og-image.png` and `witi.vn_.svg`.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OG Image Template</title>
    <!-- Replace with your fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap" rel="stylesheet" />
    <link href="https://fonts.cdnfonts.com/css/roslindale" rel="stylesheet">
    <style>
        :root {
            /* Brand Colors - Customize here */
            --primary: #00afc4;
            --secondary: #00ddea;
            --dark: #0e5b6b;
            --text-color: #ffffff;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            width: 1200px;
            height: 630px;
            font-family: 'Dosis', sans-serif; /* Update font */
            
            /* Gradient Background */
            background: linear-gradient(135deg, var(--dark) 0%, var(--primary) 100%);
            
            display: flex;
            flex-direction: column;
            align-items: center;
            
            /* Spacing Strategy: 50px padding, space-between content */
            padding: 50px; 
            
            position: relative;
            color: var(--text-color);
            overflow: hidden;
            
            /* Aesthetic cutting guide border - helps align screenshot */
            border: 2px dashed rgba(255, 255, 255, 0.3); 
        }

        /* Glassmorphism Overlay Circles for flair */
        .circle {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            z-index: 0;
        }
        .circle-1 { width: 400px; height: 400px; top: -100px; left: -100px; background: rgba(255, 255, 255, 0.1); }
        .circle-2 { width: 300px; height: 300px; bottom: -50px; right: -50px; background: rgba(255, 255, 255, 0.05); }

        .content {
            position: relative;
            z-index: 10;
            text-align: center;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between; /* Spreads Logo, Title, Description */
        }

        .logo-area {
            /* Top Element */
        }
        
        .main-logo {
            height: 140px;
            filter: brightness(0) invert(1); /* Make white if black logo */
        }
        
        h1 {
            /* Middle Element */
            font-family: 'Roslindale', serif; /* Update font */
            font-size: 70px;
            font-weight: 400;
            font-style: italic;
            
            /* Gradient Text Effect */
            background: linear-gradient(90deg, #fff, var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            
            text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            margin: 0; 
            line-height: 1.2;
        }

        .divider {
            width: 120px;
            height: 4px;
            background: var(--secondary);
            border-radius: 2px;
            margin: 0 auto;
        }

        /* Bottom Element: Glassmorphism Box */
        .description-box {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 30px 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .description-box p {
            font-size: 24px;
            line-height: 1.6;
            color: #e0fbfc;
            font-weight: 300;
        }

        .description-box strong {
            color: var(--white);
            font-weight: 700;
            text-transform: uppercase;
        }

        /* --- Option 2: Features Grid Style --- */
        .features-grid {
            display: flex;
            justify-content: center;
            gap: 40px;
            width: 100%;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 25px 20px;
            border-radius: 20px;
            width: 280px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
            font-size: 40px;
            margin-bottom: 15px;
            color: var(--secondary);
            background: rgba(255, 255, 255, 0.1);
            width: 70px; height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }

        .feature-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        .feature-desc {
            font-size: 18px;
            color: #e0fbfc;
            font-weight: 400;
        }
    </style>
</head>
<body>
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>

    <div class="content">
        <!-- 1. Logo (Top) -->
        <div class="logo-area">
            <img src="./path/to/logo.svg" class="main-logo" alt="Logo">
        </div>
        
        <!-- 2. Main Title (Middle) -->
        <div>
            <div class="divider"></div>
            <h1>Slogan Or Main Title <br> Here</h1>
        </div>

        <!-- Option 1: Description (Bottom) -->
        <div class="description-box">
            <p>
                Short description about the brand or website. <br>
                Highlight key <strong>Services</strong> or <strong>Values</strong>.
            </p>
        </div>

        <!-- Option 2: 3 Services Grid (Uncomment to use) -->
        <!--
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-star"></i></div>
                <div class="feature-title">Feature 1</div>
                <div class="feature-desc">Detail Here</div>
            </div>

            <div class="feature-card" style="border-color: var(--secondary); box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);">
                <div class="feature-icon"><i class="fas fa-heart"></i></div>
                <div class="feature-title">Feature 2</div>
                <div class="feature-desc">Highlight</div>
            </div>

            <div class="feature-card">
                <div class="feature-icon"><i class="fas fa-check"></i></div>
                <div class="feature-title">Feature 3</div>
                <div class="feature-desc">Detail Here</div>
            </div>
        </div>
        -->
    </div>
</body>
</html>
```

## How to Capture
1.  Open the `.html` file in a browser (e.g., Chrome).
2.  Use **DevTools** (F12) > `Toggle Device Toolbar`.
3.  Set resolution to **1200 x 630**.
4.  Capture screenshot.
5.  Save as `og-image.png`.
