// The Client (Frontend / Mobile App): The hungry customer sitting at the table.
// The API (.api.ts): The Waiter. The waiter just takes your order slip and hands it to the kitchen. The waiter does not cook the food.
// The Service (.service.ts): The Chef (The Business Logic). The chef checks if ingredients are fresh, follows the recipe, cooks the dish, and plates it.
// The Database / Entity (.entity.ts): The Refrigerator / Pantry. Where raw ingredients (data) are stored.
// The DTO (.dto.ts): The Order Slip / Menu. It defines what items and details can be requested or returned.
// Business logic is simply the rules, checks, and steps the Chef follows to get the job done correctly.

// What Actually Happens Inside "Business Logic"?
// When a request comes into your service (for example, saving a user or creating an order), the business logic always follows a predictable step-by-step checklist:

// mermaid
// flowchart TD
//     A[1. Receive Request Data] --> B[2. Data Translation / Mapping]
//     B --> C[3. Audit Stamps - Who & When?]
//     C --> D[4. Validation - Do rules pass?]
//     D --> E{5. New item or Existing item?}
//     E -- Has ID --> F[Update Database]
//     E -- No ID --> G[Insert into Database]
//     F --> H[6. Format & Return Response]
//     G --> H
// The 5 Standard Operations Every Service Does
// In this backend architecture, every module's business logic (.service.ts) has 5 core parts:

// 1. Connecting to the Database (Db())
// The service needs a key to open the pantry:

// ts
// static Db() {
//   return session_db(); // Gives us the database connection for this tenant
// }
// 2. Knowing Which Table to Use (EntityService())
// The service specifies which shelf/table it operates on:

// ts
// static EntityService() {
//   return userEntity; // Points to the database table
// }
// 3. Fetching One Item by ID (EntityByIdService)
// Finds a single record (e.g. "Find user with ID 5"):

// ts
// static async EntityByIdService(id: string) {
//   const db = this.Db();
//   const table = this.EntityService();
//   // Ask DB: Find the row where id matches
//   const rows = await db.select().from(table).where(eq(table.id, id)).limit(1);
//   const item = rows[0];
//   if (!item) return { data: null };
//   // Convert raw DB format back to a friendly format for the user
//   return { data: toViewMapper(item) };
// }
// 4. Saving Data (SaveService) — The Main Business Logic
// This handles both creating new items and updating existing ones.

// Here is what it does line-by-line:

// ts
// static async SaveService(userDto: UserDto): Promise<ResponseType> {
//   const log = logger();
//   try {
//     // STEP 1: TRANSLATE
//     // The frontend sends camelCase (e.g., userName). 
//     // The database expects snake_case (e.g., user_name).
//     // toEntityMapper converts it automatically.
//     let entity = toEntityMapper(userDto) as UserEntity;
//     // STEP 2: STAMP AUDIT INFO
//     // Automatically attach: Who created this? When was it updated?
//     entity = this.AuditUpdate(entity);
//     // STEP 3: BUSINESS RULES & VALIDATION
//     // Check if the input is allowed (e.g. Name cannot be empty)
//     entity = await this.SaveValidation(userDto, entity);
//     const db = this.Db();
//     const table = this.EntityService();
//     // STEP 4: DECIDE (INSERT OR UPDATE)
//     if (entity.id) {
//       // If it already has an ID, the item exists -> UPDATE it
//       await db.update(table).set(entity).where(eq(table.id, entity.id));
//     } else {
//       // If there is no ID, it's brand new -> INSERT it
//       const [inserted] = await db.insert(table).values(entity).returning();
//       entity = inserted ?? entity;
//     }
//     // STEP 5: PREPARE RESPONSE
//     // Convert back from database format into a clean view for the frontend
//     const dto = toViewMapper(entity);
//     log.info(`Saved successfully: ${entity.id}`);
//     return { data: dto };
//   } catch (error) {
//     log.error(`Failed to save: ${error}`);
//     throw error;
//   }
// }
// 5. Validation (SaveValidation) — Enforcing the Rules
// This is where your unique rules live:

// ts
// static async SaveValidation(dto: UserDto, entity: UserEntity): Promise<UserEntity> {
//   // Rule 1: Name is required
//   if (!entity.name || entity.name.trim() === "") {
//     throw new Error("INVALID_NAME: Name is required");
//   }
//   // Rule 2: Example custom check (e.g. email must contain '@')
//   if (entity.email && !entity.email.includes("@")) {
//     throw new Error("INVALID_EMAIL: Must be a valid email");
//   }
//   return entity;
// }
// Golden Rules for Writing Clean Business Logic
// Keep APIs Thin: The API handler in .api.ts should only receive the request and immediately call the service:
// ts
// // In .api.ts (Thin Waiter)
// export const SaveUser = api(..., async (input) => {
//   return await UserService.SaveService(input);
// });
// All Decisions Go in .service.ts: Calculations, database queries, permission checks, and data transformations belong in the service.
// Use Mappers: Never manually rename fields like db_name = clientName. Use toEntityMapper and toViewMapper.







// -----------------api file-----------------
// Define the HTTP method (GET, POST, etc.) and the URL path (e.g. /cart-me).
// Define the Input type and Output type (TypeScript contract).
// Hand the request directly to the service using respond() and send the answer back.


// Example format : 
// export const NameInPascalCase = api<RequestDto, ResponseType>(
//   {
//     method: "POST",          // HTTP Method: "GET", "POST", "PUT", "DELETE"
//     path: "/module-action",  // URL path in kebab-case (e.g., /cart-save)
//     expose: true,            // 'true' makes it accessible over the internet
//   },
//   async (request) => respond(() => MyService.MyMethodService(request))
// );




//  Entity file :
// type script defianition of the database table structure. It defines the columns, their types, and any relationships.
// Drizzle ORM uses it at runtime to build