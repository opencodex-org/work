from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return """
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>موقع .sa</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: white;
            text-align: center;
            padding-top: 120px;
        }

        .box {
            width: 80%;
            max-width: 600px;
            margin: auto;
            padding: 40px;
            background: #1e293b;
            border-radius: 15px;
        }

        h1 {
            color: #38bdf8;
        }

        a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="box">
        <h1>مرحبًا بك في موقعنا</h1>
        <p>الموقع يعمل باستخدام Python و Flask.</p>
        <p>النطاق: workopencodex.sa</p>
        <a href="/health">فحص السيرفر</a>
    </div>
</body>
</html>
"""


@app.route("/health")
def health():
    return {
        "status": "online",
        "message": "السيرفر يعمل بنجاح"
    }


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
