import os
from flask import Flask, jsonify, redirect, request

app = Flask(__name__)

DOMAIN = "workopencodex.sa"


@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


@app.route("/")
def home():
    return """
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="موقع workopencodex.sa يعمل باستخدام Flask">
    <title>workopencodex.sa</title>
    <style>
        :root { color-scheme: dark; }
        body { margin:0; min-height:100vh; display:grid; place-items:center; font-family:Arial,sans-serif; background:radial-gradient(circle at 20% 0,#164e63,transparent 40%),#0f172a; color:white; }
        .box { width:min(600px,80%); padding:42px; text-align:center; background:#1e293b; border:1px solid #334155; border-radius:18px; box-shadow:0 24px 80px #0006; }
        h1 { color:#38bdf8; margin-top:0; } p { color:#cbd5e1; line-height:1.8; }
        a { display:inline-block; margin-top:20px; padding:12px 24px; background:#2563eb; color:white; text-decoration:none; border-radius:8px; }
        a:hover { background:#1d4ed8; }
        code { color:#67e8f9; }
    </style>
</head>
<body>
    <main class="box">
        <h1>مرحبًا بك في موقعنا</h1>
        <p>الموقع يعمل الآن باستخدام Python و Flask.</p>
        <p>النطاق: <code>workopencodex.sa</code></p>
        <a href="/health">فحص السيرفر</a>
    </main>
</body>
</html>
"""


@app.route("/health")
def health():
    return jsonify(status="online", message="السيرفر يعمل بنجاح", domain=DOMAIN)


@app.route("/api/info")
def info():
    return jsonify(service="workopencodex.sa", framework="Flask", environment=os.getenv("FLASK_ENV", "production"))


@app.errorhandler(404)
def not_found(_error):
    return jsonify(error="not_found", message="المسار غير موجود"), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
