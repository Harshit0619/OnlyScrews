# 🗄️ Database Setup Guide - OnlyScrews

## Production-Ready PostgreSQL Database Integration

Your application now uses **Neon PostgreSQL** database with **Prisma ORM** for type-safe database access.

---

## 📊 Database Schema

### Tables Created:

1. **main_categories** - Top-level categories (Screws, Bolts, Washers, etc.)
2. **categories** - Sub-categories (Machine Screws, Hex Bolts, etc.)
3. **subcategories** - Product types (Allen Screws, Hex Bolt, etc.)
4. **products** - Individual products with specifications

### Current Data:

- ✅ 11 Main Categories
- ✅ 16 Categories
- ✅ 74 Subcategories
- ✅ 7 Products (types)

---

## 🚀 Quick Start Commands

### 1. Generate Prisma Client

```powershell
npx prisma generate
```

### 2. Push Schema to Database

```powershell
npx prisma db push
```

### 3. Seed Database

```powershell
npm run prisma:seed
```

### 4. Open Prisma Studio (Database GUI)

```powershell
npm run prisma:studio
```

---

## 📁 Important Files

| File                                  | Purpose                             |
| ------------------------------------- | ----------------------------------- |
| `prisma/schema.prisma`                | Database schema definition          |
| `prisma/seed.ts`                      | Database seeding script             |
| `lib/prisma.ts`                       | Prisma client singleton             |
| `app/api/products/hierarchy/route.ts` | API endpoint (now uses database)    |
| `.env`                                | Database credentials (DATABASE_URL) |

---

## 🔧 Available Scripts

```json
"prisma:generate": "prisma generate"         // Generate Prisma Client
"prisma:migrate": "prisma migrate dev"       // Create migrations
"prisma:seed": "tsx prisma/seed.ts"         // Seed database
"prisma:studio": "prisma studio"             // Open database GUI
"db:push": "prisma db push"                  // Push schema changes
"db:seed": "npm run prisma:generate && npm run prisma:seed"
```

---

## 🏭 Production Deployment

### Before Deploying to Netlify:

1. **Ensure DATABASE_URL is set in environment**

   ```env
   DATABASE_URL="postgresql://..."
   ```

2. **Generate Prisma Client in build**
   - Already configured in `package.json` build script
3. **Run migrations/push**

   ```powershell
   npx prisma db push
   ```

4. **Seed production database**
   ```powershell
   npm run prisma:seed
   ```

### Netlify Environment Variables:

1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add: `DATABASE_URL` = ``

---

## 📝 Adding New Products

### Option 1: Via Prisma Studio (GUI)

```powershell
npm run prisma:studio
```

- Navigate to http://localhost:5555
- Click on any table to add/edit/delete records

### Option 2: Via Seed Script

1. Edit `lib/productHierarchy.ts`
2. Add your products to the hierarchy
3. Run:
   ```powershell
   npm run prisma:seed
   ```

### Option 3: Programmatically

```typescript
import { prisma } from "@/lib/prisma";

// Create a new product
await prisma.product.create({
  data: {
    name: "M6 Allen Screw",
    slug: "m6-allen-screw",
    subcategoryId: "...",
    price: 5.99,
    stock: 100,
  },
});
```

---

## 🔍 Querying the Database

### Get All Products

```typescript
const products = await prisma.product.findMany({
  include: {
    subcategory: {
      include: {
        category: {
          include: {
            mainCategory: true,
          },
        },
      },
    },
  },
});
```

### Get Product Hierarchy

```typescript
const hierarchy = await prisma.mainCategory.findMany({
  include: {
    categories: {
      include: {
        subcategories: {
          include: {
            products: true,
          },
        },
      },
    },
  },
});
```

---

## 🛡️ Database Security

### ✅ Already Configured:

- Connection pooling (Neon)
- SSL/TLS encryption
- Environment variable protection
- Prepared statements (SQL injection prevention)

### 🔒 Best Practices:

1. **Never** commit `.env` file to git (already in `.gitignore`)
2. Use **environment variables** for all credentials
3. Enable **database backups** in Neon dashboard
4. Use **connection pooling** for serverless deployments
5. Monitor **query performance** in production

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"

```powershell
# Check if DATABASE_URL is set
echo $env:DATABASE_URL

# Test database connection
npx prisma db push
```

### Error: "Prisma Client not generated"

```powershell
npx prisma generate
```

### Error: "Migration failed"

```powershell
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Or use db push for prototyping
npx prisma db push
```

---

## 📈 Next Steps

### 1. Add Product Images

Update schema:

```prisma
model Product {
  // ...
  imageUrl  String?
  images    String[]
}
```

### 2. Add Inventory Management

```prisma
model Product {
  // ...
  stock     Int      @default(0)
  lowStockAlert Int? @default(10)
}
```

### 3. Add Product Reviews

```prisma
model Review {
  id        String   @id @default(cuid())
  rating    Int
  comment   String?
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())
}
```

### 4. Add Search Functionality

```typescript
const results = await prisma.product.findMany({
  where: {
    OR: [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ],
  },
});
```

---

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Next.js + Prisma Guide](https://www.prisma.io/nextjs)
- [Database Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

---

## ✅ Migration Checklist

- [x] PostgreSQL database connected (Neon)
- [x] Prisma schema created
- [x] Database tables created
- [x] All 11 main categories seeded
- [x] 74 subcategories populated
- [x] API routes updated to use database
- [x] Type-safe queries with Prisma
- [x] Production-ready configuration
- [ ] Deploy to Netlify
- [ ] Add product images
- [ ] Implement product search
- [ ] Add admin panel

---

**🎉 Your database is now production-ready!**
