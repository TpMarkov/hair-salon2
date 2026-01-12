# 🚀 Local SEO Optimization Plan: Hair Salon Lovech 5500

This plan is designed to help you reach the #1 page on Google for keywords like **"Фризьорски услуги Ловеч"** and **"Фризьорски салон Ловеч"**. Follow these steps to optimize your web application and local presence.

---

## 📍 1. Google Business Profile (The #1 Priority)
For local search, your Google Business Profile (GBP) is more important than your website.

- **Action:** [Create or Claim your business](https://www.google.com/business/).
- **Optimization:**
    - Use the Primary Category: **"Фризьорски салон"**.
    - Include **"Ловеч"** and **"5500"** in your address.
    - **Reviews:** Aim for at least 20+ 5-star reviews with text mentioning "фризьор" and "Ловеч".
    - **Photos:** Upload high-quality photos of your salon interior and work.

---

## 🛠️ 2. On-Page SEO (Frontend Code)
You need to tell Google exactly what your site is about using specific HTML tags.

### A. Meta Tags & Title (index.html)
Your `<title>` and `<meta description>` are the first things Google reads.
- **Title:** `Фризьорски Салон в Ловеч | Професионални Фризьорски Услуги`
- **Description:** `Най-добрият фризьорски салон в Ловеч (5500). Предлагаме подстригване, боядисване, официални прически и терапии за коса. Запишете час онлайн!`

### B. Header Hierarchy (H1, H2)
Ensure you have only **one** `<h1>` per page.
- **H1:** Should contain "Фризьорски салон" and "Ловеч". (You already did this in `Header.jsx`! Great job).
- **H2:** Use for services: `## Нашите Фризьорски Услуги в Ловеч`.

### C. Image Alt Tags
Search engines can't "see" images. You must describe them.
- **Change:** For every `<img>` tag, update the `alt` attribute.
- **Example:** `alt="Мъжко подстригване в Ловеч - Фризьорски салон [Име]"`

---

## 🤖 3. Schema Markup (LocalBusiness JSON-LD)
This is "secret code" that speaks directly to the Google Algorithm. It helps you appear in the "Map Pack".

- **Action:** Add this script to your `index.html` inside the `<head>` tag:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Вашият Салон Име",
  "image": "https://вашият-сайт.com/logo.png",
  "@id": "",
  "url": "https://вашият-сайт.com",
  "telephone": "+359XXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Вашата Улица",
    "addressLocality": "Ловеч",
    "postalCode": "5500",
    "addressCountry": "BG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.137,
    "longitude": 24.711
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    "opens": "09:00",
    "closes": "19:00"
  },
  "priceRange": "$$"
}
</script>
```

---

## 🌍 4. Content Strategy (The "Bulgaria/Lovech" Focus)
Google rewards sites that are deeply relevant to their local area.

- **NAP Consistency:** Your **N**ame, **A**ddress, and **P**hone number must be EXACTLY the same on your website footer, your Google Business Profile, and Facebook.
- **Local Keywords:** Use "Ловеч" naturally throughout the text.
    - *Bad:* "Ние предлагаме подстригване."
    - *Good:* "Търсите професионално подстригване в Ловеч? Нашият салон в центъра на града..."
- **Internal Linking:** Link your service cards back to a main "Services" page (if you create one) using keywords like "фризьорски услуги Ловеч".

---

## ⚡ 5. Technical SEO & Performance
- **Mobile First:** Google uses the mobile version of your site for ranking. Keep using the Tailwind responsive classes (`md:`, `lg:`).
- **Page Speed:** Since you use many images, implement **Lazy Loading**.
    - **Action:** Add `loading="lazy"` to all your images in `ServicesList.jsx` and `ServicesMenu.jsx`.
- **Favicon:** Ensure you have a custom favicon.ico in your `public` folder.

---

## 🏆 Checklist for You to Follow:
- [ ] Update `<title>` and `<meta>` in `frontend/index.html`.
- [ ] Add **JSON-LD Schema** to `frontend/index.html`.
- [ ] Add `loading="lazy"` to all `<img>` tags.
- [ ] Ensure the Footer has your full address: `ул. [Име], Ловеч 5500, България`.
- [ ] Create/Update Google Business Profile.
- [ ] Link your Instagram/Facebook to the website.

---
> [!TIP]
> **Pro Tip:** Register your salon in local Bulgarian directories like `goldenpages.bg` or `alo.bg`. These "backlinks" from Bulgarian sites significantly boost your local authority.
