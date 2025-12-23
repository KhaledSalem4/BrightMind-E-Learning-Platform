# 🚀 دليل التشغيل السريع - Angular Version

## ⚡ التشغيل السريع

### الخطوة 1: التثبيت (جاري الآن...)
```bash
npm install
```

### الخطوة 2: التشغيل
```bash
npm start
```
سيفتح على: **http://localhost:4200**

---

## 📁 الملفات الأساسية للتعديل

### 1. تعديل الصفحة الرئيسية
📄 `src/app/pages/home/home.component.html`

### 2. تعديل صفحة الدورات
📄 `src/app/pages/courses/courses.component.html`
📄 `src/app/services/courses.service.ts` (لتعديل بيانات الدورات)

### 3. تعديل شريط التنقل
📄 `src/app/components/navbar/navbar.component.html`

### 4. تعديل الأنماط العامة
📄 `src/styles.scss`
📄 `css/style.css` (الأنماط الأصلية)

---

## 🎨 كيف أعدّل؟

### تغيير نص في الصفحة الرئيسية:
```typescript
// في src/app/pages/home/home.component.html
<h1 class="display-4 fw-bold text-white mb-4">
  النص الجديد هنا!
</h1>
```

### إضافة دورة جديدة:
```typescript
// في src/app/services/courses.service.ts
{
  id: 13,
  title: 'دورة جديدة',
  description: 'وصف الدورة',
  category: 'web',
  level: 'Beginner',
  rating: 5.0,
  duration: '20 hours',
  students: 1000,
  price: 29.99,
  image: 'assets/images/new-course.jpg'
}
```

### تغيير الألوان:
```scss
// في src/styles.scss أو css/style.css
:root {
  --primary-color: #FF5733; // لونك الجديد
}
```

---

## 🐛 حل المشاكل

### المشكلة: `ng serve` لا يعمل
**الحل:**
```bash
npm install -g @angular/cli
ng serve
```

### المشكلة: الصور لا تظهر
**الحل:**
- تأكد أن الصور في `images/` (ستنسخ تلقائياً لـ `assets/images/`)
- أو ضعها في `src/assets/images/`

### المشكلة: خطأ في Bootstrap
**الحل:**
```bash
npm install bootstrap @fortawesome/fontawesome-free --save
```

---

## 📦 الأوامر المهمة

```bash
# التشغيل
npm start

# البناء للإنتاج
npm run build

# تشغيل الاختبارات
npm test

# إنشاء component جديد
ng generate component pages/my-page
# أو اختصار
ng g c pages/my-page
```

---

## ✨ المميزات الجديدة

### 1. Routing تلقائي
لا حاجة لملفات HTML منفصلة - كل شيء في تطبيق واحد!

### 2. فلترة تفاعلية
الدورات تُفلتر بدون تحديث الصفحة

### 3. نماذج تفاعلية
التحقق من البيانات تلقائياً

### 4. TypeScript
أخطاء أقل، كود أفضل!

---

## 🎓 للتعلم أكثر

1. **Angular Docs**: https://angular.dev/
2. **TypeScript**: https://www.typescriptlang.org/
3. **RxJS**: https://rxjs.dev/

---

**جاهز للانطلاق! 🚀**

بمجرد انتهاء `npm install`, شغّل `npm start` وافتح http://localhost:4200
