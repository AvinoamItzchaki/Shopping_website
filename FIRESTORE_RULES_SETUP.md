# Fix "Missing or insufficient permissions" (Firestore)

Your app uses **custom login** (username/password in the `RegisteredPeople` collection), not Firebase Authentication. So to Firestore, every request is **unauthenticated**. If your rules require `request.auth != null`, they will all be denied.

## What to do in Firebase Console

1. Open **[Firebase Console](https://console.firebase.google.com)** → select project **task3shop**.
2. In the left sidebar go to **Build** → **Firestore Database**.
3. Open the **Rules** tab.
4. Replace the rules with one of the options below.

---

### Option A – Get it working (permissive, OK for learning / non-sensitive data)

Use this so your app can read/write without Firebase Auth:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Click **Publish**. Your Registration and other Firestore features should work.

**Note:** Anyone who has your project’s config can read/write your Firestore data. Fine for local/dev or non-sensitive projects; not for real user data or production.

---

### Option B – Safer later (Firebase Authentication)

To lock things down properly you’d:

- Use **Firebase Authentication** (e.g. Email/Password) instead of storing passwords in `RegisteredPeople`.
- In Rules, use `request.auth != null` (and optionally `request.auth.uid` / custom claims).

That requires code changes; Option A is enough to fix the current error.

---

After you **Publish** the rules, wait a few seconds and try Registration again (refresh the app if needed).
