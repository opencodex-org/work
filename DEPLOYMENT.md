# Production deployment

هذا المستودع يحتوي على تطبيق Flask جاهز للتشغيل بواسطة Gunicorn.

## التشغيل محليًا

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python sa.py
```

افتح `http://localhost:5000`، وفحص الحالة من `http://localhost:5000/health`.

## تشغيل فعلي على Render

1. أنشئ حسابًا في Render واربطه بحساب GitHub.
2. اختر مستودع `opencodex-org/work` واضغط **New Web Service**، أو استخدم ملف `render.yaml` عبر **Blueprint**.
3. تأكد أن أمر البناء هو `pip install -r requirements.txt` وأمر التشغيل هو الموجود في `Procfile`.
4. بعد نجاح النشر، من إعدادات الخدمة اختر **Custom Domains** وأضف `workopencodex.sa`.
5. في لوحة تحكم مزود نطاق `.sa` أضف سجل `CNAME` الذي يعطيه Render (غالبًا إلى عنوان `onrender.com`). لا تضف سجلًا متعارضًا بالاسم نفسه.
6. انتظر التحقق من DNS وتفعيل HTTPS، ثم اختبر:

```text
https://workopencodex.sa/
https://workopencodex.sa/health
```

ملف `render.yaml` يجهز الخدمة، لكنه لا يستطيع وحده إنشاء حساب Render أو تعديل DNS؛ هذه الخطوات تتطلب صلاحية حساب الاستضافة ومالك النطاق.
