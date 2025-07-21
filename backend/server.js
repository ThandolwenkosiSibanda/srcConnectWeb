import express from "express";
import { createClient } from "@supabase/supabase-js";
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://your-production-site.com", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json()); // parse JSON bodies

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Core function to create user + permissions transactionally
async function createUserWithPermissions(userData, permissionsData) {
  const client = await pool.connect();

  try {
    const { data: user, error: userError } =
      await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
      });

    if (userError) throw userError;

    const userId = user.user.id;

    await client.query("BEGIN");

    const insertUserText = `
      INSERT INTO public.users (
        id, region, gender, title, name, middle_name, surname, dob, national_id,
        passport_number, phone, alt_phone, email, address, city, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15, NOW()
      )
    `;

    const insertUserValues = [
      userId,
      userData.region,
      userData.gender,
      userData.title,
      userData.name,
      userData.middle_name || null,
      userData.surname,
      userData.dob,
      userData.national_id,
      userData.passport_number,
      userData.phone,
      userData.alt_phone || null,
      userData.email,
      userData.address,
      userData.city,
    ];

    await client.query(insertUserText, insertUserValues);

    const insertPermissionText = `
      INSERT INTO public.user_permissions (user_id, resource, action, allowed)
      VALUES ($1, $2, $3, $4)
    `;

    for (const resourceGroup of Object.values(permissionsData)) {
      for (const perm of resourceGroup) {
        await client.query(insertPermissionText, [
          userId,
          perm.resource,
          perm.action,
          perm.allowed,
        ]);
      }
    }

    await client.query("COMMIT");

    return userId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// API route to create user
app.post("/api/users", async (req, res) => {
  const { userData, permissionsData } = req.body;

  if (!userData || !permissionsData) {
    return res
      .status(400)
      .json({ error: "Missing userData or permissionsData" });
  }

  try {
    const userId = await createUserWithPermissions(userData, permissionsData);
    res.status(201).json({ userId });
  } catch (error) {
    console.log("Error");
    console.error("Failed to create user:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
