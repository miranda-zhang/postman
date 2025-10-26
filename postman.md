# Postman

Install postman or Poatman vscode extension.
##
Yes! You **can absolutely get an OAuth2 token with Postman** using the credentials you described. Here’s how to do it step by step:

---

### **1. Create a new request in Postman**

* Method: **POST**
* URL: `https://api.banked.com/oauth/token`

---

### **2. Set up Authorization**

* Go to the **Authorization** tab.
* Type: **Basic Auth**
* Username: `bk_live_1234567890abcdef` (your API Key)
* Password: `sk_live_abcdef1234567890` (your Secret Key)

Postman will automatically generate the `Authorization: Basic ...` header for you.

---

### **3. Set up Body**

* Go to the **Body** tab.
* Choose **x-www-form-urlencoded**.
* Add a key-value pair:

| Key        | Value              |
| ---------- | ------------------ |
| grant_type | client_credentials |

---

### **4. Send the request**

* Click **Send**.
* You should get a JSON response like:

```json
{
  "access_token": "your_access_token_here",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

### **5. Use the token**

* Copy the `access_token`.
* For future API calls, go to the **Authorization** tab, choose **Bearer Token**, and paste the token.

---

💡 **Tip:** You can also automate token retrieval in Postman using **Pre-request Scripts** to generate tokens dynamically and store them in environment variables.



## pmlib
Download the lib from

https://joolfe.github.io/postman-util-lib/

Use the "Automatic Setup" by download
https://github.com/joolfe/postman-util-lib/blob/master/postman/PostmanUtilityLibv21.postman_collection.json

Then import collection, run **Lib install**.

### 🧩 **Where to add a Pre-request Script in the VS Code Postman extension**

1. **Open the Postman extension in VS Code**

   * Either click on the **Postman icon** on the left sidebar,
     or open the **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run
     `Postman: Open Postman`.

2. **Create or open a request**

   * Click **New Request**, or open an existing one in a collection.

3. **Go to the "Scripts" tab**

   * At the top of the request editor, you’ll see tabs like:

     ```
     Params | Headers | Body | Tests | Scripts
     ```
   * Click **Scripts** — that’s where both **Pre-request** and **Test** scripts live.

4. **Select “Pre-request Script”**

   * You’ll see two panels or dropdown options:

     * **Pre-request Script** (runs before the request)
     * **Test Script** (runs after the response)
   * Choose **Pre-request Script**.

6. **Save** the request and run it.

---
## Add private key t script
```bash
node pem-to-js-string.js ~/Documents/workspace/credential/paybybank/api-signing-private-key.pem
```

## 🧩 **Add environment variables in the Postman VS Code extension**

### 1️⃣ Open Postman in VS Code

* Open the **Postman** panel (click the **Postman** icon on the left sidebar).
* Or run from Command Palette:

  ```
  Ctrl + Shift + P → “Postman: Open Postman”
  ```

---

### 2️⃣ Create or select an environment

1. In the Postman panel, look for the **Environments** tab in the left sidebar.
   (If you don’t see it, click the “Postman” logo → “Collections / Environments”.)
2. Click **New Environment** (the **+** icon).
3. Give it a name, e.g. `Local Testing` or `Banked API`.

---

### 3️⃣ Add variables

Inside that environment editor, you’ll see a table with columns like:

| Variable | Initial Value | Current Value | Type |
| -------- | ------------- | ------------- | ---- |

Add two new rows:

| Variable      | Initial Value                    | Current Value                    |
| ------------- | -------------------------------- | -------------------------------- |
| `idempotency` | (leave blank or add placeholder) | (leave blank or add placeholder) |
| `signature`   | (leave blank for now)            | (leave blank for now)            |

💡 You can set these dynamically from a **pre-request script** later, e.g.:

```js
pm.environment.set("idempotency", crypto.randomUUID());
pm.environment.set("signature", mySignatureValue);
```

---

### 4️⃣ Save the environment

* Click **Save** (top right).
* Make sure this environment is **active** — you’ll see it in the top-right of the request tab (like a dropdown menu showing the current environment).

---

### 5️⃣ Use them in your requests

You can now reference those variables anywhere using Postman syntax:

```http
POST /api/payments HTTP/1.1
Idempotency-Key: {{idempotency}}
Signature: {{signature}}
```

---

✅ **Tip:**
If you plan to generate these values automatically (for example, compute a JWS signature before each request), you can do it with a **Pre-request Script** like:

```js
const uuid = crypto.randomUUID();
pm.environment.set("idempotency", uuid);

// Example signing (pseudo):
// const signature = signPayload(pm.request.body.raw, privateKey);
pm.environment.set("signature", "dummy_signature_value");
```

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```