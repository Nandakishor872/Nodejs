

// // --------------------  Save Api ------------------------
// export class ProductService {
//   // Step 1: Validation Helper
//   static validateProduct(dto: ProductDto) {
//     if (!dto.name || dto.name.trim() === "") {
//       throw new Error("Product name is required,Are required fields present? Are values valid?");
//     }
//     if (dto.price === undefined || dto.price < 0) {
//       throw new Error("Price cannot be negative");
//     }
//   }

//   // Step 2: The Save Business Logic
//   static async SaveProduct(dto: ProductDto): Promise<ResponseType> {
//     const db = session_db();
//     const loggerInstance = logger();

//     try {
//       // 1. Validate incoming data
//       this.validateProduct(dto);

//       // 2. Add audit fields (who did this and when)
//       const currentUser = session_user()?.id ?? "system";
//       const now = new Date();

//       let savedProduct;

//       // 3. Decide: UPDATE or INSERT
//       if (dto.id) {
//         // --- UPDATE EXISTING RECORD ---
//         const [updated] = await db
//           .update(productTable)
//           .set({
//             name: dto.name.trim(),
//             price: dto.price,
//             stock: dto.stock,
//             updated_at: now,
//             updated_by: currentUser,
//           })
//           .where(eq(productTable.id, dto.id))
//           .returning();

//         if (!updated) {
//           throw new Error("Product not found to update");
//         }
//         savedProduct = updated;
//       } else {
//         // --- INSERT NEW RECORD ---
//         const [inserted] = await db
//           .insert(productTable)
//           .values({
//             name: dto.name.trim(),
//             price: dto.price,
//             stock: dto.stock ?? 0,
//             created_at: now,
//             created_by: currentUser,
//             updated_at: now,
//             updated_by: currentUser,
//           })
//           .returning();

//         savedProduct = inserted;
//       }

//       // 4. Transform DB fields to frontend format and return
//       return {
//         status: 200,
//         data: toViewMapper(savedProduct),
//       };
//     } catch (error: any) {
//       loggerInstance.error(`SaveProduct failed: ${error.message}`);
//       throw error;
//     }
//   }
// }



// ---------------------------get logic ------------------------
// export class ProductService {
//   static async GetProductById(id: string): Promise<ResponseType> {
//     const db = session_db();

//     // 1. Basic validation
//     if (!id || id.trim() === "") {
//       throw new Error("Invalid product ID");
//     }

//     // 2. Fetch row from database
//     const rows = await db
//       .select()
//       .from(productTable)
//       .where(eq(productTable.id, id.trim()))
//       .limit(1);

//     const product = rows[0];

//     // 3. Handle Not Found
//     if (!product) {
//       return {
//         status: 404,
//         data: null,
//       };
//     }

//     // 4. Return formatted data
//     return {
//       status: 200,
//       data: toViewMapper(product),
//     };
//   }
// }




// -------------------search logic ------------------------
// export class ProductService {
//   static async SearchProducts(input: SearchType): Promise<ResponseType> {
//     const db = session_db();

//     // 1. Safeguard pagination values
//     const skip = Math.max(0, Number(input.skip) || 0);
//     const limit = Math.min(100, Math.max(1, Number(input.limit) || 20));

//     // 2. Dynamically build WHERE conditions
//     const conditions = [];

//     // Search keyword condition (case-insensitive partial match)
//     if (input.searchTerm && input.searchTerm.trim() !== "") {
//       const term = `%${input.searchTerm.trim()}%`;
//       conditions.push(
//         or(
//           ilike(productTable.name, term),
//           ilike(productTable.description, term)
//         )
//       );
//     }

//     // Status filter condition
//     if (input.active !== undefined) {
//       conditions.push(eq(productTable.active, input.active));
//     }

//     const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

//     // 3. Count total matching rows
//     const [{ total }] = await db
//       .select({ total: count() })
//       .from(productTable)
//       .where(whereClause);

//     // 4. Fetch the paginated rows----- data query
//     const rows = await db
//       .select()
//       .from(productTable)
//       .where(whereClause)
//       .orderBy(desc(productTable.created_at))
//       .offset(skip)
//       .limit(limit);

//     // 5. Return data along with pagination metadata
//     return {
//       status: 200,
      // data: rows.map((row) => toViewMapper(row)),
//       total: Number(total) || 0,
//       skip,
//       limit,
//     };
//   }
// }






//  How the API Layer Connects to the Service Layer
// Keep your API endpoints thin. Their only job is to receive HTTP requests and forward them to your service:





// modules/product/product.api.ts

// 1. SAVE Endpoint
// export const SaveProductApi = api(
//   { method: "POST", path: "/product-save", expose: true },
//   async (body: ProductDto) => {
//     return await ProductService.SaveProduct(body);
//   }
// );

// 2. GET by ID Endpoint
// export const GetProductByIdApi = api(
//   { method: "GET", path: "/product-entity/:id", expose: true },
//   async ({ id }: { id: string }) => {
//     return await ProductService.GetProductById(id);
//   }
// );

// 3. SEARCH Endpoint
// export const SearchProductsApi = api(
//   { method: "POST", path: "/product-search", expose: true },
//   async (query: SearchType) => {
//     return await ProductService.SearchProducts(query);
//   }
// );





// ------------------------ Authentication and Authorization ------------------------
// Import your UserTable, LoginDto, ResponseType, session_db, and logger as needed

// -------------------- Login Api ------------------------
// export class AuthService {
//   // Step 1: Validation Helper
//   static validateLogin(dto: LoginDto) {
//     if (!dto.email || dto.email.trim() === "") {
//       throw new Error("Email is required. Are required fields present? Are values valid?");
//     }
//     if (!dto.password || dto.password.trim() === "") {
//       throw new Error("Password is required");
//     }
//   }

//   // Step 2: The Login Business Logic
//   static async Login(dto: LoginDto): Promise<ResponseType> {
//     const db = session_db();
//     const loggerInstance = logger();

//     try {
//       // 1. Validate incoming data
//       this.validateLogin(dto);

//       // 2. Fetch user record from database
//       const [user] = await db
//         .select()
//         .from(UserTable)
//         .where(eq(UserTable.email, dto.email.trim()))
//         .limit(1);

//       if (!user) {
//         throw new Error("User not found");
//       }

//       // 3. Verify password
//       const isValid = await bcrypt.compare(dto.password, user.password);

//       if (!isValid) {
//         throw new Error("Invalid password");
//       }

//       // 4. Generate JWT token
//       const token = jwt.sign(
//         {
//           id: user.id,
//           role: user.role,
//         },
//         process.env.JWT_SECRET!,
//         { expiresIn: '1h' }
//       );

//       // 5. Return formatted response
//       return {
//         status: 200,
//         data: { token },
//       };
//     } catch (error: any) {
//       loggerInstance.error(`Login failed: ${error.message}`);
//       return {
//         status: 401,
//         error: error instanceof Error ? error.message : 'Login failed',
//       };
//     }
//   }
// }
