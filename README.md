
# 🪙 Expense Tracker SaaS

A **clean, minimal expense tracking SaaS** that allows users to add, edit, delete transactions, manage category-wise budgets, and visualize spending with pie and bar charts.

Built with:
- **Next.js 14 App Router + TypeScript**
- **MongoDB with Mongoose**
- **Shadcn UI + Tailwind CSS**
- **Recharts** for clean data visualization
- **Sonner** for toasts

---

##  Features

-> Add, edit, delete transactions  
-> Category-wise budget setting & tracking  
-> Pie chart: Spending distribution by category  
-> Bar chart: Monthly category-wise expenses  
-> Mobile-friendly, clean UI  
-> Environment-based backend URL support  



##  Folder Structure

```bash
app/
  api/
    transaction/        # Transaction CRUD API routes
    budget/             # Budget CRUD API routes
components/
  BarComponent.tsx      # Bar chart
  CategoryBar.tsx       # Sidebar
  TransactionPage.tsx   # Transaction management UI
  ui/                   # Shadcn components
public/
styles/
````

---

##  Installation & Setup

### 1️ Clone the repository

```bash
git clone https://github.com/Sourav6971/PennyWise.git
```

### 2️ Install dependencies

```bash
npm install
```

### 3 Add environment variables

Create a `.env` file in the root:

```
MONGO_URL=<your_mongodb_uri>
```

### 4️ Run the development server

```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

##  API Endpoints

### Transactions

####  Add Transaction

* **POST** `/api/transaction`
* **Body:**

```json
{
  "amount": "1000",
  "description": "Groceries",
  "category": "food"
}
```

* **Response:** `{ "msg": "Transaction added!" }`

####  Get All Transactions

* **GET** `/api/transaction`
* **Response:** `{ "response": [ { _id, amount, description, category, updatedAt } ] }`

####  Update Transaction

* **PUT** `/api/transaction`
* **Body:**

```json
{
  "id": "transaction_id",
  "amount": "1200",
  "description": "Weekly Groceries",
  "category": "food"
}
```

* **Response:** `{ "msg": "Data updated!" }`

####  Delete Transaction

* **DELETE** `/api/transaction`
* **Body:**

```json
{
  "id": "transaction_id"
}
```

* **Response:** `{ "msg": "Transaction deleted!" }`

---

### Budgets

####  Set/Update Budget

* **POST** `/api/budget`
* **Body:**

```json
{
  "category": "utilities",
  "amount": "3000"
}
```

* **Response:** `{ "msg": "Budget updated successfully" }`

####  Get All Budgets

* **GET** `/api/budget`
* **Response:**

```json
{
  "response": {
    "housing": 2000,
    "utilities": 3000,
    "food": 4000,
    "transportation": 1500,
    "healthMedical": 1000
  }
}
```

---

## Usage Flow

1️⃣ Navigate to [http://localhost:3000](http://localhost:3000).
2️⃣ Add transactions using the **Add Transaction** form on the Home page.
3️⃣ Go to **Dashboard**:

* Set budgets per category.
* View spending vs budget progress bars.
* View spending distribution in a pie chart.
  4️⃣ View **Bar Chart** for monthly category-wise spending analysis.
  5️⃣ Edit or delete transactions easily.

---

## ✨ Contributing

Pull requests and feature improvements are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT

---

